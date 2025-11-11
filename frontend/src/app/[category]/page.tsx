'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getCategoryData } from '@/data/products';

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;

  // Get category data from centralized data file
  const data = getCategoryData(category);

  // If category doesn't exist, show not found
  if (!data) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600">The category you're looking for doesn't exist.</p>
          <Link href="/" className="text-blue-600 hover:underline mt-4 inline-block">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 pt-24">
        {/* Page Title */}
        <h1 className="text-center text-4xl lg:text-5xl font-bold text-gray-900 mb-16">
          {data.title}
        </h1>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
          {data.products.map((product: any) => (
            <Link
              key={product.id}
              href={`/${category}/${product.id}`}
              className="group"
            >
              <div className="bg-white overflow-hidden transition-all duration-300 hover:scale-105">
                {/* Product Image */}
                <div className="aspect-square w-full bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full group-hover:opacity-90 transition-opacity duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className="pt-4 space-y-2">
                  <h3 className="text-base font-medium text-gray-900 line-clamp-2 group-hover:text-gray-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xl font-bold text-gray-900">
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
