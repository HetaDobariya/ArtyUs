// src/components/profile/OrderHistory.jsx

import React from 'react';

// --- Dummy Order Data (Always Available) ---
const DUMMY_ORDERS = [
    {
        id: 'order-001',
        createdAt: '2025-10-20',
        status: 'Shipped',
        user: { name: 'John Doe' },
        product: { name: 'Wireless Mouse' },
    },
    {
        id: 'order-002',
        createdAt: '2025-10-25',
        status: 'Processing',
        user: { name: 'Jane Smith' },
        product: { name: 'Mechanical Keyboard' },
    },
    {
        id: 'order-003',
        createdAt: '2025-11-01',
        status: 'Delivered',
        user: { name: 'John Doe' },
        product: { name: '4K Monitor' },
    },
    {
        id: 'order-004',
        createdAt: '2025-11-05',
        status: 'Cancelled',
        user: { name: 'Jane Smith' },
        product: { name: 'USB-C Hub' },
    },
];

// --- OrderHistory Component (Pure UI with Dummy Data) ---

export default function OrderHistory() {
    const orders = DUMMY_ORDERS;

    // Helper function to render a status badge with inline styling
    const renderStatus = (status: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined) => {
        let color = '#6b7280'; // Default Gray

        switch (status) {
            case 'Shipped':
                color = '#3b82f6'; // Blue
                break;
            case 'Delivered':
                color = '#10b981'; // Green
                break;
            case 'Processing':
                color = '#f59e0b'; // Amber
                break;
            case 'Cancelled':
                color = '#ef4444'; // Red
                break;
        }

        return (
            <span
                style={{
                    color: 'white',
                    backgroundColor: color,
                    padding: '4px 10px',
                    borderRadius: '16px',
                    fontSize: '0.85em',
                    fontWeight: 'bold'
                }}
            >
                {status}
            </span>
        );
    };

    return (
        <div style={{ padding: '16px' }}>
            <div style={{
                maxWidth: '100%',
                overflowX: 'auto',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
                <div style={{
                    marginBottom: '20px',
                    textAlign: 'center',
                    fontSize: '28px',
                    fontWeight: 'bold',
                    color: '#1f2937',
                    paddingTop: '10px'
                }}>
                    Order History
                </div>

                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f9fafb' }}>
                            {['Username', 'Product Name', 'Created at', 'Status'].map((header) => (
                                <th
                                    key={header}
                                    style={{
                                        borderBottom: '1px solid #e5e7eb',
                                        padding: '14px 16px',
                                        textAlign: 'left',
                                        fontSize: '15px',
                                        fontWeight: '600',
                                        textTransform: 'uppercase',
                                        color: '#4b5563'
                                    }}
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order.id} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9fafb' }}>
                                <td style={{ padding: '12px 16px', fontSize: '14px', color: '#1f2937', borderBottom: '1px solid #e5e7eb' }}>
                                    {order.user?.name}
                                </td>
                                <td style={{ padding: '12px 16px', fontSize: '14px', color: '#1f2937', borderBottom: '1px solid #e5e7eb' }}>
                                    {order.product?.name}
                                </td>
                                <td style={{ padding: '12px 16px', fontSize: '14px', color: '#1f2937', borderBottom: '1px solid #e5e7eb' }}>
                                    {order.createdAt}
                                </td>
                                <td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>
                                    {renderStatus(order.status)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}