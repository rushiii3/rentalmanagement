import React from 'react'
import { MdOutlineLockReset } from "react-icons/md";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { userServer } from '../../server';
import axios from 'axios';
import { Input } from "@nextui-org/react";
import toast from "react-hot-toast";
import {useNavigate} from 'react-router-dom';
const ChangePassword = (props) => {
  const navigate = useNavigate();
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
      const data1 = { ...data, email: props.email };
      console.log(data1);
      const serverResponse = await axios.post(`${userServer}/change-forgot-password`,data1); 
      console.log(serverResponse.data.success);
      if(serverResponse.data.success){
        toast.success(serverResponse.data.message);
        reset
        navigate('/login')

      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="my-24 px-10 sm:px-5">
    <h1 class="text-4xl font-medium mt-10">Change password</h1>
    <p class="text-slate-500">Your new password must be different from previous used passwords.</p>

    <form class="my-10" onSubmit={handleSubmit(onSubmit)}>
      <div class="flex flex-col space-y-5">
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
                      errors.email?.message ? "invalid" : "valid"
                    }
                    errorMessage={errors.email?.message}
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
                      errors.email?.message ? "invalid" : "valid"
                    }
                    errorMessage={errors.email?.message}
              />

        <button type="submit" class="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
        <MdOutlineLockReset size={20}/>

          <span>Reset</span>
        </button>
        
      </div>
    </form>
  </div>


  )
}

export default ChangePassword