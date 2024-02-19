import React from "react";
import { Link } from "react-router-dom";
const formatDateString = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC", // Set the desired time zone here
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(date);
};

const PropertyBookingCard = ({ value }) => {
  const formattedDate = formatDateString(value?.booking_date);
  return (
    <div class="bg-white rounded-xl border shadow-md overflow-hidden ">
      <div class="md:flex max-w-full">
        <div class="md:shrink-0">
          <img
            class="h-48 w-full object-cover md:h-full md:w-48"
            src={value?.property_id?.image}
            alt="property image"
          />
        </div>
        <div class="p-8">
          <div class="flex flex-row lg:justify-start justify-center">
            <div class="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
              {formattedDate}
            </div>
            <div class="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
              Landlord : {value?.property_id?.landlord_id?.firstname}{" "}
              {value?.property_id?.landlord_id?.lastname}
            </div>
          </div>
          <Link to={`/properties/${value?.property_id?._id}`}>
            <div class="font-semibold text-gray-800 text-xl text-center lg:text-left px-2">
              {value?.property_id?.property_no_of_bhk}{" "}
              {value?.property_id?.property_type} House in{" "}
              {value?.property_id?.building_name},{" "}
              {value?.property_id?.property_locality}
            </div>
          </Link>
          <div class="text-gray-600 font-medium text-sm pt-1 text-center lg:text-left px-2">
            {value?.property_id?.building_number}{" "}
            {value?.property_id?.building_name},{" "}
            {value?.property_id?.property_streetname},{" "}
            {value?.property_id?.property_locality},{" "}
            {value?.property_id?.property_city},{" "}
            {value?.property_id?.property_state},{" "}
            {value?.property_id?.property_pincode}
          </div>
        </div>
        <div className="flex justify-center items-center px-3 ml-auto py-2 font-semibold">
          {value?.status}
        </div>
      </div>
    </div>
  );
};

export default PropertyBookingCard;
