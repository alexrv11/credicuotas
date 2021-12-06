import gql from 'graphql-tag';

export default gql`
  mutation sendCodeByEmail($email: String!) {
    sendCodeByEmail(email: $email)
  }
`;
