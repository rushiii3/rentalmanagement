import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { FaHouse } from "react-icons/fa6";
import { IoVideocam } from "react-icons/io5";
import { FaCalendar } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import { PhysicalVisitServer } from "../../server";
import PhysicalVisitTab from "./Component/PhysicalVisit";
import VideoConfereneceTab from "./Component/VideoConfereneceTab";
import BookingTab from "./Component/BookingTab";
const Booking = () => {
  const { user } = useSelector((state) => state.user);
  const [PropertyBookings, setPropertyBookings] = useState([]);
  const [PhysicalVisit, setPhysicalVisit] = useState([]);
  const [VideoConference, setVideoConference] = useState([]);
  const [FilteredVideoConference, setFilteredVideoConference] = useState([]);
  const [FilteredPhysicalVisit, setFilteredPhysicalVisit] = useState([]);
  const [FilteredBookings, setFilteredBookings] = useState([]);
  const userid = user?.user?.email;
  const [input, setinput] = useState("");
  const [input2, setinput2] = useState("");
  const [input3, setinput3] = useState("");
  const getData = async () => {
    // const PropertyData = await axios.get()
    const { data } = await axios.get(
      `${PhysicalVisitServer}/get-vist/${userid}`
    );
    setPhysicalVisit(data.finalvisits);
    setVideoConference(data.finalvideo);
    setFilteredVideoConference(data.finalvideo);
    setFilteredPhysicalVisit(data.finalvisits);
    setPropertyBookings(data.finalbook);
    setFilteredBookings(data.finalbook);
  };
  useEffect(() => {
    getData();
  }, []);
  
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
          >
            <BookingTab FilteredBookings={FilteredBookings} setFilteredBookings={setFilteredBookings} setinput3={setinput3} input3={input3} PropertyBookings={PropertyBookings}/>
          </Tab>
          <Tab
            key="music"
            title={
              <div className="flex items-center space-x-2">
                <FaCalendar />
                <span>Physical Visit</span>
              </div>
            }
          >
           <PhysicalVisitTab input={input} setinput={setinput} PhysicalVisit={PhysicalVisit} setFilteredPhysicalVisit={setFilteredPhysicalVisit} FilteredPhysicalVisit={FilteredPhysicalVisit}/>
          </Tab>
          <Tab
            key="videos"
            title={
              <div className="flex items-center space-x-2">
                <IoVideocam />
                <span>Video Conference</span>
              </div>
            }
          >
            <VideoConfereneceTab setinput2={setinput2} input2={input2} setFilteredVideoConference={setFilteredVideoConference} VideoConference={VideoConference} FilteredVideoConference={FilteredVideoConference}/>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default Booking;

const NoBookings = ({ icon }) => {
  return (
    <div className="flex items-center flex-col justify-center">
      {icon}
      <p>No Bookings yet!</p>
    </div>
  );
};
