import React, { useState } from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { userServer } from "../../server";
import toast from "react-hot-toast";
import Store from "../../Redux/store";
import { LoadUser } from "../../Redux/action/user";
import { Button } from "@nextui-org/react";
const ProfileImageUpdate = ({ profileimage, userEmail }) => {
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "WEBP",
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });
  const [loading, setloading] = useState(false);
  const [imageURL, setimageURL] = useState(null);
  const [SaveButton, setSaveButton] = useState(false);
  const onchange = async (event) => {
    try {
      const file = event.target.files[0];
      const image = await resizeFile(file);
      setimageURL(image);
      setSaveButton(true);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async () => {
    try {
      setloading(true);
      const data = {
        image: imageURL,
        email: userEmail,
      };
      const serverResponse = await axios.put(
        `${userServer}/profile-image`,
        data
      );
      setloading(false);
      if (serverResponse.data.msg) {
        setSaveButton(false);
        toast.success("Profile Image updated successfully!");
        Store.dispatch(LoadUser());
      }
      console.log(serverResponse.data.msg);
      setloading(false);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <div class="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
      {imageURL === null ? (
        <img
          class="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
          src={profileimage}
          alt="Bordered avatar"
        />
      ) : (
        <img
          class="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
          src={imageURL}
          alt="Bordered avatar"
        />
      )}

      <div class="flex flex-col space-y-5 sm:ml-8">
        <label htmlFor="upload" className="relative cursor-pointer">
          <span className="py-3.5 px-7 text-base font-medium text-indigo-100 bg-indigo-600 rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:outline-none focus:ring-4 focus:ring-indigo-200 inline-block">
            Change picture
          </span>
          <input
            id="upload"
            type="file"
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full top-0 left-0"
            accept="image/png, image/jpeg, image/jpg"
            onChange={onchange}
          />
        </label>
        {SaveButton ? (
          <Button
            isLoading={loading}
            onClick={handleSubmit}
            type="button"
            class="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 "
          >
            {loading ? "Loading" : "Save Changes"}
          </Button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProfileImageUpdate;
