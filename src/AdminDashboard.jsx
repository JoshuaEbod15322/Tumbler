import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Package,
  ShoppingBag,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  Search,
  Filter,
  User,
  Calendar,
  Hash,
  ShoppingCart,
  Users,
  AlertCircle,
  Menu,
  X,
} from "lucide-react";
import ProductModal from "./components/ProductModal";
import ConfirmModal from "./components/ConfirmModal";
import Notification from "./components/Notification";
import ViewOrderModal from "./components/ViewOrderModal";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Modal & Notification States
  const [showProductModal, setShowProductModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showViewOrderModal, setShowViewOrderModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState({ type: "", id: null });

  // Updated categories and brands
  const categories = ["Outdoor", "Stainless", "Plastic", "Accessories"];
  const brands = ["Hydro Flask", "Yeti", "Stanley", "Contigo", "Camelbak"];

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Insulated Stainless Tumbler",
      category: "Stainless",
      brand: "Yeti",
      price: 34.99,
      stock: 42,
      status: "active",
      sales: 128,
      imageColor: "#2C3E50",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      name: "Travel Mug",
      category: "Outdoor",
      brand: "Hydro Flask",
      price: 42.99,
      stock: 18,
      status: "active",
      sales: 89,
      imageColor: "#27AE60",
      createdAt: "2024-01-10",
    },
    {
      id: 3,
      name: "Sports Water Bottle",
      category: "Plastic",
      brand: "Contigo",
      price: 19.99,
      stock: 0,
      status: "out_of_stock",
      sales: 156,
      imageColor: "#3498DB",
      createdAt: "2024-01-05",
    },
    {
      id: 4,
      name: "Double Wall Cup",
      category: "Stainless",
      brand: "Stanley",
      price: 29.99,
      stock: 25,
      status: "active",
      sales: 73,
      imageColor: "#E74C3C",
      createdAt: "2024-01-12",
    },
    {
      id: 5,
      name: "Camping Bottle",
      category: "Outdoor",
      brand: "Camelbak",
      price: 39.99,
      stock: 12,
      status: "low_stock",
      sales: 45,
      imageColor: "#D35400",
      createdAt: "2024-01-08",
    },
    {
      id: 6,
      name: "Bottle Lid Accessory",
      category: "Accessories",
      brand: "Hydro Flask",
      price: 14.99,
      stock: 67,
      status: "active",
      sales: 92,
      imageColor: "#E84393",
      createdAt: "2024-01-03",
    },
  ]);

  const [orders, setOrders] = useState([
    {
      id: 1,
      orderNumber: "ORD-001234",
      customer: "John Doe",
      email: "john@example.com",
      date: "2024-01-15",
      items: 3,
      total: 149.97,
      status: "delivered",
      payment: "paid",
      tracking: "TRK-789456123",
    },
    {
      id: 2,
      orderNumber: "ORD-001235",
      customer: "Jane Smith",
      email: "jane@example.com",
      date: "2024-01-14",
      items: 2,
      total: 89.98,
      status: "shipped",
      payment: "paid",
      tracking: "TRK-789456124",
    },
    {
      id: 3,
      orderNumber: "ORD-001236",
      customer: "Bob Johnson",
      email: "bob@example.com",
      date: "2024-01-13",
      items: 1,
      total: 34.99,
      status: "processing",
      payment: "pending",
      tracking: "",
    },
    {
      id: 4,
      orderNumber: "ORD-001237",
      customer: "Alice Brown",
      email: "alice@example.com",
      date: "2024-01-12",
      items: 4,
      total: 199.96,
      status: "cancelled",
      payment: "refunded",
      tracking: "",
    },
    {
      id: 5,
      orderNumber: "ORD-001238",
      customer: "Charlie Wilson",
      email: "charlie@example.com",
      date: "2024-01-11",
      items: 2,
      total: 79.98,
      status: "delivered",
      payment: "paid",
      tracking: "TRK-789456125",
    },
    {
      id: 6,
      orderNumber: "ORD-001239",
      customer: "Diana Ross",
      email: "diana@example.com",
      date: "2024-01-10",
      items: 3,
      total: 119.97,
      status: "shipped",
      payment: "paid",
      tracking: "TRK-789456126",
    },
  ]);

  const stats = {
    totalOrders: 156,
    totalProducts: 24,
    activeCustomers: 89,
    pendingOrders: 12,
    lowStockProducts: 3,
  };

  const statusConfig = {
    delivered: { icon: CheckCircle, color: "bg-green-100 text-green-800" },
    shipped: { icon: Truck, color: "bg-blue-100 text-blue-800" },
    processing: { icon: Clock, color: "bg-yellow-100 text-yellow-800" },
    cancelled: { icon: XCircle, color: "bg-red-100 text-red-800" },
    active: { icon: CheckCircle, color: "bg-green-100 text-green-800" },
    out_of_stock: { icon: XCircle, color: "bg-red-100 text-red-800" },
    low_stock: { icon: AlertCircle, color: "bg-yellow-100 text-yellow-800" },
  };

  const paymentStatusConfig = {
    paid: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    refunded: "bg-blue-100 text-blue-800",
  };

  const categoryConfig = {
    Stainless: "bg-blue-50 text-blue-700",
    Outdoor: "bg-green-50 text-green-700",
    Plastic: "bg-purple-50 text-purple-700",
    Accessories: "bg-yellow-50 text-yellow-700",
  };

  const handleDeleteProduct = (id) => {
    setDeleteTarget({ type: "product", id });
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget.type === "product") {
      setProducts(products.filter((product) => product.id !== deleteTarget.id));
      showNotification("Product deleted successfully", "success");
    }
    setDeleteTarget({ type: "", id: null });
  };

  const handleUpdateOrderStatus = (id, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
    showNotification("Order status updated successfully", "success");
  };

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setShowProductModal(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleSaveProduct = (productData) => {
    if (selectedProduct) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === selectedProduct.id ? { ...p, ...productData } : p
        )
      );
      showNotification("Product updated successfully", "success");
    } else {
      // Add new product
      const newProduct = {
        id: products.length + 1,
        ...productData,
        sales: 0,
        imageColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setProducts([...products, newProduct]);
      showNotification("Product added successfully", "success");
    }
    setShowProductModal(false);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowViewOrderModal(true);
  };

  const handleLogout = () => {
    setDeleteTarget({ type: "logout", id: null });
    setShowConfirmModal(true);
  };

  const handleConfirmLogout = () => {
    navigate("/Home");
    showNotification("Logged out successfully", "success");
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const filteredOrders =
    selectedStatus === "all"
      ? orders
      : orders.filter((order) => order.status === selectedStatus);

  const getStatusBadge = (status, type = "order") => {
    const config = statusConfig[status] || {
      icon: Package,
      color: "bg-gray-100 text-gray-800",
    };
    const Icon = config.icon;
    const statusText =
      type === "product"
        ? status === "active"
          ? "In Stock"
          : status === "out_of_stock"
          ? "Out of Stock"
          : "Low Stock"
        : status.charAt(0).toUpperCase() + status.slice(1);

    return (
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${config.color}`}
      >
        <Icon className="w-3 h-3" />
        {statusText}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Hamburger Menu Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 bg-gray-900 text-white rounded-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed md:relative inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:flex flex-col`}
      >
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-7 h-7 text-blue-400" />
            <div>
              <h2 className="text-xl font-bold">Admin Panel</h2>
              <p className="text-gray-400 text-sm">DrinksCart Management</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 hover:bg-gray-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 p-4 space-y-1">
          {[
            { id: "overview", label: "Overview", icon: Home },
            { id: "products", label: "Products", icon: Package },
            { id: "orders", label: "Orders", icon: ShoppingBag },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSidebarOpen(false);
              }}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all ${
                activeTab === tab.id
                  ? "bg-blue-900/50 text-blue-300 border-l-4 border-blue-400"
                  : "hover:bg-gray-800 text-gray-300"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-red-900/20 text-red-300 hover:bg-red-900/30 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Backdrop for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">
                Manage your store's products and orders
              </p>
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border-l-4 border-green-500">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                        {stats.totalOrders}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Total Orders
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border-l-4 border-red-500">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                        {stats.totalProducts}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Products
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border-l-4 border-yellow-500">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                        {stats.activeCustomers}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        Active Customers
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={handleAddProduct}
                    className="flex flex-col items-center gap-3 p-4 sm:p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
                  >
                    <Plus className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                    <span className="font-medium text-gray-700 text-sm sm:text-base">
                      Add New Product
                    </span>
                  </button>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="flex flex-col items-center gap-3 p-4 sm:p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all"
                  >
                    <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                    <span className="font-medium text-gray-700 text-sm sm:text-base">
                      View Orders
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <button
                  onClick={handleAddProduct}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base"
                >
                  <Plus className="w-4 h-4" />
                  Add Product
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search products..."
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base flex-1"
                      >
                        <option value="all">All Categories</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <div className="min-w-full">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left p-3 sm:p-4 font-semibold text-gray-700 text-sm sm:text-base">
                            Product
                          </th>
                          <th className="text-left p-3 sm:p-4 font-semibold text-gray-700 text-sm sm:text-base">
                            Brand
                          </th>
                          <th className="text-left p-3 sm:p-4 font-semibold text-gray-700 text-sm sm:text-base">
                            Category
                          </th>
                          <th className="text-left p-3 sm:p-4 font-semibold text-gray-700 text-sm sm:text-base">
                            Price
                          </th>
                          <th className="text-left p-3 sm:p-4 font-semibold text-gray-700 text-sm sm:text-base">
                            Stock
                          </th>
                          <th className="text-left p-3 sm:p-4 font-semibold text-gray-700 text-sm sm:text-base">
                            Status
                          </th>
                          <th className="text-left p-3 sm:p-4 font-semibold text-gray-700 text-sm sm:text-base">
                            Sales
                          </th>
                          <th className="text-left p-3 sm:p-4 font-semibold text-gray-700 text-sm sm:text-base">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredProducts.map((product) => (
                          <tr key={product.id} className="hover:bg-gray-50">
                            <td className="p-3 sm:p-4">
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-8 h-8 sm:w-10 sm:h-10 rounded"
                                  style={{
                                    backgroundColor: product.imageColor,
                                  }}
                                />
                                <div>
                                  <div className="font-medium text-gray-900 text-sm sm:text-base">
                                    {product.name}
                                  </div>
                                  <div className="text-xs sm:text-sm text-gray-500">
                                    ID: {product.id}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="p-3 sm:p-4">
                              <span className="px-2 py-1 rounded-full text-xs sm:text-sm font-medium bg-gray-100 text-gray-700">
                                {product.brand}
                              </span>
                            </td>
                            <td className="p-3 sm:p-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${
                                  categoryConfig[product.category] ||
                                  "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {product.category}
                              </span>
                            </td>
                            <td className="p-3 sm:p-4 font-semibold text-gray-900 text-sm sm:text-base">
                              ${product.price.toFixed(2)}
                            </td>
                            <td className="p-3 sm:p-4">
                              <div className="flex items-center gap-2">
                                <span
                                  className={
                                    product.stock <= 10
                                      ? "text-yellow-600 font-medium text-sm sm:text-base"
                                      : "text-gray-700 text-sm sm:text-base"
                                  }
                                >
                                  {product.stock}
                                </span>
                                {product.stock <= 10 && product.stock > 0 && (
                                  <span className="text-xs text-yellow-600">
                                    Low
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="p-3 sm:p-4">
                              {getStatusBadge(product.status, "product")}
                            </td>
                            <td className="p-3 sm:p-4 font-semibold text-gray-900 text-sm sm:text-base">
                              {product.sales}
                            </td>
                            <td className="p-3 sm:p-4">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEditProduct(product)}
                                  className="p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="Edit"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteProduct(product.id)
                                  }
                                  className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Delete"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div></div>
                <div className="flex items-center gap-2 text-gray-700">
                  <Hash className="w-4 h-4" />
                  <span className="font-medium text-sm sm:text-base">
                    {orders.length} Orders
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <select
                      className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <div className="min-w-full">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left p-3 sm:p-4 font-semibold text-gray-700 text-sm sm:text-base">
                            Order ID
                          </th>
                          <th className="text-left p-3 sm:p-4 font-semibold text-gray-700 text-sm sm:text-base">
                            Customer
                          </th>
                          <th className="text-left p-3 sm:p-4 font-semibold text-gray-700 text-sm sm:text-base">
                            Date
                          </th>
                          <th className="text-left p-3 sm:p-4 font-semibold text-gray-700 text-sm sm:text-base">
                            Items
                          </th>
                          <th className="text-left p-3 sm:p-4 font-semibold text-gray-700 text-sm sm:text-base">
                            Total
                          </th>
                          <th className="text-left p-3 sm:p-4 font-semibold text-gray-700 text-sm sm:text-base">
                            Status
                          </th>
                          <th className="text-left p-3 sm:p-4 font-semibold text-gray-700 text-sm sm:text-base">
                            Payment
                          </th>
                          <th className="text-left p-3 sm:p-4 font-semibold text-gray-700 text-sm sm:text-base">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filteredOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50">
                            <td className="p-3 sm:p-4 font-mono font-semibold text-gray-900 text-sm sm:text-base">
                              {order.orderNumber}
                            </td>
                            <td className="p-3 sm:p-4">
                              <div className="flex items-center gap-3">
                                <User className="w-6 h-6 sm:w-8 sm:h-8 p-1 sm:p-1.5 bg-gray-100 text-gray-600 rounded-full" />
                                <div>
                                  <div className="font-medium text-gray-900 text-sm sm:text-base">
                                    {order.customer}
                                  </div>
                                  <div className="text-xs sm:text-sm text-gray-500">
                                    {order.email}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="p-3 sm:p-4">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                                <span className="text-sm sm:text-base">
                                  {order.date}
                                </span>
                              </div>
                            </td>
                            <td className="p-3 sm:p-4 text-gray-700 text-sm sm:text-base">
                              {order.items} items
                            </td>
                            <td className="p-3 sm:p-4 font-semibold text-gray-900 text-sm sm:text-base">
                              ${order.total.toFixed(2)}
                            </td>
                            <td className="p-3 sm:p-4">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                {getStatusBadge(order.status)}
                                <select
                                  className="text-xs sm:text-sm border border-gray-300 rounded px-2 py-1"
                                  value={order.status}
                                  onChange={(e) =>
                                    handleUpdateOrderStatus(
                                      order.id,
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="processing">Processing</option>
                                  <option value="shipped">Shipped</option>
                                  <option value="delivered">Delivered</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                              </div>
                            </td>
                            <td className="p-3 sm:p-4">
                              <span
                                className={`px-2 py-1 rounded-full text-xs sm:text-sm font-medium ${
                                  paymentStatusConfig[order.payment] ||
                                  "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {order.payment.charAt(0).toUpperCase() +
                                  order.payment.slice(1)}
                              </span>
                            </td>
                            <td className="p-3 sm:p-4">
                              <button
                                onClick={() => handleViewOrder(order)}
                                className="flex items-center gap-1 px-2 sm:px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors text-sm sm:text-base"
                              >
                                <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                                <span className="hidden sm:inline">View</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <ProductModal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        product={selectedProduct}
        onSave={handleSaveProduct}
      />

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={
          deleteTarget.type === "logout"
            ? handleConfirmLogout
            : handleConfirmDelete
        }
        title={
          deleteTarget.type === "logout" ? "Confirm Logout" : "Confirm Delete"
        }
        message={
          deleteTarget.type === "logout"
            ? "Are you sure you want to logout?"
            : "Are you sure you want to delete this item? This action cannot be undone."
        }
        type={deleteTarget.type === "logout" ? "warning" : "delete"}
      />

      <ViewOrderModal
        isOpen={showViewOrderModal}
        onClose={() => setShowViewOrderModal(false)}
        order={selectedOrder}
      />

      {/* Notification */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
