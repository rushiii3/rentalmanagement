import React, { useEffect, useState } from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { useSelector } from "react-redux";
import axios from "axios";
import { MaintenaceServer, propertServer } from "../../../server";
import LandlordMaintenanceCard from "./LandlordMaintenanceCard";

const LandlordMaintenace = () => {
  const { user } = useSelector((state) => state.user);
  const userid = user?.user?.email;
  const [PropertyData, setPropertyData] = useState([]);
  const [SelectedProperty, setSelectedProperty] = useState(null);
  const [MaintenanceData, setMaintenanceData] = useState([]);
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
              `${MaintenaceServer}/get-maintenance/${property_id}`
            );
            if (LeaseData.data.msg) {
              setMaintenanceData(LeaseData.data.LeaseData);
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      getProperties();
    }
  }, [userid]);
  const getProperties = async (id) => {
    try {
      const maintenanceData = await axios.get(
        `${MaintenaceServer}/get-maintenance/${id}`
      );
      console.log(maintenanceData.data);
      if (maintenanceData.data.success) {
        setMaintenanceData(maintenanceData.data.maintenance);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handlePropertyChange = async (e) => {
    setSelectedProperty(e);
    getProperties(e);
    // SetLeaseData(e);
  };
  return (
    <div className="lg:mx-16 mt-5 mx-3 min-h-screen">
    <h5 class="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
      Your Mainteance Request
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
      {MaintenanceData
        ? MaintenanceData.map((value, key) => (
          <LandlordMaintenanceCard key={key} value={value} setMaintenanceData={setMaintenanceData} MaintenanceData={MaintenanceData}/>
          ))
        : "hehe"}
    </div>
  </div>
  )
}

export default LandlordMaintenace