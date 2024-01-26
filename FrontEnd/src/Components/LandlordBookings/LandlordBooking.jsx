import React, { useEffect, useState } from "react";
import { Tabs, Tab,Card, CardBody, CardHeader } from "@nextui-org/react";
import { FaHouse } from "react-icons/fa6";
import { IoVideocam } from "react-icons/io5";
import { FaCalendar } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";

import { propertServer } from "../../server";
// import PhysicalVisitTab from "./Component/PhysicalVisit";
// import VideoConfereneceTab from "./Component/VideoConfereneceTab";
// import BookingTab from "./Component/BookingTab";

const LandlordBooking = () => {
    const {user} = useSelector((state) => state.user);
    const userid = user?.user?.email;
    useEffect(() => {
      const getProperties = async() => {
        const { data } = await axios.get(
            `${propertServer}/landlord-property/${userid}`
          );
      }
      getProperties()
    }, [])
    
    let tabs = [
        {
          id: "photos",
          label: "Photos",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        },
        {
          id: "music",
          label: "Music",
          content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        },
        {
          id: "videos",
          label: "Videos",
          content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            id: "photos",
            label: "Photos",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          },
          {
            id: "music",
            label: "Music",
            content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          },
          {
            id: "videos",
            label: "Videos",
            content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          },
          {
            id: "photos",
            label: "Photos",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          },
          {
            id: "music",
            label: "Music",
            content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          },
          {
            id: "videos",
            label: "Videos",
            content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          },
          {
            id: "photos",
            label: "Photos",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          },
          {
            id: "music",
            label: "Music",
            content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
          },
          {
            id: "videos",
            label: "Videos",
            content: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          }
      ];
  return (
    <div className="lg:mx-16 mt-5 mx-3 min-h-screen">
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      Your Bookings
    </h5>
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        color="primary"
        variant="underlined"
        classNames={{
          tabList:
            "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-[#22d3ee]",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-[#06b6d4]",
        }}
      >
        <Tab
          key="photos"
          title={
            <div className="flex items-center space-x-2">
              <FaHouse />
              <span>Property</span>
            </div>
          }
        />       
        <Tab
          key="music"
          title={
            <div className="flex items-center space-x-2">
              <FaCalendar />
              <span>Physical Visit</span>
            </div>
          }
        />
        
        <Tab
          key="videos"
          title={
            <div className="flex items-center space-x-2">
              <IoVideocam />
              <span>Video Conference</span>
            </div>
          }
        />
      </Tabs>
    </div>
    <div className="flex w-full flex-col mt-5">
      <Tabs color="secondary" aria-label="Dynamic tabs" items={tabs}>
        {(item) => (
          <Tab key={item.id}  title={item.label}>
            <Card>
              <CardBody>
                {item.content}
              </CardBody>
            </Card>  
          </Tab>
        )}
      </Tabs>
    </div>  
  </div>
  )
}

export default LandlordBooking