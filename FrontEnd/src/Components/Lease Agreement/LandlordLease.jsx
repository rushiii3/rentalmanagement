import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { useSelector } from "react-redux";
import axios from "axios";
import { LeaseServer, propertServer } from "../../server";
import LeaseCards from "./Cards/LeaseCards";
const LandlordLease = () => {
  const { user } = useSelector((state) => state.user);
  const userid = user?.user?.email;
  const [SelectedProperty, setSelectedProperty] = useState(null);
  const [LeaseData, setLeaseData] = useState([]);
  const [PropertyData, setPropertyData] = useState([]);
  useEffect(() => {
    if (userid) {
      const getProperties = async () => {
        try {
          const { data } = await axios.get(
            `${propertServer}/landlord-property/${userid}`
          );
          setPropertyData(data.property);
          if (data.property) {
            const property_ids = data.property.map((value) => value?._id);
            const property_id = property_ids[0];
            const LeaseData = await axios.get(
              `${LeaseServer}/get-lease/${property_id}`
            );
            if (LeaseData.data.msg) {
              setLeaseData(LeaseData.data.LeaseData);
              // console.log(LeaseData.data.LeaseData);
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      };

      getProperties();
    }
  }, [userid]);
  const SetLeaseData = async (property_id) => {
    const LeaseData = await axios.get(
      `${LeaseServer}/get-lease/${property_id}`
    );
    if (LeaseData.data.msg) {
      setLeaseData(LeaseData.data.LeaseData);
      // console.log(LeaseData.data.LeaseData);
    }
  };
  const handlePropertyChange = async (e) => {
    setSelectedProperty(e);
    SetLeaseData(e);
  };
  return (
    <div className="lg:mx-16 mt-5 mx-3 min-h-screen">
      <h5 class="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Your Aggrements
      </h5>
      <Tabs
        color="secondary"
        aria-label="Tabs sizes"
        selectedKey={SelectedProperty}
        onSelectionChange={handlePropertyChange}
      >
        {PropertyData.map((value, key) => (
          <Tab key={value._id} title={value.building_name} />
        ))}
      </Tabs>
      <div className="mt-5 flex flex-col w-full">
        {LeaseData
          ? LeaseData.map((value, key) => (
              <LeaseCards
                value={value}
                key={key}
                setLeaseData={setLeaseData}
                LeaseData={LeaseData}
              />
            ))
          : "hehe"}
      </div>
    </div>
  );
};

export default LandlordLease;
