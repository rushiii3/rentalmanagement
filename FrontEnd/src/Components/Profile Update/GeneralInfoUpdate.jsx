import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { userServer } from "../../server";
import toast from "react-hot-toast";
import { Button } from "@nextui-org/react";
import Store from "../../Redux/store";
import { LoadUser } from "../../Redux/action/user";
import { useNavigate, useLocation } from "react-router-dom";

const GeneralInfoUpdate = ({ userEmail }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const fromBooking = location.state && location.state.pathname;
  console.log(fromBooking);
  const [userID, setuserID] = useState(null);
  const [loading, setloading] = useState(false);
  const schema = yup.object().shape({
    firstname: yup
    .string()
    .matches(/^[A-Za-z]+$/, 'First name must contain only letters')
    .max(50, 'First name must be at most 50 characters')
    .required('Please provide your first name'),
  middlename: yup
    .string()
    .matches(/^[A-Za-z]+$/, 'Middle name must contain only letters')
    .max(50, 'Middle name must be at most 50 characters')
    .required('Please provide your middle name'),
  lastname: yup
    .string()
    .matches(/^[A-Za-z]+$/, 'Last name must contain only letters')
    .max(50, 'Last name must be at most 50 characters')
    .required('Please provide your last name'),
    phoneno: yup
      .string()
      .required("Please provide your phone number")
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .min(10, "Please provide a valid phone number")
      .max(10, "Please provide a valid phone number"),
    email: yup
      .string()
      .email("Invalid Email")
      .required("Please provide an email"),
    streetname: yup.string().required("Please provide your street name"),
    state: yup.string().required("Please provide your state"),
    city: yup.string().required("Please provide your city"),
    pincode: yup
      .string()
      .matches(/^[0-9]+$/, "Pincode must contain only digits")
      .required("Please provide your pincode")
      .min(6, "Pincode must be at least 6 digits")
      .max(6, "Pincode must be at most 6 digits"),
  });

  const getuserdata = async () => {
    const serverRespnse = await axios.post(`${userServer}/get-user`, {
      email: userEmail,
    });
    setValue("firstname", serverRespnse?.data?.user?.firstname);
    setValue("middlename", serverRespnse?.data?.user?.middlename);
    setValue("lastname", serverRespnse?.data?.user?.lastname);
    setValue("email", serverRespnse?.data?.user?.email);
    setValue("phoneno", serverRespnse?.data?.user?.phoneNumber);
    setValue(
      "streetname",
      serverRespnse?.data?.user?.address?.streetname === "N/A"
        ? ""
        : serverRespnse?.data?.user?.address?.streetname
    );
    setValue(
      "state",
      serverRespnse?.data?.user?.address?.state === "N/A"
        ? ""
        : serverRespnse?.data?.user?.address?.state
    );
    setValue(
      "city",
      serverRespnse?.data?.user?.address?.city === "N/A"
        ? ""
        : serverRespnse?.data?.user?.address?.city
    );
    setValue(
      "pincode",
      serverRespnse?.data?.user?.address?.pincode === 0
        ? ""
        : serverRespnse?.data?.user?.address?.pincode
    );
    setuserID(serverRespnse?.data?.user?._id);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema), // Set default values for the form
  });

  const onSubmit = async (data) => {
    const toastId = toast.loading('Saving info...');
    try {
      setloading(true);
      const serverRespnse = await axios.put(`${userServer}/update-user-info`, {
        ...data,
        id: userID,
      });
      setloading(false);
      if (serverRespnse?.data?.success) {
        toast.success('Profile information has been changes successfully!', {
          id: toastId,
        });
        Store.dispatch(LoadUser());
        if(fromBooking){
          navigate(fromBooking)
        }
      }
    } catch (error) {
      setloading(false);
      toast.error(error.message, {
        id: toastId,
      });
    }
  };
  useEffect(() => {
    getuserdata();
  }, [userEmail]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div class="items-center mt-8 sm:mt-14 dark:text-white">
        <div class="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
          <div class="w-full">
            <label
              htmlFor="firstname"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              First Name
            </label>
            <input
              type="text"
              {...register("firstname")}
              id="firstname"
              class={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500 ${
                errors?.firstname
                  ? "border-red-500 focus:border-red-500 dark:border-red-500 dark:focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500"
              }`}
              placeholder="Your first name"
            />
            {errors?.firstname && (
              <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                {errors?.firstname.message}
              </span>
            )}
          </div>

          <div class="w-full">
            <label
              htmlFor="middlename"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Middle Name
            </label>
            <input
              type="text"
              {...register("middlename")}
              id="middlename"
              class={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500 ${
                errors?.middlename
                  ? "border-red-500 focus:border-red-500 dark:border-red-500 dark:focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500"
              }`}
              placeholder="Your middle name"
            />
            {errors?.middlename && (
              <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                {errors?.middlename.message}
              </span>
            )}
          </div>

          <div class="w-full">
            <label
              htmlFor="middlename"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Last Name
            </label>
            <input
              type="text"
              {...register("lastname")}
              id="middlename"
              class={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500 ${
                errors?.lastname
                  ? "border-red-500 focus:border-red-500 dark:border-red-500 dark:focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500"
              }`}
              placeholder="Your last name"
            />
            {errors?.lastname && (
              <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                {errors?.lastname.message}
              </span>
            )}
          </div>
        </div>
        <div class="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
          <div class="w-full">
            <label
              htmlFor="middlename"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="text"
              {...register("email")}
              id="middlename"
              class={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500 ${
                errors?.email
                  ? "border-red-500 focus:border-red-500 dark:border-red-500 dark:focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500"
              }`}
              placeholder="Your email"
            />
            {errors?.email && (
              <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                {errors?.email.message}
              </span>
            )}
          </div>

          <div class="w-full">
            <label
              htmlFor="middlename"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone Number
            </label>
            <input
              type="text"
              {...register("phoneno")}
              id="middlename"
              class={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500 ${
                errors?.phoneno
                  ? "border-red-500 focus:border-red-500 dark:border-red-500 dark:focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500"
              }`}
              placeholder="Your middle name"
            />
            {errors?.phoneno && (
              <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                {errors?.phoneno.message}
              </span>
            )}
          </div>
        </div>
        <div class="mb-2 sm:mb-6">
          <label
            htmlFor="streetname"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Street Address
          </label>
          <input
            type="text"
            {...register("streetname")}
            id="streetname"
            class={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500 ${
              errors?.streetname
                ? "border-red-500 focus:border-red-500 dark:border-red-500 dark:focus:border-red-500"
                : "border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500"
            }`}
            placeholder="Your street address"
          />
          {errors?.streetname && (
            <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
              {errors?.streetname.message}
            </span>
          )}
        </div>

        <div class="flex flex-col items-center w-full mt-4 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
          <div class="w-full">
            <label
              htmlFor="state"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              State
            </label>
            <input
              type="text"
              {...register("state")}
              id="state"
              class={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500 ${
                errors?.state
                  ? "border-red-500 focus:border-red-500 dark:border-red-500 dark:focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500"
              }`}
              placeholder="Your state"
            />
            {errors?.state && (
              <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                {errors?.state.message}
              </span>
            )}
          </div>

          <div class="w-full">
            <label
              htmlFor="middlename"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              City
            </label>
            <input
              type="text"
              {...register("city")}
              id="middlename"
              class={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500 ${
                errors?.city
                  ? "border-red-500 focus:border-red-500 dark:border-red-500 dark:focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500"
              }`}
              placeholder="Your city"
            />
            {errors?.city && (
              <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                {errors?.city.message}
              </span>
            )}
          </div>

          <div class="w-full">
            <label
              htmlFor="pincode"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Pincode
            </label>
            <input
              type="text"
              {...register("pincode")}
              id="pincode"
              class={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500 ${
                errors?.pincode
                  ? "border-red-500 focus:border-red-500 dark:border-red-500 dark:focus:border-red-500"
                  : "border-gray-300 focus:border-blue-500 dark:border-gray-600 dark:focus:border-blue-500"
              }`}
              placeholder="Your middle name"
            />
            {errors?.pincode && (
              <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                {errors?.pincode.message}
              </span>
            )}
          </div>
        </div>

        <div class="flex justify-end">
          <Button
          type="submit"
            isLoading={loading}
            className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
          >
            {loading ? "Submitting.." : "Save"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default GeneralInfoUpdate;
