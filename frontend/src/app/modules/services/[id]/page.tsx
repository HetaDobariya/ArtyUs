"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// --- Icons ---
// Re-using the StoreIcon
const StoreIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M18 6L18 20" /><path d="M12 6L12 20" /><path d="M6 6L6 20" /><path d="M2 20L22 20" /><path d="M20 15L12 9L4 15" />
    </svg>
);

// New Icon for Provider
const UserIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
);

// New Icon for Contact
const MailIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
    </svg>
);

// New Icon for Address
const MapPinIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
    </svg>
);


// --- Data Interface ---
interface ServiceDetails {
    id: string;
    serviceName: string;
    shopName: string;
    description: string;
    providerName: string;
    contactEmail: string;
    address: string;
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
const ServiceDetailPage: React.FC = () => {
    const params = useParams();
    const serviceId = params?.id as string;
    
    const [service, setService] = useState<ServiceDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchServiceDetails = async () => {
            if (!serviceId) {
                setError('Service ID is missing');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND}/api/admin/serviceprovider-details`;
                const response = await fetch(apiUrl, {
                    credentials: 'include',
                });

                // Handle 404 as no service providers available
                if (response.status === 404) {
                    setError('No service providers found');
                    setLoading(false);
                    return;
                }

                if (!response.ok) {
                    throw new Error(`Failed to fetch service: ${response.status}`);
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

                // Find the service provider with matching ID
                const provider = serviceProviders.find(
                    (p) => p.service_provider_id.toString() === serviceId && p.is_verified === 1
                );

                if (!provider) {
                    throw new Error('Service not found or not verified');
                }

                // Map backend data to ServiceDetails interface
                const mappedService: ServiceDetails = {
                    id: provider.service_provider_id.toString(),
                    serviceName: provider.service_name || 'Service',
                    shopName: provider.shop_name || 'Shop',
                    description: provider.description || 'No description available.',
                    providerName: provider.user_name || 'Provider',
                    contactEmail: provider.email || 'No email available',
                    address: provider.service_address || provider.user_address || 'Address not available',
                };

                setService(mappedService);
            } catch (err) {
                console.error('Error fetching service details:', err);
                setError(err instanceof Error ? err.message : 'Failed to load service details');
            } finally {
                setLoading(false);
            }
        };

        if (process.env.NEXT_PUBLIC_BACKEND) {
            fetchServiceDetails();
        } else {
            setError('Backend URL not configured');
            setLoading(false);
        }
    }, [serviceId]);


    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mb-4"></div>
                    <p className="text-gray-600">Loading service details...</p>
                </div>
            </div>
        );
    }

    if (error || !service) {
        return (
            <div className="min-h-screen bg-white">
                <header className="bg-white shadow-sm">
                    <div className="container mx-auto px-6 py-4">
                        <h1 className="text-2xl font-bold text-gray-800">ArtyUs</h1>
                    </div>
                </header>
                <main className="container mx-auto px-6 py-8">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                        <p className="text-red-600 font-medium mb-2">
                            {error || 'Service not found'}
                        </p>
                        <Link href="/modules/services" legacyBehavior>
                            <a className="inline-block mt-4 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors">
                                Back to services
                            </a>
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header (optional, or could be your main nav) */}
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-6 py-4">
                    {/* You can put your main navigation here */}
                    <h1 className="text-2xl font-bold text-gray-800">
                        ArtyUs
                    </h1>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="container mx-auto px-6 py-8">
                {/* Back Button */}
                <div className="mb-6">
                    <Link href="/modules/services" legacyBehavior>
                        <a className="text-black font-medium hover:underline flex items-center">
                            <span className="text-xl mr-1">&larr;</span>
                            Back to all services
                        </a>
                    </Link>
                </div>

                {/* Content Grid (2/3 for info, 1/3 for provider card) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-8">

                    {/* Left Column: Service Details */}
                    <div className="lg:col-span-2">
                        {/* Service Name */}
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            {service.serviceName}
                        </h1>

                        {/* Shop Name */}
                        <div className="flex items-center text-gray-600 text-lg mb-6">
                            <StoreIcon className="w-5 h-5 mr-2 flex-shrink-0" />
                            <span className="font-semibold">{service.shopName}</span>
                        </div>

                        {/* Description */}
                        <div className="mt-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                About this Service
                            </h2>
                            {/* Using whitespace-pre-line to respect newlines in the description */}
                            <p className="text-base text-gray-700 leading-relaxed whitespace-pre-line">
                                {service.description}
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Provider Card */}
                    <div className="lg:col-span-1 mt-8 lg:mt-0">
                        <div className="bg-white rounded-xl shadow-md p-6 h-fit border">
                            <h2 className="text-xl font-bold text-gray-800 mb-5 border-b pb-3">
                                Service Provider Details
                            </h2>
                            <div className="space-y-5">

                                {/* Provider Name */}
                                <div className="flex items-start">
                                    <UserIcon className="w-5 h-5 mr-3 flex-shrink-0 text-gray-500 mt-1" />
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">
                                            Provided by
                                        </label>
                                        <span className="text-base font-semibold text-gray-900">
                                            {service.providerName}
                                        </span>
                                    </div>
                                </div>

                                {/* Contact */}
                                <div className="flex items-start">
                                    <MailIcon className="w-5 h-5 mr-3 flex-shrink-0 text-gray-500 mt-1" />
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">
                                            Contact
                                        </label>
                                        <span className="text-base font-semibold text-gray-900 hover:underline cursor-pointer">
                                            {service.contactEmail}
                                        </span>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex items-start">
                                    <MapPinIcon className="w-5 h-5 mr-3 flex-shrink-0 text-gray-500 mt-1" />
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">
                                            Address
                                        </label>
                                        <span className="text-base font-semibold text-gray-900">
                                            {service.address}
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default ServiceDetailPage;

