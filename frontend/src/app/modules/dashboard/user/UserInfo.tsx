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
    contact: string
}

// This component is now just the "Account Details" content
export default function UserInfo() {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // --- Data Fetching and Modal Handlers ---
    // (All your existing functions like handleEditClick, handleCloseModal, 
    // handleUpdateSuccess, and the useEffect for fetching data go here)

    const handleEditClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleUpdateSuccess = (updatedValues: { contactNumber: string, address: string }) => {
        setUserData(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                contact: updatedValues.contactNumber,
                address: updatedValues.address,
            };
        });
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/user/current-user`, {
                    method: "GET",
                    credentials: 'include',
                    headers: { "Content-Type": "application/json" },
                });
                const data = await response.json();
                if (!response.ok) {
                    if (response.status === 401 || response.status === 403) {
                        setError("Session expired or unauthorized. Please log in.");
                    } else {
                        setError(data.message || "Failed to load user data.");
                    }
                    return;
                }
                setUserData(data.user);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("Network error: Could not connect to the API.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);
    // --- End of Data Fetching and Handlers ---

    if (loading) {
        return <div className="p-8"><p className="text-gray-700">Loading user details...</p></div>;
    }

    if (error || !userData) {
        return <div className="p-8"><p className="text-red-600">{error || 'User data not available.'}</p></div>;
    }

    // This return block now ONLY contains the content, not the sidebar or page layout
    return (
        <div className="flex flex-row gap-12 w-full">
            {/* 1. Account Details Section */}
            <div className="grow flex-initial max-w-lg">
                <h3 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-2 border-gray-300">
                    Account Details
                </h3>
                <div className="flex flex-col gap-5">
                    {/* Name Field */}
                    <div className="flex flex-col">
                        <h4 className="text-base text-gray-700">Name: {userData.name}</h4>
                        <div className="h-0.5 w-full bg-gray-300 mt-1"></div>
                    </div>
                    {/* Email Field */}
                    <div className="flex flex-col">
                        <h4 className="text-base text-gray-700">Email: {userData.email}</h4>
                        <div className="h-0.5 w-full bg-gray-300 mt-1"></div>
                    </div>
                    {/* Address Field */}
                    <div className="flex flex-col">
                        <h4 className="text-base text-gray-700">Address: {userData.address}</h4>
                        <div className="h-0.5 w-full bg-gray-300 mt-1"></div>
                    </div>
                    {/* Contact No Field */}
                    <div className="flex flex-col">
                        <h4 className="text-base text-gray-700">Contact No: {userData.contact}</h4>
                        <div className="h-0.5 w-full bg-gray-300 mt-1"></div>
                    </div>
                    {/* Edit Details Button */}
                    <div className="mt-8">
                        <button
                            onClick={handleEditClick}
                            className="px-6 py-3 text-sm font-semibold tracking-wider uppercase bg-black text-white border-2 border-black hover:bg-white hover:text-black transition duration-150"
                        >
                            EDIT DETAILS
                             </button>
                    </div>
                </div>
            </div>

            {/* 2. Image Section */}
            <div className="grow-0 flex items-center justify-center">
                <Image
                    src={Image1}
                    alt="Profile Security Illustration"
                    className="object-contain w-[400px] h-auto"
                    width={400}
                    height={400}
                    priority
                />
            </div>

            {/* 3. MODAL PLACEMENT */}
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