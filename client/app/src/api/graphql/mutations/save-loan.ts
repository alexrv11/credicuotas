import gql from 'graphql-tag';

export default gql`
  mutation saveLoan(
    $amount: Int!
    $totalInstallments: Int!
    $loanType: String!
    $requirementType: String!
  ) {
    saveLoan(
      amount: $amount
      totalInstallments: $totalInstallments
      loanType: $loanType
      requirementType: $requirementType
    )
  }
`;
