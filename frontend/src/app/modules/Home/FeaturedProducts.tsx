'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
    id: number;
    product_name: string;
    price: number;
    image_url: string;
    slug_name: string;
    child_category_name: string;
    trader_name: string;
    qty: number;
    description: string;
}

async function fetchProducts(): Promise<Product[]> {
    try {
        const productsUrl = `${process.env.NEXT_PUBLIC_BACKEND}/api/product/getproducts`;

        const response = await fetch(productsUrl, {
            credentials: 'include',
            cache: 'no-store' // Prevent caching issues
        });

        if (!response.ok) {
            // If 404 or other error, return empty array instead of throwing
            if (response.status === 404) {
                console.log("No products found (404)");
                return [];
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('Full API response:', result);

        let productArray: Product[] = [];

        if (result && result.data && Array.isArray(result.data)) {
            // Case 1: Response is wrapped, e.g., { data: [...] }
            productArray = result.data;
        } else if (result && Array.isArray(result.products)) {
            // Case 2: Response is wrapped, e.g., { products: [...] }
            productArray = result.products;
        } else if (Array.isArray(result)) {
            // Case 3: Response is directly the array [...]
            productArray = result;
            console.log('Found products in root array:', productArray.length);
        } else if (result && Array.isArray(result.products)) {
            productArray = result.products;
            console.log('Found products in result.products:', productArray.length);
        } else {
            // Case 4: Malformed data, productArray remains []
            console.log("API returned object that did not contain a product array.");
        }

        console.log("Fetched product array:", productArray);

        if (productArray.length === 0) {
            console.log("No products available to display.");
            return [];
        }

        // Get last 5 products (most recent)
        return productArray.slice(0,5).reverse(); // Reverse to show newest first

    } catch (error) {
        console.error("Failed to fetch featured products:", error);
        return [];
    }
}

const FeaturedProducts: React.FC = () => {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadProducts() {
            try {
                setLoading(true);
                setError(null);
                const products = await fetchProducts();
                setFeaturedProducts(products);
            } catch (err) {
                setError('Failed to load featured products');
                console.error('Error loading products:', err);
            } finally {
                setLoading(false);
            }
        }
        loadProducts();
    }, []);

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-12">
                <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
                <div className="text-center py-10 text-gray-600">
                    Loading featured products...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-12">
                <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
                <div className="text-center py-10 text-gray-500">
                    {error}
                </div>
            </div>
        );
    }

    if (featuredProducts.length === 0) {
        return (
            <div className="container mx-auto px-4 py-12">
                <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
                <div className="text-center py-10 text-gray-500">
                    No featured products found.
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold mb-8">Latest Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {featuredProducts.map((product) => (
                    <Link 
                        href={`/product/${product.id}`} 
                        key={product.id} 
                        className="block group"
                    >
                        <div className="relative border border-gray-200 rounded-lg p-4 transition-shadow duration-300 hover:shadow-xl h-full flex flex-col justify-between bg-white">
                            {/* Product Image Container */}
                            <div className="w-full h-48 mb-4 flex items-center justify-center bg-gray-50 rounded-md overflow-hidden">
                                {product.image_url ? (
                                    <Image
                                        src={product.image_url}
                                        alt={product.product_name}
                                        width={200}
                                        height={200}
                                        className="object-contain max-h-48 w-auto transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="text-gray-400 flex items-center justify-center h-full">
                                        No Image
                                    </div>
                                )}
                            </div>

                            {/* Product Details */}
                            <div className="text-center mt-2 flex-grow">
                                <p className="text-sm font-medium text-gray-700 line-clamp-2 mb-2">
                                    {product.product_name}
                                </p>
                                <p className="text-md font-semibold text-gray-900">
                                    Rs. {product.price.toFixed(2)}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                    {product.trader_name}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default FeaturedProducts;