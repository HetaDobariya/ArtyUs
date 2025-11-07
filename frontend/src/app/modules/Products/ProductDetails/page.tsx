'use client';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Link from 'next/link';
// import { useProduct } from './hooks/useProduct';
import image1 from '../../../../../public/image/Products/Erasers/eraser5.jpeg'

interface Props {
  slug: string;
}

const ProductDetails: React.FC<Props> = () => {
  //const { product } = useProduct(slug);

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block pl-6">
            <Image
              src={image1}
              alt='eraser'
              className=" object-cover object-center"
              height={400}
              width={400}
            />
          </div>
          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {/* {product?.name.toUpperCase()}  */}
                pencils
              </h1>
            </div>
            

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                <span>Rs. </span> 100
                {/* {product?.price} */}
              </p>
              {/* </div> */}

              {/* Options
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">{product.price}</p> */}
              
               <button
                type="submit"
                className="w-full py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-200"
              >
                {/* <Link href={`/checkout/${product?.id}`}>
                BUY NOW</Link> */}
                buy now
              </button>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>

                <div className="space-y-6">
                  <p className="text-lg text-gray-900">
                    {/* {product?.company?.name} */} shiv stationary
                  </p>
                  <p className="text-base text-gray-900">
                  <h3 className="font-bold">Description</h3>
                  {/* {product?.category?.description} */}
                  stationary
                  </p>
                </div>
              </div>
              <div className="mt-4">
              <h2 className="font-bold">QTY</h2>
              <p className="text-sml tracking-tight text-gray-900">
                {/* {product?.quantity} */}
                5
              </p>
              </div>

              <div className="mt-4">
                <h3 className="font-bold">Details</h3>

                <div className=" space-y-6">
                  <p className="text-sm text-gray-600">
                    {/* {product?.description} */}
                    colourful pen set of 15
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
