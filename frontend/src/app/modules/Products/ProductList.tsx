"use client";

import React, { useState, useMemo } from 'react';

// SVG Icons
const Search = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const Filter = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const ShoppingCart = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const Grid = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const List = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const X = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
  imageUrl: string;
  inStock: boolean;
}

const ProductList: React.FC = () => {
  // Sample Product Data
  const allProducts: Product[] = [
    {
      id: '1',
      name: '64 Crayon Colors',
      category: 'Crayons',
      price: 600,
      quantity: 240,
      description: 'Premium crayon tub with 240 vibrant colors for all your creative projects.',
      imageUrl: '/api/placeholder/300/300',
      inStock: true
    },
    {
      id: '2',
      name: 'Crayola Crayon Colors',
      category: 'Crayons',
      price: 360,
      quantity: 64,
      description: '64 beautiful Crayola crayon colors in a convenient storage box.',
      imageUrl: '/api/placeholder/300/300',
      inStock: true
    },
    {
      id: '3',
      name: 'Week Planner',
      category: 'Planners',
      price: 500,
      quantity: 5,
      description: 'Plan your week with our simple and efficient black and white themed planner.',
      imageUrl: '/api/placeholder/300/300',
      inStock: true
    },
    {
      id: '4',
      name: 'Magnetic Week Planner',
      category: 'Planners',
      price: 1850,
      quantity: 8,
      description: 'Transparent magnetic week planner to keep track of all your todos and reminders.',
      imageUrl: '/api/placeholder/300/300',
      inStock: true
    },
    {
      id: '5',
      name: 'Pastel Exam Board',
      category: 'Boards',
      price: 210,
      quantity: 10,
      description: 'Adorable clipboards, featuring lovely illustrations in soft pastel colors.',
      imageUrl: '/api/placeholder/300/300',
      inStock: true
    },
    {
      id: '6',
      name: 'Watercolor Paint Set',
      category: 'Paints',
      price: 899,
      quantity: 24,
      description: '24 vibrant watercolor paints perfect for artistic creations.',
      imageUrl: '/api/placeholder/300/300',
      inStock: true
    },
    {
      id: '7',
      name: 'Sketch Notebook',
      category: 'Notebooks',
      price: 299,
      quantity: 0,
      description: 'Premium quality sketch notebook with thick pages.',
      imageUrl: '/api/placeholder/300/300',
      inStock: false
    },
    {
      id: '8',
      name: 'Art Brush Set',
      category: 'Brushes',
      price: 550,
      quantity: 15,
      description: 'Professional artist brush set with 12 different sizes.',
      imageUrl: '/api/placeholder/300/300',
      inStock: true
    }
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  // Get unique categories
  const categories = useMemo(() => {
    const cats = Array.from(new Set(allProducts.map(p => p.category)));
    return ['All', ...cats];
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'stock':
          return b.quantity - a.quantity;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, priceRange, sortBy]);

  const addToCart = (productId: string) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const cartItemCount = Object.values(cart).reduce((sum, count) => sum + count, 0);

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(135deg,#FBE8F0 0%,#E8FFF4 50%,#EEF2FF 100%)' }}
    >
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-50 border-b" style={{ borderColor: '#F3E9FF' }}>
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-3xl font-bold text-black"> ArtyUs </h1>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#9CA3AF]" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg transition-all"
                  style={{
                    border: '1px solid #E9EEF6',
                    outline: 'none',
                    color: '#0f172a'
                  }}
                  onFocus={(e) => (e.currentTarget.style.boxShadow = '0 0 0 6px rgba(201,182,255,0.12)')}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
                />
              </div>
            </div>

            {/* Cart */}
            <button
              style={{ background: 'linear-gradient(90deg,#A8E6CF,#C8F0FF)', color: '#0f172a' }}
              className="relative flex items-center gap-2 px-6 py-3 rounded-lg hover:scale-105 transition-all duration-300 transform shadow-md"
            >
              <ShoppingCart size={20} className="text-[#0f172a]" />
              <span className="hidden sm:inline font-semibold">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF6B6B] text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24" style={{ border: '1px solid #F3E9FF' }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2 text-[#1f2937]">
                  <Filter size={20} className="text-[#0f172a]" />
                  Filters
                </h2>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-[#9CA3AF] hover:text-[#374151]"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-semibold text-[#374151] mb-3">Category</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all flex justify-between items-center`}
                      style={
                        selectedCategory === category
                          ? { background: 'linear-gradient(90deg,#FFD1DC,#F8E1FF)', color: '#0f172a' }
                          : { background: '#ffffff', color: '#374151', border: '1px solid #E9EEF6' }
                      }
                    >
                      <span>{category}</span>
                      <span className="text-sm opacity-75">
                        {category === 'All' 
                          ? allProducts.length 
                          : allProducts.filter(p => p.category === category).length
                        }
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-semibold text-[#374151] mb-3">Price Range</h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                    style={{ accentColor: '#C9B6FF' }}
                  />
                  <div className="flex justify-between text-sm" style={{ color: '#4b5563' }}>
                    <span>₹0</span>
                    <span className="font-semibold" style={{ color: '#0f172a' }}>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Sort By */}
              <div>
                <h3 className="font-semibold text-[#374151] mb-3">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg"
                  style={{ border: '1px solid #E9EEF6', outline: 'none' }}
                  onFocus={(e) => (e.currentTarget.style.boxShadow = '0 0 0 6px rgba(201,182,255,0.12)')}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="stock">In Stock</option>
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setPriceRange([0, 2000]);
                  setSortBy('name');
                }}
                className="w-full mt-6 px-4 py-2 rounded-lg transition-all"
                style={{ border: '2px solid #E9EEF6', color: '#374151', background: '#fff' }}
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
                >
                  <Filter size={20} className="text-[#0f172a]" />
                  Filters
                </button>
                <p style={{ color: '#4b5563' }}>
                  <span className="font-semibold" style={{ color: '#1f2937' }}>{filteredProducts.length}</span> products found
                </p>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2 bg-white rounded-lg shadow-md p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all`}
                  style={viewMode === 'grid' ? { background: 'linear-gradient(90deg,#FFD1DC,#F8E1FF)', color: '#0f172a' } : { color: '#4b5563' }}
                >
                  <Grid size={20} className={viewMode === 'grid' ? 'text-[#0f172a]' : 'text-[#9CA3AF]'} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all`}
                  style={viewMode === 'list' ? { background: 'linear-gradient(90deg,#FFD1DC,#F8E1FF)', color: '#0f172a' } : { color: '#4b5563' }}
                >
                  <List size={20} className={viewMode === 'list' ? 'text-[#0f172a]' : 'text-[#9CA3AF]'} />
                </button>
              </div>
            </div>

            {/* Products Display */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-[#9CA3AF] text-6xl mb-4">🎨</div>
                <h3 className="text-2xl font-bold text-[#1f2937] mb-2">No products found</h3>
                <p className="text-[#4b5563]">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }>
                {filteredProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className={`bg-white rounded-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02]`}
                    style={{
                      animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`,
                      border: '1px solid transparent'
                    }}
                  >
                    {/* Product Image */}
                    <div className={viewMode === 'list' ? 'sm:w-48 flex-shrink-0' : ''}>
                      <div className="relative">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className={`w-full object-cover ${viewMode === 'grid' ? 'h-64' : 'h-48 sm:h-full'}`}
                        />
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="bg-[#FF6B6B] text-white px-4 py-2 rounded-lg font-bold">
                              Out of Stock
                            </span>
                          </div>
                        )}
                        <span
                          className="absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold"
                          style={{ background: '#A8E6CF', color: '#0f172a' }}
                        >
                          {product.category}
                        </span>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className={`p-6 ${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : ''}`}>
                      <div>
                        <h3 className="text-xl font-bold mb-2" style={{ color: '#1f2937' }}>{product.name}</h3>
                        <p className="text-sm mb-4" style={{ color: '#4b5563' }}>
                          {product.description}
                        </p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className="text-3xl font-bold bg-clip-text text-transparent"
                            style={{ background: 'linear-gradient(90deg,#C9B6FF,#FFD6E8)' }}
                          >
                            ₹{product.price}
                          </span>
                          <span className="text-sm" style={{ color: '#4b5563' }}>
                            {product.quantity > 0 ? `${product.quantity} in stock` : 'Out of stock'}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => addToCart(product.id)}
                        disabled={!product.inStock}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 transform"
                        style={
                          product.inStock
                            ? { background: 'linear-gradient(90deg,#FFD1DC,#F8E1FF)', color: '#0f172a', boxShadow: '0 6px 18px rgba(20,20,30,0.04)' }
                            : { background: '#E5E7EB', color: '#9CA3AF', cursor: 'not-allowed' }
                        }
                      >
                        <ShoppingCart size={20} className={product.inStock ? 'text-[#0f172a]' : 'text-[#9CA3AF]'} />
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

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

export default ProductList;