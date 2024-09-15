const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const mealPlanSchema = new mongoose.Schema({
  name: { // Meal Name
    type: String,
    required: true,
  },
  description: { // Meal Description
    type: String,
    required: true,
  },
  meals: {
    type: [mealSchema], // Array of meals
    required: true,
  },
  url: { // image URL
    type: String,
    required: true,
  },
});

const MealPlan = mongoose.model("MealPlan", mealPlanSchema);

module.exports = MealPlan;
