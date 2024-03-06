import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { GoPlus } from "react-icons/go";
import toast from "react-hot-toast";
import { EyeFilledIcon } from "../../SignUp/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../SignUp/EyeSlashFilledIcon";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Avatar } from "@nextui-org/react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { userServer } from "../../../server";
const AddUserModal = ({ type, method }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
  const toggleVisibility = () => setIsVisible(!isVisible);
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
      .matches(/^[0-9]+$/, "Phone number must contain only digits")
      .min(10, "Please provide a valid phone number")
      .max(10, "Please provide a valid phone number"),
    email: yup
      .string()
      .email("Invalid Email")
      .required("Please provide an email"),
    password: yup
      .string()
      .min(8, "Password must be greater than 8")
      .max(32, "Password must be less than 32")
      .required("Please provide a password"),
    role: yup.string().required("Please select your role!"),

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    method: "all",
  });
  const onSubmit = async (data) => {
    if (imageURL !== null) {
      setprofileError(false);
      const data1 = { ...data, profile: imageURL };
      setloading(true);
      const toastId = toast.loading("Registeringg...");
      try {
        const serverData = await axios.post(``, data1);
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
    <>
      <Button
        className="bg-foreground text-background"
        endContent={<GoPlus />}
        size="sm"
        onPress={onOpen}
      >
        Add New
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        size="lg"
        scrollBehavior="outside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {`${type ? type.toUpperCase() : ""} ${
                  method ? method.toUpperCase() : ""
                }`}
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  encType="multipart/form-data"
                >
                  <div className="mx-auto  max-w-full p-4">
                    <div className="flex items-center space-y-6 mb-4">
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

                    <div className="w-full">
                      <label
                        for="username-error"
                        className={`block mb-2 text-sm font-medium ${
                          errors.email?.message
                            ? "text-red-700 dark:text-red-500"
                            : ""
                        } `}
                      >
                        Email
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        id="username-error"
                        class={`block p-2.5 w-full text-sm  rounded-lg border ${
                          errors.email?.message
                            ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-500 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                            : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        }  
            `}
                        placeholder="Enter your property price"
                      />
                      <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                        {errors.email?.message}
                      </p>
                    </div>
                    <div className="w-full">
                      <label
                        for="username-error"
                        className={`block mb-2 text-sm font-medium ${
                          errors.firstname?.message
                            ? "text-red-700 dark:text-red-500"
                            : ""
                        } `}
                      >
                        First Name
                      </label>
                      <input
                        {...register("firstname")}
                        type="text"
                        id="username-error"
                        class={`block p-2.5 w-full text-sm  rounded-lg border ${
                          errors.firstname?.message
                            ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-500 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                            : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        }  
            `}
                        placeholder="Enter your property price"
                      />
                      <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                        {errors.firstname?.message}
                      </p>
                    </div>
                    <div className="w-full">
                      <label
                        for="username-error"
                        className={`block mb-2 text-sm font-medium ${
                          errors.middlename?.message
                            ? "text-red-700 dark:text-red-500"
                            : ""
                        } `}
                      >
                        Middle Name
                      </label>
                      <input
                        {...register("middlename")}
                        type="text"
                        id="username-error"
                        class={`block p-2.5 w-full text-sm  rounded-lg border ${
                          errors.middlename?.message
                            ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-500 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                            : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        }  
            `}
                        placeholder="Enter your property price"
                      />
                      <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                        {errors.middlename?.message}
                      </p>
                    </div>
                    <div className="w-full">
                      <label
                        for="username-error"
                        className={`block mb-2 text-sm font-medium ${
                          errors.lastname?.message
                            ? "text-red-700 dark:text-red-500"
                            : ""
                        } `}
                      >
                        Last Name
                      </label>
                      <input
                        {...register("lastname")}
                        type="text"
                        id="username-error"
                        class={`block p-2.5 w-full text-sm  rounded-lg border ${
                          errors.lastname?.message
                            ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-500 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                            : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        }  
            `}
                        placeholder="Enter your property price"
                      />
                      <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                        {errors.lastname?.message}
                      </p>
                    </div>
                    <div className="w-full">
                      <label
                        for="username-error"
                        className={`block mb-2 text-sm font-medium ${
                          errors.phoneno?.message
                            ? "text-red-700 dark:text-red-500"
                            : ""
                        } `}
                      >
                        Phone Number
                      </label>
                      <input
                        {...register("phoneno")}
                        type="number"
                        id="username-error"
                        class={`block p-2.5 w-full text-sm  rounded-lg border ${
                          errors.phoneno?.message
                            ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-500 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                            : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        }  
            `}
                        placeholder="Enter your property price"
                      />
                      <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                        {errors.phoneno?.message}
                      </p>
                    </div>
                    <div className="w-full">
                      <label
                        for="username-error"
                        className={`block mb-2 text-sm font-medium ${
                          errors.role?.message
                            ? "text-red-700 dark:text-red-500"
                            : ""
                        } `}
                      >
                        Role
                      </label>
                      <select
                        id="countries"
                        {...register("role")}
                        class={`block p-2.5 w-full text-sm  rounded-lg border ${
                          errors.role?.message
                            ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                            : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        }  
`}
                      >
                        <option selected value="" hidden>
                          Select role
                        </option>
                        {type === "admin" ? (
                          <>
                            <option value="S">SuperAdmin</option>
                            <option value="A">Admin</option>
                          </>
                        ) : type === "user" ? (
                          <>
                            <option value="L">Landlord</option>
                            <option value="T">Tenant</option>
                          </>
                        ) : null}
                      </select>

                      <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                        {errors.role?.message}
                      </p>
                    </div>
                    <div className="w-full relative">
                      <label
                        for="username-error"
                        className={`block mb-2 text-sm font-medium ${
                          errors.password?.message
                            ? "text-red-700 dark:text-red-500"
                            : ""
                        } `}
                      >
                        Password
                      </label>
                      <input
                        {...register("password")}
                        type={isVisible ? "text" : "password"}
                        id="username-error"
                        class={`block p-2.5 w-full text-sm  rounded-lg border ${
                          errors.password?.message
                            ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-500 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                            : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        }  
            `}
                        placeholder="Enter your property price"
                      />
                      <div class="absolute right-0 z-30 inset-y-1 flex items-center px-4 top-8 ">
                        {/* <button type="button" class="z-30 ">
                          <svg
                            x-show="!isshow"
                            aria-hidden="true"
                            class="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            ></path>
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            ></path>
                          </svg>{" "}
                          <svg
                            x-show="isshow"
                            aria-hidden="true"
                            class="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                            ></path>
                          </svg>{" "}
                        </button> */}
                        <button
                        className="focus:outline-none "
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                      </div>
                      <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                        {errors.password?.message}
                      </p>
                    </div>
                    <div className="w-full">
                      <label
                        for="username-error"
                        className={`block mb-2 text-sm font-medium ${
                          errors.streetname?.message
                            ? "text-red-700 dark:text-red-500"
                            : ""
                        } `}
                      >
                        Streetname
                      </label>
                      <input
                        {...register("streetname")}
                        type="text"
                        id="username-error"
                        class={`block p-2.5 w-full text-sm  rounded-lg border ${
                          errors.streetname?.message
                            ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-500 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                            : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        }  
            `}
                        placeholder="Enter your property price"
                      />
                      <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                        {errors.streetname?.message}
                      </p>
                    </div>
                    <div className="w-full">
                      <label
                        for="username-error"
                        className={`block mb-2 text-sm font-medium ${
                          errors.state?.message
                            ? "text-red-700 dark:text-red-500"
                            : ""
                        } `}
                      >
                        State
                      </label>
                      <input
                        {...register("state")}
                        type="text"
                        id="username-error"
                        class={`block p-2.5 w-full text-sm  rounded-lg border ${
                          errors.state?.message
                            ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-500 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                            : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        }  
            `}
                        placeholder="Enter your property price"
                      />
                      <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                        {errors.state?.message}
                      </p>
                    </div>
                    <div className="w-full">
                      <label
                        for="username-error"
                        className={`block mb-2 text-sm font-medium ${
                          errors.city?.message
                            ? "text-red-700 dark:text-red-500"
                            : ""
                        } `}
                      >
                        City
                      </label>
                      <input
                        {...register("city")}
                        type="text"
                        id="username-error"
                        class={`block p-2.5 w-full text-sm  rounded-lg border ${
                          errors.city?.message
                            ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-500 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                            : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        }  
            `}
                        placeholder="Enter your property price"
                      />
                      <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                        {errors.city?.message}
                      </p>
                    </div>
                    <div className="w-full">
                      <label
                        for="username-error"
                        className={`block mb-2 text-sm font-medium ${
                          errors.pincode?.message
                            ? "text-red-700 dark:text-red-500"
                            : ""
                        } `}
                      >
                        Pincode
                      </label>
                      <input
                        {...register("pincode")}
                        type="number"
                        id="username-error"
                        class={`block p-2.5 w-full text-sm  rounded-lg border ${
                          errors.pincode?.message
                            ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-500 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                            : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        }  
            `}
                        placeholder="Enter your property price"
                      />
                      <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                        {errors.pincode?.message}
                      </p>
                    </div>

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
                  </div>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddUserModal;
