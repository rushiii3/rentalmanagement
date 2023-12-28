import React from 'react'
import { motion as m } from "framer-motion";
import { Select, SelectItem, Input } from "@nextui-org/react";

const Details = () => {
    const container = {
        hidden: {
          opacity: 0,
        },
        show: {
          opacity: 1,
          transition: {
            delay: 0.25,
          },
        },
      };
  return (
    <m.div
      className="w-full p-4 items-start flex-col rounded-xl shadow-2xl lg:shadow-none text-left bg-white  transform -translate-y-20 max-w-full overflow-hidden md:p-8 md:mt-0 md:text-left  lg:transform-none md:max-w-full md:w-full"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <h1 className="text-2xl font-bold text-marine-blue mb-2 md:text-3xl md:mb-1">
      DETAILS
      </h1>
      {/* <p className="text-cool-gray mb-4">
        Please provide your name, email address, and phone number.
      </p> */}

<div className="w-full mt-5">
        
        <div className="mt-5 gap-3 flex flex-col lg:flex-row">
          
          <Select
            size="lg"
            className="max-w-full"
            variant="bordered"
            label="Property Status"
            placeholder="Select property status"
            labelPlacement="outside"
            classNames={{
              label: "font-medium text-default-700 text-medium",
            }}
          >
            <SelectItem key="true">Active</SelectItem>
            <SelectItem key="false">Inactive</SelectItem>
          </Select>
        </div>
        <div className="mt-5 gap-3 flex flex-col lg:flex-row">
          <Input
            size="lg"
            labelPlacement="outside"
            variant="bordered"
            type="email"
            label="Email"
            placeholder="Enter your email"
            classNames={{
              label: "font-medium text-default-700 text-medium",
            }}
          />
          <Input
            size="lg"
            labelPlacement="outside"
            variant="bordered"
            type="email"
            label="Email"
            placeholder="Enter your email"
            classNames={{
              label: "font-medium text-default-700 text-medium",
            }}
          />
        </div>
        {/* Repeat similar structure for other input fields */}
      </div>

    </m.div>
  )
}

export default Details