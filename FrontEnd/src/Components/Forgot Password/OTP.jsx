import axios from "axios";
import React, { useRef, useState } from "react";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { userServer } from "../../server";
import toast from "react-hot-toast";
import ChangePassword from './ChangePassword';
import { Button } from "@nextui-org/react";
const OTP = (props) => {
  const [otp, setOtp] = useState(['', '', '', '']); // State to hold OTP values
  const refs = [useRef(), useRef(), useRef(), useRef()]; // Refs for input elements
  const [error, setError] = useState(false);
  const [Passwordpage, setPasswordpage] = useState(false);
  const [email, setemail] = useState(null);
  const [loading, setloading] = useState(false);
  const handleChange = (e, index) => {
    const { value } = e.target;
    if (value.length === 1 && /^\d+$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 3) {
        refs[index + 1].current.focus();
      }
    } else if (value.length === 0) {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      if (index > 0) {
        refs[index - 1].current.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, 4);
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      if (/^\d+$/.test(pastedData[i]) && i < 4) {
        newOtp[i] = pastedData[i];
      }
    }
    setOtp(newOtp);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if (otp.some((value) => value === '')) {
      setError(true);
      return;
    }
    // Reset error state if there is no error
    setError(false);
    try {
      setloading(true);
      const data = {
        "otp" : otp.join(''),
        "email" : props.email.email,
      }
      const serverResponse = await axios.post(`${userServer}/verify-otp`,data);
      if(serverResponse.data.success){
        toast.success(serverResponse.data.message);
        setPasswordpage(true);
        setemail(serverResponse.data.data);
        setloading(false);
      }
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
      setloading(false);
    }
  };
  return (
    <>
    {
      Passwordpage ? (
        <ChangePassword email={email}/>
        ) : ( <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
      <div class="flex flex-col items-center justify-center text-center space-y-2">
        <div class="font-semibold text-3xl">
          <p>Email Verification</p>
        </div>
        <div class="flex flex-row text-sm font-medium text-gray-400">
          <p>We have sent a code to your email ba**@dipainhouse.com</p>
        </div>
      </div>

      <div>
        <form>
          <div className="flex flex-col space-y-16">
          <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
        {otp.map((value, index) => (
          <div className="w-16 h-16" key={index}>
            <input
              ref={refs[index]}
              className={`w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ${
                error && value === '' ? 'border-red-500' : ''
              }`}
              type="text"
              value={value}
              maxLength={1}
              onChange={(e) => handleChange(e, index)}
              onPaste={handlePaste}
            />
          </div>
        ))}
      </div>

            <div className="flex flex-col space-y-5">
              <div>
                <Button
                type="submit"
                className="mt-5  tracking-wide font-semibold bg-indigo-600 dark:bg-indigo-800 text-gray-100 dark:text-white w-full py-4 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                isLoading={loading}
                size="lg"
                onClick={handleSubmit}
              >
                {loading ? (
                  "Veifying OTP!"
                ) : (
                  <>
                    <MdOutlineVerifiedUser size={20} />
                    <span className="ml-1">Verify Account</span>
                  </>
                )}
              </Button>
              </div>

              <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                <p>Didn't recieve code?</p>{" "}
                <a
                  className="flex flex-row items-center text-blue-600"
                  href="http://"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resend
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>)
    }
   </>
  );
};

export default OTP;
