const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    token: String
  }

  type MealPlan {
    _id: ID
    name: String
    description: String
    meals: [String]
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
    login(email: String!, password: String!): User
    signup(username: String!, email: String!, password: String!): User
    addMealPlan(name: String!, description: String!, meals: [String]!): MealPlan
    updateMealPlan(
      id: ID!
      name: String
      description: String
      meals: [String]
    ): MealPlan
    deleteMealPlan(id: ID!): Boolean
    subscribePremium(planId: String!, paymentToken: String!): PaymentStatus
  }
`;

module.exports = typeDefs;
