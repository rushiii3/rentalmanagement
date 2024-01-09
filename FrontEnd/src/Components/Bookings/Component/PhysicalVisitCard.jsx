import React from "react";
const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
const PhysicalVisitCard = ({ value }) => {
  const formattedDate = formatDateString(value?.pv_date);
  return (
    <div class=" bg-white rounded-xl border shadow-md overflow-hidden ">
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
              <i class="far fa-clock"></i>  {formattedDate} {value?.pv_time}
            </div>
            <div class="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
              Landlord : {value?.property_id?.landlord_id?.firstname}{" "}
              {value?.property_id?.landlord_id?.lastname}
            </div>
          </div>
          <div class="font-semibold text-gray-800 text-xl text-center lg:text-left px-2">
          {value?.property_id?.property_no_of_bhk} {value?.property_id?.property_type} House in{" "}
              {value?.property_id?.building_name}, {value?.property_id?.property_locality}
          </div>

          <div class="text-gray-600 font-medium text-sm pt-1 text-center lg:text-left px-2">
          {value?.property_id?.building_number} {value?.property_id?.building_name}, {value?.property_id?.property_streetname}, {value?.property_id?.property_locality}, {value?.property_id?.property_city}, {value?.property_id?.property_state}, {value?.property_id?.property_pincode}
          </div>
        </div>
        <div className="flex justify-center items-center px-3 ml-auto py-2 font-semibold">
          {value?.pv_status}
        </div>
      </div>
    </div>
  );
};

export default PhysicalVisitCard;
