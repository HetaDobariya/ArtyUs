import Image from 'next/image';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:8000';

async function getProduct(productId: string) {
  try {
    const response = await fetch(`${API_URL}/api/products/${productId}`, {
      cache: 'no-store', // Always fetch fresh data
    });
    
    if (!response.ok) {
      return null;
    }
    
    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { category, id } = await params;
  const product = await getProduct(id);

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

              {/* Price and Buy Now Button in Right Side */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-4xl font-bold text-gray-900">
                    Rs. {product.price.toFixed(2)}
                  </p>
                </div>
                <div>
                  <button
                    type="button"
                    className="px-8 py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200 whitespace-nowrap"
                  >
                    BUY NOW
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
