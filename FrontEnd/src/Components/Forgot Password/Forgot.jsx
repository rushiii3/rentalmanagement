import React from "react";
import FPsvg from '../../Assets/svg/undraw_forgot_password.svg';
import EmailInput from './EmailInput';
const Forgot = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center dark:bg-gray-800 dark:text-white">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white dark:bg-black shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
          <div className="my-7 xl:m-16 w-full bg-contain bg-center bg-no-repeat">
            <img
              src={FPsvg}
              alt=""
              className="h-full max-w-full"
            />
          </div>
        </div>

        <div className="lg:w-1/2 xl:w-5/12 p-0 sm:p-9 py-12">
          <EmailInput />
          
          
        </div>
      </div>
    </div>
  );
};

export default Forgot;
