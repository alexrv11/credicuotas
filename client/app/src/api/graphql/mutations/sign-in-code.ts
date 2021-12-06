import gql from 'graphql-tag';

export default gql`
  mutation signInWithCode($email: String!, $code: String!) {
    signInWithCode(email: $email, code: $code) {
      accessToken
    }
  }
`;
