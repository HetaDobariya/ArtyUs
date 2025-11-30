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
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const [category, setCategory] = useState<string>('');
  const [id, setId] = useState<string>('');

  useEffect(() => {
    params.then((p) => {
      setCategory(p.category);
      setId(p.id);
    });
  }, [params]);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/product/${id}`, {
        credentials: 'include',
      });
      
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setProduct({
            id: result.data.id,
            name: result.data.name,
            price: result.data.price,
            quantity: result.data.quantity,
            description: result.data.description || '',
            image: result.data.image,
            company: result.data.company || '',
            details: result.data.details || result.data.description || '',
          });
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      router.push('/modules/auth/SignIn');
      return;
    }

    setAddingToCart(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/cart/add`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: product?.id,
          qty: quantity,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert('Product added to cart successfully!');
        router.push('/cart');
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

    // Add to cart first, then redirect to checkout
    setAddingToCart(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/api/cart/add`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: product?.id,
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
        <p className="text-gray-600">Loading product...</p>
      </div>
    );
  }

  // Error state
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
          {/* Left Side - Product Image */}
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

          {/* Right Side - Product Details */}
          <div className="flex flex-col space-y-8">
            {/* Top Section - Name, Price, and Button */}
            <div className="space-y-6">
              {/* Product Name */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
                {product.name.toUpperCase()}
              </h1>

              {/* Price and Quantity Selector */}
              <div className="space-y-4">
                <div>
                  <p className="text-4xl font-bold text-gray-900">
                    ₹{product.price.toFixed(2)}
                  </p>
                </div>
                
                {/* Quantity Selector */}
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

                {/* Action Buttons */}
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

            {/* Company Name */}
            <div>
              <p className="text-lg text-gray-700">{product.company}</p>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-900">Description</h3>
              <p className="text-base text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-900">QTY</h3>
              <p className="text-base text-gray-700">{product.quantity}</p>
            </div>

            {/* Details */}
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-gray-900">Details</h3>
              <p className="text-base text-gray-700">{product.details}</p>
            </div>

            {/* Back Button */}
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
