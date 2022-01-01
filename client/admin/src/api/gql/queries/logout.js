import gql from 'graphql-tag';

const LOGOUT = gql`
    mutation logout {
        logout
    }
`;

export default LOGOUT;
