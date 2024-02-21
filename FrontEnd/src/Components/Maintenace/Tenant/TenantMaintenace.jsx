import React, { useEffect, useState } from "react";
import AddModalMaintenace from "./AddModalMaintenace";
import { useSelector } from "react-redux";
import { LeaseServer } from "../../../server";
import axios from "axios";
import TenantMaintenanceCard from "./TenantMaintenanceCard";

const TenantMaintenace = () => {
  const { user } = useSelector((state) => state.user);
  const userid = user?.user?._id;
  const [MaintenaceData, setMaintenaceData] = useState([]);
  const [LeaseAgrrement, setLeaseAgrrement] = useState([]);
  useEffect(() => {
    if (userid) {
      const getMaintenance = async () => {
        try {
          const { data } = await axios.get(
            `${LeaseServer}/tenant-inagreement/${userid}`
          );
          if (data.success) {
            setLeaseAgrrement(data.InAgreement[0]);
            setMaintenaceData(data.finalMaintenances);
          }
          console.log(data.finalMaintenances);
        } catch (error) {
          console.log(error.message);
        }
      };
      getMaintenance();
    }
  }, [userid]);
  return (
    <div className="lg:mx-16 mt-5 mx-3 min-h-screen">
      <h5 class="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Your Maintenance
      </h5>
      <div className="flex justify-end ">
      <AddModalMaintenace LeaseAgrrement={LeaseAgrrement} userid={userid} MaintenaceData={MaintenaceData} setMaintenaceData={setMaintenaceData}/>

      </div>
      <div className="flex flex-col space-y-3 mt-4">
       {
        MaintenaceData ? (
          MaintenaceData.map((value,key)=>(
            <TenantMaintenanceCard value={value} key={key} />
          ))
        )  : ""
       }
      </div>
    </div>
  );
};

export default TenantMaintenace;
