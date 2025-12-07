// // services/stripeService.js
// import { supabase } from "./supabase";

// export const stripeService = {
//   // Create payment intent
//   createPaymentIntent: async (amount, metadata = {}) => {
//     try {
//       // First, create a payment intent on your backend/edge function
//       const { data, error } = await supabase.functions.invoke(
//         "create-payment-intent",
//         {
//           body: {
//             amount: Math.round(amount * 100), // Convert to cents
//             currency: "usd",
//             metadata,
//           },
//         }
//       );

//       if (error) throw error;
//       return data;
//     } catch (error) {
//       console.error("Error creating payment intent:", error);
//       throw error;
//     }
//   },

//   // Get payment intent status
//   getPaymentIntent: async (paymentIntentId) => {
//     try {
//       const { data, error } = await supabase.functions.invoke(
//         "get-payment-intent",
//         {
//           body: { paymentIntentId },
//         }
//       );

//       if (error) throw error;
//       return data;
//     } catch (error) {
//       console.error("Error fetching payment intent:", error);
//       throw error;
//     }
//   },
// };
