import gql from 'graphql-tag';

const GET_LOAN = gql`
    query getLoan($id: String!) {
        getLoanById(id: $id) {
            status
            statusDescription
            totalInstallments
            amount
            ownerName
            id
            incomeType
            rateAmount
            ratePercentage
            timeline {
                id
                label
                status
                description
                title
            }
            documents {
                url
                id
                description
                status
                statusDescription
                note
            }
        }
    }
`;

export default GET_LOAN;
