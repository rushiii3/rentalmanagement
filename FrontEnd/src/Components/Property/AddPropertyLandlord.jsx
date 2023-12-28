import React from "react";
import { motion } from "framer-motion";
import { useHandleForm } from "./Add Property/Hook/useHandleForm";
import Info from "./Add Property/Components/Info/Info";
// import './AddProperty.css'
import Form from "./Add Property/Components/Form/Form";
const AddPropertyLandlord = () => {
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
          <Form step={step} next={next} prev={prev} goto={goto} />
        </div>
      </motion.main>
    </div>
  );
};

export default AddPropertyLandlord;
