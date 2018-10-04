import gql from "graphql-tag";

export const ADD_VENDOR = gql`
  mutation addVendor($input: VendorInput) {
    addVendor(input: $input) {
      vendorName
      vendorID
      ownerName
      ownerNumber
    }
  }
`;
