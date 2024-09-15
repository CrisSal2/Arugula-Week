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
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload
    signup(username: String!, email: String!, password: String!): AuthPayload
    addMealPlan(name: String!, description: String!, url: String!, meals: [MealInput!]!): MealPlan
    updateMealPlan(id: ID!, name: String, description: String, meals: [MealInput], url: String): MealPlan
    deleteMealPlan(mealPlanId: ID!): Boolean
    
    addMeal(mealPlanId: ID!, name: String!, calories: Int!, description: String!): MealPlan
    updateMeal(mealPlanId: ID!, mealId: ID!, name: String, calories: Int, description: String): MealPlan
    deleteMeal(mealPlanId: ID!, mealId: ID!): MealPlan

    subscribePremium(planId: String!, paymentToken: String!): PaymentStatus
  }
    input MealInput {
    name: String!
    calories: Int!
    description: String!
  }
`;

module.exports = typeDefs;
