import React, { useState } from 'react';
import axios from 'axios';

interface Order {
  order_number: string;
  billing_first_name: string;
  billing_last_name: string;
}

interface OrderData {
  order_number: string;
  billing_zip: string;
  items: string[];
  balance: number;
  deposit: number;
  total: number;
}

const Order: React.FC = () => {
  const [order, setOrder] = useState<Order>({
    order_number: '',
    billing_first_name: '',
    billing_last_name: ''
  });

  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [orderFetched, setOrderFetched] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrder({
      ...order,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const endpoint = 'https://dtgqtjl3grcvdkepiyvxa4wc5q.appsync-api.us-east-2.amazonaws.com/graphql';
    const token = 'ACCESS-TOKEN'; 

    const query = `
      query GetQuantumGlassOrders($orderNumber: String!) {
        getQuantumGlassOrders(order_number: $orderNumber) {
          order_number
          billing_zip
          items
          balance
          deposit
          total
        }
      }
    `;

    const variables = {
      orderNumber: order.order_number,
    };

    try {
      const response = await axios.post(
        endpoint,
        { query, variables },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log('Order data fetched:', response.data);
      setOrderData(response.data.data.getQuantumGlassOrders);
      setOrderFetched(true);
    } catch (error) {
      console.error('Error fetching order data:', error);
      setError('Failed to fetch order data. Please try again.');
    }
  };

  return (
    <div>
      {!orderFetched ? (
        <form onSubmit={handleOrderSubmit}>
          <h2>Buscar Pedido</h2>
          <label>
            Número do Pedido:
            <input type="text" name="order_number" value={order.order_number} onChange={handleOrderChange} required />
          </label>
          <br />
          <button type="submit">Buscar Pedido</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      ) : (
        <div>
          <h2>Dados do Pedido</h2>
          {orderData ? (
            <div>
              <p>Número do Pedido: {orderData.order_number}</p>
              <p>CEP de Cobrança: {orderData.billing_zip}</p>
              <p>Itens: {orderData.items.join(', ')}</p>
              <p>Saldo: {orderData.balance}</p>
              <p>Depósito: {orderData.deposit}</p>
              <p>Total: {orderData.total}</p>
            </div>
          ) : (
            <p>Não foi possível encontrar os dados do pedido.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Order;
