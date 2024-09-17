import { gql } from '@apollo/client';


export const GET_WEEKS = gql`
  query GetWeeks {
    weeks {
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
