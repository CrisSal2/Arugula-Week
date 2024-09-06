const mongoose = require("mongoose");

const mealPlanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  meals: {
    type: [String],
    required: true,
  },
});

const MealPlan = mongoose.model("MealPlan", mealPlanSchema);

module.exports = MealPlan;
