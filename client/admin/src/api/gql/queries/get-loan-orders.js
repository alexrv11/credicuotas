import gql from 'graphql-tag';

const GET_LOAN_ORDERS = gql`
    query getLoanOrders {
        getLoanOrders {
            id
            totalInstallments
            status
            amount
            ownerName
            statusDescription
        }
    }
`;

export default GET_LOAN_ORDERS;
