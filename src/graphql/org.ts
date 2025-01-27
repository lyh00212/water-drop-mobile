import { gql } from '@apollo/client';

// 详情
export const GET_ORG = gql`
  query getOrganizationInfo(
    $id: String!
    ) {
      getOrganizationInfo(id: $id) {
        data {
          description
          name
          tags
          id
          orgFrontImg {
            id
            url
          }
          orgRoomImg {
            id
            url
          }
          orgOtherImg {
            id
            url
          }
          logo
          address
          tel
          longitude
          latitude
          identityCardBackImg
          identityCardFrontImg
          businessLicense
        }
        code
        message
    }
  }
`;
