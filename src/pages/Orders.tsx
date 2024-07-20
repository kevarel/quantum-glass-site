import React, { useState } from 'react';


type OrderDetails = {
    order_number: string;
    billing_zip: string;
    balance: number;
    deposit: number;
    total: number;
    items: (string | number)[];
};

const Orders: React.FC = () => {
    const [orderNumber, setOrderNumber] = useState('');
    const [billingFirstName, setBillingFirstName] = useState('');
    const [billingLastName, setBillingLastName] = useState('');
    const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
    const [error, setError] = useState('');

    const url = import.meta.env.QUANTUM_GLASS_BOOKS;
    const authToken = import.meta.env.QUANTUM_GLASS_BOOKS_AUTH_TOKEN;
    
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');

        const query = `
            query getQuantumGlassOrders($orderNumber: String!) {
                getQuantumGlassOrders(order_number: $orderNumber) {
                    order_number
                    billing_zip
                    balance
                    deposit
                    total
                    items
                }
            }
        `;

        const variables = {
            orderNumber: orderNumber
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authToken,
                    // 'x-api-key': apiKey,
                },
                body: JSON.stringify({ query, variables }),
            });

            const result = await response.json();
            console.log(result.data.getQuantumGlassOrders);

            if (result.errors) {
                setError(result.errors[0].message);
            } else {
                setOrderDetails(result.data.getQuantumGlassOrders);
            }
        } catch (err) {
            setError('An error occurred while fetching the order details.');
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Orders Page</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="orderNumber">Order Number:</label>
                    <input
                        type="text"
                        id="orderNumber"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="billingFirstName">Billing First Name:</label>
                    <input
                        type="text"
                        id="billingFirstName"
                        value={billingFirstName}
                        onChange={(e) => setBillingFirstName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="billingLastName">Billing Last Name:</label>
                    <input
                        type="text"
                        id="billingLastName"
                        value={billingLastName}
                        onChange={(e) => setBillingLastName(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {orderDetails && (
                <div>
                    <h3>Order Details:</h3>
                    <p>Order Number: {orderDetails.order_number}</p>
                    <p>Billing Zip: {orderDetails.billing_zip}</p>
                    <p>Balance: {orderDetails.balance}</p>
                    <p>Deposit: {orderDetails.deposit}</p>
                    <p>Total: {orderDetails.total}</p>
                    <div>
                        <h4>Items:</h4>
                        <ul>
                            {orderDetails.items.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;
