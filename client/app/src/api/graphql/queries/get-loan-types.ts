import gql from 'graphql-tag';

export default gql`
  query getLoanTypes {
    getLoanTypes {
      name
      id
      rate
      minAmount
      maxAmount
    }
}
`;
