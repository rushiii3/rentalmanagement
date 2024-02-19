import { Avatar, Button, Chip } from "@nextui-org/react";
import React from "react";
import axios from "axios";
import {
  PropertyBookingServer,
  PhysicalVisitServer,
  VideoConferenceServer,
} from "../../../server";
import toast from "react-hot-toast";
import { BsCameraVideo } from "react-icons/bs";
import {useNavigate } from "react-router-dom";

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
  PropertyData,
  setPropertyData,
}) => {
  const navigate = useNavigate();
  console.log(value);
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

  // Calculate days, hours, minutes, months, and years
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const months = Math.floor(days / 30); // Approximate calculation
  const years = Math.floor(months / 12); // Approximate calculation

  let result;

  if (years > 0) {
    result = `${years} ${years > 1 ? "years" : "year"}`;
  } else if (months > 0) {
    result = `${months} ${months > 1 ? "months" : "month"}`;
  } else if (days > 0) {
    result = `${days} ${days > 1 ? "days" : "day"}`;
  } else if (hours > 0) {
    result = `${hours} ${hours > 1 ? "hrs" : "hr"}`;
  } else {
    result = `${minutes} ${minutes > 1 ? "mins" : "min"}`;
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
        const indexOfObjectToUpdateProperty = PropertyData.findIndex(
          (item) => item._id === value.property_id
        );
        if (indexOfObjectToUpdate !== -1) {
          const updatedData = [...FilteredBookings];
          const updatePropertyData = [...PropertyData];
          if (selectedTab === "property_booking") {
            updatedData[indexOfObjectToUpdate].status = type;
            if (type === "Accepted") {
              updatePropertyData[
                indexOfObjectToUpdateProperty
              ].property_rented = true;
              setPropertyData(updatePropertyData);
            }
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
              ) : selectedTab !== "property_booking" &&
                convertToUTC(currentDate) > booking_date &&
                status === "Accepted" ? (
                <>
                  <div className="flex flex-col w-full">
                    
                    <div className="mb-4 w-full flex flex-row space-x-3">
                      <Button
                        color="success"
                        variant="bordered"
                        onClick={() => handleStatus(value?._id, "Completed")}
                        className="w-full"
                        
                      >
                        Complete
                      </Button>
                      <Button
                        color="danger"
                        variant="bordered"
                        onClick={() => handleStatus(value?._id, "Incomplete")}
                        className="w-full"
                      >
                        Incomplete
                      </Button>
                    </div>
                    <Button
                      startContent={<BsCameraVideo size={25} />}
                      color="primary"
                      variant="solid"
                      onClick={() => navigate(`/video-conference/${value?._id}`)}
                      
                    >
                      Start Conference
                    </Button>
                  </div>
                </>
              ) : status === "Accepted" ||
                status === "Rejected" ||
                status === "Completed" ||
                status === "Incomplete" ? (
                <Chip
                  color={
                    status === "Accepted"
                      ? "primary"
                      : status === "Rejected"
                      ? "danger"
                      : status === "Completed"
                      ? "success"
                      : status === "Incomplete"
                      ? "warning"
                      : ""
                  }
                  variant="flat"
                >
                  {status}
                </Chip>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyBookingTabCard;
