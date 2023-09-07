import React, { useRef, useEffect } from "react";
import { Link } from "@nextui-org/react";
import { Fade, Slide } from "react-awesome-reveal";
const Jumptron = () => {
  const videoRef = useRef();
  useEffect(() => {
    videoRef.current.play();
    console.log("pl");
  }, []);

  const src =
    "https://static.vecteezy.com/system/resources/previews/021/019/996/mp4/lease-rental-and-selling-home-dealership-manager-smile-handshake-to-the-new-homeowner-rent-house-sales-loan-credit-financial-insurance-seller-dealer-installment-free-video.mp4";
  return (
    <div className="h-screen bg-white relative">
      <video
        className="w-full h-full max-w-full object-cover  object-center"
        playsInline
        loop
        muted
        ref={videoRef}
      >
        <source src="https://static.vecteezy.com/system/resources/previews/021/019/996/mp4/lease-rental-and-selling-home-dealership-manager-smile-handshake-to-the-new-homeowner-rent-house-sales-loan-credit-financial-insurance-seller-dealer-installment-free-video.mp4" />
      </video>

      <div className="py-8 px-4 mx-auto max-w-screen text-center lg:py-16 absolute top-36">
        <Fade direction="up">
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
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Learn more
            </Link>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default Jumptron;
