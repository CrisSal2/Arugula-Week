const mongoose = require("mongoose");

const mealPlanSchema = new mongoose.Schema({
  name: { // Meal Name
    type: String,
    required: true,
  },
  description: { // Meal Description
    type: String,
    required: true,
  },
  meals: { // Meal Plan Meals
    type: [String],
    required: true,
  },
  url: { // image URL
    type: String,
    required: true,
  },
});

const MealPlan = mongoose.model("MealPlan", mealPlanSchema);

module.exports = MealPlan;
