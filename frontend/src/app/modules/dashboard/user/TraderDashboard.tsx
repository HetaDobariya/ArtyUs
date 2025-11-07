"use client";

import React, { useState } from 'react';
import Link from 'next/link';

// SVG Icons as components
const Upload = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const X = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const Edit = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
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

const PlusCircle = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
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

interface Product {
  id: string;
  name: string;
  category: string;
  childCategory?: string;
  price: number;
  quantity: number;
  description: string;
  imageUrl: string;
}

const TraderDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Week Planner',
      category: 'weekly planner',
      childCategory: 'Paper Planner',
      price: 500,
      quantity: 5,
      description: 'Plan your week with our simple and efficient black and white themed planner.',
      imageUrl: '/api/placeholder/300/400'
    },
    {
      id: '2',
      name: 'Magnetic Week Planner',
      category: 'weekly planner',
      childCategory: 'Magnetic Planner',
      price: 1850,
      quantity: 8,
      description: 'Transparent magnetic week planner to keep track of all your todos and reminders.',
      imageUrl: '/api/placeholder/300/400'
    },
    {
      id: '3',
      name: 'Pastel Exam Board',
      category: 'exam boards',
      childCategory: 'Pastel Board',
      price: 210,
      quantity: 10,
      description: 'Adorable clipboards, featuring lovely illustrations in soft pastel colors. A perfect and playful accessory for school, home, or office use.',
      imageUrl: '/api/placeholder/300/400'
    },
    {
      id: '4',
      name: 'Pastel Exam Boards',
      category: 'exam boards',
      childCategory: 'Clip Board',
      price: 120,
      quantity: 15,
      description: 'Adorable clipboards in soft pastel colors. A perfect and playful accessory for school, home, or office use.',
      imageUrl: '/api/placeholder/300/400'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    childCategory: '',
    price: '',
    quantity: '',
    description: '',
    imageFile: null as File | null
  });

  const categories = ['weekly planner', 'exam boards', 'notebooks', 'art supplies', 'crafts'];

  const childCategories: Record<string, string[]> = {
    "weekly planner": ["Acrylic Planner", "Magnetic Planner", "Paper Planner"],
    "exam boards": ["Clip Board", "Pastel Board", "Custom Printed Board"],
    "notebooks": ["Plain", "Ruled", "Dotted", "Custom Cover"],
    "art supplies": ["Brushes", "Canvas", "Paints", "Markers"],
    "crafts": ["Stickers", "Washi Tape", "Scrapbook Materials"],
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, imageFile: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      throw new Error('Cloudinary credentials not configured');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw error;
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      childCategory: '',
      price: '',
      quantity: '',
      description: '',
      imageFile: null
    });
    setImagePreview('');
  };

  const handleAddProduct = async () => {
    if (!formData.name || !formData.category || !formData.price || !formData.quantity) {
      alert('Please fill all required fields');
      return;
    }

    let imageUrl = '/api/placeholder/300/400';
    if (formData.imageFile) {
      imageUrl = await uploadToCloudinary(formData.imageFile);
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      category: formData.category,
      childCategory: formData.childCategory || undefined,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      description: formData.description,
      imageUrl
    };

    setProducts(prev => [...prev, newProduct]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEditProduct = async () => {
    if (!selectedProduct || !formData.name || !formData.category || !formData.price || !formData.quantity) {
      alert('Please fill all required fields');
      return;
    }

    let imageUrl = selectedProduct.imageUrl;
    if (formData.imageFile) {
      imageUrl = await uploadToCloudinary(formData.imageFile);
    }

    const updatedProduct: Product = {
      ...selectedProduct,
      name: formData.name,
      category: formData.category,
      childCategory: formData.childCategory || undefined,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      description: formData.description,
      imageUrl
    };

    setProducts(prev => prev.map(p => p.id === selectedProduct.id ? updatedProduct : p));
    setShowEditModal(false);
    setSelectedProduct(null);
    resetForm();
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      childCategory: product.childCategory || "",
      price: product.price.toString(),
      quantity: product.quantity.toString(),
      description: product.description,
      imageFile: null
    });
    setImagePreview(product.imageUrl);
    setShowEditModal(true);
  };

  const openAddModal = () => {
    resetForm();
    setShowAddModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FBE8F0] via-[#E8FFF4] to-[#EEF2FF]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-[#F3E9FF]">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#C9B6FF] to-[#FFD6E8] bg-clip-text text-transparent" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Trader Dashboard
            </h1>
            <div className="flex items-center gap-3">
              <Link href="/productlist">
                <button className="flex items-center gap-2 bg-gradient-to-r from-[#A8E6CF] to-[#C8F0FF] text-[#0f172a] px-5 py-2.5 rounded-lg hover:from-[#96e0bf] hover:to-[#bfeeff] transition-all duration-300 transform hover:scale-105 shadow-sm">
                  <Package size={20} />
                  PRODUCT LIST
                </button>
              </Link>
              <button
                onClick={openAddModal}
                className="flex items-center gap-2 bg-gradient-to-r from-[#FFD1DC] to-[#F8E1FF] text-[#0f172a] px-5 py-2.5 rounded-lg hover:from-[#ffc3cf] hover:to-[#f2d4ff] transition-all duration-300 transform hover:scale-105 shadow-sm"
              >
                <PlusCircle size={20} />
                ADD PRODUCT
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Products Grid */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-md border border-transparent hover:border-[#F3E9FF]"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
              }}
            >
              <div className="flex flex-col md:flex-row gap-4 p-6">
                {/* Product Image */}
                <div className="md:w-1/3 flex-shrink-0">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-64 md:h-full object-cover rounded-xl shadow-sm"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-[#1f2937] mb-2">
                      Product Name: <span className="text-[#374151]">{product.name}</span>
                    </h2>
                    <div className="flex gap-4 mb-3">
                      <p className="text-[#4b5563]">
                        <span className="font-semibold">Qty:</span> {product.quantity}
                      </p>
                      <p className="text-[#4b5563]">
                        <span className="font-semibold">Price:</span> {product.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="text-[#4b5563] mb-3">
                      <span className="font-semibold">Category:</span> {product.category}
                      {product.childCategory ? <span className="ml-2 text-sm text-[#6b7280]">/ {product.childCategory}</span> : null}
                    </p>
                    <p className="text-[#4b5563] text-sm leading-relaxed">
                      <span className="font-semibold">Desc:</span> {product.description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => openEditModal(product)}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#DDEBFF] to-[#EAF7FF] text-[#0f172a] px-4 py-2 rounded-lg hover:from-[#cfe0ff] hover:to-[#dff6ff] transition-all duration-300 transform hover:scale-105 shadow-sm"
                    >
                      <Edit size={18} />
                      EDIT
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#FFE6E6] to-[#FFF5E6] text-[#0f172a] px-4 py-2 rounded-lg hover:from-[#ffd5d5] hover:to-[#fff0da] transition-all duration-300 transform hover:scale-105 shadow-sm"
                    >
                      <Trash2 size={18} />
                      DELETE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 border border-[#F3E9FF]">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#1f2937]">Add Product</h2>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    resetForm();
                  }}
                  className="text-[#6b7280] hover:text-[#374151] transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">
                    Product Image
                  </label>
                  <div className="border-2 border-dashed border-[#E8F6F1] rounded-lg p-4 text-center hover:border-[#C9B6FF] transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="add-image-upload"
                    />
                    <label htmlFor="add-image-upload" className="cursor-pointer">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg mb-2" />
                      ) : (
                        <div className="flex flex-col items-center">
                          <Upload className="text-[#9CA3AF] mb-2" size={40} />
                          <p className="text-[#6b7280] text-sm">Click to upload image</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#E9EEF6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9B6FF] transition-all"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                {formData.category && (
                  <select
                    name="childCategory"
                    value={formData.childCategory || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#E9EEF6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9B6FF] transition-all mt-3"
                  >
                    <option value="">Select Subcategory</option>
                    {childCategories[formData.category]?.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                )}

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Product name"
                  className="w-full px-4 py-3 border border-[#E9EEF6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9B6FF] transition-all"
                />

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Price"
                  className="w-full px-4 py-3 border border-[#E9EEF6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9B6FF] transition-all"
                />

                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  placeholder="Quantity"
                  className="w-full px-4 py-3 border border-[#E9EEF6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9B6FF] transition-all"
                />

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Description"
                  rows={3}
                  className="w-full px-4 py-3 border border-[#E9EEF6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9B6FF] transition-all resize-none"
                />

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      resetForm();
                    }}
                    className="flex-1 px-6 py-3 border-2 border-[#E9EEF6] text-[#374151] rounded-lg hover:bg-[#FAFBFF] transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddProduct}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#FFD1DC] to-[#F8E1FF] text-[#0f172a] rounded-lg hover:from-[#ffc3cf] hover:to-[#f2d4ff] transition-all duration-300 transform hover:scale-105 shadow-sm"
                  >
                    ADD
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 border border-[#F3E9FF]">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#1f2937]">Edit Product</h2>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedProduct(null);
                    resetForm();
                  }}
                  className="text-[#6b7280] hover:text-[#374151] transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">
                    Change Product Image
                  </label>
                  <div className="border-2 border-dashed border-[#E8F6F1] rounded-lg p-4 text-center hover:border-[#C9B6FF] transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id="edit-image-upload"
                    />
                    <label htmlFor="edit-image-upload" className="cursor-pointer">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg mb-2" />
                      ) : (
                        <div className="flex flex-col items-center">
                          <Upload className="text-[#9CA3AF] mb-2" size={40} />
                          <p className="text-[#6b7280] text-sm">Click to change image</p>
                        </div>
                      )}
                    </label>
                  </div>
                </div>

                {/* Category + Subcategory (Edit) */}
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#E9EEF6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9B6FF] transition-all"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>

                {formData.category && (
                  <select
                    name="childCategory"
                    value={formData.childCategory || ""}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#E9EEF6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9B6FF] transition-all mt-3"
                  >
                    <option value="">Select Subcategory</option>
                    {childCategories[formData.category]?.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                )}

                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#E9EEF6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9B6FF] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">QTY</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#E9EEF6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9B6FF] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#E9EEF6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9B6FF] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#374151] mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-[#E9EEF6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9B6FF] transition-all resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedProduct(null);
                      resetForm();
                    }}
                    className="flex-1 px-6 py-3 border-2 border-[#D6EAFE] text-[#0f172a] rounded-lg hover:bg-[#F8FBFF] transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEditProduct}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#FFD1DC] to-[#F8E1FF] text-[#0f172a] rounded-lg hover:from-[#ffc3cf] hover:to-[#f2d4ff] transition-all duration-300 transform hover:scale-105 shadow-sm"
                  >
                    UPDATE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default TraderDashboard;