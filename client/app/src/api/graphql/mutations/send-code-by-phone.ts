import gql from 'graphql-tag';

export default gql`
  mutation sendPhoneCode($phone: String!) {
    sendCodeByPhone(phone:$phone)
  }
`;
