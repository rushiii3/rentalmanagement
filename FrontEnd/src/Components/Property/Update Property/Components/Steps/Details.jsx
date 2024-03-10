import React, { useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import { useFormContext } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { AppContext } from "../../../UpdateProperty";
import { useContext } from "react";
const Details = () => {
  const { PropertyData } = useContext(AppContext);
  const options = [
    { label: "Family", value: "Family" },
    { label: "Working professionals", value: "Working professionals" },
    { label: "Any", value: "Any" },
  ];
  const [selected, setSelected] = useState([]);
  const {
    trigger,
    setValue,
    register,
    formState: { errors },
  } = useFormContext();
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
  useEffect(() => {
    if(PropertyData){
      console.log(PropertyData?.preferred_tenants);
      setValue("prefferedTenant",PropertyData?.preferred_tenants);
      setValue("propertyType",PropertyData?.property_type);
      setValue("numberOfBHKRK",PropertyData?.property_no_of_bhk);
      setValue("numberOfBathrooms",PropertyData?.property_bathrooms);
      setValue("furnishing",PropertyData?.property_furnishing);
      setValue("parking",PropertyData?.property_parking);
      setValue("yearBuilt",PropertyData?.property_year_built);
      setValue("propertySize", PropertyData?.property_size);
    }
  }, [PropertyData])
  const handleSelect = (e) => {
    console.log(e);
    const selectedOptions = e.map((option) => option.value);
    setValue("prefferedTenant", selectedOptions);
    trigger("prefferedTenant");
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
          <div className="w-full">
            <label
              for="username-error"
              className={`block mb-2 text-sm font-medium ${
                errors.prefferedTenant?.message
                  ? "text-red-700 dark:text-red-500"
                  : ""
              } `}
            >
              Tenant Preferences
            </label>

            <Select
              options={options}
              makeAnimated={makeAnimated}
              isMulti={true}
              onChange={handleSelect}
              defaultValue={PropertyData?.preferred_tenants.map(option => ({ label: option, value: option }))} // Set default value based on PropertyData
            />

            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.prefferedTenant?.message}
            </p>
          </div>
          <div className="w-full">
            <label
              for="username-error"
              className={`block mb-2 text-sm font-medium ${
                errors.propertyType?.message
                  ? "text-red-700 dark:text-red-500"
                  : ""
              } `}
            >
              Property Type
            </label>
            <select
              id="countries"
              {...register("propertyType")}
              class={`block p-2.5 w-full text-sm  rounded-lg border ${
                errors.propertyType?.message
                  ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                  : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }  
`}
            >
              <option selected="">Select property type</option>
              <option value="BHK">BHK</option>
              <option value="RK">RK</option>
            </select>

            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.propertyType?.message}
            </p>
          </div>
        </div>
        <div className="mt-5 gap-3 flex flex-col lg:flex-row">
          <div className="w-full">
            <label
              for="username-error"
              className={`block mb-2 text-sm font-medium ${
                errors.numberOfBHKRK?.message
                  ? "text-red-700 dark:text-red-500"
                  : ""
              } `}
            >
              Number of BHK/RK
            </label>
            <input
              {...register("numberOfBHKRK")}
              type="number"
              id="username-error"
              class={`block p-2.5 w-full text-sm  rounded-lg border ${
                errors.numberOfBHKRK?.message
                  ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                  : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }  
            `}
              placeholder="Enter number of BHK/RK"
            />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.numberOfBHKRK?.message}
            </p>
          </div>
          <div className="w-full">
            <label
              for="username-error"
              className={`block mb-2 text-sm font-medium ${
                errors.numberOfBathrooms?.message
                  ? "text-red-700 dark:text-red-500"
                  : ""
              } `}
            >
              Number of Bathrooms
            </label>
            <input
              {...register("numberOfBathrooms")}
              type="number"
              id="username-error"
              class={`block p-2.5 w-full text-sm  rounded-lg border ${
                errors.numberOfBathrooms?.message
                  ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                  : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }  
            `}
              placeholder="Enter number of bathroom"
            />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.numberOfBathrooms?.message}
            </p>
          </div>
        </div>
        <div className="mt-5 gap-3 flex flex-col lg:flex-row">
          <div className="w-full">
            <label
              for="username-error"
              className={`block mb-2 text-sm font-medium ${
                errors.furnishing?.message
                  ? "text-red-700 dark:text-red-500"
                  : ""
              } `}
            >
              Furnishing
            </label>
            <select
              id="countries"
              {...register("furnishing")}
              class={`block p-2.5 w-full text-sm  rounded-lg border ${
                errors.furnishing?.message
                  ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                  : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }  
`}
            >
              <option selected="">Select furnishing</option>
              <option value="Furnishing">Furnishing</option>
              <option value="Semi-Furnishing">Semi-Furnishing</option>
              <option value="Unfurnished">Unfurnished</option>
            </select>

            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.furnishing?.message}
            </p>
          </div>
          <div className="w-full">
            <label
              for="username-error"
              className={`block mb-2 text-sm font-medium ${
                errors.parking?.message ? "text-red-700 dark:text-red-500" : ""
              } `}
            >
              Parking
            </label>
            <select
              id="countries"
              {...register("parking")}
              class={`block p-2.5 w-full text-sm  rounded-lg border ${
                errors.parking?.message
                  ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                  : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }  
`}
            >
              <option selected value={null} hidden>Select parking</option>
              <option value={true}>Available</option>
              <option value={false}>Unavailable</option>
            </select>

            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.parking?.message}
            </p>
          </div>
        </div>
        <div className="mt-5 gap-3 flex flex-col lg:flex-row">
          <div className="w-full">
            <label
              for="username-error"
              className={`block mb-2 text-sm font-medium ${
                errors.yearBuilt?.message
                  ? "text-red-700 dark:text-red-500"
                  : ""
              } `}
            >
              Year built
            </label>
            <input
              maxLength={4}
              {...register("yearBuilt")}
              type="number"
              id="username-error"
              class={`block p-2.5 w-full text-sm  rounded-lg border ${
                errors.yearBuilt?.message
                  ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                  : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }  
            `}
              placeholder="Enter property year built"
            />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.yearBuilt?.message}
            </p>
          </div>
          <div className="w-full">
            <label
              for="username-error"
              className={`block mb-2 text-sm font-medium ${
                errors.propertySize?.message
                  ? "text-red-700 dark:text-red-500"
                  : ""
              } `}
            >
              Property size in sq/ft
            </label>
            <input
              {...register("propertySize")}
              type="number"
              id="username-error"
              class={`block p-2.5 w-full text-sm  rounded-lg border ${
                errors.propertySize?.message
                  ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                  : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }  
            `}
              placeholder="Enter your property size"
            />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.propertySize?.message}
            </p>
          </div>
        </div>
      </div>
    </m.div>
  );
};

export default Details;
