import gql from 'graphql-tag';

export default gql`
  mutation saveLoan(
    $amount: Int!
    $totalInstallments: Int!
    $incomeType: IncomeType!
    $requirementType: String!
  ) {
    saveLoan(
      amount: $amount
      totalInstallments: $totalInstallments
      incomeType: $incomeType
      requirementType: $requirementType
    )
  }
`;
