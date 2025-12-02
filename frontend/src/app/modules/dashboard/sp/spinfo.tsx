'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Image1 from '../../../../../public/image/HomeImages/trader.png';
import EditSPDetails from './EditSPDetails';
import Sidebar from '@/components/Sidebar';
import ServiceProviderDashboard from './spdashboard';

interface SPData {
  id: string;
  name: string;
  email: string;
  address: string;
  contact: string;
  role: string;
  serviceProvider: {
    sp_id: number;
    company_name: string;
    shop_address: string;
    contact_number: string;
    description: string;
  } | null;
}

const SPInfo = () => {
  const [spData, setSPData] = useState<SPData | null>(null);
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
    setSPData((prev) =>
      prev && prev.serviceProvider
        ? {
            ...prev,
            serviceProvider: {
              ...prev.serviceProvider,
              company_name: updatedValues.companyName,
              contact_number: updatedValues.shopContactNumber,
              shop_address: updatedValues.shopAddress,
              description: updatedValues.description,
            },
          }
        : prev
    );
    setIsModalOpen(false);
  };

  // Fetch SP data
  useEffect(() => {
    const fetchSPData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/user/current-user`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        if (!response.ok) {
          setError(data.message || 'Failed to load service provider data.');
          return;
        }
        // Check if user is null (not authenticated)
        if (!data.user && data.message) {
          setError(data.message);
          return;
        }
        setSPData(data.user);
      } catch (err) {
        console.error('Error fetching SP data:', err);
        setError('Network error: Could not connect to the API.');
      } finally {
        setLoading(false);
      }
    };

    if (process.env.NEXT_PUBLIC_BACKEND) fetchSPData();
    else {
      // fallback mock data
      setSPData({
        id: 'sp123',
        name: 'FixIt Services',
        email: 'fixit@gmail.com',
        address: 'Mumbai',
        contact: '9998887777',
        role: 'service_provider',
        serviceProvider: {
          sp_id: 1,
          company_name: 'FixIt Solutions Pvt. Ltd.',
          shop_address: 'Andheri East, Mumbai',
          contact_number: '9998887777',
          description: 'We provide expert repair and maintenance services.',
        },
      });
      setLoading(false);
    }
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-700">Loading service provider details...</p>
      </div>
    );

  if (error || !spData)
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-4">
        <p className="text-red-600 text-lg font-semibold">{error || 'Service Provider data not available.'}</p>
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

  const spDetails = spData.serviceProvider;

  return (
    <div className="flex min-h-screen bg-white my-10 mx-20 gap-12">
      {/* Sidebar */}
      <Sidebar
        selectedTab={selectedTab}
        onTabSelect={setSelectedTab}
        userRole={spData.role}
      />

      {/* Main Content */}
      <div className="flex-1 transition-all duration-300">
        {selectedTab === 'profile' ? (
          <div className="flex flex-row gap-12 items-start">
            {/* Account Details */}
            <div className="flex-1 bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-2 border-gray-300">
                Service Provider Account Details
              </h3>

              <div className="flex flex-col gap-5">
                <div>
                  <h4 className="text-base text-gray-700">
                    Company Name: {spDetails?.company_name}
                  </h4>
                  <div className="h-0.5 w-full bg-gray-300 mt-1"></div>
                </div>

                <div>
                  <h4 className="text-base text-gray-700">
                    Contact No: {spDetails?.contact_number}
                  </h4>
                  <div className="h-0.5 w-full bg-gray-300 mt-1"></div>
                </div>

                <div>
                  <h4 className="text-base text-gray-700">
                    Address: {spDetails?.shop_address}
                  </h4>
                  <div className="h-0.5 w-full bg-gray-300 mt-1"></div>
                </div>

                <div>
                  <h4 className="text-base text-gray-700">
                    Description: {spDetails?.description}
                  </h4>
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
              <Image src={Image1} alt="Service Provider Illustration" className="object-contain w-[90%] h-auto" />
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <ServiceProviderDashboard />
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isModalOpen && spDetails && (
        <div className="fixed inset-0 backdrop-blur-lg bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <EditSPDetails
              companyId={String(spDetails.sp_id)}
              initialData={{
                companyName: spDetails.company_name,
                shopContactNumber: spDetails.contact_number,
                shopAddress: spDetails.shop_address,
                description: spDetails.description,
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

export default SPInfo;
