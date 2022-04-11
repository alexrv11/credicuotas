import gql from 'graphql-tag';

const UPDATE_USER = gql`
    mutation updateUser($id: String!, $email: String!, $name: String!, $role: Role!) {
        updateUser(id: $id, email: $email, name: $name, role: $role)
    }
`;

export default UPDATE_USER;
