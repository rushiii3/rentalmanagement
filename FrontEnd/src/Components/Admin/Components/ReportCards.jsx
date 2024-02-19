import React from "react";
import {
  Avatar,
  Button,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaRegCircleCheck } from "react-icons/fa6";
import { PiWarningCircleBold } from "react-icons/pi";



const ReportCards = ({ value,handleStatus }) => {
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  console.log(value);
 
  return (
    <div class="bg-white border rounded-xl max-w-full my-2">
      <div className="flex justify-between">
        <div class="flex px-4 py-3 items-center">
          <Avatar
            src={value?.user_id?.avatar?.url}
            className="h-10 w-10 rounded-full"
          />
          <div class="ml-3 ">
            <span class="text-sm font-semibold antialiased block leading-tight">
              {value?.user_id?.firstname} {value?.user_id?.lastname}
            </span>
            <span class="text-gray-600 text-xs block">
              {value?.user_id?.email}
            </span>
            <Chip color={value?.report_status==="Pending" ? "warning" : value?.report_status==="Resolved" ? "success" : value?.report_status==="Closed" ? "danger" : value?.report_status==="Unresolvable" ? "primary" : "" } variant="flat" className="mt-2" size="sm">
              {
                value?.report_status
              }
            </Chip>
          </div>
        </div>
        <div>
          <div className="relative flex justify-end items-center gap-2 ml-auto">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="lg" variant="light">
                  {/* <VerticalDotsIcon className="text-default-300" /> */}
                  <BsThreeDotsVertical size={25} className="text-default-600" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                variant="faded"
                aria-label="Dropdown menu with description"
              >
                <DropdownSection title="Actions">
                  <DropdownItem
                    key="Resolved"
                    description="Create a new file"
                    startContent={<FaRegCircleCheck className={iconClasses} />}
                    onClick={() => handleStatus(value?._id, "Resolved")}
                  >
                    Resolved
                  </DropdownItem>
                  <DropdownItem
                    key="Resolved"
                    description="Copy the file link"
                    startContent={
                      <PiWarningCircleBold className={iconClasses} />
                    }
                    onClick={() => handleStatus(value?._id, "Unresolvable")}
                  >
                    Unresolvable
                  </DropdownItem>
                  <DropdownItem
                    key="Closed"
                    description="Allows you to edit the file"
                    startContent={
                      <IoMdCloseCircleOutline className={iconClasses} />
                    }
                    onClick={() => handleStatus(value?._id, "Closed")}
                  >
                    Closed
                  </DropdownItem>
                </DropdownSection>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-between mx-4 mt-3 mb-2 overflow-auto text-pretty whitespace-pre-line max-w-full break-words">
        <p>{value?.report_description}</p>
      </div>
    </div>
  );
};

export default ReportCards;
