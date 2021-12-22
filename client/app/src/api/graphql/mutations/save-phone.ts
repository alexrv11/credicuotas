import gql from 'graphql-tag';

export default gql`
  mutation savePhone($phone: String!, $code: String!) {
    savePhoneNumber(phone: $phone, code: $code)
  }
`;
