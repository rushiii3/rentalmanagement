import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Divider,
  } from "@nextui-org/react";
const Description = ({Data}) => {
  return (
    <Card className="max-w-full">
      <CardHeader className="flex gap-3">
        <h1 className="text-2xl font-bold">Description</h1>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{Data?.property_description}</p>
      </CardBody>
    </Card>
  );
};

export default Description;
