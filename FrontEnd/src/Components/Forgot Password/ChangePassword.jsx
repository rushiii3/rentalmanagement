import React, { useState } from 'react'
import { MdOutlineLockReset } from "react-icons/md";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { userServer } from '../../server';
import axios from 'axios';
import { Input,Button } from "@nextui-org/react";
import toast from "react-hot-toast";
import {useNavigate} from 'react-router-dom';
const ChangePassword = (props) => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const schema = yup.object().shape({
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
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    try {
      setloading(true);
      const data1 = { ...data, email: props.email };
      const serverResponse = await axios.post(`${userServer}/change-forgot-password`,data1); 
      if(serverResponse.data.success){
        toast.success(serverResponse.data.message);
        reset();
        navigate('/login');
        setloading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      setloading(false);
    }
  };
  return (
    <div className="my-24 px-10 sm:px-5">
    <h1 class="text-4xl font-medium mt-10">Change password</h1>
    <p class="text-slate-500">Your new password must be different from previous used passwords.</p>

    <form class="my-10" onSubmit={handleSubmit(onSubmit)}>
      <div class="flex flex-col space-y-10">
      <Input
                type="password"
                label="Password"
                placeholder="Enter password"
                labelPlacement="outside"
                radius="sm"
                size="lg"
                variant="bordered"
                {...register("password")}
               
                validationState={
                      errors.password?.message ? "invalid" : "valid"
                    }
                // isInvalid={errors.password?.message ? false : true}
                errorMessage={errors.password?.message}
              />
              <Input
                type="password"
                label="Confirm Password"
                placeholder="Enter confirm password"
                labelPlacement="outside"
                radius="sm"
                size="lg"
                variant="bordered"
                {...register("confirmPassword")}
                    validationState={
                      errors.confirmPassword?.message ? "invalid" : "valid"
                    }
                    errorMessage={errors.confirmPassword?.message}
              />


        <Button
                type="submit"
                className="mt-5  tracking-wide font-semibold bg-indigo-600 dark:bg-indigo-800 text-gray-100 dark:text-white w-full py-4 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                isLoading={loading}
                size="lg"
                
              >
                {loading ? (
                  "Chaning password!"
                ) : (
                  <>
                    <MdOutlineLockReset size={20}/>
                    <span className="ml-1">Reset</span>
                  </>
                )}
              </Button>
      </div>
    </form>
  </div>


  )
}

export default ChangePassword