'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// --- 1. Define the Product Interface based on your SQL table ---
interface Product {
    id: number; // Corresponds to the 'id' column
    product_name: string; // Corresponds to the 'product_name' column
    price: number; // Corresponds to the 'price' column
    image_url: string; // Corresponds to the 'image_url' column
    // Assuming your API response includes a field to sort by creation date 
    // (e.g., 'created_at'). If not, you might need to adjust the API query 
    // to return the last 4 items based on the 'id' (if id is auto-incrementing).
    // For now, I'll assume the API endpoint handles returning the latest 4.
}

// --- 2. Data Fetching Logic ---
// --- 2. Data Fetching Logic (CORRECTED) ---
// --- 2. Data Fetching Logic (SYNTAX CLEANED) ---
async function fetchProducts(): Promise<Product[]> {
    try {
        const productsUrl = `${process.env.NEXT_PUBLIC_BACKEND}/api/product/getproducts`;

        const response = await fetch(productsUrl, {
            credentials: 'include'
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

        // Safely extract the product array.
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
        } else {
            // Case 4: Malformed data, productArray remains []
            console.log("API returned object that did not contain a product array.");
        }

        // 3. Log the fetched data (from the last successful console image)
        // If your API is returning the full array (like in image_72ed5e.png),
        // we should see it here.
        console.log("Fetched product array:", productArray);


        if (productArray.length === 0) {
            console.log("No products available to display.");
            return [];
        }

        // Return the first 4 items of the array.
        // The array is already sorted by the backend (implicitly by insertion order/id),
        // so slicing the first 4 items gets the latest/featured ones.
        return productArray.slice(0, 4);

    } catch (error) {
        console.error("Failed to fetch featured products:", error);
        return [];
    }
}


// --- 3. FeaturedProducts Component ---
const FeaturedProducts: React.FC = () => {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProducts() {
            const products = await fetchProducts();
            setFeaturedProducts(products);
            setLoading(false);
        }
        loadProducts();
    }, []);

    if (loading) {
        return <div className="text-center py-10 text-gray-600">Loading featured products...</div>;
    }

    if (featuredProducts.length === 0) {
        return <div className="text-center py-10 text-gray-500">No featured products found.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h2 className="text-2xl font-bold mb-8">Featured Products</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {featuredProducts.map((product) => (
                    // Use 'id' for the key and link
                    <Link href={`/product/${product.id}`} key={product.id} className="block group">
                        <div className="relative border border-gray-200 rounded-lg p-4 transition-shadow duration-300 hover:shadow-xl h-full flex flex-col justify-between">

                            {/* Product Image Container */}
                            <div className="w-full h-48 mb-4 flex items-center justify-center bg-gray-50 rounded-md">
                                {product.image_url ? (
                                    <Image
                                        src={product.image_url} // Use the correct column name
                                        alt={product.product_name}
                                        width={200}
                                        height={200}
                                        className="object-contain max-h-48 transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="text-gray-400">No Image</div>
                                )}
                            </div>

                            {/* Product Details */}
                            <div className="text-center mt-2">
                                {/* Use the correct column name for the product name */}
                                <p className="text-sm font-medium text-gray-700 truncate">{product.product_name}</p>
                                {/* Use the correct column name for the price */}
                                <p className="text-md font-semibold text-gray-900 mt-1">Rs. {product.price.toFixed(2)}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default FeaturedProducts;