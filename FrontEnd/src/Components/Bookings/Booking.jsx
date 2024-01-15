import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { FaHouse } from "react-icons/fa6";
import { IoVideocam } from "react-icons/io5";
import { FaCalendar } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import { PhysicalVisitServer } from "../../server";
import PhysicalVisitCard from "./Component/PhysicalVisitCard";
import { CiVideoOff } from "react-icons/ci";
import { LuCalendarOff } from "react-icons/lu";
import VideoConferenceVisit from "./Component/VideoConferenceVisit";
import { BsFilterCircle } from "react-icons/bs";
import DatePicker from "react-multi-date-picker";
import DatePickerHeader from "react-multi-date-picker/plugins/date_picker_header";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
} from "@nextui-org/react";

const Booking = () => {
  const { user } = useSelector((state) => state.user);
  const [PropertyBookings, setPropertyBookings] = useState([]);
  const [PhysicalVisit, setPhysicalVisit] = useState([]);
  const [VideoConference, setVideoConference] = useState([]);
  const userid = user?.user?.email;
  const getData = async () => {
    // const PropertyData = await axios.get()
    const { data } = await axios.get(
      `${PhysicalVisitServer}/get-vist/${userid}`
    );
    setPhysicalVisit(data.finalvisits);
    setVideoConference(data.finalvideo);
  };
  useEffect(() => {
    getData();
  }, []);
  const data = VideoConference;
  const onChangeInput = (e) => {
    const searchValue = e.target.value.toLowerCase();
    if (!searchValue.trim()) {
      // If the search value is empty or contains only whitespace, return the entire data array
      setVideoConference(data)
    }
    const filtered = data.filter((value) =>
      value.property_id.property_state.toLowerCase().includes(searchValue) ||
      value.property_id.property_city.toLowerCase().includes(searchValue) ||
      value.property_id.property_locality.toLowerCase().includes(searchValue)
    );
  
    // Now 'filtered' contains the items that match the search criteria.
    // You can use 'filtered' in your application as needed.
    setVideoConference(filtered)
    console.log(filtered);
  };
  
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
            {VideoConference.length}
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
            {PhysicalVisit && PhysicalVisit.length === 0 ? (
              <NoBookings
                icon={
                  <LuCalendarOff className="mx-auto h-56 w-auto text-black sm:h-64 dark:text-white" />
                }
              />
            ) : (
              <div>
                <div className="mb-5 ">
                  <label
                    class="mx-auto mb-5 relative bg-white min-w-sm max-w-2xl flex flex-row  items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
                    htmlFor="search-bar"
                  >
                    <input
                      id="search-bar"
                      placeholder="your keyword here"
                      class="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white"
                    />
                    <button class=" md:w-auto px-6 py-3 bg-black border-black text-white fill-white active:scale-95 duration-100 border will-change-transform overflow-hidden relative rounded-xl transition-all disabled:opacity-70">
                      <div class="relative">
                        <div class="flex items-center justify-center h-3 w-3 absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transition-all">
                          <svg
                            class="opacity-0 animate-spin w-full h-full"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              class="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              stroke-width="4"
                            ></circle>
                            <path
                              class="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        </div>

                        <div class="flex items-center transition-all opacity-1 valid:">
                          <span class="text-sm font-semibold whitespace-nowrap truncate mx-auto">
                            Search
                          </span>
                        </div>
                      </div>
                    </button>
                  </label>
                </div>
                <div className="flex flex-col gap-y-5 mt-5">
                  {PhysicalVisit.map((value, key) => (
                    <PhysicalVisitCard key={key} value={value} />
                  ))}
                </div>
              </div>
            )}
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
             <div className="mb-5 flex justify-center items-center flex-row w-full gap-6">
                  <div class=" bg-white w-full md:w-1/2 mx-auto flex flex-row  items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300">
                    <input
                      id="search-bar"
                      placeholder="your keyword here"
                      class="px-6 py-2 w-full rounded-md  outline-none bg-white"
                      onInput={onChangeInput}
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <Popover placement="bottom" showArrow offset={10}>
                      <PopoverTrigger>
                        <Button color="white" isIconOnly><BsFilterCircle size={30} /></Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[240px]">
                        {(titleProps) => (
                          <div className="px-1 py-2 w-full">
                            <p
                              className="text-small font-bold text-foreground"
                              {...titleProps}
                            >
                              Dimensions
                            </p>
                            <div className="mt-2 flex flex-col gap-2 w-full">
                              <div class="flex flex-col">
                                <label
                                  htmlFor="status"
                                  class="text-stone-600 text-sm font-medium"
                                >
                                  Status
                                </label>

                                <select
                                  id="status"
                                  class="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                >
                                  <option value="any" selected>Any</option>
                                  <option value="Completed">Completed</option>
                                  <option value="Booked">Booked</option>
                                  <option value="Accepted">Accepted</option>
                                  <option value="Rejected">Rejected</option>
                                </select>
                              </div>
                              <div class="flex flex-col">
                                <label
                                  htmlFor="manufacturer"
                                  class="text-stone-600 text-sm font-medium"
                                >
                                  Date
                                </label>
                                <DatePicker
                                  plugins={[<DatePickerHeader />]}
                                  render={
                                    <input
                                      placeholder="Select date"
                                      class="mt-2 block w-full rounded-md border border-gray-200 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
            {VideoConference && VideoConference.length === 0 ? (
              <NoBookings
                icon={
                  <CiVideoOff className="mx-auto h-56 w-auto text-black sm:h-64 dark:text-white" />
                }
              />
            ) : (
              <div>
               
                <div className="flex flex-col gap-y-5 mt-5">
                  {VideoConference.map((value, key) => (
                    <VideoConferenceVisit key={key} value={value} />
                  ))}
                </div>
              </div>
            )}
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
