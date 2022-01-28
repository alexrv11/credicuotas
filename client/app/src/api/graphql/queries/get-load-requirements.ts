import gql from 'graphql-tag';

const GET_LOAN_REQUIREMENTS = gql`
  query getRequirements($loanId: String!, $type: DocumentType!) {
    getLoanRequirements(loanId: $loanId, documentType: $type) {
      status
      title
      requirementType
      description
      documentStatus
    }
  }
`;

export default GET_LOAN_REQUIREMENTS;
