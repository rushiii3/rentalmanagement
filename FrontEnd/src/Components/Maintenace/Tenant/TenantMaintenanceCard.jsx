import React from 'react'
import {Link} from 'react-router-dom'
import {Chip} from '@nextui-org/react';
const TenantMaintenanceCard = ({value}) => {
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
          
          <Link to={`/properties/${value?.property_id?._id}`}>
            <div class="font-semibold text-gray-800 text-xl text-center lg:text-left px-2">
              {value?.property_id?.property_no_of_bhk}{" "}
              {value?.property_id?.property_type} House in{" "}
              {value?.property_id?.building_name},{" "}
              {value?.property_id?.property_locality}
            </div>
          </Link>
          <div class="text-gray-600 font-medium text-sm pt-1 text-center lg:text-left px-2">
            <p>
                <b>Description</b> : {value?.request_description}
            </p>
            <p>
                <b>Emergency</b> : {value?.emergency?"Yes":"No"}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center px-3 ml-auto py-2 font-semibold">
            <Chip color={value?.request_status==="Pending"?"warning":value?.request_status==="Completed"?"success":value?.request_status==="InProgress"?"secondary":value?.request_status==="Rejected"?"danger":null} size="md">
            {value?.request_status}
            </Chip>
          
        </div>
      </div>
    </div>
  )
}

export default TenantMaintenanceCard