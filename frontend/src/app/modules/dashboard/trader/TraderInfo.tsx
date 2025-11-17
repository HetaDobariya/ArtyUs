'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Image1 from '../../../../../public/image/HomeImages/trader.png';
import EditTraderDetails from './EditTraderDetails';
import TraderDashboard from './TraderDashboard';
import Sidebar from '@/components/Sidebar';

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
  const [loading, setLoading] = useState(true);
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

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-700">Loading trader details...</p>
      </div>
    );

  if (error || !traderData)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600">{error || 'Trader data not available.'}</p>
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
            <table className="min-w-full text-left border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 border-b">Order ID</th>
                  <th className="py-3 px-4 border-b">Date</th>
                  <th className="py-3 px-4 border-b">Product</th>
                  <th className="py-3 px-4 border-b">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-4 border-b">#ORD-101</td>
                  <td className="py-3 px-4 border-b">2025-11-03</td>
                  <td className="py-3 px-4 border-b">Bluetooth Speaker</td>
                  <td className="py-3 px-4 border-b text-green-600 font-semibold">Delivered</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 border-b">#ORD-098</td>
                  <td className="py-3 px-4 border-b">2025-11-01</td>
                  <td className="py-3 px-4 border-b">Wireless Mouse</td>
                  <td className="py-3 px-4 border-b text-yellow-600 font-semibold">Pending</td>
                </tr>
              </tbody>
            </table>
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
