import gql from 'graphql-tag';

const GET_LOAN = gql`
    query getLoan($id: String!) {
        getLoanById(id: $id) {
            status
            totalInstallments
            amount
            ownerName
            id
            incomeType
            rateAmount
            ratePercentage
            documents {
                url
                id
                description
                status
                statusDescription
            }
        }
    }
`;

export default GET_LOAN;