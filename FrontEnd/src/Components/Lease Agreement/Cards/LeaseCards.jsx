import React from "react";
import { Avatar, Chip, Button } from "@nextui-org/react";
import AddLeasModal from "./AddLeasModal";
import RemoveDeleteModal from "./RemoveDeleteModal";
const formatDateString = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
const LeaseCards = ({ value, setLeaseData, LeaseData }) => {
  console.log(value);
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
                {value?.lease_status === "Pending"
                  ? "Agreement not yet started"
                  : value?.lease_status === "Terminate"
                  ? ""
                  : value?.lease_status === "InAgreement"
                  ? `${formatDateString(
                      value?.lease_start_date
                    )} to ${formatDateString(value?.lease_end_date)}`
                  : null}
              </div>
            </div>

            <div class="p-2 flex items-center space-x-4">
              {value?.lease_status === "Pending" ? (
                <div className="flex flex-col w-full space-y-3 md:flex-row md:space-x-3 md:space-y-0">
                  <AddLeasModal
                    value={value}
                    setLeaseData={setLeaseData}
                    LeaseData={LeaseData}
                  />
                  <RemoveDeleteModal
                  id={value?._id}
                    type="Delete"
                    message="You will lose all of your data by deleting this. This action cannot be undone."
                  />
                </div>
              ) : value?.lease_status === "Terminate" ? (
                (<Chip color="danger"> Terminated </Chip>)
              ) : value?.lease_status === "InAgreement" ? (
                <div className="flex flex-col w-full space-y-3 md:flex-row md:space-x-3 md:space-y-0">
                  <AddLeasModal
                    value={value}
                    setLeaseData={setLeaseData}
                    LeaseData={LeaseData}
                  />
                  <RemoveDeleteModal
                    id={value?._id}
                    type="Terminate"
                    message="Terminating this agreement will end the lease immediately. This action cannot be undone."
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaseCards;
