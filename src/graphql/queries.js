/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getOrder = /* GraphQL */ `
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      id
      owner
      customerDetails {
        name
        streetName
        city
        state
        zipCode
      }
      productPriceID
      orderStatus
      driverLocation {
        lng
        lat
      }
      createdAt
      updatedAt
    }
  }
`;
export const listOrders = /* GraphQL */ `
  query ListOrders(
    $filter: ModelOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrders(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        customerDetails {
          name
          streetName
          city
          state
          zipCode
        }
        productPriceID
        orderStatus
        driverLocation {
          lng
          lat
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
