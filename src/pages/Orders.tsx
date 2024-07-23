import React, { useState } from 'react';
import axios from 'axios';

interface Order {
  order_number: string;
  billing_first_name: string;
  billing_last_name: string;
}

const Order: React.FC = () => {
  const [order, setOrder] = useState<Order>({
    order_number: '',
    billing_first_name: '',
    billing_last_name: ''
  });

  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);
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
    const token = ''; 

    const mutation = `
      mutation CreateOrder($order: OrderInput!) {
        createOrder(order: $order) {
          order_number
          billing_first_name
          billing_last_name
        }
      }
    `;

    const variables = {
      order: {
        order_number: order.order_number,
        billing_first_name: order.billing_first_name,
        billing_last_name: order.billing_last_name
      }
    };

    try {
      const response = await axios.post(
        endpoint,
        { query: mutation, variables },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log('Order submitted:', response.data);
      setOrderPlaced(true);
    } catch (error) {
      console.error('Error submitting order:', error);
      setError('Failed to place order. Please try again.');
    }
  };

  return (
    <div>
      {!orderPlaced ? (
        <form onSubmit={handleOrderSubmit}>
          <h2>Faça seu pedido</h2>
          <label>
            Número do Pedido:
            <input type="text" name="order_number" value={order.order_number} onChange={handleOrderChange} required />
          </label>
          <br />
          <label>
            Nome do Cliente:
            <input type="text" name="billing_first_name" value={order.billing_first_name} onChange={handleOrderChange} required />
          </label>
          <br />
          <label>
            Sobrenome do Cliente:
            <input type="text" name="billing_last_name" value={order.billing_last_name} onChange={handleOrderChange} required />
          </label>
          <br />
          <button type="submit">Enviar Pedido</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      ) : (
        <div>
          <h2>Pedido enviado com sucesso!</h2>
          <p>Número do Pedido: {order.order_number}</p>
          <p>Nome do Cliente: {order.billing_first_name}</p>
          <p>Sobrenome do Cliente: {order.billing_last_name}</p>
        </div>
      )}
    </div>
  );
};

export default Order;
