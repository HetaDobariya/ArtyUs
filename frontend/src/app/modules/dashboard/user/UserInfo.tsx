'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image1 from '../../../../../public/image/HomeImages/user.png';
import EditUserDetailsForm from './EditUserDetailsForm';
import Sidebar from '@/components/Sidebar'; // ✅ Reusable sidebar

interface UserData {
  id: string;
  name: string;
  email: string;
  address: string;
  contact: string;
}

interface OrderItem {
  order_id: number;
  product_name: string;
  category: string;
  quantity: number;
  price: number;
  total: number;
}

interface Order {
  order_id: number;
  order_group_id?: string;
  contact: string;
  address: string;
  status: string;
  items: OrderItem[];
  total: number;
  item_count: number;
  created_at?: string;
}

const UserInfo = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'profile' | 'orders' | 'dashboard'>('profile');

  const handleEditClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleUpdateSuccess = (updatedValues: { contactNumber: string; address: string }) => {
    setUserData((prev) =>
      prev
        ? { ...prev, contact: updatedValues.contactNumber, address: updatedValues.address }
        : prev
    );
    setIsModalOpen(false);
  };

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/user/current-user`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        if (!response.ok) {
          setError(data.message || 'Failed to load user data.');
          return;
        }
        // Check if user is null (not authenticated)
        if (!data.user && data.message) {
          setError(data.message);
          return;
        }
        setUserData(data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Network error: Could not connect to the API.');
      } finally {
        setLoading(false);
      }
    };

    if (process.env.NEXT_PUBLIC_BACKEND) fetchUserData();
    else {
      // Fallback mock data
      setUserData({
        id: 'u123',
        name: 'Vani',
        email: 'vani@gmail.com',
        address: 'Ahmedabad',
        contact: '1234523456',
      });
      setLoading(false);
    }
  }, []);

  // Fetch orders when orders tab is selected
  useEffect(() => {
    const fetchOrders = async () => {
      if (selectedTab !== 'orders' || !userData) return;
      
      setOrdersLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/orders/my-orders`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && Array.isArray(data.data)) {
            setOrders(data.data);
          } else {
            setOrders([]);
          }
        } else {
          setOrders([]);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]);
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchOrders();
  }, [selectedTab, userData]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-700">Loading user details...</p>
      </div>
    );

  if (error || !userData)
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <p className="text-red-600 text-lg font-semibold">{error || 'User data not available.'}</p>
        {error && error.includes('login') && (
          <a
            href="/modules/auth/SignIn"
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
          >
            Go to Login Page
          </a>
        )}
      </div>
    );

  return (
    <div className="flex min-h-screen bg-white my-10 mx-20 gap-12">
      {/* ✅ Reusable Sidebar */}
      <Sidebar
        selectedTab={selectedTab}
        onTabSelect={(tab) => setSelectedTab(tab)}
        userRole="user"
      />

      {/* 🔹 Right Section */}
      <div className="flex-1 transition-all duration-300">
        {selectedTab === 'profile' ? (
          <div className="flex flex-row gap-12 items-start">
            {/* Account Details */}
            <div className="flex-1 bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-2 border-gray-300">
                Account Details
              </h3>

              <div className="flex flex-col gap-5">
                <div>
                  <h4 className="text-base text-gray-700">Name: {userData.name}</h4>
                  <div className="h-0.5 w-full bg-gray-300 mt-1"></div>
                </div>

                <div>
                  <h4 className="text-base text-gray-700">Email: {userData.email}</h4>
                  <div className="h-0.5 w-full bg-gray-300 mt-1"></div>
                </div>

                <div>
                  <h4 className="text-base text-gray-700">Address: {userData.address}</h4>
                  <div className="h-0.5 w-full bg-gray-300 mt-1"></div>
                </div>

                <div>
                  <h4 className="text-base text-gray-700">Contact No: {userData.contact}</h4>
                  <div className="h-0.5 w-full bg-gray-300 mt-1"></div>
                </div>

                <div className="mt-8">
                  <button
                    onClick={handleEditClick}
                    className="px-6 py-3 text-sm rounded-xl font-semibold tracking-wider uppercase bg-black text-white border-2 border-black hover:bg-white hover:text-black transition duration-150"
                  >
                    EDIT DETAILS
                  </button>
                </div>
              </div>
            </div>

            {/* Profile Image */}
            <div className="w-[50%] flex justify-center items-center">
              <Image
                src={Image1}
                alt="Profile Illustration"
                className="object-contain w-[90%] h-auto"
              />
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-2 border-gray-300">
              My Orders
            </h3>

            {ordersLoading ? (
              <div className="text-center py-10">
                <p className="text-gray-600">Loading orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-600">No orders found.</p>
              </div>
            ) : (
              <div className="space-y-8">
                {orders.map((order) => (
                  <div key={order.order_id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex justify-between items-center mb-4">
                      <Link href={`/orders/${order.order_id}`}>
                        <h4 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                          Order #{order.order_id}
                        </h4>
                      </Link>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === 'pending'
                            ? 'bg-yellow-400 text-yellow-900'
                            : order.status === 'delivered'
                            ? 'bg-green-400 text-green-900'
                            : order.status === 'cancelled'
                            ? 'bg-red-400 text-red-900'
                            : 'bg-blue-400 text-blue-900'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <table className="min-w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="py-3 px-4 text-sm font-semibold text-gray-700">Product</th>
                          <th className="py-3 px-4 text-sm font-semibold text-gray-700">Category</th>
                          <th className="py-3 px-4 text-sm font-semibold text-gray-700">Quantity</th>
                          <th className="py-3 px-4 text-sm font-semibold text-gray-700">Price</th>
                          <th className="py-3 px-4 text-sm font-semibold text-gray-700">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items && order.items.length > 0 ? (
                          order.items.map((item, index) => (
                            <tr key={item.order_id || index}>
                              <td className="py-3 px-4 text-sm text-gray-900">{item.product_name}</td>
                              <td className="py-3 px-4 text-sm text-gray-700">{item.category}</td>
                              <td className="py-3 px-4 text-sm text-gray-700">{item.quantity}</td>
                              <td className="py-3 px-4 text-sm text-gray-700">₹{item.price.toFixed(2)}</td>
                              <td className="py-3 px-4 text-sm font-semibold text-gray-900">₹{item.total.toFixed(2)}</td>
                            </tr>
                          ))
                        ) : (
                          // Fallback for old order format (single item)
                          <tr>
                            <td className="py-3 px-4 text-sm text-gray-900">{(order as any).product_name || 'N/A'}</td>
                            <td className="py-3 px-4 text-sm text-gray-700">{(order as any).category || 'N/A'}</td>
                            <td className="py-3 px-4 text-sm text-gray-700">{(order as any).quantity || 0}</td>
                            <td className="py-3 px-4 text-sm text-gray-700">₹{((order as any).price || 0).toFixed(2)}</td>
                            <td className="py-3 px-4 text-sm font-semibold text-gray-900">₹{order.total.toFixed(2)}</td>
                          </tr>
                        )}
                        {order.items && order.items.length > 1 && (
                          <tr className="border-t-2 border-gray-300">
                            <td colSpan={4} className="py-3 px-4 text-sm font-bold text-gray-900 text-right">
                              Order Total:
                            </td>
                            <td className="py-3 px-4 text-sm font-bold text-gray-900">
                              ₹{order.total.toFixed(2)}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ✅ Edit Modal */}
      {isModalOpen && userData && (
        <div className="fixed inset-0 backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <EditUserDetailsForm
              id={userData.id}
              initialValues={{
                contactNumber: userData.contact,
                address: userData.address,
              }}
              onUpdateSuccess={handleUpdateSuccess}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
