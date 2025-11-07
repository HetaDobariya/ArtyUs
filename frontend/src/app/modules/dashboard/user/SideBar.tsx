'use client';
import React, { useState } from 'react';

// Assuming these components are still imported correctly
import UserInfo from './UserInfo';
import OrderHistory from './OrderHistory';

export default function SideBar() {
    // 1. Define the data for the sidebar tabs
    const data = [
        {
            label: 'Profile',
            value: 'Profile',
            desc: <UserInfo />, // The component to render
        },
        {
            // Note: I've used 'orders' (lowercase) for consistency with the original code,
            // but 'Orders' would also work as long as 'label' and 'value' match.
            label: 'Orders', // This is what the user sees
            value: 'orders', // This is the unique key used for state tracking
            desc: <OrderHistory />, // The component to render
        },
    ];

    // 2. State to track the active tab's 'value'
    const [activeTab, setActiveTab] = useState('Profile'); // Default to 'Profile'

    // 3. Dynamically find the component (desc) for the active tab
    const activeContent = data.find(item => item.value === activeTab)?.desc;

    return (
        // Use flex to layout the sidebar (nav) and the content area (div) side-by-side
        <div className="h-screen m-10 flex">
            {/* Sidebar/Navigation Area */}
            <nav className="w-40 border-r border-gray-200 p-4 shrink-0">
                <ul className="space-y-2">
                    {data.map(({ label, value }) => (
                        <li key={value}>
                            <button
                                onClick={() => setActiveTab(value)} // Update state on click
                                className={`w-full text-left p-2 rounded-lg text-xl font-bold transition-colors duration-200
                                    ${activeTab === value
                                        ? 'bg-blue-600 text-white shadow-md' // Active style
                                        : 'text-gray-700 hover:bg-gray-100' // Inactive style
                                    }
                                `}
                            >
                                {label}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Content Display Area */}
            <div className="flex-grow p-4">
                {/* 4. Render the active component */}
                {activeContent}
            </div>
        </div>
    );
}