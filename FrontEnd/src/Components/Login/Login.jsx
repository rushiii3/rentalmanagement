import React, { useEffect, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { EyeFilledIcon } from "../SignUp/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../SignUp/EyeSlashFilledIcon";
import imgLogo from "../../Assets/Logo.png";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import toast from "react-hot-toast";
import { LoadUser } from "../../Redux/action/user.js";
import Store from "../../Redux/store";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { userServer } from "../../server.js";
import { useSelector } from "react-redux";
// import backImage from '../../Assets/back1.svg';


const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fromBooking = location.state && location.state.pathname;
  useEffect(() => {
    document.title = "Login";
  }, []);

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  if (loading === false) {
    if (isAuthenticated) {
      navigate("/properties");
    }
  }
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
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [Loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    setLoading(true);
    const toastId = toast.loading('Login...');
    try {
      const serverData = await axios.post(`${userServer}/login`, data, {
        withCredentials: true,
      });
      if (serverData.data.success) {
        setLoading(false);
        navigate(fromBooking ? fromBooking : "/properties");
        toast.success('Logged in successfully', {
          id: toastId,
        });
        reset();
        Store.dispatch(LoadUser());
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message, {
        id: toastId,
      });
    }
  };
  return (
    <div class="min-h-screen bg-gray-100 text-gray-900 flex justify-center dark:bg-gray-800 dark:text-white">
      <div class="max-w-screen-xl m-0 sm:m-10 bg-white dark:bg-black shadow sm:rounded-lg flex justify-center flex-1">
        <div class="flex-1 bg-green-100 text-center hidden lg:flex">
          <div class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
            <img src="../../Assets/back1.svg" alt="background image" />
          </div>
        </div>

        <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <img src={imgLogo} class="h-16 mx-auto" alt="illustartion" />
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
                    <Link
                      to="/forgot-password"
                      class="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Button
                    type="submit"
                    className="mt-5 tracking-wide font-semibold bg-green-400 text-white-500 dark:bg-green-800  dark:text-white w-full py-4 rounded-lg hover:bg-green-700 dark:hover:bg-green-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    isLoading={loading}
                    size="lg"
                  >
                    {Loading ? (
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
                        <span className="ml-3">Login</span>
                      </>
                    )}
                  </Button>
                  <p className="mt-6 text-md text-gray-600 text-center">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-500 underline">
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
