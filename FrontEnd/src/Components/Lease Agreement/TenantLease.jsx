import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import axios from "axios";
import { LeaseServer } from '../../server';
import LeaseCard from './Cards/LeaseCard';
const TenantLease = () => {
    const { user } = useSelector((state) => state.user);
    const userid = user?.user?._id;
    const [LeaseData, setLeaseData] = useState([]);
    useEffect(() => {
        if(userid){
            const getProperties = async () => {
                try {
                  const { data } = await axios.get(
                    `${LeaseServer}/tenant-lease/${userid}`
                  );
                  if (data.success) {
                    setLeaseData(data.finallease);
                  }
                  console.log(data);
                } catch (error) {
                  console.log(error.message);
                }
              };
              getProperties();
        }
        
      }, [userid]);
  return (
    <div className="lg:mx-16 mt-5 mx-3 min-h-screen">
        <h5 class="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Your Aggrements
        </h5>
        <div className='flex flex-col space-y-3'>
          {
            LeaseData ? (
              LeaseData.map((value,key)=>(
                <LeaseCard value={value} key={key}/> 
              ))
            ): "not"
          }
        </div>
    </div>
  )
}

export default TenantLease