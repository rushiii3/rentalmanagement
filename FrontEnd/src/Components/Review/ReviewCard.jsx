import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
/* The commented out function `getRating(rating)` is a JavaScript function that takes a `rating` as
input and returns a corresponding descriptive string based on the rating value. */
function getRating(rating) {
  switch (rating) {
    case 1:
      return "Poor";
    case 2:
      return "Nothing special";
    case 3:
      return "Average";
    case 4:
      return "Very good";
    case 5:
      return "Excellent";
    default:
      return "None";
  }
}
const ReviewCard = ({ value }) => {
    console.log(value);
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
          <div class="text-gray-600 font-medium text-lg pt-1 text-center lg:text-left px-2">
          <b>Review :</b> {value?.review}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center px-3 ml-auto py-2 font-semibold">
          <Rating value={value?.rating} style={{ maxWidth: 270 }} className="mt-2" readOnly />
          {getRating(value?.rating)}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
