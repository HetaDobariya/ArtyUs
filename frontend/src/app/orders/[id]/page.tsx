'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import Link from 'next/link';

interface OrderItem {
  id: number;
  product_id: number;
  product_name: string;
  image_url?: string;
  category: string;
  quantity: number;
  price: number;
  total_amount: number;
  trader_name?: string;
  description?: string;
}

interface Order {
  order_id: number;
  order_group_id?: string;
  items: OrderItem[];
  total_amount: number;
  status: string;
  created_at?: string;
  contact: string;
  address: string;
}

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState<string>('');
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    params.then((p) => setOrderId(p.id));
  }, [params]);

  useEffect(() => {
    if (!user) {
      router.push('/modules/auth/SignIn');
      return;
    }
    if (orderId) {
      fetchOrder();
    }
  }, [orderId, user, router]);

  const fetchOrder = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/orders/${orderId}`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          // Handle both old format (single item) and new format (grouped items)
          if (data.data.items && Array.isArray(data.data.items)) {
            // New grouped format
            setOrder({
              order_id: data.data.order_id,
              order_group_id: data.data.order_group_id,
              items: data.data.items.map((item: any) => ({
                id: item.id,
                product_id: item.product_id,
                product_name: item.product_name,
                image_url: item.image_url,
                category: item.category || 'Uncategorized',
                quantity: item.qty,
                price: parseFloat(item.price),
                total_amount: parseFloat(item.total_amount),
                trader_name: item.trader_name,
                description: item.description
              })),
              total_amount: parseFloat(data.data.total_amount),
              status: (data.data.status || 'pending').toLowerCase(),
              contact: data.data.contact,
              address: data.data.address,
            });
          } else {
            // Old single item format (fallback)
            setOrder({
              order_id: data.data.id,
              items: [{
                id: data.data.id,
                product_id: data.data.product_id,
                product_name: data.data.product_name,
                image_url: data.data.image_url,
                category: data.data.category || 'Uncategorized',
                quantity: data.data.qty,
                price: parseFloat(data.data.price),
                total_amount: parseFloat(data.data.total_amount),
                trader_name: data.data.trader_name,
                description: data.data.description
              }],
              total_amount: parseFloat(data.data.total_amount),
              status: (data.data.status || 'pending').toLowerCase(),
              contact: data.data.contact,
              address: data.data.address?.replace(/\|GROUP:\d+/, '') || data.data.address,
            });
          }
        }
      }
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-400 text-yellow-900';
      case 'processing':
        return 'bg-blue-400 text-blue-900';
      case 'shipped':
        return 'bg-purple-400 text-purple-900';
      case 'delivered':
        return 'bg-green-400 text-green-900';
      case 'cancelled':
        return 'bg-red-400 text-red-900';
      default:
        return 'bg-gray-400 text-gray-900';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
          <Link href="/profile/user" className="text-blue-600 hover:underline">
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 pt-24">
        <div className="mb-6">
          <Link href="/profile/user" className="text-blue-600 hover:underline">
            ← Back to Orders
          </Link>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order #{order.order_id}</h1>
              {order.created_at && (
                <p className="text-gray-600 mt-1">
                  Placed on {new Date(order.created_at).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              )}
            </div>
            <span
              className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}
            >
              {order.status.toUpperCase()}
            </span>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Details</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Product</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Category</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Quantity</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Price</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={item.id || index} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-sm text-gray-900">{item.product_name}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{item.category}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">{item.quantity}</td>
                      <td className="py-3 px-4 text-sm text-gray-700">₹{item.price.toFixed(2)}</td>
                      <td className="py-3 px-4 text-sm font-semibold text-gray-900">₹{item.total_amount.toFixed(2)}</td>
                    </tr>
                  ))}
                  {order.items.length > 1 && (
                    <tr className="border-t-2 border-gray-300">
                      <td colSpan={4} className="py-3 px-4 text-right text-lg font-bold text-gray-900">
                        Order Total:
                      </td>
                      <td className="py-3 px-4 text-lg font-bold text-gray-900">
                        ₹{order.total_amount.toFixed(2)}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h2>
            <div className="space-y-2">
              <div>
                <span className="text-gray-600">Contact:</span>
                <span className="ml-2 font-semibold">{order.contact}</span>
              </div>
              <div>
                <span className="text-gray-600">Address:</span>
                <p className="mt-1 font-semibold">{order.address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Order Status</h3>
          <div className="space-y-2 text-sm text-blue-800">
            {order.status === 'pending' && (
              <p>Your order is pending and will be processed soon.</p>
            )}
            {order.status === 'processing' && (
              <p>Your order is being processed and prepared for shipment.</p>
            )}
            {order.status === 'shipped' && (
              <p>Your order has been shipped and is on its way to you.</p>
            )}
            {order.status === 'delivered' && (
              <p>Your order has been delivered. Thank you for shopping with us!</p>
            )}
            {order.status === 'cancelled' && (
              <p>This order has been cancelled.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

