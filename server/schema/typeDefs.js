const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
  }

  type AuthPayload {
    token: String
    user: User
  }

  type MealPlan {
    _id: ID
    name: String
    description: String
    meals: [String]
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
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload
    signup(username: String!, email: String!, password: String!): AuthPayload
    addMealPlan(name: String!, description: String!, meals: [String]!, url: String!): MealPlan
    updateMealPlan(
      id: ID!
      name: String
      description: String
      meals: [String]
      url: String
    ): MealPlan
    deleteMealPlan(id: ID!): Boolean
    subscribePremium(planId: String!, paymentToken: String!): PaymentStatus
  }
`;

module.exports = typeDefs;
