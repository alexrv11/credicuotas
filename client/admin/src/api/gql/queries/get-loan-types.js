import gql from 'graphql-tag';

const GET_LOAN_TYPES = gql`
    query getLoanTypes {
        getLoanTypes {
            name
            id
            rate
            minInstallment
            maxInstallment
        }
    }
`;

export default GET_LOAN_TYPES;
