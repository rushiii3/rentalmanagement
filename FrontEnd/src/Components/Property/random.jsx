import React from 'react'

const random = () => {
  return (
    <div>
        <div className="ml-3 my-3">
        <p className="text-2xl font-bold ">Add New Property</p>
        <p>We are glad to see you again!</p>
      </div>

      <Card>
        <CardBody>
          <div class="p-8">
            <div class="flex items-center">
              <div
                className={`flex items-center ${
                  CurrentStep === 1
                    ? "text-blue-500"
                    : CurrentStep > 1
                    ? "text-white"
                    : "text-gray-500"
                }  relative`}
              >
                <div
                  className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2  ${
                    CurrentStep === 1
                      ? "border-blue-500"
                      : CurrentStep > 1
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  <TbFileDescription className="mx-auto" size={25} />
                </div>
                <div
                  className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${
                    CurrentStep === 1
                      ? "text-blue-500"
                      : CurrentStep > 1
                      ? "text-blue-500"
                      : "text-gray-500"
                  }`}
                >
                  Description
                </div>
              </div>
              <div
                className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
                  CurrentStep > 1 ? "border-blue-500" : "border-gray-300"
                }`}
              ></div>
              <div
                className={`flex items-center ${
                  CurrentStep === 2
                    ? "text-blue-500"
                    : CurrentStep > 2
                    ? "text-white"
                    : "text-gray-500"
                }  relative`}
              >
                <div
                  className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2  ${
                    CurrentStep === 2
                      ? "border-blue-500"
                      : CurrentStep > 2
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  <FaLocationArrow className="mx-auto" size={25} />
                </div>
                <div
                  className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${
                    CurrentStep === 2
                      ? "text-blue-500"
                      : CurrentStep > 2
                      ? "text-blue-500"
                      : "text-gray-500"
                  }`}
                >
                  Location
                </div>
              </div>
              <div
                className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
                  CurrentStep > 2 ? "border-blue-500" : "border-gray-300"
                }`}
              ></div>
              <div
                className={`flex items-center ${
                  CurrentStep === 3
                    ? "text-blue-500"
                    : CurrentStep > 3
                    ? "text-white"
                    : "text-gray-500"
                }  relative`}
              >
                <div
                  className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2  ${
                    CurrentStep === 3
                      ? "border-blue-500"
                      : CurrentStep > 3
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  <GrInfo className="mx-auto" size={25} />
                </div>
                <div
                  className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${
                    CurrentStep === 3
                      ? "text-blue-500"
                      : CurrentStep > 3
                      ? "text-blue-500"
                      : "text-gray-500"
                  }`}
                >
                  Details
                </div>
              </div>
              <div
                className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
                  CurrentStep > 3 ? "border-blue-500" : "border-gray-300"
                }`}
              ></div>
              <div
                className={`flex items-center ${
                  CurrentStep === 4
                    ? "text-blue-500"
                    : CurrentStep > 4
                    ? "text-white"
                    : "text-gray-500"
                }  relative`}
              >
                <div
                  className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2  ${
                    CurrentStep === 4
                      ? "border-blue-500"
                      : CurrentStep > 4
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  <MdOutlinePermMedia className="mx-auto" size={25} />
                </div>
                <div
                  className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${
                    CurrentStep === 4
                      ? "text-blue-500"
                      : CurrentStep > 4
                      ? "text-blue-500"
                      : "text-gray-500"
                  }`}
                >
                  Media
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="flex items-center">
              {/* Step 1: Description */}
              <motion.div
              key={`step-1-${CurrentStep}`}
                className={`flex items-center relative`}
                initial={{ color: "#3b82f6", borderColor: "#3b82f6" }}
                animate={{
                  color:
                    CurrentStep === 1
                      ? "#3b82f6"
                      : CurrentStep > 1
                      ? "#fff"
                      : "#7b8794",
                  borderColor:
                    CurrentStep === 1
                      ? "#3b82f6"
                      : CurrentStep > 1
                      ? "#3b82f6"
                      : "#cbd5e0",
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2`}
                  initial={{
                    borderColor:
                      CurrentStep === 1
                        ? "#3b82f6"
                        : CurrentStep > 1
                        ? "#3b82f6"
                        : "#cbd5e0",
                  }}
                  animate={{
                    borderColor:
                      CurrentStep === 1
                        ? "#3b82f6"
                        : CurrentStep > 1
                        ? "#3b82f6"
                        : "#cbd5e0",
                    backgroundColor:
                      CurrentStep > 1 ? "#3b82f6" : "transparent",
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <TbFileDescription className="mx-auto" size={25} />
                </motion.div>
                <motion.div
                  className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase`}
                  initial={{ color: "#7b8794" }}
                  animate={{
                    color:
                      CurrentStep === 1
                        ? "#3b82f6"
                        : CurrentStep > 1
                        ? "#3b82f6"
                        : "#7b8794",
                  }}
                  transition={{ duration: 0.5 }}
                >
                  Description
                </motion.div>
              </motion.div>
              <motion.div
                className={`flex-auto border-t-2`}
                initial={{
                  borderColor: CurrentStep > 1 ? "#3b82f6" : "#cbd5e0",
                }}
                animate={{
                  borderColor: CurrentStep > 1 ? "#3b82f6" : "#cbd5e0",
                }}
                transition={{ duration: 0.5 }}
              ></motion.div>
              <motion.div
              key={`step-2-${CurrentStep}`}
                className={`flex items-center relative`}
                initial={{ color: "#3b82f6", borderColor: "#3b82f6" }}
                animate={{
                  color:
                    CurrentStep === 2
                      ? "#3b82f6"
                      : CurrentStep > 2
                      ? "#fff"
                      : "#7b8794",
                  borderColor:
                    CurrentStep === 2
                      ? "#3b82f6"
                      : CurrentStep > 2
                      ? "#3b82f6"
                      : "#cbd5e0",
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2`}
                  initial={{
                    borderColor:
                      CurrentStep === 2
                        ? "#3b82f6"
                        : CurrentStep > 2
                        ? "#3b82f6"
                        : "#cbd5e0",
                  }}
                  animate={{
                    borderColor:
                      CurrentStep === 2
                        ? "#3b82f6"
                        : CurrentStep > 2
                        ? "#3b82f6"
                        : "#cbd5e0",
                    backgroundColor:
                      CurrentStep > 2 ? "#3b82f6" : "transparent",
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <TbFileDescription className="mx-auto" size={25} />
                </motion.div>
                <motion.div
                  className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase`}
                  initial={{ color: "#7b8794" }}
                  animate={{
                    color:
                      CurrentStep === 2
                        ? "#3b82f6"
                        : CurrentStep > 2
                        ? "#3b82f6"
                        : "#7b8794",
                  }}
                  transition={{ duration: 0.5 }}
                >
                  Description
                </motion.div>
              </motion.div>

              <motion.div
                className={`flex-auto border-t-2`}
                initial={{
                  borderColor: CurrentStep > 2 ? "#3b82f6" : "#cbd5e0",
                }}
                animate={{
                  borderColor: CurrentStep > 2 ? "#3b82f6" : "#cbd5e0",
                }}
                transition={{ duration: 0.5 }}
              ></motion.div>

              <motion.div
              key={`step-3-${CurrentStep}`}
                className={`flex items-center relative`}
                initial={{ color: "#3b82f6", borderColor: "#3b82f6" }}
                animate={{
                  color:
                    CurrentStep === 3
                      ? "#3b82f6"
                      : CurrentStep > 3
                      ? "#fff"
                      : "#7b8794",
                  borderColor:
                    CurrentStep === 3
                      ? "#3b82f6"
                      : CurrentStep > 3
                      ? "#3b82f6"
                      : "#cbd5e0",
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2`}
                  initial={{
                    borderColor:
                      CurrentStep === 3
                        ? "#3b82f6"
                        : CurrentStep > 3
                        ? "#3b82f6"
                        : "#cbd5e0",
                  }}
                  animate={{
                    borderColor:
                      CurrentStep === 3
                        ? "#3b82f6"
                        : CurrentStep > 3
                        ? "#3b82f6"
                        : "#cbd5e0",
                    backgroundColor:
                      CurrentStep > 3 ? "#3b82f6" : "transparent",
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <TbFileDescription className="mx-auto" size={25} />
                </motion.div>
                <motion.div
                  className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase`}
                  initial={{ color: "#7b8794" }}
                  animate={{
                    color:
                      CurrentStep === 3
                        ? "#3b82f6"
                        : CurrentStep > 3
                        ? "#3b82f6"
                        : "#7b8794",
                  }}
                  transition={{ duration: 0.5 }}
                >
                  Description
                </motion.div>
              </motion.div>
              <motion.div
                className={`flex-auto border-t-2`}
                initial={{
                  borderColor: CurrentStep > 3 ? "#3b82f6" : "#cbd5e0",
                }}
                animate={{
                  borderColor: CurrentStep > 3 ? "#3b82f6" : "#cbd5e0",
                }}
                transition={{ duration: 0.5 }}
              ></motion.div>
              <motion.div
              key={`step-4-${CurrentStep}`}
                className={`flex items-center relative`}
                initial={{ color: "#3b82f6", borderColor: "#3b82f6" }}
                animate={{
                  color:
                    CurrentStep === 4
                      ? "#3b82f6"
                      : CurrentStep > 4
                      ? "#fff"
                      : "#7b8794",
                  borderColor:
                    CurrentStep === 4
                      ? "#3b82f6"
                      : CurrentStep > 4
                      ? "#3b82f6"
                      : "#cbd5e0",
                }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2`}
                  initial={{
                    borderColor:
                      CurrentStep === 4
                        ? "#3b82f6"
                        : CurrentStep > 4
                        ? "#3b82f6"
                        : "#cbd5e0",
                  }}
                  animate={{
                    borderColor:
                      CurrentStep === 4
                        ? "#3b82f6"
                        : CurrentStep > 4
                        ? "#3b82f6"
                        : "#cbd5e0",
                    backgroundColor:
                      CurrentStep > 4 ? "#3b82f6" : "transparent",
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <TbFileDescription className="mx-auto" size={25} />
                </motion.div>
                <motion.div
                  className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase`}
                  initial={{ color: "#7b8794" }}
                  animate={{
                    color:
                      CurrentStep === 4
                        ? "#3b82f6"
                        : CurrentStep > 4
                        ? "#3b82f6"
                        : "#7b8794",
                  }}
                  transition={{ duration: 0.5 }}
                >
                  Description
                </motion.div>
              </motion.div>
            </div>
          </div>
          <div class="mt-8 p-4">
            <div>
              <div class="font-bold text-gray-600 text-xs leading-8 uppercase h-6 mx-2 mt-3">
                Full Name
              </div>
              <div class="flex flex-col md:flex-row">
                <div class="w-full flex-1 mx-2 svelte-1l8159u">
                  <div class="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
                    <input
                      placeholder="First Name"
                      class="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                    />{" "}
                  </div>
                </div>
                <div class="w-full flex-1 mx-2 svelte-1l8159u">
                  <div class="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
                    <input
                      placeholder="Last Name"
                      class="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                    />{" "}
                  </div>
                </div>
              </div>
              <div class="flex flex-col md:flex-row">
                <div class="w-full mx-2 flex-1 svelte-1l8159u">
                  <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                    {" "}
                    Username
                  </div>
                  <div class="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
                    <input
                      placeholder="Just a hint.."
                      class="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                    />{" "}
                  </div>
                </div>
                <div class="w-full mx-2 flex-1 svelte-1l8159u">
                  <div class="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                    {" "}
                    Your Email
                  </div>
                  <div class="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
                    <input
                      placeholder="jhon@doe.com"
                      class="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                    />{" "}
                  </div>
                </div>
              </div>
            </div>
            <div class="flex p-2 mt-4">
              <button
                class="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
            hover:bg-gray-200  
            bg-gray-100 
            text-gray-700 
            border duration-200 ease-in-out 
            border-gray-600 transition"
              >
                Previous
              </button>
              <div class="flex-auto flex flex-row-reverse">
                <button
                  class="text-base  ml-2  hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
            hover:bg-teal-600  
            bg-teal-600 
            text-teal-100 
            border duration-200 ease-in-out 
            border-teal-600 transition"
                >
                  Next
                </button>
                <button
                  class="text-base hover:scale-110 focus:outline-none flex justify-center px-4 py-2 rounded font-bold cursor-pointer 
            hover:bg-teal-200  
            bg-teal-100 
            text-teal-700 
            border duration-200 ease-in-out 
            border-teal-600 transition"
                >
                  Skip
                </button>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default random