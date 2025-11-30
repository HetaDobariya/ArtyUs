// app/serviceprovidersignup/page.tsx

'use client';

import { useState } from 'react';
import Image from 'next/image';
import Image1 from '../../../../../public/image/HomeImages/traderSignUp.png';

// Define types for form data
interface Step1Data {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    address: string;
    contactNumber: string;
}

interface Step2Data {
    serviceNames: string[];
    shopName: string;
    serviceAddress: string;
    description: string;
    serviceContactNumber: string;
}

export default function ServiceProviderSignUp() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Step1Data & Step2Data>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        contactNumber: '',
        serviceNames: [],
        shopName: '',
        serviceAddress: '',
        description: '',
        serviceContactNumber: '',
    });
    const [currentServiceName, setCurrentServiceName] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const addServiceName = () => {
        if (currentServiceName.trim()) {
            setFormData((prev) => ({
                ...prev,
                serviceNames: [...prev.serviceNames, currentServiceName.trim()],
            }));
            setCurrentServiceName('');
        }
    };

    const removeServiceName = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            serviceNames: prev.serviceNames.filter((_, i) => i !== index),
        }));
    };

    const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (step === 1) {
            if (formData.password !== formData.confirmPassword) {
                alert("Passwords don't match!");
                return;
            }
            setStep(2);
        }
    };

    const handleBack = () => {
        setStep(1);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            // Add the current service name if it's not empty
            if (currentServiceName.trim()) {
                addServiceName();
            }
            
            // Check if at least one service name is added
            const validServiceNames = formData.serviceNames.filter(name => name.trim() !== '');
            if (validServiceNames.length === 0 && !currentServiceName.trim()) {
                alert('Please add at least one service name!');
                setLoading(false);
                return;
            }
            
            // Prepare final data with formatted service names
            const finalServiceNames = currentServiceName.trim() 
                ? [...validServiceNames, currentServiceName.trim()]
                : validServiceNames;

            // Format service names: lowercase and comma-separated
            const formattedServiceName = finalServiceNames
                .map(name => name.toLowerCase().trim())
                .join(', ');

            const submissionData = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                address: formData.address,
                contactNumber: formData.contactNumber,
                shopName: formData.shopName,
                serviceName: formattedServiceName,
                serviceAddress: formData.serviceAddress,
                description: formData.description,
                serviceContactNumber: formData.serviceContactNumber,
            };

            console.log('Submitting data:', submissionData);

            // Send data to backend
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/serviceprovider/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData),
                credentials: 'include',
            });

            if (!response.ok) {
                const errorText = await response.text();
                let errorData;
                try {
                    errorData = JSON.parse(errorText);
                } catch {
                    errorData = { message: `Server error: ${response.status}` };
                }
                console.error("Service provider signup failed:", errorData);
                alert(errorData.message || errorData.error || 'Signup failed!');
                return;
            }

            const data = await response.json();

            if (response.ok) {
                alert('Sign Up Successful!');
                // Reset form or redirect to login
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    address: '',
                    contactNumber: '',
                    serviceNames: [],
                    shopName: '',
                    serviceAddress: '',
                    description: '',
                    serviceContactNumber: '',
                });
                setStep(1);
            } else {
                alert(data.error || 'Sign up failed. Please try again.');
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('An error occurred during sign up. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen p-4 lg:p-0">
            <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto rounded-xl overflow-hidden my-auto bg-white">

                {/* Left Side: Multi-step Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
                    <div className="w-full max-w-sm">
                        <p className="text-sm text-gray-500 mb-2">Step {step} of 2</p>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">
                            {step === 1 ? 'Sign Up' : 'Service Details'}
                        </h2>
                        <p className="text-sm text-gray-600 mb-8">
                            {step === 1 ? 'Enter details to create an account' : 'Enter Service information to continue'}
                        </p>

                        {step === 1 && (
                            <form onSubmit={handleNext} className="w-full space-y-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <input
                                    type="tel"
                                    name="contactNumber"
                                    placeholder="Contact Number"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
                                >
                                    NEXT
                                </button>
                            </form>
                        )}

                        {step === 2 && (
                            <form onSubmit={handleSubmit} className="w-full space-y-4">
                                {/* Service Names Section */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Service Names
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Enter service name"
                                            value={currentServiceName}
                                            onChange={(e) => setCurrentServiceName(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    addServiceName();
                                                }
                                            }}
                                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button
                                            type="button"
                                            onClick={addServiceName}
                                            className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
                                        >
                                            Add
                                        </button>
                                    </div>
                                    
                                    {/* Display added service names */}
                                    {formData.serviceNames.length > 0 && (
                                        <div className="mt-3 space-y-2">
                                            {formData.serviceNames.map((service, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg"
                                                >
                                                    <span className="text-gray-700">{service}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeServiceName(index)}
                                                        className="text-red-500 hover:text-red-700 font-bold text-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <input
                                    type="text"
                                    name="shopName"
                                    placeholder="Shop Name"
                                    value={formData.shopName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <input
                                    type="text"
                                    name="serviceAddress"
                                    placeholder="Service Address"
                                    value={formData.serviceAddress}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <textarea
                                    name="description"
                                    placeholder="Description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    required
                                />
                                <input
                                    type="tel"
                                    name="serviceContactNumber"
                                    placeholder="Contact Number"
                                    value={formData.serviceContactNumber}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <div className="flex space-x-4">
                                    <button
                                        type="button"
                                        onClick={handleBack}
                                        className="w-1/2 py-3 border border-gray-900 text-gray-900 font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
                                    >
                                        BACK
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-1/2 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'SUBMITTING...' : 'SUBMIT'}
                                    </button>
                                </div>
                            </form>
                        )}

                        <p className="mt-6 text-sm text-center text-gray-600">
                            Already have an account?{' '}
                            <a href="/modules/auth/SignIn" className="text-blue-600 hover:underline font-medium">
                                Sign In
                            </a>
                        </p>
                    </div>
                </div>

                {/* Right Side: Illustration */}
                <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center p-8">
                    <div className="w-full h-full relative">
                        <Image
                            src={Image1}
                            alt="profile"
                            className="object-contain w-[739px]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}