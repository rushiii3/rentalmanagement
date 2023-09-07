import React from "react";
import { Fade, Slide } from "react-awesome-reveal";
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
    <div class="px-4 h-screen mx-auto max-w-screen-xl  lg:py-16 flex  flex-col justify-center">
      <h1 class="mb-4 text-[#662E9B] text-4xl font-extrabold whitespace-nowrap leading-none  md:text-4xl lg:text-5xl dark:text-white">
        Key Features
      </h1>

      <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-8 py-3">
        {features.map((values, key) => {
          return (
            <Fade delay={100 * key} key={key}>
              <div className="">
                <h2 class="text-xl font-semibold whitespace-nowrap leading-none  md:text-2xl lg:text-3xl dark:text-white">
                  {values.heading}
                </h2>
                <p>{values.quote}</p>
              </div>
            </Fade>
          );
        })}
      </div>
    </div>
  );
};

export default KeyFeatures;
