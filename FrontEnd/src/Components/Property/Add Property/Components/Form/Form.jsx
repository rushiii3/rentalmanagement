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
import axios from "axios";
import { propertServer } from "../../../../../server";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
const Form = ({ step, next, prev, goto }) => {
  const { user } = useSelector((state) => state.user);
  const currentYear = new Date().getFullYear();
  const [ImageVideoData, setImageVideoData] = useState([]);
  const preferredTenants = ["Family", "Working professionals"];

  const schema = yup.object().shape({
    description: yup
      .string()
      .required("Please provide description!")
      .max(500, "Description must not exceed 500 characters"),
    category: yup
      .string()
      .required("Please select category!")
      .notOneOf(["Select property category"], "Please select category!"),
    status: yup
      .boolean()
      .transform((value) => (value === true || value === false ? value : null))
      .nullable()
      .required("Please select status!")
      .notOneOf([null], "Please select status!"),
    price: yup
      .number()
      .typeError("Please enter property price")
      .required("Please enter property price")
      .positive("Price size must be a positive number")
      .integer("Price size must be an integer")
      .min(1000, "Price should be greater than 1000")
      .max(1000000, "Price should not be greater than 1000000"),
    deposit: yup
      .number()
      .typeError("Please enter property price")
      .required("Please enter deposit amount")
      .positive("Deposit price size must be a positive number")
      .integer("Deposit price must be an integer")
      .min(1000, "Deposit should be greater than 1000")
      .max(10000000, "Price should be greater than 10000000"),
    buildingName: yup
      .string()
      .required("Building name is required")
      .max(20, "Building name must not exceed 20 characters"),
    buildingNumber: yup
      .string()
      .required("Building number is required")
      .max(20, "Building number must not exceed 20 characters"),
    streetAddress: yup
      .string()
      .required("Street address is required")
      .max(100, "Street address must not exceed 100 characters"),
    locality: yup
      .string()
      .required("Locality is required")
      .matches(/^[A-Za-z\s]+$/, "Only alphabetic characters are allowed")
      .max(20, "Locality must not exceed 20 characters"),
    city: yup
      .string()
      .required("City is required")
      .notOneOf(["Select state first"], "Please select state first!")
      .notOneOf(["Select city"], "Please select city!"),
    state: yup
      .string()
      .required("State is required")
      .notOneOf(["Select state"], "Please select state!"),
    pincode: yup
      .string()
      .required("Pincode is required")
      .matches(/^\d{6}$/, "Pincode should be exactly 6 digits"),
    latitude: yup.number().required("Latitude is required"),
    longitude: yup.string().required("Longitude is required"),
    prefferedTenant: yup
      .array()
      .of(
        yup
          .string()
          .oneOf(preferredTenants)
          .required("At least one tenant preference is required")
      )
      .min(1, "At least one tenant preference is required")
      .required("Tenant preference is required"),
    propertyType: yup
      .string()
      .required("Property Type is requried")
      .notOneOf(["Select property type"], "Please select property type!"),
    numberOfBHKRK: yup
      .number()
      .typeError("Number of BHK/RK is required")
      .required("Number of BHK/RK is required")
      .min(1, "Number of BHK/RK should be at least 1")
      .max(5, "Number of BHK/RK should not exceed 5")
      .positive("Number of BHK/RK must be a positive number"),
    numberOfBathrooms: yup
      .number()
      .typeError("Number of Bathrooms is required")
      .required("Number of Bathrooms is required")
      .min(1, "Number of Bathrooms should be at least 1")
      .max(5, "Number of Bathrooms should not exceed 5")
      .positive("Number of Bathrooms must be a positive number"),
    furnishing: yup
      .string()
      .required("Furnishing is required")
      .notOneOf(["Select furnishing"], "Please select property furnishing!"),
    parking: yup
      .boolean()
      .transform((value) => (value === true || value === false ? value : null))
      .nullable()
      .required("Please select parking!")
      .notOneOf(["Select parking"], "Please select parking!"),
    yearBuilt: yup
      .number()
      .required("Year built is required")
      .typeError("Year built is required")
      .min(1900, "Year should be a 4-digit number")
      .max(currentYear, `Year should not be greater than ${currentYear}`),
    propertySize: yup
      .number()
      .typeError("Property size is required")
      .required("Property size is required")
      .positive("Property size must be a positive number")
      .integer("Property size must be an integer")
      .min(100, "Property size should be at least 100")
      .max(10000, "Property size should not exceed 10,000"),
    image: yup
      .number()
      .required("Image is required")
      .positive("")
      .min(5, "Minimum 5 images should be uploaded")
      .max(15, "Images should not exceed 15"),
    video: yup
      .number()
      .required("Video is required")
      .positive("")
      .min(2, "Minimum 2 video should be uploaded")
      .max(5, "Video should not exceed 5"),
  });
  const methods = useForm({
    shouldUnregister: false,
    resolver: yupResolver(schema),
    mode: "all",
  });
  const onSubmit = async (data) => {
    try {
      const Data = { ...data, ImageVideoData, id: user?.user?._id };
      console.log(Data);
      const responseData = await axios.post(
        `${propertServer}/add-property`,
        Data
      );
      console.log(responseData);
      if (responseData?.data?.success) {
        methods.reset();
        next();
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
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
    if (step === 2) {
      const isValid = await methods.trigger([
        "prefferedTenant",
        "propertyType",
        "numberOfBHKRK",
        "numberOfBathrooms",
        "furnishing",
        "parking",
        "yearBuilt",
        "propertySize",
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
  return (
    <div className="flex flex-col justify-between  p-4">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {step === 0 && <Description />}
          {step === 1 && <Location />}
          {step === 2 && <Details />}
          {step === 3 && (
            <Media
              ImageVideoData={ImageVideoData}
              setImageVideoData={setImageVideoData}
            />
          )}
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
                type={step === 3 ? "submit" : "button"}
                variants={btnVariants}
                whileHover="hover"
                whileTap="tap"
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
