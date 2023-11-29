import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfileImageUpdate from "./ProfileImageUpdate";
import GeneralInfoUpdate from "./GeneralInfoUpdate";
import PasswordUpdate from "./PasswordUpdate";

const ProfileUpdate = () => {
    useEffect(() => {
        document.title = "Profile Update";
      }, []);
      
  const { user } = useSelector((state) => state.user);
const [Mode, setMode] = useState(true);
  return (
    <div class="bg-gray-100 dark:bg-black w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
      <aside class=" py-4 md:w-1/3 lg:w-1/4 md:block">
        <div class="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
          <h2 class="pl-3 mb-4 text-2xl font-semibold dark:text-white">
            Settings
          </h2>

          <button type="button" onClick={() => {setMode(true)}} class={` ${Mode ? "flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full" : "dark:text-white flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 hover:border hover:rounded-full"}  `} >
            Profile Update
          </button>
          <button type="button" onClick={() => {setMode(false)}} class={` ${!Mode ? "flex items-center px-3 py-2.5 font-bold bg-white  text-indigo-900 border rounded-full" : "dark:text-white flex items-center px-3 py-2.5 font-semibold  hover:text-indigo-900 hover:border hover:rounded-full"}  `}>
            Password Change
          </button>
        </div>
      </aside>
      <main class="w-full min-h-screen py-1 ">
        <div class="p-2 md:p-4">
          <div class="w-full px-6 pb-8 my-8 rounded-xl bg-white dark:bg-slate-900  py-4">
            <h2 class="pl-6 text-2xl font-bold sm:text-xl dark:text-white">
              
              {Mode ? "Profile Update" : "Password Change"}
            </h2>

            <div class="grid mx-auto mt-8">
              {
                Mode ? (
                  <>
                <ProfileImageUpdate profileimage={user?.user?.imgurl} userEmail={user?.user?.email}/>

                <GeneralInfoUpdate userEmail={user?.user?.email}/>
                </>) : (
                  <PasswordUpdate id={user?.user?._id}/>
                )
              }
              
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileUpdate;
