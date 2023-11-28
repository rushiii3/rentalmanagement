import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { EyeFilledIcon } from "../SignUp/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../SignUp/EyeSlashFilledIcon";
import axios from "axios";
import { userServer } from "../../server";
import toast from "react-hot-toast";
const PasswordUpdate = ({id}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibility1 = () => setIsVisible1(!isVisible1);
  const toggleVisibility2 = () => setIsVisible2(!isVisible2);
  const [loading, setloading] = useState(false);
  const schema = yup.object().shape({
    oldpassword: yup
      .string()
      .required("Please provide your old password"),
  
    password: yup
      .string()
      .notOneOf([yup.ref("oldpassword")], "New password must be different from the old password")
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must not exceed 32 characters")
      .required("Please provide a password"),
  
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords do not match")
      .required("Please confirm your password"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async(data) => {
    try {
        setloading(true);
        const serverRespnse = await axios.put(`${userServer}/update-user-password`, {
            ...data,
            id: id,
          });
          setloading(false);
          if (serverRespnse.data.success) {
            toast.success("Your password changed successfully!");
            reset();
            // Store.dispatch(LoadUser());
          }
    } catch (error) {
        setloading(false);
        toast.error(error.response.data.message);
    }
    
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div class="items-center mt-8 sm:mt-14 dark:text-white flex flex-col gap-y-5 lg:w-2/4 w-full mx-auto">
        {/* old password */}
        <Input
          label="Old Password"
          variant="bordered"
          placeholder="Enter your old password"
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
          className="w-full"
          {...register("oldpassword")}
          validationState={errors.oldpassword?.message ? "invalid" : "valid"}
          errorMessage={errors.oldpassword?.message}
          labelPlacement="outside"
          size="lg"
        />
        {/* new password */}
        <Input
          label="New Password"
          variant="bordered"
          placeholder="Enter your new password"
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
          className="w-full"
          {...register("password")}
          validationState={errors.password?.message ? "invalid" : "valid"}
          errorMessage={errors.password?.message}
          labelPlacement="outside"
          size="lg"
        />
        <Input
          label="Confirm Password"
          variant="bordered"
          placeholder="Enter your confirm password"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility2}
            >
              {isVisible2 ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible2 ? "text" : "password"}
          className="w-full"
          {...register("confirmPassword")}
          validationState={
            errors.confirmPassword?.message ? "invalid" : "valid"
          }
          errorMessage={errors.confirmPassword?.message}
          labelPlacement="outside"
          size="lg"
        />
        <Button
        isLoading={loading}
          type="submit"
            size="lg"
            className=" text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-lg w-full px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
          >
           {loading ? "changingggg" : "Save"}
          </Button>
      </div>
    </form>
  );
};

export default PasswordUpdate;
