'use client';

import Image from 'next/image';
import Link from 'next/link';

// Sample product data - replace with your actual data
const products = [
  {
    id: 1,
    name: '64 Crayon Colors',
    price: 600.00,
    image: '/image/HomeImages/vect.png', // Update with actual image path
  },
  {
    id: 2,
    name: 'Crayola crayon colors',
    price: 360.00,
    image: '/image/HomeImages/vect.png', // Update with actual image path
  },
  // Add more products as needed
];

export default function ProductsPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Page Title */}
        <h1 className="text-center text-4xl font-bold text-gray-900 mb-12">
          CRAYON COLORS
        </h1>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/modules/Products/ProductDetails?id=${product.id}`}
              className="group"
            >
              <div className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                {/* Product Image */}
                <div className="aspect-square w-full bg-gray-100 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-lg font-semibold text-gray-900">
                    Rs. {product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

