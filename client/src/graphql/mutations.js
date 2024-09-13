import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation SignupUser($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token,
      user {
        id
        username
        email
      }
    }
  }
`;

// Define the GraphQL mutation for signing in
export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;



export const SUBSCRIBE_PREMIUM = gql`
  mutation SubscribePremium($planId: String!, $paymentToken: String!) {
    subscribePremium(planId: $planId, paymentToken: $paymentToken) {
      status
      message
    }
  }
`;
