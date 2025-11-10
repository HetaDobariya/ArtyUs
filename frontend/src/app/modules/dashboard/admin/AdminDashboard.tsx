"use client";

import React, { useState, useMemo } from 'react';

// SVG Icons
const Users = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const Store = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const Package = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const Tag = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
);

const Trash2 = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const CheckCircle = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const XCircle = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const Eye = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const Plus = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const X = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Search = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'trader';
  joinedDate: string;
  verified: boolean;
  status: 'active' | 'inactive';
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  traderId: string;
  traderName: string;
  addedDate: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  productCount: number;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'traders' | 'products' | 'categories'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<any>(null);
  const [categoryForm, setCategoryForm] = useState({ name: '', slug: '' });

  // Sample Data
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user', joinedDate: '2025-01-15', verified: true, status: 'active' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user', joinedDate: '2025-02-20', verified: true, status: 'active' },
    { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'user', joinedDate: '2025-03-10', verified: false, status: 'inactive' },
  ]);

  const [traders, setTraders] = useState<User[]>([
    { id: '4', name: 'Alice Trader', email: 'alice@artyus.com', role: 'trader', joinedDate: '2024-12-01', verified: true, status: 'active' },
    { id: '5', name: 'Charlie Vendor', email: 'charlie@artyus.com', role: 'trader', joinedDate: '2025-01-05', verified: false, status: 'active' },
  ]);

  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Week Planner', category: 'Planners', price: 500, quantity: 5, traderId: '4', traderName: 'Alice Trader', addedDate: '2025-01-20' },
    { id: '2', name: 'Crayon Colors', category: 'Art Supplies', price: 360, quantity: 64, traderId: '4', traderName: 'Alice Trader', addedDate: '2025-02-01' },
    { id: '3', name: 'Sketch Notebook', category: 'Notebooks', price: 299, quantity: 15, traderId: '5', traderName: 'Charlie Vendor', addedDate: '2025-02-15' },
  ]);

  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: 'Planners', slug: 'planners', productCount: 1 },
    { id: '2', name: 'Art Supplies', slug: 'art-supplies', productCount: 1 },
    { id: '3', name: 'Notebooks', slug: 'notebooks', productCount: 1 },
  ]);

  // Stats
  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    totalTraders: traders.length,
    verifiedTraders: traders.filter(t => t.verified).length,
    totalProducts: products.length,
    totalCategories: categories.length,
  };

  // Filtered Data
  const filteredUsers = useMemo(() => 
    users.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase())),
    [users, searchQuery]
  );

  const filteredTraders = useMemo(() =>
    traders.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.email.toLowerCase().includes(searchQuery.toLowerCase())),
    [traders, searchQuery]
  );

  const filteredProducts = useMemo(() =>
    products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.traderName.toLowerCase().includes(searchQuery.toLowerCase())),
    [products, searchQuery]
  );

  // Actions
  const handleDeleteUser = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  const handleDeleteTrader = (id: string) => {
    if (confirm('Are you sure you want to delete this trader?')) {
      setTraders(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleVerifyTrader = (id: string) => {
    setTraders(prev => prev.map(t => t.id === id ? { ...t, verified: true } : t));
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleAddCategory = () => {
    if (!categoryForm.name || !categoryForm.slug) {
      alert('Please fill all fields');
      return;
    }

    const newCategory: Category = {
      id: Date.now().toString(),
      name: categoryForm.name,
      slug: categoryForm.slug,
      productCount: 0
    };

    setCategories(prev => [...prev, newCategory]);
    setCategoryForm({ name: '', slug: '' });
    setShowCategoryModal(false);
  };

  const handleDeleteCategory = (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(prev => prev.filter(c => c.id !== id));
    }
  };

  const viewDetails = (entity: any) => {
    setSelectedEntity(entity);
    setShowDetailsModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Users</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.totalUsers}</p>
                  <p className="text-sm text-gray-500 mt-1">{stats.activeUsers} active</p>
                </div>
                <div className="bg-purple-100 p-4 rounded-full">
                  <Users className="text-purple-600" size={32} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Traders</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.totalTraders}</p>
                  <p className="text-sm text-gray-500 mt-1">{stats.verifiedTraders} verified</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-full">
                  <Store className="text-blue-600" size={32} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Products</p>
                  <p className="text-3xl font-bold text-green-600">{stats.totalProducts}</p>
                  <p className="text-sm text-gray-500 mt-1">{stats.totalCategories} categories</p>
                </div>
                <div className="bg-green-100 p-4 rounded-full">
                  <Package className="text-green-600" size={32} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-6">
          <div className="flex flex-wrap gap-2">
            {['overview', 'users', 'traders', 'products', 'categories'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 min-w-[120px] px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        {activeTab !== 'overview' && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              {activeTab === 'categories' && (
                <button
                  onClick={() => setShowCategoryModal(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  <Plus size={20} />
                  Add Category
                </button>
              )}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Name</th>
                    <th className="px-6 py-4 text-left">Email</th>
                    <th className="px-6 py-4 text-left">Joined Date</th>
                    <th className="px-6 py-4 text-left">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{user.name}</td>
                      <td className="px-6 py-4 text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 text-gray-600">{user.joinedDate}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => viewDetails(user)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Traders Tab */}
        {activeTab === 'traders' && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Name</th>
                    <th className="px-6 py-4 text-left">Email</th>
                    <th className="px-6 py-4 text-left">Joined Date</th>
                    <th className="px-6 py-4 text-left">Verified</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTraders.map((trader) => (
                    <tr key={trader.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{trader.name}</td>
                      <td className="px-6 py-4 text-gray-600">{trader.email}</td>
                      <td className="px-6 py-4 text-gray-600">{trader.joinedDate}</td>
                      <td className="px-6 py-4">
                        {trader.verified ? (
                          <span className="flex items-center gap-1 text-green-600">
                            <CheckCircle size={18} /> Verified
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-yellow-600">
                            <XCircle size={18} /> Pending
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => viewDetails(trader)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          >
                            <Eye size={18} />
                          </button>
                          {!trader.verified && (
                            <button
                              onClick={() => handleVerifyTrader(trader.id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all"
                            >
                              <CheckCircle size={18} />
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteTrader(trader.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Product</th>
                    <th className="px-6 py-4 text-left">Category</th>
                    <th className="px-6 py-4 text-left">Price</th>
                    <th className="px-6 py-4 text-left">Trader</th>
                    <th className="px-6 py-4 text-left">Added Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{product.name}</td>
                      <td className="px-6 py-4 text-gray-600">{product.category}</td>
                      <td className="px-6 py-4 text-gray-600">₹{product.price}</td>
                      <td className="px-6 py-4 text-gray-600">{product.traderName}</td>
                      <td className="px-6 py-4 text-gray-600">{product.addedDate}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => viewDetails(product)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <div key={category.id} className="bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:scale-105">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Tag className="text-purple-600" size={24} />
                  </div>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm mb-2">Slug: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{category.slug}</span></p>
                <p className="text-gray-500 text-sm">{category.productCount} products</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Add Category</h2>
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                  <input
                    type="text"
                    value={categoryForm.name}
                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                    placeholder="e.g., Art Supplies"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                  <input
                    type="text"
                    value={categoryForm.slug}
                    onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                    placeholder="e.g., art-supplies"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Use lowercase with hyphens</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowCategoryModal(false)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddCategory}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedEntity && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-3">
                {Object.entries(selectedEntity).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b">
                    <span className="font-medium text-gray-700 capitalize">{key}:</span>
                    <span className="text-gray-600">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;