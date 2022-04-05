import gql from 'graphql-tag';

const GET_LOANS = gql`
    query getLoans {
        getLoans {
            id
            totalInstallments
            status
            amount
            ownerName
            statusDescription
        }
    }
`;

export default GET_LOANS;
