/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onOrderUpdateByID = /* GraphQL */ `
  subscription OnOrderUpdateByID($orderID: ID!) {
    onOrderUpdateByID(orderID: $orderID) {
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
export const onCreateOrder = /* GraphQL */ `
  subscription OnCreateOrder($owner: String) {
    onCreateOrder(owner: $owner) {
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
export const onUpdateOrder = /* GraphQL */ `
  subscription OnUpdateOrder($owner: String) {
    onUpdateOrder(owner: $owner) {
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
export const onDeleteOrder = /* GraphQL */ `
  subscription OnDeleteOrder($owner: String) {
    onDeleteOrder(owner: $owner) {
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
