import React from "react";
import { Link } from "@nextui-org/react";
import { motion } from "framer-motion";
const Jumptron = () => {

  const fadeInVariantsUp = {
    hidden: { opacity: 0, y: 100 }, // Start with opacity 0 and position left
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, transition: "all", delay: 0.5 },
    }, // Transition to opacity 1 and position 0
  };
  return (
    <div className="h-screen bg-white relative">
      <link
        rel="preload"
        href="https://i.ibb.co/jvfy7Q2/Screenshot-2023-11-18-at-2-12-59-PM.webp"
        as="image"
      />
      {/* <video
        className="w-full h-full max-w-full object-cover  object-center"
        playsInline
        loop
        muted
      >
        <source src="https://static.vecteezy.com/system/resources/previews/021/019/996/mp4/lease-rental-and-selling-home-dealership-manager-smile-handshake-to-the-new-homeowner-rent-house-sales-loan-credit-financial-insurance-seller-dealer-installment-free-video.mp4" />
      </video> */}
      <img src="https://i.ibb.co/jvfy7Q2/Screenshot-2023-11-18-at-2-12-59-PM.webp" className="w-full h-full max-w-full object-cover  object-center" alt="" />

      <motion.div className="py-8 px-4 mx-auto max-w-screen text-center lg:py-16 absolute top-36"
                initial="hidden"
                viewport={{ once: true }}
                whileInView="visible"
                variants={fadeInVariantsUp}
      >
        {/* <Fade direction="up"> */}
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-[#662E9B] md:text-5xl lg:text-6xl dark:text-[#000000]"> Streamline Your Rental Property Management</h1>

          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-38 dark:text-black">
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
          
        {/* </Fade> */}
      </motion.div>
    </div>
  );
};

export default Jumptron;
