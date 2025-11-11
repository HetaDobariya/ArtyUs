'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Image1 from '../../../../../public/image/HomeImages/user.png';
import EditUserDetailsForm from './EditUserDetailsForm';
// We don't import OrderHistory here anymore

// --- Interface for the User Data ---
interface UserData {
  id: string;
  name: string;
  email: string;
  address: string;
  contact: string;
}

type Props = object;

const UserInfo = (props: Props) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sidebar active state
  const [selectedTab, setSelectedTab] = useState<'profile' | 'orders'>('profile');

  // Function to open and close edit modal
  const handleEditClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleUpdateSuccess = (updatedValues: { contactNumber: string; address: string }) => {
    setUserData((prev) =>
      prev
        ? {
            ...prev,
            contact: updatedValues.contactNumber,
            address: updatedValues.address,
          }
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
        name: 'vani',
        email: 'vani@gmail.com',
        address: 'ahm',
        contact: '1234523456',
      });
      setLoading(false);
    }
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-700">Loading user details...</p>
      </div>
    );

  if (error || !userData)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600">{error || 'User data not available.'}</p>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-white my-10 mx-20 gap-12">
  {/* 🔹 Sidebar (static box on the left) */}
  <div className="bg-gray-100 p-6 rounded-2xl shadow-md flex flex-col w-64 h-max">
    <h2 className="text-xl font-bold mb-6 text-gray-800 text-center">My Account</h2>

    <button
      onClick={() => setSelectedTab('profile')}
      className={`text-left px-4 py-3 rounded-lg font-medium mb-2 transition-colors duration-200 ${
        selectedTab === 'profile'
          ? 'bg-black text-white'
          : 'text-gray-700 hover:bg-gray-200'
      }`}
    >
      Profile
    </button>

    <button
      onClick={() => setSelectedTab('orders')}
      className={`text-left px-4 py-3 rounded-lg font-medium mb-2 transition-colors duration-200 ${
        selectedTab === 'orders'
          ? 'bg-black text-white'
          : 'text-gray-700 hover:bg-gray-200'
      }`}
    >
      Orders
    </button>
  </div>

  {/* 🔹 Right Section (dynamic content) */}
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

        {/* Profile image */}
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

        {/* Example Orders Table */}
        <table className="min-w-full text-left border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 border-b">Username</th>
              <th className="py-3 px-4 border-b">Date</th>
              <th className="py-3 px-4 border-b">Product Name</th>
              <th className="py-3 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3 px-4 border-b">user1</td>
              <td className="py-3 px-4 border-b">2025-11-04</td>
              <td className="py-3 px-4 border-b text-green-600 font-semibold">Delivered</td>
              <td className="py-3 px-4 border-b">₹1200</td>
            </tr>
            <tr>
              <td className="py-3 px-4 border-b">#ORD-002</td>
              <td className="py-3 px-4 border-b">2025-11-02</td>
              <td className="py-3 px-4 border-b text-yellow-600 font-semibold">Pending</td>
              <td className="py-3 px-4 border-b">₹850</td>
            </tr>
          </tbody>
        </table>
      </div>
    )}
  </div>



      {/* ================= Edit Modal ================= */}
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
