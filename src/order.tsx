import React from 'react';
import ReactDOM from 'react-dom/client';
import Order from './pages/Orders.tsx';

ReactDOM.createRoot(document.getElementById('order-root') as HTMLElement).render(
  <React.StrictMode>
    <Order />
  </React.StrictMode>
);