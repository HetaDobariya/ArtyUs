"use client";

import React, { useState, useMemo, useEffect } from 'react';

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

const Edit = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const UserCheck = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="8.5" cy="7" r="4" />
    <polyline points="17 11 19 13 23 9" />
  </svg>
);

const Tools = ({ size = 24, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  is_trader: number;
  is_serviceprovider: number;
  is_verified: number;
  joinedDate?: string;
  role?: 'user' | 'trader' | 'serviceprovider';
  status?: 'active' | 'inactive';
}

interface Trader {
  user_id: string;
  user_name: string;
  email: string;
  user_address: string;
  user_contact: string;
  is_verified: number;
  trader_id: string;
  shop_name: string;
  shop_address: string;
  shop_contact: string;
  description: string;
}

interface ServiceProvider {
  user_id: string;
  user_name: string;
  email: string;
  user_address: string;
  user_contact: string;
  is_verified: number;
  service_provider_id: string;
  service_name: string;
  shop_name: string;
  service_address: string;
  description: string;
  contact: string;
}

interface UnverifiedTrader {
  user_id: string;
  user_name: string;
  email: string;
  contact: string;
  address: string;
  trader_id: string;
  shop_name: string;
  description: string;
  created_at: string;
}

interface UnverifiedServiceProvider {
  user_id: string;
  user_name: string;
  email: string;
  contact: string;
  address: string;
  service_provider_id: string;
  service_name: string;
  shop_name: string;
  description: string;
  created_at: string;
}

interface Product {
  id: string;
  product_name: string;
  qty: number;
  price: number;
  description: string;
  image_url: string;
  slug_name: string;
  child_category_name: string;
  trader_name: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  productCount: number;
  child_category_name?: string;
}

interface Slug {
  id: number;
  slug_name: string;
  child_category_name: string;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'traders' | 'serviceproviders' | 'products' | 'categories'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<any>(null);
  const [updateForm, setUpdateForm] = useState<any>({});
  const [categoryForm, setCategoryForm] = useState({ name: '', slug: '' });
  const [fetchedCategories, setFetchedCategories] = useState<{ id: string, name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  // Dynamic data states
  const [users, setUsers] = useState<User[]>([]);
  const [traders, setTraders] = useState<Trader[]>([]);
  const [serviceProviders, setServiceProviders] = useState<ServiceProvider[]>([]);
  const [unverifiedTraders, setUnverifiedTraders] = useState<UnverifiedTrader[]>([]);
  const [unverifiedServiceProviders, setUnverifiedServiceProviders] = useState<UnverifiedServiceProvider[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [slugs, setSlugs] = useState<Slug[]>([]);

  // Combined traders list (verified + unverified)
  const allTraders = useMemo(() => {
    const convertedUnverifiedTraders: Trader[] = unverifiedTraders.map(trader => ({
      user_id: trader.user_id,
      user_name: trader.user_name,
      email: trader.email,
      user_address: trader.address,
      user_contact: trader.contact,
      is_verified: 0,
      trader_id: trader.trader_id,
      shop_name: trader.shop_name,
      shop_address: trader.address,
      shop_contact: trader.contact,
      description: trader.description
    }));

    return [...traders, ...convertedUnverifiedTraders];
  }, [traders, unverifiedTraders]);

  // Combined service providers list (verified + unverified)
  const allServiceProviders = useMemo(() => {
  const convertedUnverifiedServiceProviders: ServiceProvider[] = unverifiedServiceProviders.map(provider => ({
    user_id: provider.user_id,
    user_name: provider.user_name,
    email: provider.email,
    user_address: provider.address,
    user_contact: provider.contact,
    is_verified: 0,
    service_provider_id: provider.service_provider_id,
    service_name: provider.service_name,
    shop_name: provider.shop_name,
    service_address: provider.address,
    description: provider.description,
    contact: provider.contact
  }));

  return [...serviceProviders, ...convertedUnverifiedServiceProviders];
}, [serviceProviders, unverifiedServiceProviders]);

  // Fetch all data on component mount
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchUsers(),
          fetchTraders(),
          fetchServiceProviders(),
          fetchUnverifiedTraders(),
          
          fetchProducts(),
          fetchSlugs(),
          fetchCategories()
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // API functions
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/admin/user-details`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const usersData: User[] = data.data.map((user: any) => ({
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            address: user.address,
            is_trader: user.is_trader,
            is_serviceprovider: user.is_serviceprovider,
            is_verified: user.is_verified,
            role: user.is_serviceprovider ? 'serviceprovider' : user.is_trader ? 'trader' : 'user',
            status: 'active'
          }));
          setUsers(usersData);
        }
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchTraders = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/admin/trader-details`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setTraders(data.data || []);
        }
      }
    } catch (error) {
      console.error("Error fetching traders:", error);
    }
  };

  const fetchServiceProviders = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/admin/serviceprovider-details`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setServiceProviders(data.data || []);
        }
      }
    } catch (error) {
      console.error("Error fetching service providers:", error);
    }
  };

  const fetchUnverifiedTraders = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/trader/trader-details/unverified`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setUnverifiedTraders(data.data || []);
        }
      }
    } catch (error) {
      console.error("Error fetching unverified traders:", error);
    }
  };

  const fetchUnverifiedServiceProviders = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/serviceprovider/service-details/unverified`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setUnverifiedServiceProviders(data.data || []);
        }
      }
    } catch (error) {
      console.error("Error fetching unverified service providers:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/product/getproducts`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setProducts(data.data || []);
        }
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchSlugs = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/category/getSlugs`, {
        credentials: 'include'
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setSlugs(data.data || []);
          
          const categoriesData: Category[] = data.data.map((slug: Slug) => ({
            id: slug.id.toString(),
            name: slug.child_category_name,
            slug: slug.slug_name,
            productCount: 0,
            child_category_name: slug.child_category_name
          }));
          setCategories(categoriesData);
        }
      }
    } catch (error) {
      console.error("Error fetching slugs:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/category/getChildCategory`, {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
      }

      const data = await response.json();
      let categoriesArray = null;

      if (data.success) {
        if (data.data && data.data.data && Array.isArray(data.data.data)) {
          categoriesArray = data.data.data;
        } else if (data.data && Array.isArray(data.data)) {
          categoriesArray = data.data;
        }
      }

      if (categoriesArray) {
        setFetchedCategories(categoriesArray);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Stats - Updated to use dynamic data
  const stats = {
  totalUsers: users.length,
  totalTraders: allTraders.length,
  totalServiceProviders: serviceProviders.length, // Changed from allServiceProviders to serviceProviders
  totalProducts: products.length,
  totalCategories: categories.length,
};

  // Filtered Data
  const filteredUsers = useMemo(() =>
    users.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase())),
    [users, searchQuery]
  );

  const filteredTraders = useMemo(() =>
    allTraders.filter(t => t.user_name.toLowerCase().includes(searchQuery.toLowerCase()) || t.email.toLowerCase().includes(searchQuery.toLowerCase())),
    [allTraders, searchQuery]
  );

 const filteredServiceProviders = useMemo(() =>
  serviceProviders.filter(s => s.user_name.toLowerCase().includes(searchQuery.toLowerCase()) || s.email.toLowerCase().includes(searchQuery.toLowerCase())),
  [serviceProviders, searchQuery]
);

  const filteredProducts = useMemo(() =>
    products.filter(p => p.product_name.toLowerCase().includes(searchQuery.toLowerCase()) || p.trader_name.toLowerCase().includes(searchQuery.toLowerCase())),
    [products, searchQuery]
  );

  const filteredCategories = useMemo(() =>
    categories.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.slug.toLowerCase().includes(searchQuery.toLowerCase())),
    [categories, searchQuery]
  );

  // Actions
  const handleDeleteUser = async (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/admin/user-details/delete/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        
        if (response.ok) {
          setUsers(prev => prev.filter(u => u.id !== id));
          alert('User deleted successfully');
        } else {
          alert('Failed to delete user');
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert('Error deleting user');
      }
    }
  };

  const handleDeleteTrader = async (id: string) => {
    if (confirm('Are you sure you want to delete this trader?')) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/admin/trader-details/delete/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        
        if (response.ok) {
          setTraders(prev => prev.filter(t => t.trader_id !== id));
          setUnverifiedTraders(prev => prev.filter(t => t.trader_id !== id));
          alert('Trader deleted successfully');
        } else {
          alert('Failed to delete trader');
        }
      } catch (error) {
        console.error("Error deleting trader:", error);
        alert('Error deleting trader');
      }
    }
  };

  const handleDeleteServiceProvider = async (id: string) => {
    if (confirm('Are you sure you want to delete this service provider?')) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/admin/serviceprovider-details/delete/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        
        if (response.ok) {
          setServiceProviders(prev => prev.filter(s => s.service_provider_id !== id));
          setUnverifiedServiceProviders(prev => prev.filter(s => s.service_provider_id !== id));
          alert('Service Provider deleted successfully');
        } else {
          alert('Failed to delete service provider');
        }
      } catch (error) {
        console.error("Error deleting service provider:", error);
        alert('Error deleting service provider');
      }
    }
  };

  const handleVerifyTrader = async (userId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/trader/trader-details/verify/${userId}`, {
        method: 'PUT',
        credentials: 'include'
      });
      
      if (response.ok) {
        setUnverifiedTraders(prev => prev.filter(t => t.user_id !== userId));
        await fetchTraders();
        alert('Trader verified successfully');
      } else {
        alert('Failed to verify trader');
      }
    } catch (error) {
      console.error("Error verifying trader:", error);
      alert('Error verifying trader');
    }
  };

  const handleVerifyServiceProvider = async (userId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/serviceprovider/service-details/verify/${userId}`, {
        method: 'PUT',
        credentials: 'include'
      });
      
      if (response.ok) {
        setUnverifiedServiceProviders(prev => prev.filter(s => s.user_id !== userId));
        await fetchServiceProviders();
        alert('Service Provider verified successfully');
      } else {
        alert('Failed to verify service provider');
      }
    } catch (error) {
      console.error("Error verifying service provider:", error);
      alert('Error verifying service provider');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/product/delete/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        
        if (response.ok) {
          setProducts(prev => prev.filter(p => p.id !== id));
          alert('Product deleted successfully');
        } else {
          alert('Failed to delete product');
        }
      } catch (error) {
        console.error("Error deleting product:", error);
        alert('Error deleting product');
      }
    }
  };

  const handleUpdateEntity = async () => {
    try {
      let response;
      const entityType = selectedEntity?.trader_id ? 'trader' : 
                        selectedEntity?.service_provider_id ? 'serviceprovider' :
                        selectedEntity?.product_name ? 'product' : 'user';
      
      if (entityType === 'user') {
        response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/admin/user-details/update/${selectedEntity.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(updateForm)
        });
      } else if (entityType === 'trader') {
        response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/admin/trader-details/update/${selectedEntity.trader_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(updateForm)
        });
      } else if (entityType === 'serviceprovider') {
        response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/admin/serviceprovider-details/update/${selectedEntity.service_provider_id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(updateForm)
        });
      } else if (entityType === 'product') {
        const { qty, price } = updateForm;
        response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/product/update/${selectedEntity.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ qty, price })
        });
      }

      if (response?.ok) {
        if (entityType === 'user') await fetchUsers();
        if (entityType === 'trader') await fetchTraders();
        if (entityType === 'serviceprovider') await fetchServiceProviders();
        if (entityType === 'product') await fetchProducts();
        
        setShowUpdateModal(false);
        setUpdateForm({});
        setSelectedEntity(null);
        alert(`${entityType.charAt(0).toUpperCase() + entityType.slice(1)} updated successfully`);
      } else {
        alert(`Failed to update ${entityType}`);
      }
    } catch (error) {
      console.error(`Error updating entity:`, error);
      alert(`Error updating entity`);
    }
  };

  const handleAddCategory = async () => {
    try {
      console.log("Selected Category Name:", categoryForm.name);
      console.log("Slug Entered:", categoryForm.slug);
      const payload = {
        category_name: categoryForm.name,
        slug_name: categoryForm.slug,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/admin/add-slugs`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          credentials:'include'
        }
      );
      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Something went wrong while adding the category.');
        return;
      }

      alert('Category added successfully!');
      
      await fetchSlugs();
      
      setCategoryForm({ name: '', slug: '' });
      setShowCategoryModal(false);

    } catch (error) {
      console.error('Error while adding category:', error);
      alert('Failed to connect to server. Please try again.');
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        setCategories(prev => prev.filter(c => c.id !== id));
        alert('Category deleted successfully');
      } catch (error) {
        console.error("Error deleting category:", error);
        alert('Error deleting category');
      }
    }
  };

  const viewDetails = (entity: any) => {
    setSelectedEntity(entity);
    setShowDetailsModal(true);
  };

  const openUpdateModal = (entity: any) => {
    setSelectedEntity(entity);
    setUpdateForm(entity);
    setShowUpdateModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#FAF9F6' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: '#FAF9F6' }}
    >
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-40" style={{ borderBottom: '1px solid #F3E9FF' }}>
        <div className="container mx-auto px-6 py-4">
          <h1 className="text-3xl font-bold text-black text-center"> Admin Dashboard </h1>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Stats Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:scale-105"
              style={{ border: '1px solid transparent', boxShadow: '0 6px 18px rgba(20,20,30,0.04)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#4b5563] text-sm font-medium">Total Users</p>
                  <p className="text-3xl font-bold" style={{ color: '#1f2937' }}>{stats.totalUsers}</p>
                </div>
                <div className="p-4 rounded-full" style={{ background: '#E0F4F8' }}>
                  <Users className="text-[#8BBF9F]" size={32} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:scale-105"
              style={{ border: '1px solid transparent', boxShadow: '0 6px 18px rgba(20,20,30,0.04)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#4b5563] text-sm font-medium">Total Traders</p>
                  <p className="text-3xl font-bold" style={{ color: '#1f2937' }}>{stats.totalTraders}</p>
                </div>
                <div className="p-4 rounded-full" style={{ background: '#FDEBEC' }}>
                  <Store className="text-[#6E9BBF]" size={32} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:scale-105"
              style={{ border: '1px solid transparent', boxShadow: '0 6px 18px rgba(20,20,30,0.04)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#4b5563] text-sm font-medium">Service Providers</p>
                  <p className="text-3xl font-bold" style={{ color: '#1f2937' }}>{stats.totalServiceProviders}</p>
                </div>
                <div className="p-4 rounded-full" style={{ background: '#F7F3E8' }}>
                  <Tools className="text-[#A8E6CF]" size={32} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:scale-105"
              style={{ border: '1px solid transparent', boxShadow: '0 6px 18px rgba(20,20,30,0.04)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#4b5563] text-sm font-medium">Total Products</p>
                  <p className="text-3xl font-bold" style={{ color: '#1f2937' }}>{stats.totalProducts}</p>
                </div>
                <div className="p-4 rounded-full" style={{ background: '#EAF6ED' }}>
                  <Package className="text-[#8BBF9F]" size={32} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-6" style={{ border: '1px solid #F3E9FF' }}>
          <div className="flex flex-wrap gap-2">
            {['overview', 'users', 'traders', 'serviceproviders', 'products', 'categories'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className="flex-1 min-w-[120px] px-6 py-3 rounded-lg font-medium transition-all"
                style={
                  activeTab === tab
                    ? { background: '#FDEBEC', color: '#1F2937' }
                    : { color: '#374151', background: 'transparent' }
                }
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace('serviceproviders', 'Service Providers')}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        {activeTab !== 'overview' && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6" style={{ border: '1px solid #F3E9FF' }}>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2" size={20} />
                <input
                  type="text"
                  placeholder={`Search ${activeTab === 'serviceproviders' ? 'service providers' : activeTab}...`}
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
              {activeTab === 'categories' && (
                <button
                  onClick={() => setShowCategoryModal(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all"
                  style={{ background: '#1F2937', color: '#FFFFFF', boxShadow: '0 6px 18px rgba(20,20,30,0.04)' }}
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
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ border: '1px solid #F3E9FF' }}>
            {filteredUsers.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No users found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead style={{ background: '#FDEBEC', color: '#1F2937' }}>
                    <tr>
                      <th className="px-6 py-4 text-left">Name</th>
                      <th className="px-6 py-4 text-left">Email</th>
                      <th className="px-6 py-4 text-left">Address</th>
                      <th className="px-6 py-4 text-left">Type</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-white/60">
                        <td className="px-6 py-4 font-medium" style={{ color: '#1f2937' }}>{user.name}</td>
                        <td className="px-6 py-4" style={{ color: '#4b5563' }}>{user.email}</td>
                        <td className="px-6 py-4" style={{ color: '#4b5563' }}>{user.address || 'N/A'}</td>
                        <td className="px-6 py-4">
                          <span style={{
                            padding: '6px 12px',
                            borderRadius: 999,
                            fontSize: 12,
                            background: user.is_serviceprovider ? '#EAF6ED' : user.is_trader ? '#FDEBEC' : '#F3F4F6',
                            color: user.is_serviceprovider ? '#1f7a3a' : user.is_trader ? '#dc2626' : '#6b7280'
                          }}>
                            {user.is_serviceprovider ? 'Service Provider' : user.is_trader ? 'Trader' : 'User'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => viewDetails(user)}
                              className="p-2 rounded-lg transition-all"
                              style={{ color: '#6E9BBF', background: 'transparent' }}
                            >
                              <Eye size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="p-2 rounded-lg transition-all"
                              style={{ color: '#ff6b6b', background: 'transparent' }}
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
            )}
          </div>
        )}

        {/* Traders Tab (Combined Verified + Unverified) */}
        {activeTab === 'traders' && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ border: '1px solid #F3E9FF' }}>
            {filteredTraders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No traders found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead style={{ background: '#FDEBEC', color: '#1F2937' }}>
                    <tr>
                      <th className="px-6 py-4 text-left">Trader Name</th>
                      <th className="px-6 py-4 text-left">Email</th>
                      <th className="px-6 py-4 text-left">Shop Name</th>
                      <th className="px-6 py-4 text-left">Contact</th>
                      <th className="px-6 py-4 text-left">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTraders.map((trader) => (
                      <tr key={trader.trader_id} className="border-b hover:bg-white/60">
                        <td className="px-6 py-4 font-medium" style={{ color: '#1f2937' }}>{trader.user_name}</td>
                        <td className="px-6 py-4" style={{ color: '#4b5563' }}>{trader.email}</td>
                        <td className="px-6 py-4" style={{ color: '#4b5563' }}>{trader.shop_name}</td>
                        <td className="px-6 py-4" style={{ color: '#4b5563' }}>{trader.shop_contact}</td>
                        <td className="px-6 py-4">
                          {trader.is_verified ? (
                            <span className="flex items-center gap-1" style={{ color: '#8BBF9F' }}>
                              <CheckCircle size={18} /> Verified
                            </span>
                          ) : (
                            <span className="flex items-center gap-1" style={{ color: '#F59E0B' }}>
                              <XCircle size={18} /> Unverified
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => viewDetails(trader)}
                              className="p-2 rounded-lg transition-all"
                              style={{ color: '#6E9BBF' }}
                            >
                              <Eye size={18} />
                            </button>
                            {!trader.is_verified && (
                              <button
                                onClick={() => handleVerifyTrader(trader.user_id)}
                                className="p-2 rounded-lg transition-all"
                                style={{ color: '#8BBF9F' }}
                              >
                                <UserCheck size={18} />
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteTrader(trader.trader_id)}
                              className="p-2 rounded-lg transition-all"
                              style={{ color: '#ff6b6b' }}
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
            )}
          </div>
        )}

        {/* Service Providers Tab (Combined Verified + Unverified) */}
        {activeTab === 'serviceproviders' && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ border: '1px solid #F3E9FF' }}>
            {filteredServiceProviders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No service providers found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead style={{ background: '#FDEBEC', color: '#1F2937' }}>
                    <tr>
                      <th className="px-6 py-4 text-left">Provider Name</th>
                      <th className="px-6 py-4 text-left">Email</th>
                      <th className="px-6 py-4 text-left">Shop Name</th>
                      <th className="px-6 py-4 text-left">Services</th>
                      <th className="px-6 py-4 text-left">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredServiceProviders.map((provider) => (
                      <tr key={provider.service_provider_id} className="border-b hover:bg-white/60">
                        <td className="px-6 py-4 font-medium" style={{ color: '#1f2937' }}>{provider.user_name}</td>
                        <td className="px-6 py-4" style={{ color: '#4b5563' }}>{provider.email}</td>
                        <td className="px-6 py-4" style={{ color: '#4b5563' }}>{provider.shop_name}</td>
                        <td className="px-6 py-4" style={{ color: '#4b5563' }}>
                          <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                            {provider.service_name}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {provider.is_verified ? (
                            <span className="flex items-center gap-1" style={{ color: '#8BBF9F' }}>
                              <CheckCircle size={18} /> Verified
                            </span>
                          ) : (
                            <span className="flex items-center gap-1" style={{ color: '#F59E0B' }}>
                              <XCircle size={18} /> Unverified
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => viewDetails(provider)}
                              className="p-2 rounded-lg transition-all"
                              style={{ color: '#6E9BBF' }}
                            >
                              <Eye size={18} />
                            </button>
                            {!provider.is_verified && (
                              <button
                                onClick={() => handleVerifyServiceProvider(provider.user_id)}
                                className="p-2 rounded-lg transition-all"
                                style={{ color: '#8BBF9F' }}
                              >
                                <UserCheck size={18} />
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteServiceProvider(provider.service_provider_id)}
                              className="p-2 rounded-lg transition-all"
                              style={{ color: '#ff6b6b' }}
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
            )}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ border: '1px solid #F3E9FF' }}>
            {filteredProducts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No products found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead style={{ background: '#FDEBEC', color: '#1F2937' }}>
                    <tr>
                      <th className="px-6 py-4 text-left">Product Name</th>
                      <th className="px-6 py-4 text-left">Category</th>
                      <th className="px-6 py-4 text-left">Price</th>
                      <th className="px-6 py-4 text-left">Quantity</th>
                      <th className="px-6 py-4 text-left">Trader</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-white/60">
                        <td className="px-6 py-4 font-medium" style={{ color: '#1f2937' }}>{product.product_name}</td>
                        <td className="px-6 py-4" style={{ color: '#4b5563' }}>{product.child_category_name}</td>
                        <td className="px-6 py-4" style={{ color: '#4b5563' }}>₹{product.price}</td>
                        <td className="px-6 py-4" style={{ color: '#4b5563' }}>{product.qty}</td>
                        <td className="px-6 py-4" style={{ color: '#4b5563' }}>{product.trader_name}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => viewDetails(product)}
                              className="p-2 rounded-lg transition-all"
                              style={{ color: '#6E9BBF' }}
                            >
                              <Eye size={18} />
                            </button>
                            <button
                              onClick={() => openUpdateModal(product)}
                              className="p-2 rounded-lg transition-all"
                              style={{ color: '#8BBF9F' }}
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-2 rounded-lg transition-all"
                              style={{ color: '#ff6b6b' }}
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
            )}
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.length === 0 ? (
              <div className="col-span-full text-center py-8 text-gray-500">
                No categories found
              </div>
            ) : (
              filteredCategories.map((category) => (
                <div key={category.id} className="bg-white rounded-2xl shadow-lg p-6 transform transition-all hover:scale-105" style={{ border: '1px solid #F3E9FF' }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-full" style={{ background: '#EAF6ED' }}>
                      <Tag className="text-[#8BBF9F]" size={24} />
                    </div>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="p-2 rounded-lg transition-all"
                      style={{ color: '#ff6b6b' }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#1f2937' }}>{category.name}</h3>
                  <p className="text-sm mb-2" style={{ color: '#4b5563' }}>Slug: <span className="font-mono" style={{ background: '#F8FAFB', padding: '4px 8px', borderRadius: 6 }}>{category.slug}</span></p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Add Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" style={{ border: '1px solid #F3E9FF' }}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold" style={{ color: '#1f2937' }}>Add Category</h2>
                <button
                  onClick={() => setShowCategoryModal(false)}
                  className="text-[#6b7280] hover:text-[#374151]"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>Category Name</label>
                 <select
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg transition-all"
                  style={{ border: '1px solid #E9EEF6', outline: 'none', color: '#0f172a', background: '#fff' }}
                  onFocus={(e) => (e.currentTarget.style.boxShadow = '0 0 0 6px rgba(201,182,255,0.12)')}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
                >
                  <option value="" disabled>Select a category</option>
                  {fetchedCategories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
              </select>

                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>Slug</label>
                  <input
                    type="text"
                    value={categoryForm.slug}
                    onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
                    placeholder="e.g., art-supplies"
                    className="w-full px-4 py-3 rounded-lg transition-all"
                    style={{ border: '1px solid #E9EEF6', outline: 'none', color: '#0f172a' }}
                    onFocus={(e) => (e.currentTarget.style.boxShadow = '0 0 0 6px rgba(201,182,255,0.12)')}
                    onBlur={(e) => (e.currentTarget.style.boxShadow = 'none')}
                  />
                  <p className="text-xs mt-1" style={{ color: '#6b7280' }}>Use lowercase with hyphens</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowCategoryModal(false)}
                    className="flex-1 px-6 py-3 rounded-lg transition-all"
                    style={{ border: '2px solid #E9EEF6', color: '#374151', background: '#fff' }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddCategory}
                    className="flex-1 px-6 py-3 rounded-lg transition-all"
                    style={{ background: '#1F2937', color: '#FFFFFF', boxShadow: '0 6px 18px rgba(20,20,30,0.04)' }}>
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && selectedEntity && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" style={{ border: '1px solid #F3E9FF' }}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold" style={{ color: '#1f2937' }}>
                  Update {selectedEntity.trader_id ? 'Trader' : 
                         selectedEntity.service_provider_id ? 'Service Provider' : 
                         selectedEntity.product_name ? 'Product' : 'User'}
                </h2>
                <button
                  onClick={() => setShowUpdateModal(false)}
                  className="text-[#6b7280] hover:text-[#374151]"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                {selectedEntity.trader_id ? (
                  // Trader update form
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}></label>
                      <input
                        type="text"
                        value={updateForm.shop_name || ''}
                        onChange={(e) => setUpdateForm({ ...updateForm, shop_name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg transition-all"
                        style={{ border: '1px solid #E9EEF6', outline: 'none', color: '#0f172a' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>Shop Contact</label>
                      <input
                        type="text"
                        value={updateForm.shop_contact || ''}
                        onChange={(e) => setUpdateForm({ ...updateForm, shop_contact: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg transition-all"
                        style={{ border: '1px solid #E9EEF6', outline: 'none', color: '#0f172a' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>Description</label>
                      <textarea
                        value={updateForm.description || ''}
                        onChange={(e) => setUpdateForm({ ...updateForm, description: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg transition-all"
                        style={{ border: '1px solid #E9EEF6', outline: 'none', color: '#0f172a' }}
                        rows={3}
                      />
                    </div>
                  </>
                ) : selectedEntity.service_provider_id ? (
                  // Service Provider update form
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>Shop Name</label>
                      <input
                        type="text"
                        value={updateForm.shop_name || ''}
                        onChange={(e) => setUpdateForm({ ...updateForm, shop_name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg transition-all"
                        style={{ border: '1px solid #E9EEF6', outline: 'none', color: '#0f172a' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>Service Name</label>
                      <input
                        type="text"
                        value={updateForm.service_name || ''}
                        onChange={(e) => setUpdateForm({ ...updateForm, service_name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg transition-all"
                        style={{ border: '1px solid #E9EEF6', outline: 'none', color: '#0f172a' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>Contact</label>
                      <input
                        type="text"
                        value={updateForm.contact || ''}
                        onChange={(e) => setUpdateForm({ ...updateForm, contact: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg transition-all"
                        style={{ border: '1px solid #E9EEF6', outline: 'none', color: '#0f172a' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>Description</label>
                      <textarea
                        value={updateForm.description || ''}
                        onChange={(e) => setUpdateForm({ ...updateForm, description: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg transition-all"
                        style={{ border: '1px solid #E9EEF6', outline: 'none', color: '#0f172a' }}
                        rows={3}
                      />
                    </div>
                  </>
                ) : selectedEntity.product_name ? (
                  // Product update form
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>Quantity</label>
                      <input
                        type="number"
                        value={updateForm.qty || ''}
                        onChange={(e) => setUpdateForm({ ...updateForm, qty: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 rounded-lg transition-all"
                        style={{ border: '1px solid #E9EEF6', outline: 'none', color: '#0f172a' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>Price</label>
                      <input
                        type="number"
                        step="0.01"
                        value={updateForm.price || ''}
                        onChange={(e) => setUpdateForm({ ...updateForm, price: parseFloat(e.target.value) })}
                        className="w-full px-4 py-3 rounded-lg transition-all"
                        style={{ border: '1px solid #E9EEF6', outline: 'none', color: '#0f172a' }}
                      />
                    </div>
                  </>
                ) : (
                  // User update form
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>Name</label>
                      <input
                        type="text"
                        value={updateForm.name || ''}
                        onChange={(e) => setUpdateForm({ ...updateForm, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg transition-all"
                        style={{ border: '1px solid #E9EEF6', outline: 'none', color: '#0f172a' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>Email</label>
                      <input
                        type="email"
                        value={updateForm.email || ''}
                        onChange={(e) => setUpdateForm({ ...updateForm, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg transition-all"
                        style={{ border: '1px solid #E9EEF6', outline: 'none', color: '#0f172a' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: '#374151' }}>Address</label>
                      <input
                        type="text"
                        value={updateForm.address || ''}
                        onChange={(e) => setUpdateForm({ ...updateForm, address: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg transition-all"
                        style={{ border: '1px solid #E9EEF6', outline: 'none', color: '#0f172a' }}
                      />
                    </div>
                  </>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowUpdateModal(false)}
                    className="flex-1 px-6 py-3 rounded-lg transition-all"
                    style={{ border: '2px solid #E9EEF6', color: '#374151', background: '#fff' }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateEntity}
                    className="flex-1 px-6 py-3 rounded-lg transition-all"
                    style={{ background: '#1F2937', color: '#FFFFFF', boxShadow: '0 6px 18px rgba(20,20,30,0.04)' }}>
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedEntity && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" style={{ border: '1px solid #F3E9FF' }}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold" style={{ color: '#1f2937' }}>Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-[#6b7280] hover:text-[#374151]"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-3">
                {Object.entries(selectedEntity).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b" style={{ borderColor: '#F3E9FF' }}>
                    <span className="font-medium" style={{ color: '#374151', textTransform: 'capitalize' }}>
                      {key.replace(/_/g, ' ')}:
                    </span>
                    <span style={{ color: '#4b5563' }}>{String(value || 'N/A')}</span>
                  </div>
                ))}
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

export default AdminDashboard;