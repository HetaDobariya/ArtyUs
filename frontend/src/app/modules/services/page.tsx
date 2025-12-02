"use client";

import React from 'react';
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


// --- Data Interface (No imageUrl) ---
interface Service {
    id: string;
    serviceName: string;
    shopName: string;
    description: string;
}

// --- Mock Data (No imageUrl) ---
const mockServices: Service[] = [
    {
        id: '1',
        serviceName: 'Custom Portrait Painting',
        shopName: 'Art by Heta',
        description: 'Bespoke, hand-painted portraits from your photos. Oil on canvas or watercolor. A timeless piece for your home.',
    },
    {
        id: '2',
        serviceName: 'Pottery Wheel Workshop',
        shopName: 'Clay Creations',
        description: 'A 2-hour beginner-friendly workshop. Learn to throw on the wheel and create your own bowl or cup to take home.',
    },
    {
        id: '3',
        serviceName: 'Personalized Calligraphy',
        shopName: "The Scribe's Desk",
        description: 'Elegant, handwritten calligraphy for wedding invitations, certificates, or personal letters. Various styles available.',
    },
    {
        id: '4',
        serviceName: 'Macramé Wall Hanging',
        shopName: 'Knots & Loops',
        description: 'Custom-made macramé wall hangings. Choose your size, color, and design to match your home decor perfectly.',
    },
    {
        id: '5',
        serviceName: 'Art & Craft Supply Curation',
        shopName: 'ArtyUs Selects',
        description: 'Not sure what to buy? Get a curated box of high-quality art supplies tailored to your specific project needs.',
    },
];


// --- Page Component (No Images) ---
const services: React.FC = () => {
    // TODO: Fetch your services from your API
    const services = mockServices; // Using mock data

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

            {/* Service Grid */}
            <main className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        // The Link component makes the entire card clickable
                        <Link
                            key={service.id}
                            href={`/services/${service.id}`} // This is the "further info" page URL
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
            </main>
        </div>
    );
};

export default services;