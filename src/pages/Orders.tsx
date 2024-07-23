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
    const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InBsUl84M2RqRFhQNEtYR1RiMlFwaCJ9.eyJpc3MiOiJodHRwczovL2tldmFyZWwudXMuYXV0aDAuY29tLyIsInN1YiI6IjlvYUpjVjQxNzRQQ085N3U0TWozUUlOVTRoQXRkVjJlQGNsaWVudHMiLCJhdWQiOiJodHRwczovL2tldmFyZWwuY29tL2FwaS9xdWFudHVtLWdsYXNzLW9yZGVycyIsImlhdCI6MTcyMTc0Mjk5MiwiZXhwIjoxNzIxODI5MzkyLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJhenAiOiI5b2FKY1Y0MTc0UENPOTd1NE1qM1FJTlU0aEF0ZFYyZSIsInBlcm1pc3Npb25zIjpbXX0.hHgY29NZuRzmHy4hTyB_i0g25NXcIlGhOa8WjIwTi2yYkB0Fe3T98bFbfNMPMQlLeWu2wCNsjeThyYhsGnZ0Q_x2bxbU-VyWygZr2zC72txf1BPKS6CyZ2-vWVXk2lRBmpi7nD6-1G_8aUHUQRtUPsso2yDxicOne_rCDsUPM6q4Weseor9z5iybTimZ4X4fyCP20X_-sM2fEhDNTHFM0GtnzUEsMidefVmBR8KOLY2dwVSgjDnrGPfxA7JyZiq8z8VZV_Jwfkks73yTUnxf8NKr3AoeiUX7tk2oaTJ5jnlfETGlMSOqbrikxK3tGJKLKiM44c9OH6sKjKKwXJHr1Q'; 

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
