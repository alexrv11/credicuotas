import gql from 'graphql-tag';

export default gql`
  query getLoan {
    getLoan {
      status
      totalInstallments
      amount
      ownerName
      id
      incomeType
      rateAmount
      ratePercentage
      documents {
        url
        id
        description
      }
    }
  }
`;
