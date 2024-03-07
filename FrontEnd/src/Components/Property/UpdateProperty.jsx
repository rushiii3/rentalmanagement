import React, { useEffect, useState,createContext } from "react";
import { motion } from "framer-motion";
import { useHandleForm } from "./Add Property/Hook/useHandleForm";
import Info from "./Update Property/Components/Info/Info";
import Form from "./Update Property/Components/Form/Form";
import { useParams } from "react-router-dom";
import axios from "axios";
import { propertServer } from "../../server";
export const AppContext = createContext();


const UpdateProperty = () => {
    const {id} = useParams(); 
    const [PropertyData, setPropertyData] = useState([]);
    useEffect(() => {
        const getProperty = async() => {
            try {
                const {data} = await axios.get(`${propertServer}/get-properties/${id}`)
              if(data.success){
                setPropertyData(data.PropertyInfo);
              }
            } catch (error) {
                console.log(error);
            }
        }
        getProperty()
    }, [])
    
    const { step, next, prev, goto } = useHandleForm(["0", "1", "2", "3", "4"]);
    return (
      <div className="lg:py-5 lg:grid place-items-center bg-opacity-50 justify-center bg-gray-200 dark:bg-zinc-950 min-h-screen">
        <motion.main
          initial={{ y: "-100%" }}
          animate={{ y: "0%" }}
          className="lg:grid lg:grid-cols-4 lg:p-4  rounded-2xl bg-white min-h-[680px]"
        >
          <Info step={step} />
          <div className="col-span-3">
            <AppContext.Provider value={{ PropertyData }}>
            <Form step={step} next={next} prev={prev} goto={goto} id={id}/>

            </AppContext.Provider>
          </div>
        </motion.main>
      </div>
    );
  };
  

export default UpdateProperty