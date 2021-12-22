import gql from 'graphql-tag';

export default gql`
  mutation saveUser($name: String!, $identifierNumber: String!) {
    saveUserInfo(name: $name, identifier: $identifierNumber)
  }
`;
