'use client';
import React, { useState } from 'react';

// Assuming these components are still imported correctly
import UserInfo from './UserInfo';
import OrderHistory from './OrderHistory';

export default function SideBar() {
    const data = [
        {
            label: 'Profile',
            value: 'Profile',
            desc: <UserInfo />,
        },
        {
            label: 'Orders',
            value: 'Orders', // Corrected and consistent value
            desc: <OrderHistory />,
        },
    ];

    const [activeTab, setActiveTab] = useState('Profile');

    // This dynamically selects and renders the correct component
    const activeContent = data.find(item => item.value === activeTab)?.desc;

    return (
        <div className="h-screen m-10 flex">
            <nav className="w-40 border-r border-gray-200 p-4">
                <ul className="space-y-2">
                    {data.map(({ label, value }) => (
                        <li key={value}>
                            <button
                                onClick={() => setActiveTab(value)}
                                className={`w-full text-left p-2 rounded-lg text-xl font-bold transition-colors duration-200
                                    ${activeTab === value
                                        ? 'bg-blue-600 text-white' // Active style
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

            <div className="flex-grow p-4">
                {activeContent}
            </div>
        </div>
    );
}