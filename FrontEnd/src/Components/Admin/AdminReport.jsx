import React, { useEffect } from 'react'
import {Tabs, Tab, Chip} from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { SiHackaday } from "react-icons/si";
import { VscIssues } from "react-icons/vsc";
import { BsFillBugFill } from "react-icons/bs";
import { GrFan } from "react-icons/gr";
import axios from 'axios';
const AdminReport = () => {
    const types = [
        {
          name: "Bug",
          icon: <BsFillBugFill className="text-warning text-xl md:text-xl" />,
        },
        { name: "Fraud", icon: <SiHackaday className="text-danger text-xl" /> },
        { name: "Issue", icon: <VscIssues className="text-violet-500 text-xl" /> },
        { name: "Other", icon: <GrFan className="text-indigo-500 text-xl" /> },
      ];
      useEffect(() => {
        const GetData = async() => {
            const {data} = await axios.get();
        }
      }, [])
      
  return (
    <div className="flex w-full flex-col p-3">
      <Tabs 
        aria-label="Options" 
        color="primary" 
        variant="underlined"
        classNames={{
          tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-[#22d3ee]",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-[#06b6d4]"
        }}
      >
      {
        types.map((value,key)=>(
            <Tab
          key={value.name}
          title={
            <div className="flex items-center space-x-2">
              {value.icon}
              <span>{value.name}</span>
              {/* <Chip size="sm" variant="faded">9</Chip> */}
            </div>
          }
        >
            <p>heyy</p>
        </Tab>
        ))
      }
      </Tabs>
    </div> 
  )
}

export default AdminReport