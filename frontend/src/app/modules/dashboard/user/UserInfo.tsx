'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Image1 from '../../../../../public/image/HomeImages/user.png';

// --- Interface for the User Data ---
interface UserData {
    id: string;
    name: string;
    email: string;
    address: string;
    contact: string
}

type Props = object;

const UserInfo = (props: Props) => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for the custom modal/dialog

    // Function to simulate opening the Edit Details form
    const handleEditClick = () => {
        setIsModalOpen(true);
        // In a real application, this would trigger your custom EditUserDetailsForm component/modal
        console.log("Edit Details clicked. Opening custom modal.");
    };

    // 2. Fetch data from the REST API endpoint
    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);

            try {
                // NOTE: Use the correct backend URL for fetching user data
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/user/current-user`, {
                    method: "GET",
                    // *** CRITICAL CHANGE: This tells the browser to include the auth cookie ***
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    // If the backend returns a 401/403 (unauthorized) because the cookie is missing/expired
                    if (response.status === 401 || response.status === 403) {
                        setError("Session expired or unauthorized. Please log in.");
                        // Optional: redirect to login page if unauthorized
                        // router.push('/modules/auth/SignIn'); 
                    } else {
                        setError(data.message || "Failed to load user data.");
                    }
                    return;
                }
                console.log(data)
                // Assuming the data structure returned by the API matches UserData
                setUserData(data.user);

            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("Network error: Could not connect to the API.");
            } finally {
                setLoading(false);
            }
        };

        // Only run if the NEXT_PUBLIC_BACKEND environment variable is set
        if (process.env.NEXT_PUBLIC_BACKEND) {
            fetchUserData();
        } else {
            // Fallback for demonstration if environment variable is not set
            setUserData({
                id: 'u123', name: 'vani', email: 'vani@gmail.com',address: 'ahm', contact: '1234523456' 
            });
            setLoading(false);
        }
    }, []); // Empty dependency array runs once on mount

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-700">Loading user details...</p>
            </div>
        );
    }

    if (error || !userData) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-600">{error || 'User data not available.'}</p>
            </div>
        );
    }

    // const primaryAddress = userData.addresses?.[0];

    // Component structure mimicking the provided image
    return (
        <div className="flex flex-row min-h-screen my-10 mx-24 gap-12 bg-white">
            {/* 1. Left Sidebar Navigation (Profile/Orders) */}
            <div className="flex flex-col w-48 border-r border-gray-200">
                <div className="py-2 px-4 bg-gray-100 border-b-2 border-black text-black font-semibold cursor-pointer">
                    Profile
                </div>
                <div className="py-2 px-4 text-gray-700 hover:bg-gray-50 cursor-pointer">
                    Orders
                </div>
            </div>

            {/* 2. Account Details Section */}
            <div className="grow flex-initial max-w-lg">
                {/* Account Details Title (Replaced Typography h3) */}
                <h3 className="text-3xl font-bold text-gray-800 mb-8 pb-2 border-b-2 border-gray-300">
                    Account Details
                </h3>

                <div className="flex flex-col gap-5">
                    {/* Name Field */}
                    <div className="flex flex-col">
                        <h4 className="text-base text-gray-700">Name:{userData?.name}</h4>
                        <div className="h-0.5 w-full bg-gray-300 mt-1"></div>
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col">
                        <h4 className="text-base text-gray-700">Email:{userData.email}</h4>
                        <div className="h-0.5 w-full bg-gray-300 mt-1"></div>
                    </div>

                    {/* Address Field */}
                    <div className="flex flex-col">
                        <h4 className="text-base text-gray-700">Address:{userData?.address}</h4>
                        <div className="h-0.5 w-full bg-gray-300 mt-1"></div>
                    </div>

                    {/* Contact No Field */}
                    <div className="flex flex-col">
                        <h4 className="text-base text-gray-700">Contact No:{userData?.contact}</h4>
                        <div className="h-0.5 w-full bg-gray-300 mt-1"></div>
                    </div>

                    {/* Edit Details Button (Replaced Button component) */}
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

            {/* 3. Image Section */}
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

            {/* Custom Modal Placeholder (If you want to handle the "dialog" without AlertDialog) */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h3 className="text-xl font-bold mb-4">Edit User Details Form</h3>
                        <p>This is where your EditUserDetailsForm component would be rendered.</p>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Close
                        </button>
                        {/* <EditUserDetailsForm id={primaryAddress?.id || 'default-id'} /> */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserInfo;
