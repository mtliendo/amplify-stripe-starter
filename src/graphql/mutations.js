/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const deleteOrder = /* GraphQL */ `
  mutation DeleteOrder(
    $input: DeleteOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    deleteOrder(input: $input, condition: $condition) {
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
export const createOrder = /* GraphQL */ `
  mutation CreateOrder(
    $input: CreateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    createOrder(input: $input, condition: $condition) {
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
export const updateOrder = /* GraphQL */ `
  mutation UpdateOrder(
    $input: UpdateOrderInput!
    $condition: ModelOrderConditionInput
  ) {
    updateOrder(input: $input, condition: $condition) {
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
