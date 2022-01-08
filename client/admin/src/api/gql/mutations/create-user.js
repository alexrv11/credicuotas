import gql from 'graphql-tag';

const CREATE_USER = gql`
    mutation createUser($email: String!, $password: String!, $name: String!, $role: Role!) {
        createUser(email: $email, password: $password, name: $name, role: $role)
    }
`;

export default CREATE_USER;
