'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description: string;
  image: string;
  company: string;
  details: string;
  product_name?: string;
  image_url?: string;
  qty?: number;
}

const API_URL = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:8000';

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const [category, setCategory] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    params.then((p) => {
      setCategory(p.category);
      setId(p.id);
    });
  }, [params]);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      // Try multiple API endpoints
      let response = await fetch(`${API_URL}/product/${id}`, {
        credentials: 'include',
      });
      
      if (!response.ok) {
        // Try without /api prefix
        response = await fetch(`${API_URL}/product/${id}`, {
          credentials: 'include',
        });
      }

      if (response.ok) {
        const result = await response.json();
        
        if (result.success && result.data) {
          // Transform the product data to match our interface
          const productData = result.data;
          setProduct({
            id: productData.id,
            name: productData.product_name || productData.name,
            price: productData.price,
            quantity: productData.qty || productData.quantity,
            description: productData.description || '',
            image: productData.image_url || productData.image || '/api/placeholder/500/500',
            company: productData.company || '',
            details: productData.details || productData.description || '',
          });
        } else if (result.id) {
          // Direct product object
          setProduct({
            id: result.id,
            name: result.product_name || result.name,
            price: result.price,
            quantity: result.qty || result.quantity,
            description: result.description || '',
            image: result.image_url || result.image || '/api/placeholder/500/500',
            company: result.company || '',
            details: result.details || result.description || '',
          });
        }
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      router.push('/modules/auth/SignIn');
      return;
    }

    if (!product) return;

    setAddingToCart(true);
    try {
      const response = await fetch(`${API_URL}/cart/add`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: product.id,
          qty: quantity,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('Product added to cart successfully!');
        // router.push('/cart');
      } else {
        alert(data.error || 'Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart. Please try again.');
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    if (!user) {
      router.push('/modules/auth/SignIn');
      return;
    }

    if (!product) return;

    setAddingToCart(true);
    try {
      const response = await fetch(`${API_URL}/cart/add`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: product.id,
          qty: quantity,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        router.push('/checkout');
      } else {
        alert(data.error || 'Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart. Please try again.');
    } finally {
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-4">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href={`/${category}`} className="text-blue-600 hover:underline">
            ← Back to {category.replace(/-/g, ' ')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div className="flex items-start justify-center lg:justify-start">
            <div className="w-full max-w-lg">
              <Image
                src={product.image}
                alt={product.name}
                className="object-contain w-full rounded-lg"
                height={500}
                width={500}
                priority
              />
            </div>
          </div>

          <div className="flex flex-col space-y-8">
            <div className="space-y-6">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {product.name.toUpperCase()}
              </h1>

              <div className="space-y-4">
                <div>
                  <p className="text-4xl font-bold text-gray-900">
                    ₹{product.price.toFixed(2)}
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-700">Quantity:</label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                      disabled={quantity >= product.quantity}
                      className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({product.quantity} available)
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={addingToCart}
                    className="flex-1 px-8 py-3 bg-white border-2 border-black text-black font-semibold rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 disabled:opacity-50"
                  >
                    {addingToCart ? 'Adding...' : 'ADD TO CART'}
                  </button>
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    disabled={addingToCart}
                    className="flex-1 px-8 py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 disabled:opacity-50"
                  >
                    {addingToCart ? 'Processing...' : 'BUY NOW'}
                  </button>
                </div>
              </div>
            </div>

            {product.company && (
              <div>
                <p className="text-lg text-gray-700">{product.company}</p>
              </div>
            )}

            {product.description && (
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900">Description</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-900">Stock</h3>
              <p className="text-base text-gray-700">{product.quantity} units available</p>
            </div>

            {product.details && product.details !== product.description && (
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-900">Details</h3>
                <p className="text-base text-gray-700">{product.details}</p>
              </div>
            )}

            <div className="pt-6">
              <Link 
                href={`/${category}`}
                className="text-blue-600 hover:underline inline-flex items-center"
              >
                <span className="mr-2">←</span> Back to {category.replace(/-/g, ' ')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}