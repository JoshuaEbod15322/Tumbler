// import { supabase } from "./supabase"; // Your Supabase client
// import Stripe from "stripe";
// import { orderService } from "./lib/orderService";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   try {
//     const { cartItems, shipping, userId, total, successUrl, cancelUrl } =
//       req.body;

//     // Create line items for Stripe
//     const lineItems = cartItems.map((item) => ({
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: `${item.name} (${item.size})`,
//           images: [item.imageUrl],
//         },
//         unit_amount: Math.round(item.price * 100),
//       },
//       quantity: item.quantity,
//     }));

//     // Add shipping as a line item
//     lineItems.push({
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: shipping.name,
//         },
//         unit_amount: Math.round(shipping.price * 100),
//       },
//       quantity: 1,
//     });

//     // Create Stripe checkout session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       success_url: successUrl,
//       cancel_url: cancelUrl,
//       client_reference_id: userId,
//       metadata: {
//         userId,
//         cartItems: JSON.stringify(
//           cartItems.map((item) => ({
//             productId: item.id,
//             quantity: item.quantity,
//             size: item.size,
//             price: item.price,
//           }))
//         ),
//         shipping: JSON.stringify(shipping),
//       },
//     });

//     // Create order in database BEFORE checkout completion
//     const orderData = {
//       user_id: userId,
//       order_number: `ORD-${Date.now()}`,
//       total_amount: total,
//       status: "processing",
//       payment_status: "pending",
//       shipping_method: shipping.name,
//       shipping_cost: shipping.price,
//       tax_amount: total * 0.08, // 8% tax
//       subtotal: total - shipping.price - total * 0.08,
//     };

//     // Create order items for database
//     const orderItems = cartItems.map((item) => ({
//       product_id: item.id,
//       quantity: item.quantity,
//       size: item.size,
//       price: item.price,
//       total_price: item.price * item.quantity,
//       name: item.name,
//     }));

//     try {
//       await orderService.createOrder(orderData, orderItems);
//     } catch (orderError) {
//       console.error("Failed to create order:", orderError);
//       // Continue with Stripe checkout even if order creation fails
//       // The webhook will handle order creation on payment success
//     }

//     res.status(200).json({ sessionId: session.id });
//   } catch (error) {
//     console.error("Checkout session error:", error);
//     res.status(500).json({ error: error.message });
//   }
// }
