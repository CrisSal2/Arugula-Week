const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  breakfast: {
    type: String,
    required: true,
  },
  lunch: {
    type: String,
    required: true,
  },
  dinner: {
    type: String,
    required: true,
  },
});

const weekSchema = new mongoose.Schema({
  weekStart: {
    type: String, // Can be a date string or week number
    required: true,
  },
  weekEnd: {
    type: String,
    required: true,
  },
  meals: {
    Sunday: mealSchema,
    Monday: mealSchema,
    Tuesday: mealSchema,
    Wednesday: mealSchema,
    Thursday: mealSchema,
    Friday: mealSchema,
    Saturday: mealSchema,
  },
});

const Week = mongoose.model("Week", weekSchema);

module.exports = Week;
