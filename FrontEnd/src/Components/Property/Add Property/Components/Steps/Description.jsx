// framer motion
import { motion as m } from "framer-motion";
import { useFormContext } from "react-hook-form";
export default function Description() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const container = {
    hidden: {
      opacity: 0,
    },
    show: {
      opacity: 1,
      transition: {
        delay: 0.25,
      },
    },
  };
  const typesOfHouses = [
    "Haveli",
    "Bungalow",
    "Villa",
    "Apartment",
    "Flat",
    "Penthouse",
    "Row House",
    "Cottage",
    "Chawl",
    "Mansion",
    "Farmhouse",
    "House",
  ];
  return (
    <m.div
      className="w-full p-4 items-start flex-col rounded-xl shadow-2xl lg:shadow-none text-left bg-white  transform -translate-y-20 max-w-full overflow-hidden md:p-8 md:mt-0 md:text-left  lg:transform-none md:max-w-full md:w-full"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <h1 className="text-2xl font-bold text-marine-blue mb-2 md:text-3xl md:mb-1">
        DESCRIPTION
      </h1>
      {/* <p className="text-cool-gray mb-4">
        Please provide your name, email address, and phone number.
      </p> */}

      <div className="w-full mt-5">
        <div>
          <label
            htmlFor="description"
            className={`block mb-2 text-sm font-medium ${
              errors.description?.message
                ? "text-red-700 dark:text-red-500"
                : ""
            } `}
          >
            Description
          </label>
          <textarea
            {...register("description")}
            id="description"
            rows="4"
            class={`block p-2.5 w-full text-sm  rounded-lg border ${
              errors.description?.message
                ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            }  
            `}
            placeholder="Write your thoughts here..."
          ></textarea>

          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
            {errors.description?.message}
          </p>
        </div>
        <div className="mt-5 gap-3 flex flex-col lg:flex-row">
          <div className="w-full">
            <label
              for="username-error"
              className={`block mb-2 text-sm font-medium ${
                errors.category?.message ? "text-red-700 dark:text-red-500" : ""
              } `}
            >
              Property Category
            </label>
            <select
              id="countries"
              {...register("category")}
              class={`block p-2.5 w-full text-sm  rounded-lg border ${
                errors.category?.message
                  ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                  : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }  
`}
            >
              <option selected="">Select property category</option>
              {typesOfHouses.map((value, key) => (
                <option value={value} key={key}>
                  {value}
                </option>
              ))}
            </select>

            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.category?.message}
            </p>
          </div>
          <div className="w-full">
            <label
              for="username-error"
              className={`block mb-2 text-sm font-medium ${
                errors.status?.message ? "text-red-700 dark:text-red-500" : ""
              } `}
            >
              Property Status
            </label>
            <select
              id="countries"
              {...register("status")}
              class={`block p-2.5 w-full text-sm  rounded-lg border ${
                errors.status?.message
                  ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                  : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }  
`}
            >
              <option selected hidden value={null} >Select property status</option>
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>

            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.status?.message}
            </p>
          </div>
        </div>
        <div className="mt-5 gap-3 flex flex-col lg:flex-row">
          <div className="w-full">
            <label
              for="username-error"
              className={`block mb-2 text-sm font-medium ${
                errors.price?.message ? "text-red-700 dark:text-red-500" : ""
              } `}
            >
              Price in ₹
            </label>
            <input
              {...register("price")}
              type="number"
              id="username-error"
              class={`block p-2.5 w-full text-sm  rounded-lg border ${
                errors.price?.message
                  ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                  : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }  
            `}
              placeholder="Enter your property price"
            />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.price?.message}
            </p>
          </div>

          <div className="w-full">
            <label
              for="username-error"
              className={`block mb-2 text-sm font-medium ${
                errors.deposit?.message ? "text-red-700 dark:text-red-500" : ""
              } `}
            >
              Security Deposit in ₹
            </label>
            <input
              {...register("deposit")}
              type="number"
              id="username-error"
              class={`block p-2.5 w-full text-sm  rounded-lg border ${
                errors.deposit?.message
                  ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                  : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              }  
            `}
              placeholder="Enter your property deposit"
            />
            <p class="mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.deposit?.message}
            </p>
          </div>
        </div>
        {/* Repeat similar structure for other input fields */}
      </div>
    </m.div>
  );
}
