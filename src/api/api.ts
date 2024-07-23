import client from './axiosClient.ts';
import { GET_ORDER } from './queries';

interface Variables {
  [key: string]: any;
}

const executeQuery = async (query: string, variables: Variables) => {
  try {
    const response = await client.post('', {
      query,
      variables,
    });
    return response.data;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

export const getOrder = async (orderNumber: string) => {
  const variables = { orderNumber };
  const data = await executeQuery(GET_ORDER, variables);
  return data.data.getQuantumGlassOrders;
};
