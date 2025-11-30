'use client';

import Image from 'next/image';
import Link from 'next/link';
//import poster from 'public/image/HomeImages/vect.png'
//import banner from 'public/image/HomeImages/vector6.jpg';
import CategoryCircles from './CategoryCircles';
import FeaturedProducts from './FeaturedProducts';

function HomePage() {
  //const { data } = useCurrentUserQuery();

  return (
    <>
      <div className="">
        <Image
          src="/image/HomeImages/vect.png"
          width={1920}
          height={1080}
          priority
          className="object-cover object-center w-full h-[60vh]"
          alt="Everthing that you think IMAGE"
          style={{ height: 'auto' }}
        />
      </div>
      <div className="flex flex-col justify-center items-center md:block md:absolute md:right-72 md:top-48">
        <div className="m-5 md:m-0">
          <div className="text-black md:text-start font-bold text-sm md:text-3xl gap-4">
            <div className="text-center md:text-start text-2xl md:text-4xl">
              Become Artious with ArtyUS
            </div>
            <div className="mt-2 text-center md:text-start md:text-xl">
              Imagine crafts, Imagine us
            </div>
          </div>
        </div>
        <div className="mt-4">
          <Link href="/desk-supplies">
            <button className="bg-white text-black sm:bg-black sm:text-white py-2 px-4 border-black border-2 text-center font-medium text-sm hover:bg-white transition-colors duration-200 hover:text-black">
              SHOP NOW
            </button>
          </Link>
        </div>
      </div>
      <div className="space-y-3">
        <CategoryCircles />
      </div>

      <div>
        <FeaturedProducts />
      </div>

      {/* SECTION 3: TWO-COLUMN IMAGE ROW (Creative Essentials and Express Yourself) */}
      <div className="flex flex-col md:flex-row justify-center items-center m-5 md:m-10 gap-5 p-0 md:p-5">

        {/* LEFT COLUMN: CREATIVE ESSENTIALS (Blue/White Image) */}
        <div className="relative w-full md:w-1/2 overflow-hidden shadow-lg">
          <Image
            src="/image/HomeImages/vector14.jpg"
            alt="Creative Essentials stationery supplies"
            width={900}
            height={450}
            className="object-cover w-full h-96"
          />
          <div className="flex flex-col justify-center items-center md:block md:absolute md:left-32 md:top-16">
            <div className="m-5 md:m-0">
              <div className="text-black md:text-start font-bold text-sm md:text-sm gap-2">
                <div className="text-center md:text-start text-lg md:text-lg">
                  CREATIVE ESSENTIALS
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Link href="/pencils">
                <button className="bg-black text-white py-2 px-4 text-center font-medium text-sm hover:bg-gray-800 transition-colors duration-200">
                  SHOP NOW
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: EXPRESS YOURSELF (Colorful Image) */}
        <div className="relative w-full md:w-1/2 overflow-hidden shadow-lg">
          <Image
            src="/image/HomeImages/row.jpg"
            alt="Express Yourself colorful stationery"
            width={900}
            height={450}
            className="object-cover w-full h-96"
          />
          {/* Note: I'm adjusting the positioning for EXPRESS YOURSELF to match the design (top right) */}
          <div className="flex flex-col justify-center items-center md:block md:absolute md:right-28 md:top-16">
            <div className="m-5 md:m-0">
              <div className="text-black md:text-start font-bold text-sm md:text-sm gap-2">
                <div className="text-center md:text-start text-lg md:text-lg">
                  EXPRESS YOURSELF WITH OUR ARTFUL STATIONERY
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Link href="/stationery-kits">
                <button className="bg-black text-white py-2 px-4 text-center font-medium text-sm hover:bg-gray-800 transition-colors duration-200">
                  SHOP NOW
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* END SECTION 3 */}

      <div className="relative m-10 p-10 text-center">
        <Image
          src='/image/HomeImages/vector6.jpg'
          width={1200}  // Add appropriate dimensions
          height={800}
          alt="Knives,Brushes,Pallets"
          className="object-cover object-center w-[100%] h-[50vh] "
        />
        <div className="flex flex-col justify-center items-center md:block md:absolute md:left-96 md:top-24">
          <div className="m-5 md:m-0">
            <div className="text-black md:text-start font-bold text-xl md:text-sm gap-2">
              <div className="text-center md:text-start text-xl md:text-xl">
                CURATING CREATIVITY THROUGH OUR ARTFUL SUPPLIES
                {/* <div className="mt-4"> */}
                {/* {data?.currentUser ? (
                  <Link href="/journals">
                    <button className="bg-white text-black sm:bg-black sm:text-white py-2 px-4 border-black border-2 text-center font-medium text-sm hover:bg-white transition-colors duration-200 hover:text-black ml-4">
                      SHOP NOW
                    </button>
                  </Link>
                ) : (
                  <Link href="/auth/BecomeTrader">
                    <button className="bg-white text-black sm:bg-black sm:text-white py-2 px-4 border-black border-2 text-center font-medium text-sm hover:bg-white transition-colors duration-200 hover:text-black ml-4">
                      JOIN NOW
                    </button>
                  </Link>
                )} */}
                {/* </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default HomePage;
