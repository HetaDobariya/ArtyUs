"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';

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
    serviceProviderId?: number;
    price?: number;
    imageUrl?: string;
    providerUserId?: number;
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

// --- Booking Form Interface ---
interface BookingFormData {
    request_title: string;
    request_details: string;
    price_range: string;
    time_range: string;
    support_pdf: File | null;
    contact_pref: string;
}

// --- Page Component ---
const ServiceDetailPage: React.FC = () => {
    const params = useParams();
    const serviceId = params?.id as string;
    const { user } = useUser();
    const router = useRouter();

    const [service, setService] = useState<ServiceDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showBookingForm, setShowBookingForm] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);

    const [formData, setFormData] = useState<BookingFormData>({
        request_title: '',
        request_details: '',
        price_range: '',
        time_range: '',
        support_pdf: null,
        contact_pref: 'platform'
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData(prev => ({ ...prev, support_pdf: file }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            router.push('/modules/auth/SignIn');
            return;
        }

        setSubmitting(true);
        try {
            // For now, we'll upload the file separately if needed
            // In a production app, you'd upload to cloud storage first
            let pdfUrl = null;

            if (formData.support_pdf) {
                // Create FormData for file upload
                const uploadFormData = new FormData();
                uploadFormData.append('file', formData.support_pdf);

                // Upload file (you'll need to create this endpoint)
                // For now, we'll just store the filename
                pdfUrl = formData.support_pdf.name;
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/service-booking/book`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    service_provider_id: service?.serviceProviderId || serviceId,
                    request_title: formData.request_title,
                    request_details: formData.request_details,
                    price_range: formData.price_range || null,
                    time_range: formData.time_range,
                    support_pdf_url: pdfUrl,
                    contact_pref: formData.contact_pref
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setBookingSuccess(true);
                setShowBookingForm(false);
                // Reset form
                setFormData({
                    request_title: '',
                    request_details: '',
                    price_range: '',
                    time_range: '',
                    support_pdf: null,
                    contact_pref: 'platform'
                });
            } else {
                alert(data.error || 'Failed to submit booking request');
            }
        } catch (error) {
            console.error('Error submitting booking:', error);
            alert('Failed to submit booking request. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/service/delete/${serviceId}`, {
                method: 'DELETE',
                credentials: 'include',
            });

            if (response.ok) {
                alert('Service deleted successfully');
                router.push('/modules/services');
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to delete service');
            }
        } catch (error) {
            console.error('Error deleting service:', error);
            alert('Failed to delete service');
        }
    };

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

                const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND}/service/details/${serviceId}`;
                const response = await fetch(apiUrl, {
                    credentials: 'include',
                });

                if (response.status === 404) {
                    setError('Service not found');
                    setLoading(false);
                    return;
                }

                if (!response.ok) {
                    throw new Error(`Failed to fetch service: ${response.status}`);
                }

                const result = await response.json();

                if (!result.success || !result.data) {
                    throw new Error('Invalid service data');
                }

                const provider = result.data;

                // Map backend data to ServiceDetails interface
                const mappedService: ServiceDetails = {
                    id: provider.id.toString(),
                    serviceName: provider.name || 'Service',
                    shopName: provider.shop_name || 'Shop',
                    description: provider.description || 'No description available.',
                    providerName: provider.user_name || 'Provider',
                    contactEmail: provider.email || 'No email available',
                    address: provider.service_address || provider.user_address || 'Address not available',
                    serviceProviderId: provider.service_provider_id,
                    price: provider.price ? parseFloat(provider.price) : undefined,
                    imageUrl: provider.image_url,
                    providerUserId: provider.user_id
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
                        <Link href="/modules/services" className="inline-block mt-4 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors">
                            Back to services
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
                    <Link href="/modules/services" className="text-black font-medium hover:underline flex items-center">
                        <span className="text-xl mr-1">&larr;</span>
                        Back to all services
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

                        {service.price && (
                            <p className="text-2xl font-bold text-gray-900 mb-4">₹{service.price}</p>
                        )}

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

                        {/* Book Service Button */}
                        <div className="mt-8">
                            {!showBookingForm ? (
                                <button
                                    onClick={() => {
                                        if (!user) {
                                            router.push('/modules/auth/SignIn');
                                        } else {
                                            setShowBookingForm(true);
                                        }
                                    }}
                                    className="px-6 py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition-colors"
                                >
                                    Book This Service
                                </button>
                            ) : null}

                            {user && service.providerUserId && user.id === service.providerUserId.toString() && (
                                <button
                                    onClick={handleDelete}
                                    className="ml-4 px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors"
                                >
                                    Delete Service
                                </button>
                            )}
                        </div>

                        {/* Booking Form */}
                        {showBookingForm && (
                            <div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    Book Your Custom Creative Service
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Please fill out the details below to submit your service request to the provider. The more detail you provide, the better they can serve you.
                                </p>

                                {bookingSuccess && (
                                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                        <p className="text-green-800 font-medium">
                                            Booking request submitted successfully! The service provider will contact you soon.
                                        </p>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="request_title" className="block text-sm font-medium text-gray-700 mb-2">
                                            Request Summary / Title *
                                        </label>
                                        <input
                                            type="text"
                                            id="request_title"
                                            name="request_title"
                                            value={formData.request_title}
                                            onChange={handleInputChange}
                                            placeholder="E.g., Custom Portrait Commission or 3-Day Photography Workshop"
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="request_details" className="block text-sm font-medium text-gray-700 mb-2">
                                            Detailed Request Description *
                                        </label>
                                        <textarea
                                            id="request_details"
                                            name="request_details"
                                            rows={5}
                                            value={formData.request_details}
                                            onChange={handleInputChange}
                                            placeholder="Describe your project, desired outcome, materials, or specific requirements in detail."
                                            required
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                        />
                                    </div>

                                    <hr className="border-gray-300" />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="price_range" className="block text-sm font-medium text-gray-700 mb-2">
                                                Your Budget / Desired Price Range (Optional)
                                            </label>
                                            <select
                                                id="price_range"
                                                name="price_range"
                                                value={formData.price_range}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                            >
                                                <option value="">Select a range...</option>
                                                <option value="under-100">₹0 - ₹1,000</option>
                                                <option value="100-500">₹1,000 - ₹5,000</option>
                                                <option value="500-1000">₹5,000 - ₹10,000</option>
                                                <option value="over-1000">₹10,000+</option>
                                                <option value="negotiable">Open to Negotiation</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label htmlFor="time_range" className="block text-sm font-medium text-gray-700 mb-2">
                                                Desired Completion / Service Timeframe *
                                            </label>
                                            <input
                                                type="date"
                                                id="time_range"
                                                name="time_range"
                                                value={formData.time_range}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                            />
                                            <small className="text-gray-500 text-xs mt-1 block">
                                                Provide a specific deadline or a start date.
                                            </small>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="support_pdf" className="block text-sm font-medium text-gray-700 mb-2">
                                            Upload Supporting Document (PDF)
                                        </label>
                                        <input
                                            type="file"
                                            id="support_pdf"
                                            name="support_pdf"
                                            accept=".pdf"
                                            onChange={handleFileChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                        />
                                        <p className="text-gray-500 text-xs mt-1">
                                            Upload sketches, reference images, mood boards, or detailed specifications (PDF format only). This will be securely stored on our backend.
                                        </p>
                                    </div>

                                    <div>
                                        <label htmlFor="contact_pref" className="block text-sm font-medium text-gray-700 mb-2">
                                            Preferred Contact Method for follow-up
                                        </label>
                                        <select
                                            id="contact_pref"
                                            name="contact_pref"
                                            value={formData.contact_pref}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                                        >
                                            <option value="platform">ArtyUs Platform Messaging (Default)</option>
                                            <option value="email">Email</option>
                                            <option value="phone">Phone Call</option>
                                        </select>
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="px-6 py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {submitting ? 'Submitting...' : 'Submit Booking Request'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowBookingForm(false);
                                                setBookingSuccess(false);
                                            }}
                                            className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}
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

