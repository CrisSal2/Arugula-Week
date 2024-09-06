const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = {
  processPayment: async (planId, paymentToken) => {
    try {
      const charge = await stripe.charges.create({
        amount: 999, // amount in cents ($9.99)
        currency: "usd",
        source: paymentToken,
        description: `Payment for Premium Meal Plan ${planId}`,
      });
      return { status: "success", message: "Payment successful!" };
    } catch (error) {
      return { status: "failure", message: "Payment failed!" };
    }
  },
};
