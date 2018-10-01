import gql from 'graphql-tag';
export const ADD_ORGANISER = gql`
  mutation addOrganiser($input: OrganiserInput!) {
    addOrganiser(input: $input) {
      organiserName
    }
  }
`;
