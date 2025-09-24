'use client';

import { useState } from 'react';
import Image from 'next/image';
import Image1 from '../../../../../public/image/HomeImages/Signup.png';

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle sign-up logic here
        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }
        console.log('Signing up with:', { name, email, address, contactNumber, password });
    };
    

    return (
        <div className="flex min-h-screen p-4 lg:p-0">
            <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto rounded-xl overflow-hidden my-auto bg-white">
                {/* Left Side: Sign Up Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
                    <div className="w-full max-w-sm">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign Up</h2>
                        <p className="text-sm text-gray-600 mb-8">Enter details to create an account</p>
                        <form onSubmit={handleSubmit} className="w-full space-y-4">
                            <div>
                                <label htmlFor="name" className="sr-only">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="address" className="sr-only">Address</label>
                                <input
                                    id="address"
                                    type="text"
                                    placeholder="Address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="contactNumber" className="sr-only">Contact Number</label>
                                <input
                                    id="contactNumber"
                                    type="tel" // Use type="tel" for phone numbers
                                    placeholder="Contact Number"
                                    value={contactNumber}
                                    onChange={(e) => setContactNumber(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
                            >
                                SIGN UP
                            </button>
                        </form>
                        <p className="mt-6 text-sm text-center text-gray-600">
                            Already have an account?{' '}
                            <a href="/signin" className="text-blue-600 hover:underline font-medium">
                                Sign In
                            </a>
                        </p>
                    </div>
                </div>

                {/* Right Side: Illustration */}
                <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center p-8">
                    <div className="w-full h-full relative">
                        {/* This is a placeholder for your image. Replace '/illustration-signup.svg' with your image path */}
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