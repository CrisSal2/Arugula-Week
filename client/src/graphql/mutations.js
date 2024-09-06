import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation SignupUser($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
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
