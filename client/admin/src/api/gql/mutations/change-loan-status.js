import gql from 'graphql-tag';

const CHANGE_LOAN_STATUS = gql`
    mutation changeLoanStatus($loanId: String!, $status: LoanStatus!) {
        changeLoanStatus(loanId: $loanId, status: $status)
    }
`;

export default CHANGE_LOAN_STATUS;
