import gql from 'graphql-tag';

const CREATE_LOAN_TYPE = gql`
    mutation createLoanType($name: String!, $rate: String!, $minAmount: Int!, $maxAmount: Int!) {
        createLoanType(name: $name, rate: $rate, minAmount: $minAmount, maxAmount: $maxAmount)
    }
`;

export default CREATE_LOAN_TYPE;
