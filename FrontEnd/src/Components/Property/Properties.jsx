import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { propertServer } from "../../server";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { FiEye } from "react-icons/fi";
const Properties = () => {
  const { user } = useSelector((state) => state.user);
  const userid = user?.user?.email;
  const [PropertyData, setPropertyData] = useState([]);
  useEffect(() => {
    if (userid) {
      const getProperties = async () => {
        try {
          const { data } = await axios.get(
            `${propertServer}/landlord-property/${userid}`
          );
          setPropertyData(data.property);
        } catch (error) {
          console.log(error.message);
        }
      };
      getProperties();
    }
  }, [userid]);
  return (
    <div className="lg:mx-16 mt-5 mx-3 min-h-screen">
      <div className="flex flex-col justify-between md:items-center md:flex-row">
        <h5 class="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Your Properties
        </h5>
        <div className="flex justify-end">
        <Link to="/add-property" class="bg-black rounded-lg text-white text-md text-center self-center px-3 py-2 my-2 mx-2">
        Add Property
                    </Link>
          
        </div>
      </div>
      <div className="flex- flex-col space-y-5">
        {PropertyData.map((value, key) => (
          <div class="bg-white rounded-xl border shadow-md overflow-hidden ">
            <div class="md:flex max-w-full">
              <div class="md:shrink-0">
                <img
                  class="h-48 w-full object-cover md:h-full md:w-48"
                  src={value?.images[0].url}
                  alt="property image"
                />
              </div>
              <div class="p-8">
                <Link to={`/properties/${value?.property_id?._id}`}>
                  <div class="font-semibold text-gray-800 text-xl text-center lg:text-left px-2">
                    {value?.property_no_of_bhk}{" "}
                    {value?.property_type} House in{" "}
                    {value?.building_name},{" "}
                    {value?.property_locality}
                  </div>
                </Link>
                <div class="text-gray-600 font-medium text-lg pt-1 text-center lg:text-left px-2"></div>
              </div>
              <div className="flex flex-row justify-center space-x-3 items-center px-3 ml-auto py-2 font-semibold">
                    <Link to={`/update-property/${value?._id}`} class="bg-black rounded-lg text-white text-md text-center self-center px-3 py-2 my-2 mx-2">
                        <MdModeEdit />
                    </Link>
                    <Link to={`/properties/${value?._id}`} class="bg-black rounded-lg text-white text-md text-center self-center px-3 py-2 my-2 mx-2">
                        <FiEye />
                    </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Properties;
