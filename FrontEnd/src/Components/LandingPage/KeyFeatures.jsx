import { Image } from "@nextui-org/react";
import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { motion } from "framer-motion";
const KeyFeatures = () => {
  const fadeInVariantsLeft = {
    hidden: { opacity: 0, x: -100 }, // Start with opacity 0 and position left
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, transition: "all", delay: 0.5 },
    }, // Transition to opacity 1 and position 0
  };
  const fadeInVariantsRight = {
    hidden: { opacity: 0, x: 100 }, // Start with opacity 0 and position left
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, transition: "all", delay: 0.5 },
    }, // Transition to opacity 1 and position 0
  };
  const fadeInVariantsUp = {
    hidden: { opacity: 0, y: 100 }, // Start with opacity 0 and position left
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, transition: "all", delay: 0.5 },
    }, // Transition to opacity 1 and position 0
  };

  // const features = [
  //   {
  //     heading: "Property Listings",
  //     quote: "Create and manage enticing listings with ease.",
  //   },
  //   {
  //     heading: "Property Listings",
  //     quote: "Create and manage enticing listings with ease.",
  //   },
  //   {
  //     heading: "Property Listings",
  //     quote: "Create and manage enticing listings with ease.",
  //   },
  //   {
  //     heading: "Property Listings",
  //     quote: "Create and manage enticing listings with ease.",
  //   },
  //   {
  //     heading: "Property Listings",
  //     quote: "Create and manage enticing listings with ease.",
  //   },
  //   {
  //     heading: "Property Listings",
  //     quote: "Create and manage enticing listings with ease.",
  //   },
  // ];

  return (
    <>
      <div class="h-screen grid grid-cols-1 items-center justify-center mx-auto md:grid-cols-2 gap-8 md:mx-16 p-1 overflow-hidden">
        <motion.div
          initial="hidden"
          viewport={{ once: true }}
          whileInView="visible"
          variants={fadeInVariantsLeft}
        >
          <Image
            alt="NextUI hero Image with delay"
            width={1240}
            src="https://framerusercontent.com/images/gZ0AVj9czW9BivrS2TyIGRPOwU.jpg?scale-down-to=512"
          />
        </motion.div>
        <motion.div
          initial="hidden"
          viewport={{ once: true }}
          whileInView="visible"
          variants={fadeInVariantsRight}
          className="p-2"
        >
          <h1 class="text-[#662E9B] text-4xl font-extrabold  leading-none  md:text-4xl lg:text-5xl dark:text-white">
            Effortless Property Listings With High-Quality Images and Details
          </h1>
          <p>
            Showcase your rental properties with stunning images, detailed
            descriptions, and attractive amenities that will have potential
            tenants lining up.
          </p>
        </motion.div>
      </div>
      <div class="h-screen grid grid-cols-1 items-center justify-center mx-auto md:grid-cols-2 gap-8 md:mx-16 p-1 overflow-hidden ">
        <motion.div
          initial="hidden"
          viewport={{ once: true }}
          whileInView="visible"
          variants={fadeInVariantsLeft}
          className="p-2"
        >
          <h1 class="text-[#662E9B] text-4xl font-extrabold  leading-none  md:text-4xl lg:text-5xl dark:text-white">
            Streamlined Tenant Screening for Reliable Renters
          </h1>
          <p>
            Simplify tenant screening with background checks, credit reports,
            and reference requests, ensuring you invite only the best renters.
          </p>
        </motion.div>
        <motion.div
          initial="hidden"
          viewport={{ once: true }}
          whileInView="visible"
          variants={fadeInVariantsRight}
          className="p-2"
        >
          <Image
            alt="NextUI hero Image with delay"
            width={1240}
            src="https://framerusercontent.com/images/IaTbgPS2xILAHIo9qSha0OI1dwc.jpg"
          />
        </motion.div>
      </div>
      <div className="max-w-[900px] mx-auto grid grid-cols-2 gap-4 mb-8 overflow-hidden">
        <motion.div
          className="col-span-2"
          initial="hidden"
          viewport={{ once: true }}
          whileInView="visible"
          variants={fadeInVariantsUp}
        >
          <Card
            isFooterBlurred
            className="md:w-[100%] md:h-[600px] mx-auto bg-[#F2F2F2] py-5 my-1 "
          >
            <CardHeader className="flex-col items-start">
              <h3 className="text-[#815AC0] text-5xl  font-bold ">Automated</h3>
              <p className="text-tiny text-black uppercase font-bold">
                Rent collection and invoicing
              </p>
            </CardHeader>

            <CardBody className="overflow-hidden">
              <Image
                alt="Relaxing app background"
                src="https://framerusercontent.com/images/fJv5Q8vxS17BsGavyKZZONEXyU.jpg"
              />
            </CardBody>
          </Card>
        </motion.div>
        <motion.div className="md:col-span-1 col-span-2"
        initial="hidden"
        viewport={{ once: true }}
        whileInView="visible"
        variants={fadeInVariantsLeft}
        >
          <Card
            isFooterBlurred
            className="md:w-[100%] md:h-[450px] mx-auto bg-[#F2F2F2] py-5 my-1 "
          >
            <CardHeader className="flex-col items-start">
              <h3 className="text-[#815AC0] text-5xl  font-bold ">Efficient</h3>
              <p className="text-tiny text-black uppercase font-bold">
                Maintenance request system
              </p>
            </CardHeader>

            <CardBody className="overflow-hidden">
              <Image
                alt="Relaxing app background"
                src="https://framerusercontent.com/images/RCCSS65fIQ8jhayyxuR0WsnUK4.jpg"
              />
            </CardBody>
          </Card>
        </motion.div>
        <motion.div className="md:col-span-1 col-span-2"
        initial="hidden"
        viewport={{ once: true }}
        whileInView="visible"
        variants={fadeInVariantsRight}
        >
          <Card
            isFooterBlurred
            className="md:w-[100%] md:h-[450px] mx-auto bg-[#F2F2F2] py-5 my-1"
          >
            <CardHeader className="flex-col items-start">
              <h3 className="text-[#815AC0] text-5xl  font-bold ">Organized</h3>
              <p className="text-tiny text-black uppercase font-bold">
                Online document management
              </p>
            </CardHeader>

            <CardBody className="overflow-hidden">
              <Image
                alt="Relaxing app background"
                src="https://framerusercontent.com/images/fJv5Q8vxS17BsGavyKZZONEXyU.jpg"
              />
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default KeyFeatures;
