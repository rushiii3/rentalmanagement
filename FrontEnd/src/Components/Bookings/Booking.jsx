import React from "react";
import { Tabs, Tab, Chip } from "@nextui-org/react";
const Booking = () => {
  return (
    <div className="lg:mx-16 mt-5 mx-3 ">
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
                <span>Photos</span>
                <Chip size="sm" variant="faded">
                  9
                </Chip>
              </div>
            }
          />
          <Tab
            key="music"
            title={
              <div className="flex items-center space-x-2">
                <span>Music</span>
                <Chip size="sm" variant="faded">
                  3
                </Chip>
              </div>
            }
          >
            <label
              class="mx-auto  relative bg-white min-w-sm max-w-2xl flex flex-row  items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
              for="search-bar"
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
            <div className="flex flex-col gap-y-5">
              <div class=" bg-white rounded-xl shadow-md overflow-hidden ">
                <div class="md:flex max-w-full">
                  <div class="md:shrink-0">
                    <img
                      class="h-48 w-full object-cover md:h-full md:w-48"
                      src="https://loremflickr.com/g/320/240/team"
                    />
                  </div>
                  <div class="p-8">
                    <div class="flex flex-row lg:justify-start justify-center">
                      <div class="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
                        <i class="far fa-clock"></i> 1:30 PM
                      </div>
                      <div class="text-gray-700 font-medium text-sm text-center lg:text-left px-2">
                        Organiser : IHC
                      </div>
                    </div>
                    <div class="font-semibold text-gray-800 text-xl text-center lg:text-left px-2">
                      International Conference
                    </div>

                    <div class="text-gray-600 font-medium text-sm pt-1 text-center lg:text-left px-2">
                      A-142/1, A-142, Ganesh Nagar, Tilak Nagar, New Delhi,
                      110018
                    </div>
                  </div>
                  <div className="flex justify-center items-center px-3 ml-auto py-2 font-semibold">
                    Pending
                  </div>
                </div>
              </div>
            </div>
          </Tab>
          <Tab
            key="videos"
            title={
              <div className="flex items-center space-x-2">
                <span>Videos</span>
                <Chip size="sm" variant="faded">
                  1
                </Chip>
              </div>
            }
          />
        </Tabs>
      </div>
    </div>
  );
};

export default Booking;
