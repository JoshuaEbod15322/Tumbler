import { supabase } from "./supabase";

export const orderService = {
  // Create a new order with order items
  async createOrder(orderData, orderItems) {
    try {
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert([orderData])
        .select()
        .single();

      if (orderError) {
        throw orderError;
      }

      // Add order_id to each order item
      const orderItemsWithOrderId = orderItems.map((item) => ({
        ...item,
        order_id: order.id,
      }));

      // Insert order items
      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItemsWithOrderId);

      if (itemsError) {
        throw itemsError;
      }

      // Update product stock for each item
      for (const item of orderItems) {
        await this.updateProductStock(item.product_id, item.quantity);
      }

      return order;
    } catch (error) {
      throw new Error(`Failed to create order: ${error.message}`);
    }
  },

  // Update product stock after order
  async updateProductStock(productId, quantity) {
    try {
      // Get current stock
      const { data: product, error: fetchError } = await supabase
        .from("products")
        .select("stock")
        .eq("id", productId)
        .single();

      if (fetchError) throw fetchError;

      const currentStock = parseInt(product.stock) || 0;
      const newStock = currentStock - quantity;

      // Update stock
      const { error: updateError } = await supabase
        .from("products")
        .update({
          stock: newStock > 0 ? newStock : 0,
          updated_at: new Date().toISOString(),
        })
        .eq("id", productId);

      if (updateError) throw updateError;

      return { success: true, newStock };
    } catch (error) {
      throw error;
    }
  },

  // Get all orders (for admin dashboard)
  async getAllOrders(filters = {}) {
    try {
      let query = supabase
        .from("orders")
        .select(
          `
          *,
          user:user_id (
            id,
            full_name,
            email,
            phone
          ),
          order_items (
            *,
            products (
              name,
              price,
              image_url,
              brand,
              category
            )
          )
        `
        )
        .order("created_at", { ascending: false });

      // Apply filters
      if (filters.status && filters.status !== "all") {
        query = query.eq("status", filters.status);
      }

      if (filters.search) {
        query = query.or(
          `order_number.ilike.%${filters.search}%,user.full_name.ilike.%${filters.search}%`
        );
      }

      const { data: orders, error } = await query;

      if (error) {
        throw error;
      }

      return orders || [];
    } catch (error) {
      throw error;
    }
  },

  // Get user orders
  async getUserOrders(userId) {
    try {
      const { data: orders, error } = await supabase
        .from("orders")
        .select(
          `
          *,
          order_items (
            *,
            products (
              name,
              price,
              image_url,
              brand,
              category
            )
          )
        `
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return orders || [];
    } catch (error) {
      throw error;
    }
  },

  // Get order by ID
  async getOrderById(orderId) {
    try {
      const { data: order, error } = await supabase
        .from("orders")
        .select(
          `
          *,
          user:user_id (
            id,
            full_name,
            email,
            phone,
            address,
            city,
            state,
            zip_code,
            country
          ),
          order_items (
            *,
            products (
              name,
              description,
              price,
              image_url,
              brand,
              category
            )
          )
        `
        )
        .eq("id", orderId)
        .single();

      if (error) throw error;
      return order;
    } catch (error) {
      throw error;
    }
  },

  // Update order status
  async updateOrderStatus(orderId, status) {
    try {
      const { error } = await supabase
        .from("orders")
        .update({
          status: status,
          updated_at: new Date().toISOString(),
        })
        .eq("id", orderId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      throw error;
    }
  },

  // Update payment status
  async updatePaymentStatus(orderId, paymentStatus) {
    try {
      const { error } = await supabase
        .from("orders")
        .update({
          payment_status: paymentStatus,
          updated_at: new Date().toISOString(),
        })
        .eq("id", orderId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      throw error;
    }
  },

  // Add tracking number
  async addTrackingNumber(orderId, trackingNumber) {
    try {
      const { error } = await supabase
        .from("orders")
        .update({
          tracking_number: trackingNumber,
          updated_at: new Date().toISOString(),
        })
        .eq("id", orderId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      throw error;
    }
  },

  // Cancel order
  async cancelOrder(orderId) {
    try {
      // First, get order items to restore stock
      const { data: orderItems, error: itemsError } = await supabase
        .from("order_items")
        .select("product_id, quantity")
        .eq("order_id", orderId);

      if (itemsError) throw itemsError;

      // Restore stock for each product
      for (const item of orderItems) {
        await this.restoreProductStock(item.product_id, item.quantity);
      }

      // Then update order status to cancelled
      const { error } = await supabase
        .from("orders")
        .update({
          status: "cancelled",
          updated_at: new Date().toISOString(),
        })
        .eq("id", orderId);

      if (error) throw error;
      return { success: true };
    } catch (error) {
      throw error;
    }
  },

  // Delete order permanently
  async deleteOrder(orderId) {
    try {
      // Check if order exists first
      const { data: order, error: checkError } = await supabase
        .from("orders")
        .select("id, status")
        .eq("id", orderId)
        .single();

      if (checkError) {
        if (checkError.code === "PGRST116") {
          throw new Error("Order not found");
        }
        throw checkError;
      }

      // Only allow deletion of cancelled orders (safety measure)
      if (order.status !== "cancelled") {
        throw new Error(
          "Only cancelled orders can be deleted. Cancel the order first."
        );
      }

      // First delete order items
      const { error: itemsError } = await supabase
        .from("order_items")
        .delete()
        .eq("order_id", orderId);

      if (itemsError) throw itemsError;

      // Then delete the order
      const { error: orderError } = await supabase
        .from("orders")
        .delete()
        .eq("id", orderId);

      if (orderError) throw orderError;

      return { success: true };
    } catch (error) {
      throw new Error(`Failed to delete order: ${error.message}`);
    }
  },

  // Restore product stock when order is cancelled
  async restoreProductStock(productId, quantity) {
    try {
      // Get current stock
      const { data: product, error: fetchError } = await supabase
        .from("products")
        .select("stock")
        .eq("id", productId)
        .single();

      if (fetchError) throw fetchError;

      const currentStock = parseInt(product.stock) || 0;
      const newStock = currentStock + quantity;

      // Update stock
      const { error: updateError } = await supabase
        .from("products")
        .update({
          stock: newStock,
          updated_at: new Date().toISOString(),
        })
        .eq("id", productId);

      if (updateError) throw updateError;
      return { success: true, newStock };
    } catch (error) {
      throw error;
    }
  },

  // Get order statistics
  async getOrderStats(userId = null) {
    try {
      let query = supabase
        .from("orders")
        .select("total_amount, status, created_at");

      if (userId) {
        query = query.eq("user_id", userId);
      }

      const { data: orders, error } = await query;

      if (error) throw error;

      const stats = {
        totalOrders: orders?.length || 0,
        totalSpent:
          orders?.reduce(
            (sum, order) => sum + (parseFloat(order.total_amount) || 0),
            0
          ) || 0,
        pendingOrders:
          orders?.filter((order) => order.status === "processing").length || 0,
        shippedOrders:
          orders?.filter((order) => order.status === "shipped").length || 0,
        deliveredOrders:
          orders?.filter((order) => order.status === "delivered").length || 0,
        cancelledOrders:
          orders?.filter((order) => order.status === "cancelled").length || 0,
      };

      return stats;
    } catch (error) {
      throw error;
    }
  },

  // Get admin dashboard statistics
  async getAdminDashboardStats() {
    try {
      // Get orders stats
      const ordersStats = await this.getOrderStats();

      // Get total users count
      const { count: totalUsers, error: usersError } = await supabase
        .from("user")
        .select("*", { count: "exact", head: true });

      if (usersError) {
        throw usersError;
      }

      // Get low stock products (stock <= 10)
      const { data: lowStockProducts, error: productsError } = await supabase
        .from("products")
        .select("id")
        .lte("stock", 10)
        .gt("stock", 0);

      if (productsError) {
        throw productsError;
      }

      // Get today's orders
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const { data: todayOrders, error: todayError } = await supabase
        .from("orders")
        .select("total_amount")
        .gte("created_at", today.toISOString())
        .lt("created_at", tomorrow.toISOString());

      if (todayError) {
        throw todayError;
      }

      return {
        ...ordersStats,
        totalUsers: totalUsers || 0,
        lowStockProducts: lowStockProducts?.length || 0,
        todayRevenue:
          todayOrders?.reduce(
            (sum, order) => sum + (parseFloat(order.total_amount) || 0),
            0
          ) || 0,
        todayOrders: todayOrders?.length || 0,
      };
    } catch (error) {
      throw error;
    }
  },

  // Search orders by various criteria
  async searchOrders(searchTerm) {
    try {
      const { data: orders, error } = await supabase
        .from("orders")
        .select(
          `
          *,
          user:user_id (
            full_name,
            email
          ),
          order_items (
            *,
            products (
              name,
              price,
              image_url
            )
          )
        `
        )
        .or(
          `order_number.ilike.%${searchTerm}%,user.full_name.ilike.%${searchTerm}%,user.email.ilike.%${searchTerm}%`
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      return orders || [];
    } catch (error) {
      throw error;
    }
  },

  // Get orders by date range
  async getOrdersByDateRange(startDate, endDate) {
    try {
      const { data: orders, error } = await supabase
        .from("orders")
        .select(
          `
          *,
          user:user_id (
            full_name,
            email
          ),
          order_items (
            *,
            products (
              name,
              price,
              image_url
            )
          )
        `
        )
        .gte("created_at", startDate)
        .lte("created_at", endDate)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return orders || [];
    } catch (error) {
      throw error;
    }
  },

  // Get recent orders (last 7 days)
  async getRecentOrders(limit = 10) {
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      const { data: orders, error } = await supabase
        .from("orders")
        .select(
          `
          *,
          user:user_id (
            full_name,
            email
          )
        `
        )
        .gte("created_at", sevenDaysAgo.toISOString())
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) throw error;
      return orders || [];
    } catch (error) {
      throw error;
    }
  },
};
