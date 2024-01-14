import React, { useEffect, useState } from "react";
import { Input } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar } from "@nextui-org/react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import imgLogo from "../../Assets/Logo.png";
import toast from "react-hot-toast";
import { userServer } from "../../server";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
const Signup = () => {
  useEffect(() => {
    document.title = "Register";
  }, []);
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

  const [isVisible, setIsVisible] = useState(false);
  const [isVisible1, setIsVisible1] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibility1 = () => setIsVisible1(!isVisible1);
  const [imageURL, setimageURL] = useState(null);
  const [loading, setloading] = useState(false);
  const [profileError, setprofileError] = useState(false);
  const onchange = async (event) => {
    try {
      const file = event.target.files[0];
      const image = await resizeFile(file);
      console.log(image);
      setimageURL(image);
      return image;
    } catch (err) {
      console.log(err);
    }
  };
  const schema = yup.object().shape({
    firstname: yup
      .string()
      .matches(/^[A-Za-z]+$/, "First name must contain only letters")
      .max(50, "First name must be at most 50 characters")
      .required("Please provide your first name"),
    middlename: yup
      .string()
      .matches(/^[A-Za-z]+$/, "Middle name must contain only letters")
      .max(50, "Middle name must be at most 50 characters")
      .required("Please provide your middle name"),
    lastname: yup
      .string()
      .matches(/^[A-Za-z]+$/, "Last name must contain only letters")
      .max(50, "Last name must be at most 50 characters")
      .required("Please provide your last name"),
    phoneno: yup
      .string()
      .required("Please provide your phone number")
      .max(10, "Please provide a valid phone nummber")
      .min(10, "Please provide a valid phone nummber"),
    email: yup
      .string()
      .email("Invalid Email")
      .required("Please provide an email"),
    password: yup
      .string()
      .min(8, "Password must be greater than 8")
      .max(32, "Password must be less than 32")
      .required("Please provide a password"),
    confirmPassword: yup
      .string()
      .min(8, "Password must be greater than 8")
      .max(32, "Password must be less than 32")
      .required("Please provide confirm password")
      .oneOf([yup.ref("password")], "Passwords do not match"),
    role: yup.string().required("Please select your role!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    if (imageURL !== null) {
      setprofileError(false);
      const data1 = { ...data, profile: imageURL };
      setloading(true);
      const toastId = toast.loading('Booking your physical visit...');
      try {
        const serverData = await axios.post(`${userServer}/register`, data1);
        if (serverData.data.success) {
          reset();
          setimageURL("");
          setloading(false);
          toast.success(serverData.data.message, {
            id: toastId,
          });
        } else {
          toast.error("Something went wrong", {
            id: toastId,
          });
          setloading(false);
        }
      } catch (error) {
        toast.error(error.message, {
          id: toastId,
        });
        setloading(false);
        setprofileError(false);
      }
    } else {
      setprofileError(true);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center dark:bg-gray-800 dark:text-white">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white dark:bg-black shadow sm:rounded-lg flex  justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img
              src={imgLogo}
              className="h-16 mx-auto flex items-center justify-center "
            />
          </div>
          <div className="mt-10 flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">Sign up</h1>
            <div className="w-full flex-1 mt-8">
              <form
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data"
              >
                <div className="mx-auto max-w-xs">
                  <div className="flex items-center space-x-6">
                    <div className="shrink-0">
                      <Avatar
                        src={imageURL}
                        className="w-20 h-20 text-large mx-auto"
                      />

                      {/* <img id='preview_img' class="h-16 w-16 object-cover rounded-full" src="https://lh3.googleusercontent.com/a-/AFdZucpC_6WFBIfaAbPHBwGM9z8SxyM1oV4wB4Ngwp_UyQ=s96-c" alt="Current profile photo" /> */}
                    </div>
                    <label className="block">
                      <span className="sr-only">Choose profile photo</span>
                      <input
                        accept="image/png, image/jpeg, image/jpg"
                        type="file"
                        onChange={onchange}
                        className="block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:rounded-full file:border-0
        file:text-sm file:font-semibold
        file:bg-violet-50 file:text-violet-700
        hover:file:bg-violet-100
      "
                      />
                    </label>
                  </div>
                  {profileError ? (
                    <p class="text-sm text-center text-red-600">
                      {" "}
                      Image is required{" "}
                    </p>
                  ) : (
                    ""
                  )}

                  <Input
                    type="email"
                    variant="underlined"
                    label="Email"
                    placeholder="Enter your email"
                    {...register("email")}
                    validationState={
                      errors.email?.message ? "invalid" : "valid"
                    }
                    errorMessage={errors.email?.message}
                  />
                  <Input
                    type="text"
                    variant="underlined"
                    label="First Name"
                    placeholder="Enter your first name"
                    className="mt-3"
                    {...register("firstname")}
                    validationState={
                      errors.firstname?.message ? "invalid" : "valid"
                    }
                    errorMessage={errors.firstname?.message}
                  />
                  <Input
                    type="text"
                    variant="underlined"
                    label="Middle Name"
                    placeholder="Enter your middle name"
                    className="mt-3"
                    {...register("middlename")}
                    validationState={
                      errors.middlename?.message ? "invalid" : "valid"
                    }
                    errorMessage={errors.middlename?.message}
                  />
                  <Input
                    type="text"
                    variant="underlined"
                    label="Last Name"
                    placeholder="Enter your last name"
                    className="mt-3"
                    {...register("lastname")}
                    validationState={
                      errors.middlename?.message ? "invalid" : "valid"
                    }
                    errorMessage={errors.middlename?.message}
                  />
                  <Input
                    type="number"
                    variant="underlined"
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    className="mt-3"
                    {...register("phoneno")}
                    validationState={
                      errors.phoneno?.message ? "invalid" : "valid"
                    }
                    errorMessage={errors.phoneno?.message}
                  />
                  <Select
                    variant="underlined"
                    label="Role"
                    placeholder="Select your role"
                    className="max-w-xs mt-3"
                    {...register("role")}
                    validationState={errors.role?.message ? "invalid" : "valid"}
                    errorMessage={errors.role?.message}
                  >
                    <SelectItem key="T" value="T">
                      Tenant
                    </SelectItem>
                    <SelectItem key="L" value="L">
                      Landlord
                    </SelectItem>
                  </Select>
                  <Input
                    label="Password"
                    variant="underlined"
                    placeholder="Enter your password"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                    className="max-w-xs mt-3"
                    {...register("password")}
                    validationState={
                      errors.password?.message ? "invalid" : "valid"
                    }
                    errorMessage={errors.password?.message}
                  />
                  <Input
                    label="Confirm Password"
                    variant="underlined"
                    placeholder="Enter your confirm password"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility1}
                      >
                        {isVisible1 ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible1 ? "text" : "password"}
                    className="max-w-xs mt-3"
                    {...register("confirmPassword")}
                    validationState={
                      errors.confirmPassword?.message ? "invalid" : "valid"
                    }
                    errorMessage={errors.confirmPassword?.message}
                  />
                  <Button
                    type="submit"
                    className="mt-5  tracking-wide font-semibold bg-indigo-500 dark:bg-indigo-800 text-gray-100 dark:text-white w-full py-4 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    isLoading={loading}
                    size="lg"
                  >
                    {loading ? (
                      "Loading"
                    ) : (
                      <>
                        <svg
                          className="w-6 h-6 -ml-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                          <circle cx="8.5" cy="7" r="4" />
                          <path d="M20 8v6M23 11h-6" />
                        </svg>
                        <span className="ml-3">Sign Up</span>
                      </>
                    )}
                  </Button>
                  <p className="mt-6 text-md text-gray-600 text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 underline">
                      Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
            <img
              src="https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
