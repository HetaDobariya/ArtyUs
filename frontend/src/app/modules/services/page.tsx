"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useUser } from '@/contexts/UserContext';
import AddServiceModal from '../dashboard/sp/AddServiceModal';

// --- Icon ---
// A simple icon for the "Shop Name"
const StoreIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M18 6L18 20" />
        <path d="M12 6L12 20" />
        <path d="M6 6L6 20" />
        <path d="M2 20L22 20" />
        <path d="M20 15L12 9L4 15" />
    </svg>
);

// --- Data Interface ---
interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url?: string;
    shop_name: string;
    service_name: string;
}

// --- Page Component ---
const ServicesPage: React.FC = () => {
    const { user } = useUser();
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);

    // Check if user is a service provider
    const isServiceProvider = user?.role?.toLowerCase() === 'serviceprovider' || user?.role?.toLowerCase() === 'service_provider';

    const handleServiceAdded = () => {
        // Refresh the services list after adding
        window.location.reload();
    };

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);
                setError(null);

                const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND}/service/all`;
                const response = await fetch(apiUrl, {
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error(`Failed to fetch services: ${response.status}`);
                }

                const result = await response.json();

                if (result.success && Array.isArray(result.data)) {
                    setServices(result.data);
                } else {
                    setServices([]);
                }
            } catch (err) {
                console.error('Error fetching services:', err);
                setError(err instanceof Error ? err.message : 'Failed to load services');
            } finally {
                setLoading(false);
            }
        };

        if (process.env.NEXT_PUBLIC_BACKEND) {
            fetchServices();
        } else {
            setError('Backend URL not configured');
            setLoading(false);
        }
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Art & Craft Services
                        </h1>
                        {isServiceProvider && (
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 font-semibold text-base whitespace-nowrap shadow-md hover:shadow-lg"
                            >
                                + Add Service
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-8">
                {/* Loading State */}
                {loading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
                            <p className="text-gray-600">Loading services...</p>
                        </div>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <p className="text-red-600 font-medium mb-2">Error loading services</p>
                        <p className="text-red-500 text-sm">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && services.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg mb-2">No services available at the moment</p>
                        <p className="text-gray-500 text-sm">Check back later for new services</p>
                    </div>
                )}

                {/* Services Grid */}
                {!loading && !error && services.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
                            >
                                {/* Card Content */}
                                <div className="flex-1 flex flex-col p-6">
                                    {/* Service Name */}
                                    <h2 className="text-lg font-bold text-gray-900 mb-3">
                                        {service.name}
                                    </h2>

                                    {/* Shop Name */}
                                    <div className="flex items-center text-gray-600 mb-4">
                                        <StoreIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                                        <span className="text-sm font-medium">{service.shop_name}</span>
                                    </div>

                                    {/* Price */}
                                    {service.price && (
                                        <p className="text-gray-900 font-bold mb-2">₹{service.price}</p>
                                    )}

                                    {/* Description */}
                                    <p className="text-sm text-gray-700 leading-relaxed flex-1 mb-4 line-clamp-3">
                                        {service.description}
                                    </p>

                                    {/* View Details Button */}
                                    <Link
                                        href={`/modules/services/${service.id}`}
                                        className="inline-block w-full text-center mt-auto"
                                    >
                                        <button className="w-full px-4 py-2 bg-black text-white text-sm font-semibold rounded-md hover:bg-gray-800 transition-colors duration-200">
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* Add Service Modal for Service Providers */}
            {showAddModal && isServiceProvider && (
                <AddServiceModal
                    onClose={() => setShowAddModal(false)}
                    onAdded={handleServiceAdded}
                />
            )}
        </div>
    );
};

export default ServicesPage;

