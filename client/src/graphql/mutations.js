import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation SignupUser($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token,
      user {
        _id
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
        _id
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


export const ADD_WEEK = gql`
  mutation AddWeek($weekStart: String!, $weekEnd: String!, $meals: WeekInput!) {
    addWeek(weekStart: $weekStart, weekEnd: $weekEnd, meals: $meals) {
      _id
      weekStart
      weekEnd
      meals {
        Sunday {
          breakfast
          lunch
          dinner
        }
        Monday {
          breakfast
          lunch
          dinner
        }
        Tuesday {
          breakfast
          lunch
          dinner
        }
        Wednesday {
          breakfast
          lunch
          dinner
        }
        Thursday {
          breakfast
          lunch
          dinner
        }
        Friday {
          breakfast
          lunch
          dinner
        }
        Saturday {
          breakfast
          lunch
          dinner
        }
      }
    }
  }
`;

export const UPDATE_WEEK = gql`
  mutation UpdateWeek($id: ID!, $weekStart: String!, $weekEnd: String!, $meals: WeekInput!) {
    updateWeek(id: $id, weekStart: $weekStart, weekEnd: $weekEnd, meals: $meals) {
      _id
      weekStart
      weekEnd
      meals {
        Sunday {
          breakfast
          lunch
          dinner
        }
        Monday {
          breakfast
          lunch
          dinner
        }
        Tuesday {
          breakfast
          lunch
          dinner
        }
        Wednesday {
          breakfast
          lunch
          dinner
        }
        Thursday {
          breakfast
          lunch
          dinner
        }
        Friday {
          breakfast
          lunch
          dinner
        }
        Saturday {
          breakfast
          lunch
          dinner
        }
      }
    }
  }
`;

/* export const UPDATE_MEALS = gql`
  mutation UpdateMeals($weekId: ID!, $day: String!, $meals: MealInput!) {
    updateMeals(weekId: $weekId, day: $day, meals: $meals) {
      _id
      meals {
        [day]: {
          breakfast
          lunch
          dinner
        }
      }
    }
  }
`;


export const REMOVE_WEEK = gql`
  mutation RemoveWeek($weekId: ID!) {
    removeWeek(weekId: $weekId) {
      _id
    }
  }
`;
 */