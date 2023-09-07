import { Image } from "@nextui-org/react";
import React from "react";
import { Fade, Slide } from "react-awesome-reveal";
import {Card, CardHeader, CardBody} from "@nextui-org/react";

const KeyFeatures = () => {
  const features = [
    {
      heading: "Property Listings",
      quote: "Create and manage enticing listings with ease.",
    },
    {
      heading: "Property Listings",
      quote: "Create and manage enticing listings with ease.",
    },
    {
      heading: "Property Listings",
      quote: "Create and manage enticing listings with ease.",
    },
    {
      heading: "Property Listings",
      quote: "Create and manage enticing listings with ease.",
    },
    {
      heading: "Property Listings",
      quote: "Create and manage enticing listings with ease.",
    },
    {
      heading: "Property Listings",
      quote: "Create and manage enticing listings with ease.",
    },
  ];
  return (
    <>
        <div class="h-screen grid grid-cols-1 items-center justify-center mx-auto md:grid-cols-2 gap-8 md:mx-16 p-1 ">
          <Fade direction="left">
      <Image
        alt="NextUI hero Image with delay"
        width={1240}
        src="https://framerusercontent.com/images/gZ0AVj9czW9BivrS2TyIGRPOwU.jpg?scale-down-to=512"
        
      />
      </Fade>
      <Fade direction="right">
      <div className="p-2">
        <h1 class="text-[#662E9B] text-4xl font-extrabold  leading-none  md:text-4xl lg:text-5xl dark:text-white">
          Effortless Property Listings With High-Quality Images and Details
        </h1>
        <p>
          Showcase your rental properties with stunning images, detailed
          descriptions, and attractive amenities that will have potential
          tenants lining up.
        </p>
      </div>
      </Fade>
    </div>
    <div class="h-screen grid grid-cols-1 items-center justify-center mx-auto md:grid-cols-2 gap-8 md:mx-16 p-1 ">
    <Fade direction="left">
      <div className="p-2">
        <h1 class="text-[#662E9B] text-4xl font-extrabold  leading-none  md:text-4xl lg:text-5xl dark:text-white">
        Streamlined Tenant Screening for Reliable Renters
        </h1>
        <p>
        Simplify tenant screening with background checks, credit reports, and reference requests, ensuring you invite only the best renters.
        </p>
      </div>
      </Fade>
      <Fade direction="right">
      <Image
        alt="NextUI hero Image with delay"
        width={1240}
        src="https://framerusercontent.com/images/IaTbgPS2xILAHIo9qSha0OI1dwc.jpg"
      />
      </Fade>
    </div>
    <div className="max-w-[900px] mx-auto grid grid-cols-2 gap-4 mb-8">
      <Fade direction="up" className="col-span-2">
    <Card isFooterBlurred className="md:w-[100%] md:h-[600px] mx-auto bg-[#F2F2F2] py-5 my-1 ">

      <CardHeader className="flex-col items-start">
        
        <h3 className="text-[#815AC0] text-5xl  font-bold ">Automated</h3>
        <p className="text-tiny text-black uppercase font-bold">Rent collection and invoicing</p>
      </CardHeader>
      
      <CardBody className="overflow-hidden">
      <Image
        alt="Relaxing app background"
        src="https://framerusercontent.com/images/fJv5Q8vxS17BsGavyKZZONEXyU.jpg"
      />
        </CardBody>
 
    </Card>
    </Fade>
    <Fade direction="left" className="md:col-span-1 col-span-2">
    <Card isFooterBlurred className="md:w-[100%] md:h-[450px] mx-auto bg-[#F2F2F2] py-5 my-1 ">
      <CardHeader className="flex-col items-start">
        
        <h3 className="text-[#815AC0] text-5xl  font-bold ">Efficient</h3>
        <p className="text-tiny text-black uppercase font-bold">Maintenance request system

</p>
      </CardHeader>
      
      <CardBody className="overflow-hidden">
      <Image
        alt="Relaxing app background"
        src="https://framerusercontent.com/images/RCCSS65fIQ8jhayyxuR0WsnUK4.jpg"
      />
        </CardBody>
    </Card>
    </Fade>
    <Fade direction="right" className="md:col-span-1 col-span-2">
    <Card isFooterBlurred className="md:w-[100%] md:h-[450px] mx-auto bg-[#F2F2F2] py-5 my-1">
      <CardHeader className="flex-col items-start">
        
        <h3 className="text-[#815AC0] text-5xl  font-bold ">Organized
</h3>
        <p className="text-tiny text-black uppercase font-bold">Online document management

</p>
      </CardHeader>
      
      <CardBody className="overflow-hidden">
      <Image
        alt="Relaxing app background"
        src="https://framerusercontent.com/images/fJv5Q8vxS17BsGavyKZZONEXyU.jpg"
      />
        </CardBody>
    </Card>
    </Fade>
    </div>
    </>

  );
};

export default KeyFeatures;
