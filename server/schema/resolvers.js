const User = require("../models/User");
const MealPlan = require("../models/MealPlan");
const Week = require("../models/MealPlan");
const { processPayment } = require("../utils/payment");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      // if (context.req && context.req.user) {
      //   return await User.findById(context.req.user._id);
      // }
      if (context.user) {
        return await User.findById(context.user._id);
      }
      throw new AuthenticationError("Not authenticated");
    },
    getMealPlans: async () => {
      return await MealPlan.find();
    },
    getMealPlanById: async (parent, { id }) => {
      return await MealPlan.findById(id);
    },
    getMealById: async (parent, { mealPlanId, mealId }) => {
      const mealPlan = await MealPlan.findById(mealPlanId);
      return mealPlan.meals.id(mealId); // Retrieve the meal by ID from the meal plan
    },
    weeks: async () => {
      try {
        return await Week.find(); // Replace with actual data-fetching logic
      } catch (error) {
        console.error("Error fetching weeks:", error);
        throw new Error("Failed to fetch weeks");
      }
    },
    week: async (parent, { id }) => {
      try {
        return await Week.findById(id); 
      } catch (error) {
        console.error("Error fetching week:", error);
        throw new Error("Failed to fetch week");
      }
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
        throw new AuthenticationError("Invalid credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
    // Add new meal to a specific MealPlan
    addMeal: async (parent, { mealPlanId, name, calories, description }, context) => {
      if (!context.user) {
        throw new AuthenticationError("Not authenticated");
      }
      
      const mealPlan = await MealPlan.findById(mealPlanId);
      const newMeal = { name, calories, description };
      mealPlan.meals.push(newMeal); // Add meal to the meal plan
      
      await mealPlan.save();
      return mealPlan;
    },
    // Update a specific meal in a MealPlan
    updateMeal: async (parent, { mealPlanId, mealId, name, calories, description }, context) => {
      if (!context.user) {
        throw new AuthenticationError("Not authenticated");
      }

      const mealPlan = await MealPlan.findById(mealPlanId);
      const meal = mealPlan.meals.id(mealId);
      if (name) meal.name = name;
      if (calories) meal.calories = calories;
      if (description) meal.description = description;

      await mealPlan.save();
      return mealPlan;
    },

    // Delete a meal from a specific MealPlan
    deleteMeal: async (parent, { mealPlanId, mealId }, context) => {
      if (!context.user) {
        throw new AuthenticationError("Not authenticated");
      }
      try {
        const mealPlan = await MealPlan.findById(mealPlanId);
        if (!mealPlan) {
          throw new Error("Meal plan not found");
        }
        // Filter out the meal with the specified mealId
        mealPlan.meals = mealPlan.meals.filter(meal => meal._id.toString() !== mealId);

        await mealPlan.save();
        return mealPlan;
      }catch (error) {
        console.error("Error deleting meal:", error);
        throw new Error("Failed to delete meal");
      }
      
    },
    addMealPlan: async (parent, { name, description, meals, url }, context) => {
      try {
        if (!context.user) {
          throw new Error("Not authenticated");
        }
        return await MealPlan.create({ name, description, meals, url });
      } catch (error) {
        console.error("Error adding meal plan: ", error);
        throw new Error("Failed to add meal plan")
        
      }
    },
    updateMealPlan: async ( parent, { id, name, description, meals, url }, context ) => {
      if (!context.user) {
        throw new Error("Not authenticated");
      }
      return await MealPlan.findByIdAndUpdate(
        id,
        { name, description, meals, url },
        { new: true }
      );
    },
    deleteMealPlan: async (parent, { id }, context) => {
      console.log(context.user);
      if (!context.user) {
        throw new Error("Not authenticated");
      }
      try {
        // Find and delete the meal plan by its ID
        const deletedMealPlan = await MealPlan.findByIdAndDelete(id);

        if (!deletedMealPlan) {
          throw new Error("Meal plan not found");
        }

        return true;
      } catch (error) {
        console.error("Error deleting meal plan:", error);
        throw new Error("Failed to delete meal plan");
      }
    },
    addWeek: async (parent, { meals, weekStart, weekEnd }) => {
      const newWeek = new Week({ meals, weekStart, weekEnd });
      await newWeek.save();
      return newWeek;
    }, 
    updateWeek: async (parent, { id, meals, weekStart, weekEnd }) => {
      try {
        return await Week.findByIdAndUpdate
        (id, { meals, weekStart, weekEnd }, { new: true });
      } catch (error) {
        console.error("Error updating week:", error);
        throw new Error("Failed to update week");
      }
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
