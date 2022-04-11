import gql from 'graphql-tag';

const DELETE_USER = gql`
    mutation deleteStaffById($id: String!) {
        deleteStaffById(id: $id)
    }
`;

export default DELETE_USER;
