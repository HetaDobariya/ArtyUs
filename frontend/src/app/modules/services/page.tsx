"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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
    serviceName: string;
    shopName: string;
    description: string;
}

// --- Backend API Response Interface ---
interface BackendServiceProvider {
    user_id: number;
    user_name: string;
    email: string;
    user_address: string;
    user_contact: string;
    is_verified: number;
    service_provider_id: number;
    service_name: string;
    shop_name: string;
    service_address: string;
    service_contact: string;
    description: string;
}

// --- Page Component ---
const ServicesPage: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);
                setError(null);

                const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND}/api/admin/serviceprovider-details`;
                const response = await fetch(apiUrl, {
                    credentials: 'include',
                });

                // Handle 404 as empty result (no service providers)
                if (response.status === 404) {
                    setServices([]);
                    setLoading(false);
                    return;
                }

                if (!response.ok) {
                    throw new Error(`Failed to fetch services: ${response.status}`);
                }

                const result = await response.json();
                
                // Handle different response structures
                let serviceProviders: BackendServiceProvider[] = [];
                if (result.data && Array.isArray(result.data)) {
                    serviceProviders = result.data;
                } else if (Array.isArray(result)) {
                    serviceProviders = result;
                } else {
                    throw new Error('Unexpected API response format');
                }

                // Filter only verified service providers and map to Service interface
                const mappedServices: Service[] = serviceProviders
                    .filter((provider) => provider.is_verified === 1)
                    .map((provider) => ({
                        id: provider.service_provider_id.toString(),
                        serviceName: provider.service_name || 'Service',
                        shopName: provider.shop_name || 'Shop',
                        description: provider.description || 'No description available.',
                    }));

                setServices(mappedServices);
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
                    <h1 className="text-3xl font-bold text-gray-800">
                        Art & Craft Services
                    </h1>
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
                            <Link
                                key={service.id}
                                href={`/modules/services/${service.id}`}
                                passHref
                                legacyBehavior
                            >
                                <a className="flex flex-col bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 overflow-hidden p-6">
                                    {/* Card Content */}
                                    <div className="flex-1 flex flex-col">
                                        {/* Service Name */}
                                        <h2 className="text-xl font-bold text-gray-800 mb-2">
                                            {service.serviceName}
                                        </h2>

                                        {/* Shop Name */}
                                        <div className="flex items-center text-gray-600 mb-4">
                                            <StoreIcon className="w-5 h-5 mr-2 flex-shrink-0" />
                                            <span className="text-sm font-medium">{service.shopName}</span>
                                        </div>

                                        {/* Description */}
                                        <p className="text-sm text-gray-700 leading-relaxed flex-1 line-clamp-3">
                                            {service.description}
                                        </p>

                                        {/* Click Affordance */}
                                        <div className="text-right mt-5 text-sm font-semibold text-black">
                                            View Details &rarr;
                                        </div>
                                    </div>
                                </a>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default ServicesPage;

