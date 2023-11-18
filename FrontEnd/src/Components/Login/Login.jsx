import React, { useEffect, useState } from 'react'
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "../SignUp/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../SignUp/EyeSlashFilledIcon";
import imgLogo from '../../Assets/Logo.png';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from 'axios';
import toast from 'react-hot-toast';
import {LoadUser} from '../../Redux/action/user.js';
import Store from "../../Redux/store";
import { Link, useNavigate } from 'react-router-dom';
import { userServer } from '../../server.js';
const Login = () => {
  useEffect(() => {
    document.title = "Login"
 }, []);
  const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const schema = yup.object().shape({
      email: yup
        .string()
        .email("Invalid Email")
        .required("Please provide an email"),
      password: yup
        .string()
        .min(8, "Password must be greater than 8")
        .max(32, "Password must be less than 32")
        .required("Please provide a password"),
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
        const serverData = await axios.post(`${userServer}/login`,data,{withCredentials:true});
        console.log(serverData.data.success);
        if(serverData.data.success){
          navigate('/chat');
          toast.success("Logged in successfully");
          reset();
          Store.dispatch(LoadUser());
          
        }
      } catch (error) {
          toast.error(error.response.data.message);
      }
    };
  return (
    <div class="min-h-screen bg-gray-100 text-gray-900 flex justify-center dark:bg-gray-800 dark:text-white">
    <div class="max-w-screen-xl m-0 sm:m-10 bg-white dark:bg-black shadow sm:rounded-lg flex justify-center flex-1">
    <div class="flex-1 bg-indigo-100 text-center hidden lg:flex">
        <div class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
          <img
            src="https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg"
            alt=""
          />
        </div>
      </div>
      
      <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
        <div>
          <img
            src={imgLogo}
            class="h-16 mx-auto"
            alt='illustartion'
          />
        </div>
        <div class="mt-10 flex flex-col items-center">
          <h1 class="text-2xl xl:text-3xl font-extrabold">Login</h1>
          <div class="w-full flex-1 mt-8">
            <form onSubmit={handleSubmit(onSubmit)}>
            <div class="mx-auto max-w-xs">
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
             <div class="text-sm mt-5 text-right">
              <Link to='/forgot-password' class="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer">
              Forgot password?
              </Link>
            
          </div>
              <button type='submit' className="mt-5 tracking-wide font-semibold bg-indigo-500 dark:bg-indigo-800 text-gray-100 dark:text-white w-full py-4 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                <svg
                  class="w-6 h-6 -ml-2"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <path d="M20 8v6M23 11h-6" />
                </svg>
                <span class="ml-3">Sign Up</span>
              </button>
              <p class="mt-6 text-xs text-gray-600 text-center">
                I agree to abide by templatana's
                <span  class="border-b border-gray-500 border-dotted">
                Terms of Service
                </span>
                
                and its
                <span class="border-b border-gray-500 border-dotted">
                Terms of Service
                </span>
                
              </p>
            </div>
            </form>
          </div>
        </div>
      </div>
      
    </div>
  </div>
  )
}

export default Login