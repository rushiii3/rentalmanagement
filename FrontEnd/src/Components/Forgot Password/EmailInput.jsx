import React, { useEffect, useState } from "react";
import { FaKey } from "react-icons/fa6";
import OTP from "./OTP";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Input } from "@nextui-org/react";
import axios from "axios";
import { userServer } from "../../server";
const EmailInput = () => {
  useEffect(() => {
    document.title = "Forgot Password";
  }, []);
  const [OTPpage, setOTPpage] = useState(false);
  const [email, setemail] = useState(null);
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid Email")
      .required("Please provide an email"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    try {
      
      const serverResponse = await axios.post(`${userServer}/forgot-password`,data); 
      console.log(serverResponse.data.success);
      if(serverResponse.data.success){
        toast.success(serverResponse.data.message);
        setOTPpage(true);
        setemail(data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="my-24">
      {OTPpage === true ? (
        <OTP email={email} />
      ) : (
        <>
          <h1 className="text-4xl font-medium mt-10">Reset password</h1>
          <p className="text-slate-500">
            Fill up the form to reset the password
          </p>

          <form className="my-10" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-5">
              <Input
                type="email"
                label="Email address"
                placeholder="Enter email address"
                labelPlacement="outside"
                radius="sm"
                size="lg"
                variant="bordered"
                {...register("email")}
                    validationState={
                      errors.email?.message ? "invalid" : "valid"
                    }
                    errorMessage={errors.email?.message}
              />
              <button
                type="submit"
                className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
              >
                <FaKey size={20} />
                <span>Reset password</span>
              </button>
              <p className="text-center">
                Not registered yet?
                <Link
                  to="/register"
                  className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
                >
                  <span> Register now </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </span>
                </Link>
              </p>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default EmailInput;
