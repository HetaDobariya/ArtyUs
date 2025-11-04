'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Image1 from '../../../../../public/image/HomeImages/trader.png';
// NOTE: Ensure you place the file in the correct path or adjust the import.
import EditTraderDetails from './EditTraderDetails';

// 1. Define the nested User Data structure
interface UserData {
    id: number;
    name: string;
    email: string;
    address: string;
    contact: string;
    trader: {
        trader_id: number;
        business_name: string; // Shop Name
        shop_address: string; // Shop Address
        phone: string;         // Shop Contact Number
        description: string;
    } | null;
    iat: number;
    exp: number;
}

// 2. Define the overall structure of the JSON response
interface BackendResponse {
    user: UserData;
}

const TraderInfo = () => {
    const [traderData, setTraderData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false); // 👈 Reintroduced state for the modal

    // --- Data Fetching Logic (Unchanged) ---
    const fetchTraderData = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/user/current-user`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to fetch trader data.');
            }

            const responseData: BackendResponse = await response.json();
            setTraderData(responseData.user);

        } catch (err) {
            console.error('Fetch error:', err);
            setError('Could not load account details. Please check server status.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTraderData();
    }, []);

    // --- Handler for successful update from the form ---
    const handleUpdateSuccess = (updatedFormData: { companyName: string; shopContactNumber: string; shopAddress: string; description: string; }) => {
        if (traderData && traderData.trader) {
            // Update the local state with the new data instantly
            setTraderData({
                ...traderData,
                trader: {
                    ...traderData.trader,
                    business_name: updatedFormData.companyName,
                    phone: updatedFormData.shopContactNumber,
                    shop_address: updatedFormData.shopAddress,
                    description: updatedFormData.description,
                }
            });
        }
        setIsEditing(false); // Close the modal
    };

    const shopDetails = traderData?.trader;

    // --- Determine Initial Data for the Edit Form ---
    const initialFormData = shopDetails ? {
        companyName: shopDetails.business_name,
        shopContactNumber: shopDetails.phone,
        shopAddress: shopDetails.shop_address,
        description: shopDetails.description,
    } : {
        companyName: '', shopContactNumber: '', shopAddress: '', description: '',
    };

    // --- Loading, Error, and Not Found States ---
    if (isLoading) {
        return <div className="p-10 text-center text-xl font-semibold">Loading account details...</div>;
    }

    if (error) {
        return <div className="p-10 text-center text-red-600 font-semibold">Error: {error}</div>;
    }

    if (!shopDetails) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <p className="text-xl font-semibold text-gray-700">
                    No shop details found. Please complete your trader profile.
                </p>
            </div>
        );
    }

    // --- Final Display Logic ---
    return (
        <div className="flex justify-center min-h-screen p-4">
            <div className="flex flex-col lg:flex-row w-full max-w-5xl mx-auto my-10 bg-white shadow-xl rounded-lg overflow-hidden">

                {/* Left Side: Details */}
                <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold text-gray-900 mb-6 border-b-2 border-gray-300 pb-3">
                        Account Details
                    </h3>

                    <div className="flex flex-col gap-4">
                        {/* Shop Name */}
                        <div className="py-2 border-b border-gray-200">
                            <p className="text-lg text-gray-900 font-normal">
                                Shop Name: <span className="font-semibold">{shopDetails.business_name}</span>
                            </p>
                        </div>
                        {/* Contact */}
                        <div className="py-2 border-b border-gray-200">
                            <p className="text-lg text-gray-900 font-normal">
                                Contact: <span className="font-semibold">{shopDetails.phone}</span>
                            </p>
                        </div>
                        {/* Address */}
                        <div className="py-2 border-b border-gray-200">
                            <p className="text-lg text-gray-900 font-normal">
                                Address: <span className="font-semibold">{shopDetails.shop_address}</span>
                            </p>
                        </div>
                        {/* Description */}
                        <div className="py-2 border-b border-gray-200">
                            <p className="text-lg text-gray-900 font-normal">
                                Description: <span className="font-semibold">{shopDetails.description}</span>
                            </p>
                        </div>

                        {/* EDIT BUTTON ACTION */}
                        <div className="mt-8">
                            <button
                                onClick={() => setIsEditing(true)} // 👈 Link to open the modal
                                className="px-8 py-3 bg-black text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition duration-200"
                            >
                                EDIT DETAILS
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Side: Image */}
                <div className="hidden lg:flex w-full lg:w-1/2 p-8 items-center justify-center bg-gray-50 rounded-r-lg">
                    <Image
                        src={Image1}
                        alt="Trader Profile Illustration"
                        className="object-contain w-full h-full max-w-lg"
                    />
                </div>
            </div>

            {/* --- Edit Modal Rendering --- */}
            {isEditing && (
                <div className="fixed inset-0  bg-opacity-30 flex items-center justify-center p-4 z-50 backdrop-blur-xl">
                    <div className="bg-white p-0 rounded-lg max-w-lg w-full">
                        <EditTraderDetails
                            companyId={String(shopDetails.trader_id)} // Pass the trader_id/companyId
                            initialData={initialFormData}             // Pass the current shop data
                            onClose={() => setIsEditing(false)}       // Close function
                            onUpdateSuccess={handleUpdateSuccess}     // Update local state function
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TraderInfo;