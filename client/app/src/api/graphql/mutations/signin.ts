import gql from 'graphql-tag';

export default gql`
  mutation signInByEmail($email: String!) {
    signInByEmail(email: $email)
  }
`;
