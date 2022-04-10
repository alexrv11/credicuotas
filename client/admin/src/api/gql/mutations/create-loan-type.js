import gql from 'graphql-tag';

const CREATE_LOAN_TYPE = gql`
    mutation createLoanType($name: String!, $rate: String!, $minInstallment: Int!, $maxInstallment: Int!) {
        createLoanType(name: $name, rate: $rate, minInstallment: $minInstallment, maxInstallment: $maxInstallment)
    }
`;

export default CREATE_LOAN_TYPE;
