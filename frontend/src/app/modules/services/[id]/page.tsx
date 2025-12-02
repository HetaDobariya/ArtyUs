"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; // To get the ID from the URL

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

// --- Mock Data (Replace with your API fetch) ---
const mockServiceData: ServiceDetails = {
    id: '1',
    serviceName: 'Custom Portrait Painting',
    shopName: 'Art by Heta',
    description: `Bespoke, hand-painted portraits from your photos. Oil on canvas or watercolor. A timeless piece for your home.

We work closely with you to capture the essence of the subject, whether it's a beloved pet, a family member, or a cherished memory.

Our process:
1. Consultation: We discuss your vision, photo references, and desired style.
2. Creation: Our artist begins the painting, providing updates along the way.
3. Review: You get a chance to review the final piece and request minor adjustments.
4. Delivery: Your artwork is securely packaged and shipped to you.`,
    providerName: 'Heta Dobariya',
    contactEmail: 'heta.art@example.com',
    address: '123 Art Street, Studio 4, Gandhinagar, Gujarat',
};


// --- Page Component ---
const ServiceDetailPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query; // This gets the [id] from the URL

    // ---
    // TODO: This is where you would fetch data from your API
    // In a real app, 'service' would start as null and you'd use useEffect
    // ---
    const [service, setService] = useState<ServiceDetails | null>(mockServiceData); // Using mock data for now
    const [loading, setLoading] = useState(false); // In real app, start as true

    /*
    // --- Real data fetching example ---
    useEffect(() => {
      if (id) { // Only fetch if the id is available
        setLoading(true);
        fetch(`/api/services/${id}`) // Or your backend URL
          .then(res => res.json())
          .then(data => {
            setService(data.service);
            setLoading(false);
          })
          .catch(err => {
            console.error(err);
            setLoading(false);
          });
      }
    }, [id]); // Re-run when the 'id' from the router changes
    */


    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-gray-600">Loading service details...</p>
            </div>
        );
    }

    if (!service) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-red-500">Service not found.</p>
                <Link href="/services" legacyBehavior>
                    <a className="ml-4 text-black hover:underline">Back to services</a>
                </Link>
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
                    <Link href="/services" legacyBehavior>
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