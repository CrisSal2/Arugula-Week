const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Meal {
    _id: ID
    name: String!
    calories: Int!
    description: String!
  }

  type MealPlan {
    _id: ID
    name: String!
    description: String!
    meals: [Meal!]!
    url: String
  }

  type PaymentStatus {
    status: String
    message: String
  }

  type Query {
    me: User
    getMealPlans: [MealPlan]
    getMealPlanById(id: ID!): MealPlan
    getMealById(mealPlanId: ID!, mealId: ID!): Meal
    weeks: [Week]
    week(id: ID!): Week
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload
    signup(username: String!, email: String!, password: String!): AuthPayload
    addMealPlan(name: String!, description: String!, url: String!, meals: [MealInput!]!): MealPlan
    updateMealPlan(id: ID!, name: String, description: String, meals: [MealInput], url: String): MealPlan
    deleteMealPlan(id: ID!): Boolean
    
    addMeal(mealPlanId: ID!, name: String!, calories: Int!, description: String!): MealPlan
    updateMeal(mealPlanId: ID!, mealId: ID!, name: String, calories: Int, description: String): MealPlan
    deleteMeal(mealPlanId: ID!, mealId: ID!): MealPlan

    subscribePremium(planId: String!, paymentToken: String!): PaymentStatus
    addWeek(meals: WeekInput!, weekStart: String!, weekEnd: String!): Week
    updateWeek(id: ID!, meals: WeekInput, weekStart: String, weekEnd: String): Week
  }
  

  input MealInput {
  breakfast: String!
  lunch: String!
  dinner: String!
}

input WeekInput {
  Sunday: MealInput!
  Monday: MealInput!
  Tuesday: MealInput!
  Wednesday: MealInput!
  Thursday: MealInput!
  Friday: MealInput!
  Saturday: MealInput!
}



type Week {
  _id: ID!
  weekStart: String!
  weekEnd: String!
  meals: Meals!
}


type Meals {
  Sunday: Meal!
  Monday: Meal!
  Tuesday: Meal!
  Wednesday: Meal!
  Thursday: Meal!
  Friday: Meal!
  Saturday: Meal!
}

type Meal {
  breakfast: String!
  lunch: String!
  dinner: String!
}
  

`;

module.exports = typeDefs;
