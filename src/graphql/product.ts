import { gql } from '@apollo/client';

export const GET_PRODUCT_TYPES = gql`
query getProductTypes{
  getProductTypes{
    data {
      key
      title
    }
  }
}
`;

// 查询
export const GET_PRODUCTS = gql`
query getProductsForH5($page: PageInput!, $latitude: Float!, $longitude: Float!, $name: String, $type: String) {
  getProductsForH5(page: $page, latitude: $latitude, longitude: $longitude, name: $name,  type: $type){
    code
    message
    data {
      id
      name
      desc
      stock
      limitBuyNumber
      coverUrl
      bannerUrl
      originalPrice
      status
      type
      preferentialPrice
      distance
      org {
        id
        name
      }
    }
    page {
      pageNum
      pageSize
      total
    }
  }
}
`;

// 查询通过门店id
export const GET_PRODUCTS_BY_ORG_ID = gql`
  query getProductsByOrgIdForH5($orgId: String!) {
    getProductsByOrgIdForH5(orgId: $orgId){
      code
      message
      data {
        id
        name
        coverUrl
        desc
        originalPrice
        preferentialPrice
        buyNumber
      }
    }
  }
`;

// 获取商品详情
// 详情
export const GET_PRODUCT = gql`
  query getProductInfo($id: String!) {
    getProductInfo(id: $id){
      code
      message
      data {
        id
        limitBuyNumber
        name
        type
        coverUrl
        bannerUrl
        desc
        status
        originalPrice
        stock
        curStock
        buyNumber
        preferentialPrice
        org {
          logo
          name
          tel
          id
        }
        cards {
          id
          name
          type
          time
          validityDay
          course {
            id
            name
            desc
            group
            baseAbility
            limitNumber
            duration
            reserveInfo
            refundInfo
            otherInfo
          }
        }
      }
    }
  }
`;

// 更新商品库存
export const COMMIT_PRODUCT_INFO = gql`
  mutation commitProductInfoForH5($params: PartialProductInput!,$id:String) {
    commitProductInfoForH5(params:$params,id:$id){
      code,
      message
    }
}
`;
