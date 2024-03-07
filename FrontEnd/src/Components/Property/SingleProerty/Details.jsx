import React, { useState } from "react";
import { IoBedOutline } from "react-icons/io5";
import { LiaBathSolid } from "react-icons/lia";
import { BsHouse } from "react-icons/bs";
import { LuCalendarDays } from "react-icons/lu";
import { TbRulerMeasure } from "react-icons/tb";
import { BiCar } from "react-icons/bi";
import { GiSofa } from "react-icons/gi";
import { MdOutlinePeopleOutline } from "react-icons/md";
import VideoThumbnail from "react-video-thumbnail"; // use npm published version
import { Player } from "react-tuby";
import FsLightbox from "fslightbox-react";
import "react-tuby/css/main.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { PropertyBookingServer } from "../../../server";
import { useDispatch } from 'react-redux';
const Details = ({
  Data,
  combinedMedia,
  imagesVideos,
  currentImage,
  setCurrentImage,
  user,
  isAuthenticated,
  id,
  isAddressSet,
}) => {
  // const chat = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const [toggler, setToggler] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const handleSubmit = async () => {
    if (isAuthenticated) {
      if (isAddressSet) {
        const toastId = toast.loading('Booking your propertyyyy...');
        try {
          const data = { property_id: id, userid: user?.user?._id };
          const serverResponse = await axios.post(
            `${PropertyBookingServer}/add`,
            data
          );
          if (serverResponse.data.success) {
            toast.success("Your booking for physical visit has been done successfully!", {
              id: toastId,
            });
          }
        } catch (error) {
          console.log();
          toast.error(error.response.data.message, {
            id: toastId,
          });
        }
      } else {
        navigate("/profile-update", { state: { pathname } });
        toast.error("You need to first add your address!");
      }
    } else {
      toast.error("You need to login first!");
      navigate("/login", { state: { pathname } });
    }
  };
  const sendChatuser = {
    "id": Data?.landlord_id?._id,
    "username" : `${Data?.landlord_id?.firstname} ${Data?.landlord_id?.lastname}`,
    "profile":Data?.landlord_id?.avatar?.url,
  }
  const handleChat = () => {
    dispatch({ type: 'AddSelectedUser', payload: sendChatuser });
    navigate('/chat');
  }
  return (
    <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
      {/* image */}
      <div className="lg:col-span-3 lg:row-end-1">
        <FsLightbox toggler={toggler} sources={combinedMedia} />

        <div className="">
          <div>
            <div className="md:aspect-video aspect-square">
              {currentImage.image !== null ? (
                <img
                  className="h-full w-full max-w-full object-cover rounded-xl"
                  src={currentImage.image}
                  alt=""
                />
              ) : currentImage.video !== null ? (
                <Player
                  className="h-full w-full max-w-full object-cover rounded-xl"
                  src={currentImage.video}
                  dimensions={{ width: "100%", height: "100%" }}
                />
              ) : (
                ""
              )}
              <button type="button" onClick={() => setToggler(!toggler)}>
                Full Screeen
              </button>
            </div>
          </div>
          <div className="mt-5 ">
            <div className="flex flex-row overflow-x-scroll gap-x-10 no-scrollbar">
              {imagesVideos.images.map((value, key) => (
                <button
                  key={key}
                  onClick={() => {
                    setCurrentImage({ image: value.url, video: null });
                  }}
                  type="button"
                  className={`flex-shrink-0 aspect-square h-20  overflow-hidden rounded-lg text-center  ${
                    currentImage.image === value.url
                      ? "border-2 border-gray-900 dark:border-white"
                      : ""
                  }`}
                >
                  <img
                    className="h-full w-full object-cover"
                    src={value.url}
                    alt=""
                  />
                </button>
              ))}
              {imagesVideos.videos.map((value, key) => (
                <button
                  key={key}
                  onClick={() => {
                    setCurrentImage({ image: null, video: value.url });
                  }}
                  type="button"
                  className={`flex-shrink-0 aspect-square h-20  overflow-hidden rounded-lg text-center  ${
                    currentImage.video === value.url
                      ? "border-2 border-gray-900 dark:border-white"
                      : ""
                  }`}
                >
                  <VideoThumbnail
                    videoUrl={value.url}
                    // thumbnailHandler={(thumbnail) => console.log(thumbnail)}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* details */}
      <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
          {Data?.property_no_of_bhk} {Data?.property_type} House in{" "}
          {Data?.building_name}, {Data?.property_locality}
        </h1>
        <p className="mt-3">Overview</p>
        <div className="grid grid-cols-2 gap-5 my-3">
          <div class="flex items-center">
            <span className="border rounded-lg p-3">
              <IoBedOutline size={30} />
            </span>

            <div className="ml-4">
              <h6 className="mb-0 font-semibold">Bedroom</h6>
              <p class="mb-0">{Data?.property_no_of_bhk}</p>
            </div>
          </div>
          <div class="flex items-center">
            <span className="border rounded-lg p-3">
              <LiaBathSolid size={30} />
            </span>

            <div className="ml-4">
              <h6 className="mb-0 font-semibold">Bath</h6>
              <p class="mb-0">{Data?.property_bathrooms}</p>
            </div>
          </div>
          <div class="flex items-center">
            <span className="border rounded-lg p-3">
              <BsHouse size={30} />
            </span>

            <div className="ml-4">
              <h6 className="mb-0 font-semibold">Type</h6>
              <p class="mb-0">{Data?.property_type_of_house}</p>
            </div>
          </div>
          <div class="flex items-center">
            <span className="border rounded-lg p-3">
              <LuCalendarDays size={30} />
            </span>

            <div className="ml-4">
              <h6 className="mb-0 font-semibold">Year Built</h6>
              <p class="mb-0">{Data?.property_year_built}</p>
            </div>
          </div>
          <div class="flex items-center">
            <span className="border rounded-lg p-3">
              <TbRulerMeasure size={30} />
            </span>

            <div className="ml-4">
              <h6 className="mb-0 font-semibold">Sqft</h6>
              <p class="mb-0">{Data?.property_size}</p>
            </div>
          </div>
          <div class="flex items-center">
            <span className="border rounded-lg p-3">
              <BiCar size={30} />
            </span>

            <div className="ml-4">
              <h6 className="mb-0 font-semibold">Parking</h6>
              <p class="mb-0">
                {Data?.property_parking ? "Available" : "Unavailable"}
              </p>
            </div>
          </div>
          <div class="flex items-center">
            <span className="border rounded-lg p-3">
              <GiSofa size={30} />
            </span>

            <div className="ml-4">
              <h6 className="mb-0 font-semibold">Furnishing</h6>
              <p class="mb-0">{Data?.property_furnishing}</p>
            </div>
          </div>
          <div class="flex items-center">
            <span className="border rounded-lg p-3">
              <MdOutlinePeopleOutline size={30} />
            </span>

            <div className="ml-4">
              <h6 className="mb-0 font-semibold">Available For</h6>
              <p class="mb-0">{Data?.preferred_tenants.join(", ")} </p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
          <div className="flex items-end">
            <h1 className="text-3xl font-bold">₹{Data?.property_rent_price}</h1>
            <span className="text-base">/month</span>
          </div>
          {Data?.landlord_id?._id !== user?.user?._id ? (
            <button
              onClick={handleSubmit}
              type="button"
              className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
            >
              Book Now
            </button>
          ) : (
            ""
          )}
        </div>
        <div class="py-8 px-0 w-full mx-auto bg-white space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 dark:bg-black">
          <img
            class="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
            src={Data?.landlord_id?.avatar?.url}
            alt="landlords's Face"
          />
          <div class="text-center space-y-2 sm:text-left ">
            <div class="space-y-0.5">
              <p class="text-lg text-black font-semibold dark:text-white">
                {Data?.landlord_id?.firstname} {Data?.landlord_id?.lastname}
              </p>
              {/* <p class="text-slate-500 font-medium">Product Engineer</p> */}
            </div>
            {Data?.landlord_id?._id !== user?.user?._id ? (
              <button onClick={ handleChat} class="px-10 py-2 text-sm text-purple-600 font-semibold rounded-full border border-purple-200 hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
                Message
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
