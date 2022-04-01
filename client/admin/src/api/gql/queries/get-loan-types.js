import gql from 'graphql-tag';

const GET_LOAN_TYPES = gql`
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

export default GET_LOAN_TYPES;
