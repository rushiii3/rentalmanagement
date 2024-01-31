import React, { useEffect, useState } from "react";
import { Tabs, Tab,Card, CardBody, CardHeader } from "@nextui-org/react";
import { FaHouse } from "react-icons/fa6";
import { IoVideocam } from "react-icons/io5";
import { FaCalendar } from "react-icons/fa";
import { useSelector } from "react-redux";
import axios from "axios";
import { PropertyBookingServer, propertServer } from "../../server";
// import PhysicalVisitTab from "./Component/PhysicalVisit";
// import VideoConfereneceTab from "./Component/VideoConfereneceTab";
// import BookingTab from "./Component/BookingTab";

const LandlordBooking = () => {
  const [selectedTab, setSelectedTab] = useState(null);
  const [PropertyData, setPropertyData] = useState([]);
    const {user} = useSelector((state) => state.user);
    const userid = user?.user?.email;
    useEffect(() => {
      const getProperties = async() => {
        try {
          const { data } = await axios.get(
            `${propertServer}/landlord-property/${userid}`
          );
            setPropertyData(data.property);
            if(data.property){
              setSelectedTab('property_booking');
              try {
                const property_ids = data.property?.map((value)=>value?._id);
                const serverResponse = await axios.post(`${PropertyBookingServer}/get-bookings`,property_ids);
                console.log(serverResponse.data.property_data);
                const data = [ /* Your array of objects */ ];

const targetId = '65b366b299d21cb018e6ea8c';

const targetObject = data.find(item => item.bookings.some(booking => booking._id === targetId));

console.log(targetObject);

              } catch (error) {
                console.log(error.message);
              }
            }
        } catch (error) {
          console.log(error.message);
        }
      }
      getProperties()
    }, [])
    const handleSelection = async(e) => {
      setSelectedTab(e);
      const property_ids = PropertyData?.map((value)=>value?._id);
      if(e==="property_booking" && property_ids.length!==0){
        console.log("hehe2");
        console.log(PropertyData.map((value)=>value._id));
      }else if(e==="physical_visit"){
        console.log("boobies");
      }else if(e==="video_conference"){
        console.log("hehe");
      }
    }
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
        onSelectionChange={handleSelection}
        selectedKey={selectedTab}
      >
        <Tab
          key="property_booking"
          title={
            <div className="flex items-center space-x-2">
              <FaHouse />
              <span>Property</span>
            </div>
          }
        />       
        <Tab
          key="physical_visit"
          title={
            <div className="flex items-center space-x-2">
              <FaCalendar />
              <span>Physical Visit</span>
            </div>
          }
        />
        
        <Tab
          key="video_conference"
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
      <Tabs color="secondary" aria-label="Dynamic tabs" items={PropertyData}>
        {(item) => (
          <Tab key={item._id}  title={item.building_name}>
            <Card>
              <CardBody>
                {item.building_name}
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