'use client';
import React from 'react';

interface SidebarProps {
  selectedTab: 'profile' | 'orders' | 'dashboard';
  onTabSelect: (tab: 'profile' | 'orders' | 'dashboard') => void;
  userRole: string;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedTab, onTabSelect, userRole }) => {
  const buttonStyle = (tab: string) =>
    `text-left px-4 py-3 rounded-lg font-medium mb-2 transition-colors duration-200 ${
      selectedTab === tab ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-200'
    }`;

  return (
    <div className="bg-gray-100 p-6 rounded-2xl shadow-md flex flex-col w-64 h-max">
      <h2 className="text-xl font-bold mb-6 text-gray-800 text-center">My Account</h2>

      <button onClick={() => onTabSelect('profile')} className={buttonStyle('profile')}>
        Profile
      </button>

      <button onClick={() => onTabSelect('orders')} className={buttonStyle('orders')}>
        Orders
      </button>

      {userRole === 'trader' && (
        <button onClick={() => onTabSelect('dashboard')} className={buttonStyle('dashboard')}>
          Dashboard
        </button>
      )}
    </div>
  );
};

export default Sidebar;
