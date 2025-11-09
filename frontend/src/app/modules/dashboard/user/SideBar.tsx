'use client';
import { useState } from 'react';
import UserInfo from './UserInfo'; // <-- Import your cleaned-up component
import OrderHistory from './OrderHistory';

// Define the tabs
const TABS = [
  { id: 'Profile', label: 'Profile' },
  { id: 'Orders', label: 'Orders' },
];

export default function SideBar() {
    // State to keep track of the active tab, 'Profile' is the default
    const [activeTab, setActiveTab] = useState('Profile');

    return (
        // This is the main page layout you originally had in UserInfo.tsx
        <div className="flex flex-row min-h-screen my-10 mx-24 gap-12 bg-white">
            
            {/* 1. Left Sidebar Navigation (Now Dynamic) */}
            <div className="flex flex-col w-48 border-r border-gray-200 flex-shrink-0">
                {TABS.map(tab => {
                    const isActive = activeTab === tab.id;
                    
                    // Conditionally set the styles based on the active tab
                    const buttonClasses = `
                        py-2 px-4 text-left cursor-pointer
                        ${isActive 
                            ? 'bg-gray-100 border-b-2 border-black text-black font-semibold' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }
                    `;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={buttonClasses}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* 2. Content Area (Conditionally Renders Component) */}
            <div className="flex-1 w-full">
                {activeTab === 'Profile' && <UserInfo />}
                {activeTab === 'Orders' && <OrderHistory />}
            </div>
        </div>
    );
}