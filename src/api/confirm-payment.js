// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// module.exports = async (req, res) => {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   try {
//     const { paymentIntentId } = req.body;

//     const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

//     res.status(200).json({ paymentIntent });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
