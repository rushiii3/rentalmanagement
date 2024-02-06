import { Avatar, Button, Chip } from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  PropertyBookingServer,
  PhysicalVisitServer,
  VideoConferenceServer,
} from "../../../server";
import toast from "react-hot-toast";
const formatDateString = (dateString) => {
  const date = new Date(dateString);
  date.setUTCHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
const convertToUTC = (dateString) => {
  // Create a Date object from the input string
  const date = new Date(dateString);

  // Calculate the UTC timestamp by subtracting the timezone offset
  const utcTimestamp = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  );

  // Convert the UTC timestamp to ISO 8601 format
  const isoString = utcTimestamp.toISOString();

  return isoString;
};
// Output: 2024-02-04T18:30:00.000Z

const PropertyBookingTabCard = ({
  value,
  FilteredBookings,
  setSelectedPropertyData,
  selectedTab,
}) => {
  const status =
    selectedTab === "property_booking"
      ? value?.status
      : selectedTab === "video_conference"
      ? value?.vc_status
      : selectedTab === "physical_visit"
      ? value?.pv_status
      : "";
  const formattedDate = formatDateString(
    selectedTab === "property_booking"
      ? value?.booking_date
      : selectedTab === "video_conference"
      ? value?.vc_date
      : selectedTab === "physical_visit"
      ? value?.pv_date
      : ""
  );
  const timestamp = new Date(
    selectedTab === "property_booking"
      ? value?.booking_date
      : selectedTab === "video_conference"
      ? value?.addedAt
      : selectedTab === "physical_visit"
      ? value?.addedAt
      : ""
  );
  const booking_date =
    selectedTab === "video_conference"
      ? value?.vc_date
      : selectedTab === "physical_visit"
      ? value?.pv_date
      : "";
  const currentDate = new Date();
  const timeDifference = currentDate - timestamp;

  // Calculate days, hours, and minutes
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  let result;

  if (days > 0) {
    result = `${days} days`;
  } else if (hours > 0) {
    result = `${hours} hrs`;
  } else {
    result = `${minutes} min`;
  }
  const handleStatus = async (id, type) => {
    const toastId = toast.loading("Updating statuss....");

    try {
      const Response = await axios.put(
        `${
          selectedTab === "property_booking"
            ? PropertyBookingServer
            : selectedTab === "video_conference"
            ? VideoConferenceServer
            : selectedTab === "physical_visit"
            ? PhysicalVisitServer
            : ""
        }/update-status`,
        {
          id,
          type,
        }
      );
      if (Response.data.success) {
        toast.success("Status updated successfully!!", {
          id: toastId,
        });
        const indexOfObjectToUpdate = FilteredBookings.findIndex(
          (item) => item._id === id
        );
        if (indexOfObjectToUpdate !== -1) {
          const updatedData = [...FilteredBookings];
          if (selectedTab === "property_booking") {
            updatedData[indexOfObjectToUpdate].status = type;
          } else if (selectedTab === "video_conference") {
            updatedData[indexOfObjectToUpdate].vc_status = type;
          } else if (selectedTab === "physical_visit") {
            updatedData[indexOfObjectToUpdate].pv_status = type;
          }
          setSelectedPropertyData(updatedData);
        } else {
          console.log("Object not found");
        }
      }
    } catch (error) {
      toast.error(error.response.data.message, {
        id: toastId,
      });
    }
  };


  return (
    <div class="bg-white rounded-xl border shadow-md overflow-hidden ">
      <div class="bg-white w-full flex  p-2 rounded-xl shadow border  flex-col md:flex-row">
        <div className="flex w-full">
          <div class="flex items-center space-x-4">
            <Avatar
              src={value?.user_id?.avatar?.url}
              className="w-20 h-20 md:w-24 md:h-24  text-xl"
            />
          </div>
          <div className="flex justify-between w-full flex-col md:flex-row md:items-center">
            <div class="flex-grow p-3">
              <div class="font-semibold text-gray-700 text-lg md:text-xl">
                {value?.user_id?.firstname} {value?.user_id?.lastname}
              </div>
              <div class="text-sm text-gray-500">
                {selectedTab === "video_conference" ||
                selectedTab === "physical_visit" ? (
                  <>
                    <p>Visiting Date : {formattedDate}</p>
                    <p>
                      Visiting Time :{" "}
                      {selectedTab === "video_conference"
                        ? value?.vc_time
                        : selectedTab === "physical_visit"
                        ? value?.pv_time
                        : ""}
                    </p>
                  </>
                ) : (
                  ""
                )}
                {result} ago
              </div>
            </div>

            <div class="p-2 flex items-center space-x-4">
              {status === "Pending" ? (
                <>
                  <Button
                    color="success"
                    variant="bordered"
                    onClick={() => handleStatus(value?._id, "Accepted")}
                  >
                    Accept
                  </Button>
                  <Button
                    color="danger"
                    variant="bordered"
                    onClick={() => handleStatus(value?._id, "Rejected")}
                  >
                    Reject
                  </Button>
                </>
              )  : selectedTab !== "property_booking" &&
                convertToUTC(currentDate) > booking_date &&
                status === "Accepted" ? (
                <>
                  <Button
                    color="success"
                    variant="bordered"
                    onClick={() => handleStatus(value?._id, "Completed")}
                  >
                    Complete
                  </Button>
                  <Button
                    color="danger"
                    variant="bordered"
                    onClick={() => handleStatus(value?._id, "Incomplete")}
                  >
                    Incomplete
                  </Button>
                </>
              ) :  status === "Accepted"  ? (
              <Chip color="primary" variant="flat">
                Accepted
              </Chip>
            ) : status === "Rejected" ? (
              <Chip color="danger" variant="flat">
                Rejected
              </Chip>
            ): status === "Completed" ? (
              <Chip color="success" variant="flat">
                Completed
              </Chip> ): status === "Incomplete" ? (
              <Chip color="warning" variant="flat">
                Incomplete
              </Chip>) : ""}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyBookingTabCard;
