// modules/auth/signin
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Image1 from '../../../../../public/image/HomeImages/login.png';
import Link from 'next/link'
import { useRouter } from "next/navigation";


export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Handle errors returned by the backend
      alert(data.message || "Invalid email or password!");
      return;
    }

    console.log("Login successful:", data);

    // Optional: save token or user info to localStorage
    localStorage.setItem("token", data.token);

    // Optional: redirect after successful login
 router.push("/");

  } catch (error) {
    console.error("Error during login:", error);
    alert("Something went wrong. Please try again.");
  }
};


  return (
    <div className="flex min-h-screen p-4 lg:p-0">
      <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto rounded-xl overflow-hidden my-auto bg-white">
        {/* Left Side: Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-16">
          <div className="w-full max-w-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Log In</h2>
            <p className="text-sm text-gray-600 mb-8">Enter details to log in</p>
            <form onSubmit={handleSubmit} className="w-full space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 sr-only">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="krina@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 sr-only">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="··········"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
              >
                LOG IN
              </button>
            </form>
            <p className="mt-6 text-sm text-center text-gray-600">
              Don&apos;t have an account?{' '}
              <Link href="/modules/auth/SignUp" className="text-blue-600 hover:underline font-medium">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
        
        {/* Right Side: Illustration */}
        <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center p-8">
            <div className="w-full h-full relative">
                 {/* This is a placeholder for your image. Replace '/illustration.svg' with your image path */}
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