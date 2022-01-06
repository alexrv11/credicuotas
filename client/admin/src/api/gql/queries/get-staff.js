import gql from 'graphql-tag';

const GET_STAFF = gql`
    query getStaff {
        getStaff {
            id
            name
            email
            role
        }
    }
`;

export default GET_STAFF;
