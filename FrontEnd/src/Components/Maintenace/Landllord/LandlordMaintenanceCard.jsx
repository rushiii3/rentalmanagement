import React from "react";
import { Avatar, Chip, Button } from "@nextui-org/react";
import RejectModal from "./RejectModal";
import { MaintenaceServer } from "../../../server";
import toast from "react-hot-toast";
import axios from "axios";
const formatDateString = (dateString) => {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC", // Set the desired time zone here
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(date);
};
const LandlordMaintenanceCard = ({ value,setMaintenanceData,MaintenanceData }) => {
  const handleStatus = async (action,action_id) => {
    const toastId = toast.loading('Changing status...');
        try {
            const {data} = await axios.put(`${MaintenaceServer}/update-maintenance-status`,{action,action_id});
            if(data.success){
                const indexOfObjectToUpdate = MaintenanceData.findIndex(
                    (item) => item._id === action_id
                  );
                  const updatedData = [...MaintenanceData];
                  updatedData[indexOfObjectToUpdate].request_status = action;
                  setMaintenanceData(updatedData)
                toast.success("Status changed successfully!", {
                    id: toastId,
                  });

            }
        } catch (error) {
            toast.error(error.message, {
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
                <b>Request Date : </b>
                {formatDateString(value?.date_of_request)}
              </div>
              <div class="text-sm text-gray-500">
                <b>Emergency :</b> {value?.emergency ? "Yes" : "No"}
              </div>
              <div class="text-sm text-gray-500">
                <b>Description :</b> {value?.request_description}
              </div>
            </div>

            <div class="p-2 flex items-center  space-y-4">
              {value?.request_status === "Pending" ? (
                <div className="flex flex-col w-full space-y-3 ">
                  <div className="w-full">
                    <Button
                      color="primary"
                      className="w-full"
                      onClick={() => handleStatus( "InProgress",value?._id)}
                    >
                      InProgress
                    </Button>
                  </div>
                  <div className="flex flex-col w-full space-y-3 md:flex-row md:space-x-3 md:space-y-0 ">
                    <Button
                      color="success"
                      className="w-full"
                      onClick={() => handleStatus( "Completed",value?._id)}
                    >
                      Completed
                    </Button>
                    <RejectModal
                      type="Rejected"
                      server={MaintenaceServer}
                      id={value?._id}
                      endpoint="/update-maintenance-status"
                      message="Rejecting this request will reject the request immediately. This action cannot be undone."
                      setMaintenanceData={setMaintenanceData}
                      MaintenanceData={MaintenanceData}
                    />
                  </div>
                </div>
              ) : value?.request_status === "InProgress" ? (
                <div className="flex flex-col w-full space-y-3 md:flex-row md:space-x-3 md:space-y-0 ">
                  <Button
                    color="success"
                    className="w-full"
                    onClick={() => handleStatus( "Completed",value?._id)}
                  >
                    Completed
                  </Button>
                  <RejectModal
                    type="Rejected"
                    server={MaintenaceServer}
                    id={value?._id}
                    endpoint="/update-maintenance-status"
                    message="Rejecting this request will reject the request immediately. This action cannot be undone."
                    setMaintenanceData={setMaintenanceData}
                      MaintenanceData={MaintenanceData}
                  />
                </div>
              ) : value?.request_status === "Completed" ? (
                <Chip size="md" color="success" variant="flat">
                  {value?.request_status}
                </Chip>
              ) : value?.request_status === "Rejected" ? (
                <Chip size="md" color="danger" variant="flat">
                  {value?.request_status}
                </Chip>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandlordMaintenanceCard;
