import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SUBSCRIBE_PREMIUM } from "../graphql/mutations";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const PremiumMealPlans = () => {
  const [paymentToken, setPaymentToken] = useState("");
  const [subscribePremium] = useMutation(SUBSCRIBE_PREMIUM);

  const handlePayment = async (e) => {
    e.preventDefault();
    const stripe = await stripePromise;

    const { token } = await stripe.createToken({ name: "User" });
    setPaymentToken(token.id);

    const { data } = await subscribePremium({
      variables: { planId: "premium-plan-1", paymentToken: token.id },
    });

    if (data.subscribePremium.status === "success") {
      alert("Payment successful!");
    } else {
      alert("Payment failed!");
    }
  };

  return (
    <div>
      <h2>Subscribe to Premium Meal Plans</h2>
      <form onSubmit={handlePayment}>
        <button type="submit">Pay $9.99</button>
      </form>
    </div>
  );
};

export default PremiumMealPlans;
