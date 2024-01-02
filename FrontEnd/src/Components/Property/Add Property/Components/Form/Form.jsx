import React, { useState } from "react";
import Description from "../Steps/Description";
import { motion as m } from "framer-motion";
import Media from "../Steps/Media";
import ThankyouPage from "../Steps/ThankyouPage";
import Details from "../Steps/Details";
import Location from "../Steps/Location";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Form = ({ step, next, prev, goto }) => {
  const schema = yup.object().shape({
    description: yup.string().required("Please provide description!"),
    category: yup
      .string()
      .required("Please select category!")
      .notOneOf(["Select property category"], "Please select category!"),
    status: yup
      .string()
      .required("Please select status!")
      .notOneOf(["Select property status"], "Please select status!"),
    price: yup
      .number()
      .typeError("Please enter a valid number for property price")
      .required("Please enter property price")
      .min(1000, "Price should be greater than 1000"),
    deposit: yup
      .number()
      .typeError("Please enter a valid number for deposit")
      .required("Please enter deposit amount")
      .min(1000, "Deposit should be greater than 1000"),
    buildingName: yup.string().required("Building name is required"),
    buildingNumber: yup.string().required("Building number is required"),
    streetAddress: yup.string().required("Street address is required"),
    locality: yup.string().required("Locality is required"),
    city: yup.string().required("City is required").notOneOf(["Select state first"], "Please select state first!").notOneOf(["Select city"], "Please select city!"),
    state: yup.string().required("State is required").notOneOf(["Select state"], "Please select state!"),
    pincode: yup
      .string()
      .required("Pincode is required")
      .matches(/^\d{6}$/, "Please enter a valid 6-digit pincode"),
    latitude: yup.string().required("Latitude is required"),
    longitude: yup.string().required("Longitude is required"),
  });
  const methods = useForm({
    shouldUnregister: false,
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const onSubmit = (data) => {
    console.log(data);
  };
  const handleClick = async () => {
    if (step === 0) {
      const isValid = await methods.trigger([
        "description",
        "category",
        "status",
        "price",
        "deposit",
      ]);
      if (isValid) {
        next();
      }
    }
    if (step === 1) {
      const isValid = await methods.trigger([
        "buildingName",
        "buildingNumber",
        "streetAddress",
        "locality",
        "state",
        "city",
        "latitude",
        "longitude",
        "pincode",
      ]);
      if (isValid) {
        next();
      }
    }
  };

  const btnVariants = {
    hover: {
      scale: [null, 1.1, 1.05],
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.98,
    },
  };
console.log(methods);
  return (
    <div className="flex flex-col justify-between  p-4">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {step === 0 && <Description />}
          {step === 1 && <Location />}
          {step === 2 && <Details />}
          {step === 3 && <Media />}
          <m.div
            className="flex gap-5 justify-end transform -translate-y-10 lg:transform-none "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {step !== 0 && step !== 4 && (
              <m.button
                className="py-2.5 px-6 rounded-lg text-sm font-medium bg-teal-200 text-teal-800"
                // type="button"
                variants={btnVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={prev}
              >
                Go Back
              </m.button>
            )}
            {step === 4 && <ThankyouPage goto={goto} />}
            {/* {step === 0 && <div></div>} */}
            {step !== 4 && (
              <m.button
                className="py-2.5 px-6 rounded-lg text-sm font-medium text-white bg-teal-600"
                type="button"
                variants={btnVariants}
                whileHover="hover"
                whileTap="tap"
                // onClick={
                //   methods?.formState?.errors?.description?.message
                //     ? null // If there's an error, prevent the click action
                //     : next // If there's no error, execute the 'next' function
                // }
                onClick={handleClick}
              >
                {step === 3 ? "Confirm" : "Next Step"}
              </m.button>
            )}
          </m.div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Form;
