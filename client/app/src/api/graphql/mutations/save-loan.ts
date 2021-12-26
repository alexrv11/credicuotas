import gql from 'graphql-tag';

export default gql`
  mutation saveLoan(
    $amount: Int!
    $totalInstallments: Int!
    $incomeType: IncomeType!
  ) {
    saveLoan(
      amount: $amount
      totalInstallments: $totalInstallments
      incomeType: $incomeType
    )
  }
`;
