import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Divider,
  } from "@nextui-org/react";
const Address = ({Data}) => {
  return (
    <Card className="max-w-full mt-5">
      <CardHeader className="flex gap-3">
        <h1 className="text-2xl font-bold">Address</h1>
      </CardHeader>
      <Divider />
      <CardBody>
        <div class="grid md:grid-cols-2 grid-cols-1 gap-4 text-md">
          <div>
            <span className="font-bold">
              {Data?.property_type === "BHK"
                ? "Building Number"
                : "House Number"}
            </span>{" "}
            : {Data?.building_number}
          </div>
          <div>
            <span className="font-bold">
              {Data?.property_type === "BHK" ? "Building Name" : "Chawal Name"}
            </span>{" "}
            : {Data?.building_name}
          </div>
          <div>
            <span className="font-bold">Street name</span> :{" "}
            {Data?.property_streetname}
          </div>
          <div>
            <span className="font-bold">Locality</span> :{" "}
            {Data?.property_locality}
          </div>
          <div>
            <span className="font-bold">State</span> : {Data?.property_state}
          </div>
          <div>
            <span className="font-bold">City</span> : {Data?.property_city}
          </div>
          <div>
            <span className="font-bold">Pincode</span> :{" "}
            {Data?.property_pincode}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Address;
