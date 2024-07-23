export const GET_ORDER = `
  query GetQuantumGlassOrders($orderNumber: String!) {
    getQuantumGlassOrders(order_number: $orderNumber) {
      balance
      order_number
    }
  }
`;