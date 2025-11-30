'use client';
import Image from 'next/image';
import image1 from '../../../../../public/image/Products/Erasers/eraser5.jpeg';

const ProductDetails = () => {
  // In a real app, you would fetch product data based on URL params
  // For now, using static data matching the image
  const product = {
    name: '64 CRAYON COLORS',
    price: 600.00,
    company: 'Pala art mart',
    description: 'Unleash creativity with our vibrant crayons—where every hue sparks imagination in a single stroke.',
    quantity: 3,
    details: 'A set of 240 shades of vibrant crayon colors',
    image: image1,
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left Side - Product Image */}
          <div className="flex items-start justify-center">
            <div className="w-full max-w-md">
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
          <div className="flex flex-col space-y-6">
            {/* Product Name */}
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {product.name}
            </h1>

            {/* Price */}
            <p className="text-4xl font-bold text-gray-900">
              Rs. {product.price.toFixed(2)}
            </p>

            {/* Buy Now Button */}
            <button
              type="button"
              className="w-full max-w-xs py-3 bg-black text-white font-semibold rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
            >
              BUY NOW
            </button>

            {/* Company Name */}
            <div>
              <p className="text-lg text-gray-700">{product.company}</p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-gray-900">Description</h3>
              <p className="text-base text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-gray-900">QTY</h3>
              <p className="text-base text-gray-700">{product.quantity}</p>
            </div>

            {/* Details */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-gray-900">Details</h3>
              <p className="text-base text-gray-700">{product.details}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;