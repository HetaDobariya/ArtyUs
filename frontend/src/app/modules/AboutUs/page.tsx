import React from 'react';
import Image from 'next/image';
import Image1 from '../../../../public/image/HomeImages/profile1.png';


const AboutUs = () => {
    return (
        <>
            <div className="flex justify-left items-left min-h-[85vh]">
                <div className="w-[50%] p-10 rounded-lg">
                    <h1 className="mt-12 text-3xl lg:text-4xl font-bold leading-9 text-gray-900 text-center">
                        About Us
                    </h1>
                    <h2 className="mt-8 text-2xl font-semibold leading-7 text-gray-800">Our Story</h2>
                    <p className="mt-4 gap-y-6 font-normal text-lg leading-6 text-gray-700">
                        Welcome to **ArtyUs**, the ultimate destination for all things art, craft, and stationery. We are more than just an ecommerce platform; we are a vibrant community of artists, crafters, and enthusiasts who share a passion for creativity. Our idea was to create a space where creators of all levels could find the finest quality art supplies, unique craft materials, and stylish stationery products.
                    </p>
                    <p className="mt-4 gap-y-6 font-normal text-lg leading-6 text-gray-700">
                        Our mission is to empower creativity. We believe that art, craft, and stationery are not just products; they are tools of self-expression and catalysts for personal growth. They are the building blocks of imagination, the brushes that color our world, and the tools that turn ordinary moments into extraordinary memories.
                    </p>
                    <p className="mt-4 gap-y-6 font-normal text-lg leading-6 text-gray-700">
                        Our platform is designed to make these tools accessible to everyone. Whether you are a professional artist or a hobbyist, a student or a teacher, you will find everything you need to unleash your creativity at ArtyUs. We are committed to providing you with a seamless shopping experience and exceptional customer service.
                    </p>
                </div>
                <div className="">
                   <Image
                            src={Image1}
                            alt="profile"
                            className="object-contain  w-[739px]"
                        />
                </div>
            </div>
        </>
    );
};

export default AboutUs;
