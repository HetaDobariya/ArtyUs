// app/tradersignup/page.tsx

'use client';

import { useState } from 'react';
import Image from 'next/image';
import Image1 from '../../../../../public/image/HomeImages/traderSignUp.png';
import { useRouter } from 'next/navigation';

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
    shopName: string;
    shopContactNumber: string;
    shopAddress: string;
    description: string;
}

export default function TraderSignUp() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<Step1Data & Step2Data>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        contactNumber: '',
        shopName: '',
        shopContactNumber: '',
        shopAddress: '',
        description: '',
    });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
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

        // Final submission logic
        console.log('Final Form Data:', formData);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/trader/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include'
            });

            const data = await response.json();
            if (response.ok) {
                console.log("Trader signup successfull", data);
                alert('Sign Up Successful!');
                router.push("/");
            } else {
                console.error("Trader signup failed:", data);
                alert(data.message || "Trader signup failed!");
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('An unexpected error occurred during sign up.');
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
                            {step === 1 ? 'Sign Up' : 'Shop Details'}
                        </h2>
                        <p className="text-sm text-gray-600 mb-8">
                            {step === 1 ? 'Enter details to create an account' : 'Enter Shop information to continue'}
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
                                    type="tel"
                                    name="shopContactNumber"
                                    placeholder="Contact Number"
                                    value={formData.shopContactNumber}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                <input
                                    type="text"
                                    name="shopAddress"
                                    placeholder="Address"
                                    value={formData.shopAddress}
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
                                        className="w-1/2 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
                                    >
                                        SUBMIT
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
                            className="object-contain  w-[739px]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}