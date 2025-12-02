'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Image1 from '../../../../../public/image/HomeImages/trader.png';
import EditTraderDetails from './EditTraderDetails';
import TraderDashboard from './TraderDashboard';
import Sidebar from '@/components/Sidebar';

interface OrderItem {
  order_id: number;
  product_id: number;
  product_name: string;
  image_url: string;
  category: string;
  quantity: number;
  price: number;
  total: number;
}

interface TraderOrder {
  order_id: number;
  order_group_id: string;
  customer_name: string;
  customer_email: string;
  contact: string;
  address: string;
  created_at: string;
  items: OrderItem[];
  total_amount: number;
  item_count: number;
}

interface TraderData {
  id: string;
  name: string;
  email: string;
  address: string;
  contact: string;
  role: string;
  trader: {
    trader_id: number;
    business_name: string;
    shop_address: string;
    phone: string;
    description: string;
  } | null;
}

const TraderInfo = () => {
  const [traderData, setTraderData] = useState<TraderData | null>(null);
  const [orders, setOrders] = useState<TraderOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'profile' | 'orders' | 'dashboard'>('profile');

  const handleEditClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleUpdateSuccess = (updatedValues: {
    companyName: string;
    shopContactNumber: string;
    shopAddress: string;
    description: string;
  }) => {
    setTraderData((prev) =>
      prev && prev.trader
        ? {
            ...prev,
            trader: {
              ...prev.trader,
              business_name: updatedValues.companyName,
              phone: updatedValues.shopContactNumber,
              shop_address: updatedValues.shopAddress,
              description: updatedValues.description,
            },
          }
        : prev
    );
    setIsModalOpen(false);
  };

  // Fetch trader data
  useEffect(() => {
    const fetchTraderData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/user/current-user`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        if (!response.ok) {
          setError(data.message || 'Failed to load trader data.');
          return;
        }
        // Check if user is null (not authenticated)
        if (!data.user && data.message) {
          setError(data.message);
          return;
        }
        setTraderData(data.user);
      } catch (err) {
        console.error('Error fetching trader data:', err);
        setError('Network error: Could not connect to the API.');
      } finally {
        setLoading(false);
      }
    };

    if (process.env.NEXT_PUBLIC_BACKEND) fetchTraderData();
    else {
      // fallback mock data
      setTraderData({
        id: 't123',
        name: 'Aman Traders',
        email: 'amantrader@gmail.com',
        address: 'Ahmedabad',
        contact: '9876543210',
        role: 'trader',
        trader: {
          trader_id: 1,
          business_name: 'Aman Traders Pvt. Ltd.',
          shop_address: 'SG Highway, Ahmedabad',
          phone: '9876543210',
          description: 'We deal in premium electronics and gadgets.',
        },
      });
      setLoading(false);
    }
  }, []);

  // Fetch trader orders when orders tab is selected
  useEffect(() => {
    if (selectedTab === 'orders' && traderData?.trader?.trader_id) {
      fetchTraderOrders();
    }
  }, [selectedTab, traderData]);

  const fetchTraderOrders = async () => {
    setOrdersLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/trader/my-orders`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setOrders(data.data || []);
      } else {
        console.error('Failed to fetch orders:', data.error);
        setOrders([]);
      }
    } catch (err) {
      console.error('Error fetching trader orders:', err);
      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-700">Loading trader details...</p>
      </div>
    );

  if (error || !traderData)
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <p className="text-red-600 text-lg font-semibold">{error || 'Trader data not available.'}</p>
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

  const shopDetails = traderData.trader;

  return (
    <div className="flex min-h-screen bg-white my-10 mx-20 gap-12">
      {/* Sidebar */}
      <Sidebar
        selectedTab={selectedTab}
        onTabSelect={setSelectedTab}
        userRole={traderData.role}
      />

      {/* Main Content */}
      <div className="flex-1 transition-all duration-300">
        {selectedTab === 'profile' ? (
          <div className="flex flex-row gap-12 items-start">
            {/* Account Details */}
            <div className="flex-1 bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-2 border-gray-300">
                Trader Account Details
              </h3>

              <div className="flex flex-col gap-5">
                <div>
                  <h4 className="text-base text-gray-700">Shop Name: {shopDetails?.business_name}</h4>
                  <div className="h-0.5 w-full bg-gray-300 mt-1"></div>
                </div>

                <div>
                  <h4 className="text-base text-gray-700">Contact No: {shopDetails?.phone}</h4>
                  <div className="h-0.5 w-full bg-gray-300 mt-1"></div>
                </div>

                <div>
                  <h4 className="text-base text-gray-700">Address: {shopDetails?.shop_address}</h4>
                  <div className="h-0.5 w-full bg-gray-300 mt-1"></div>
                </div>

                <div>
                  <h4 className="text-base text-gray-700">Description: {shopDetails?.description}</h4>
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

            {/* Image */}
            <div className="w-[50%] flex justify-center items-center">
              <Image src={Image1} alt="Trader Illustration" className="object-contain w-[90%] h-auto" />
            </div>
          </div>
        ) : selectedTab === 'orders' ? (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-2 border-gray-300">
              My Orders
            </h3>
            
            {ordersLoading ? (
              <div className="flex justify-center items-center py-8">
                <p className="text-gray-600">Loading orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No orders found.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.order_id} className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                    {/* Order Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900">
                          Order #{order.order_id}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {formatDate(order.created_at)}
                        </p>
                      </div>
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        PLACED
                      </div>
                    </div>

                    {/* Customer Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Customer Information</h5>
                        <p className="text-sm text-gray-600"><strong>Name:</strong> {order.customer_name}</p>
                        <p className="text-sm text-gray-600"><strong>Email:</strong> {order.customer_email}</p>
                        <p className="text-sm text-gray-600"><strong>Contact:</strong> {order.contact}</p>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Delivery Address</h5>
                        <p className="text-sm text-gray-600">{order.address}</p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="border-t border-gray-200 pt-4">
                      <h5 className="font-medium text-gray-900 mb-3">Order Items ({order.item_count})</h5>
                      <div className="space-y-3">
                        {order.items.map((item) => (
                          <div key={item.order_id} className="flex items-center gap-4 py-3 border-b border-gray-100">
                            <Image
                              src={item.image_url || '/api/placeholder/60/60'}
                              alt={item.product_name}
                              width={60}
                              height={60}
                              className="object-cover rounded border border-gray-200"
                            />
                            <div className="flex-1">
                              <h6 className="font-medium text-gray-900">{item.product_name}</h6>
                              <p className="text-sm text-gray-600">Category: {item.category}</p>
                              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-gray-900">₹{item.price.toFixed(2)}</p>
                              <p className="text-sm text-gray-600">Total: ₹{item.total.toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Footer */}
                    <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">
                          Order Group ID: {order.order_group_id}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          Total Amount: ₹{order.total_amount.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <TraderDashboard />
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isModalOpen && shopDetails && (
        <div className="fixed inset-0 backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <EditTraderDetails
              companyId={String(shopDetails.trader_id)}
              initialData={{
                companyName: shopDetails.business_name,
                shopContactNumber: shopDetails.phone,
                shopAddress: shopDetails.shop_address,
                description: shopDetails.description,
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

export default TraderInfo;