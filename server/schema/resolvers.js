const User = require("../models/User");
const MealPlan = require("../models/MealPlan");
const { processPayment } = require("../utils/payment");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findById(context.user._id);
      }
      throw new Error("Not authenticated");
    },
    getMealPlans: async () => {
      return await MealPlan.find();
    },
    getMealPlanById: async (parent, { id }) => {
      return await MealPlan.findById(id);
    },
  },
  Mutation: {
    signup: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new Error("Invalid credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    addMealPlan: async (parent, { name, description, meals }, context) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }
      return await MealPlan.create({ name, description, meals });
    },
    updateMealPlan: async (
      parent,
      { id, name, description, meals },
      context
    ) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }
      return await MealPlan.findByIdAndUpdate(
        id,
        { name, description, meals },
        { new: true }
      );
    },
    deleteMealPlan: async (parent, { id }, context) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }
      const deleted = await MealPlan.findByIdAndDelete(id);
      return !!deleted;
    },
    subscribePremium: async (parent, { planId, paymentToken }, context) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }
      const paymentStatus = await processPayment(planId, paymentToken);
      return paymentStatus;
    },
  },
};

module.exports = resolvers;
