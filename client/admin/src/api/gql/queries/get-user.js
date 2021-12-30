import gql from 'graphql-tag';

const GET_USER = gql`
    query getUser {
        getUser {
            name
            role
        }
    }
`;

export default GET_USER;
