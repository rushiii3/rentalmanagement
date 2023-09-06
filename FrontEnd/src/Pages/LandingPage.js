import React from "react";
import {Link} from "@nextui-org/react";
const LandingPage = () => {
  const src = "https://static.vecteezy.com/system/resources/previews/021/019/996/mp4/lease-rental-and-selling-home-dealership-manager-smile-handshake-to-the-new-homeowner-rent-house-sales-loan-credit-financial-insurance-seller-dealer-installment-free-video.mp4";
  return (
    <div>
      <div className="h-screen bg-white relative">
      <video  class="w-full h-full max-w-full object-cover  object-center" autoPlay playsInline loop muted >
      <source src="https://static.vecteezy.com/system/resources/previews/021/019/996/mp4/lease-rental-and-selling-home-dealership-manager-smile-handshake-to-the-new-homeowner-rent-house-sales-loan-credit-financial-insurance-seller-dealer-installment-free-video.mp4"/>
</video>
        <div className="py-8 px-4 mx-auto max-w-screen text-center lg:py-16 absolute top-36">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-[#662E9B] md:text-5xl lg:text-6xl dark:text-white">
            Streamline Your Rental Property Management
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-38 dark:text-gray-400">
            Welcome to Dream Rentals, where we make finding your perfect rental
            property a breeze. Browse exquisite listings to unlock the door to
            your next luxurious living space.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Link
      href="https://github.com/nextui-org/nextui"
      className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-[#662E9B] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
    >
      Get started
      <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
    </Link>
            
    <Link
      href="https://github.com/nextui-org/nextui"
      className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"    >
      Learn more
      
    </Link>
              
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
{/* <div className="h-screen bg-white grid grid-cols-1 items-center md:grid-cols-2 gap-4 p-1">
<video src="../Assets/vecteezy_lease-rental-and-selling-home-dealership-manager-smile_21019996_69.mov" class="w-full h-auto max-w-full" controls>
  Your browser does not support the video tag.
</video>

        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-[#662E9B] md:text-5xl lg:text-6xl dark:text-white">
            Streamline Your Rental Property Management
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-38 dark:text-gray-400">
            Welcome to Dream Rentals, where we make finding your perfect rental
            property a breeze. Browse exquisite listings to unlock the door to
            your next luxurious living space.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <a
              href="#"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-[#662E9B] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
            >
              Get started
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Learn more
            </a>
          </div>
        </div>
        <div>
        <Image
      alt="NextUI hero Image"
      src="https://img.freepik.com/free-vector/real-estate-searching-illustration_23-2148658965.jpg?w=1380&t=st=1694019782~exp=1694020382~hmac=818453f23f367cad14993b6ae4f48d6be03fe22b641603cb889abb1dfa56ec91"
    />
        </div> */}