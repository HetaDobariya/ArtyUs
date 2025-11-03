import Image from 'next/image';
import Image1 from '../../../../public/image/HomeImages/profile1.png';

const Profile = () => {
  return (
    <>
      <div className="flex justify-center items-center min-h-[85vh]">
        <div className=" w-[50%] p-10 rounded-lg">
          <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-blue-gray-900">
             The Creative Heaven:
            <br />
            Exploring the World of Art, Craft and Stationery
          </h1>
          <p className="mt-8 gap-y-6 font-normal text-lg leading-6 text-gray-700">
            Welcome to our <b>Creative Haven</b>, your one-stop destination for all things artistic. In a world of digital distractions, we celebrate the simple magic of creating with your hands - whether you&apos;re painting, crafting, or putting pen to paper.
            We are more than just a store; we are a vibrant community dedicated to helping you express yourself and bring your imagination to life.
          </p>
          <h2 className="mt-6 text-2xl font-semibold leading-7 text-gray-800">
            Our Mission
          </h2>
          <p className="mt-4 gap-y-6 font-normal text-lg leading-6 text-gray-700">
            We believe creativity is a way of life, not just a hobby. Our mission is to support your artistic journey by providing top-quality supplies and a source of inspiration.
          </p>
          <ul className="mt-4">
            <li className="font-normal text-lg leading-6 text-gray-700">
                <strong>Artistic Journey:</strong> We offer tools for every artist, from beginners to masters.
            </li>
            <li className="mt-2 font-normal text-lg leading-6 text-gray-700">
                <strong>Crafting Wonders:</strong> Find everything you need to bring your DIY projects to life.
            </li>
            <li className="mt-2 font-normal text-lg leading-6 text-gray-700">
                <strong>Customer-Centric:</strong> We are committed to providing quality, affordability, and exceptional service to help you turn your artistic dreams into reality.
            </li>
          </ul>
        </div>
        <div className="mt-2">
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

export default Profile;
