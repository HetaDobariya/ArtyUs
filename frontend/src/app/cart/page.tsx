'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface CartItem {
  id: number;
  product_id: number;
  product_name: string;
  image_url: string;
  price: number;
  qty: number;
  available_stock: number;
}

interface CartSummary {
  subtotal: number;
  totalItems: number;
  shipping: number;
  total: number;
}

interface User {
  id: number;
  email: string;
  name: string;
  // Add other user fields as needed
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [summary, setSummary] = useState<CartSummary>({
    subtotal: 0,
    totalItems: 0,
    shipping: 0,
    total: 0,
  });
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      console.log('Checking authentication...');
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/user/current-user`, {
        method: 'GET',
        credentials: 'include', // This sends cookies
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Auth response status:', response.status);
      
      const data = await response.json();
      console.log('Auth response data:', data);

      if (response.ok) {
        // Handle your backend response format
        if (data.user) {
          // User is authenticated
          setUser(data.user);
          fetchCartItems();
        } else {
          // User not authenticated based on your backend response
          console.log('No user found, redirecting to login');
          router.push('/modules/auth/SignIn');
        }
      } else {
        // API call failed
        console.log('API call failed, redirecting to login');
        router.push('/modules/auth/SignIn');
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      router.push('/modules/auth/SignIn');
    } finally {
      setAuthLoading(false);
    }
  };

  const fetchCartItems = async () => {
    try {
      console.log('Fetching cart items...');
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/cart/my-cart`, {
        method: 'GET',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Cart response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Cart response data:', data);
        
        if (data.success) {
          setCartItems(data.data.items || []);
          setSummary(data.data.summary || {
            subtotal: 0,
            totalItems: 0,
            shipping: 0,
            total: 0,
          });
        } else {
          setError('Failed to load cart items');
        }
      } else {
        // Handle different error statuses
        if (response.status === 401) {
          console.log('Unauthorized, redirecting to login');
          router.push('/modules/auth/SignIn');
          return;
        }
        setError('Failed to fetch cart');
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
      if (error instanceof Error && error.message.includes('Unauthorized')) {
        router.push('/modules/auth/SignIn');
        return;
      }
      setError('Failed to load cart items');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: number, newQty: number) => {
    if (newQty <= 0) {
      removeItem(itemId);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/cart/update/${itemId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qty: newQty }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          await fetchCartItems();
        } else {
          alert(data.error || 'Failed to update quantity');
        }
      } else {
        if (response.status === 401) {
          router.push('/modules/auth/SignIn');
          return;
        }
        const data = await response.json();
        alert(data.error || 'Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity');
    }
  };

  const removeItem = async (itemId: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/cart/remove/${itemId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          await fetchCartItems();
        } else {
          alert('Failed to remove item');
        }
      } else {
        if (response.status === 401) {
          router.push('/modules/auth/SignIn');
          return;
        }
        alert('Failed to remove item');
      }
    } catch (error) {
      console.error('Error removing item:', error);
      alert('Failed to remove item');
    }
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Show loading while fetching cart data
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  // Show error or empty cart
  if (error || cartItems.length === 0) {
    return (
      <div className="bg-white min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 pt-24">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Shopping Cart</h1>
            <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-gray-600 mb-6 text-lg">
                {error || 'Your cart is empty'}
              </p>
              <Link 
                href="/" 
                className="inline-block bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 pt-24">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-6 border border-gray-200 rounded-lg p-6 bg-white hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0">
                    <Image
                      src={item.image_url || '/api/placeholder/120/120'}
                      alt={item.product_name}
                      width={120}
                      height={120}
                      className="object-cover rounded-lg border border-gray-200"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/api/placeholder/120/120';
                      }}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">{item.product_name}</h3>
                    <p className="text-xl font-bold text-gray-900 mt-2">₹{item.price.toFixed(2)}</p>
                    
                    <div className="flex items-center gap-4 mt-4 flex-wrap">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.qty - 1)}
                          className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 transition-colors"
                          disabled={item.qty <= 1}
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-medium">{item.qty}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.qty + 1)}
                          disabled={item.qty >= item.available_stock}
                          className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                    
                    {item.available_stock < 10 && (
                      <p className="text-sm text-orange-600 mt-2">
                        Only {item.available_stock} left in stock
                      </p>
                    )}
                  </div>
                  
                  <div className="text-right min-w-[100px]">
                    <p className="text-xl font-bold text-gray-900">
                      ₹{(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-24 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({summary.totalItems} items)</span>
                  <span className="font-semibold">₹{summary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {summary.shipping === 0 ? 'Free' : `₹${summary.shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-gray-300 pt-3 mt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">₹{summary.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <Link
                href="/checkout"
                className="block w-full bg-black text-white text-center py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors mb-3"
              >
                Proceed to Checkout
              </Link>
              
              <Link
                href="/"
                className="block w-full text-center py-2 text-gray-600 hover:text-gray-900 transition-colors font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}