import gql from 'graphql-tag';

const GET_CLIENTS = gql`
    query getClients {
        getClients {
            id
            name
            email
            phone
            identifierNumber
        }
    }
`;

export default GET_CLIENTS;
