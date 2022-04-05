import gql from 'graphql-tag';

export default gql`
  query getLoan {
    getLoan {
      status
      statusDescription
      totalInstallments
      amount
      ownerName
      id
      requirementType
      rateAmount
      ratePercentage
      observation
      documents {
        url
        id
        description
      }
    }
  }
`;
