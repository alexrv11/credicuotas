import gql from 'graphql-tag';

const GET_STAFF_ID = gql`
    query getStaffById($id: String!) {
        getStaffById(id: $id) {
            id
            name
            email
            role
        }
    }
`;

export default GET_STAFF_ID;
