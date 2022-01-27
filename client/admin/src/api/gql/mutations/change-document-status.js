import gql from 'graphql-tag';

const CHANGE_DOCUMENT_STATUS = gql`
    mutation changeDocumentStatus($documentId: String!, $note: String!, $status: DocumentStatus!) {
        changeDocumentStatus(documentId: $documentId, note: $note, status: $status)
    }
`;

export default CHANGE_DOCUMENT_STATUS;
