import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import axios from "axios";
import { LeaseServer } from "../../../server";
import toast from "react-hot-toast";
const formatDateString = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const AddLeasModal = ({ value, setLeaseData, LeaseData }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [StartDate, setStartDate] = useState("");
  const [EndDate, setEndDate] = useState("");
  console.log(value?._id);
  console.log(LeaseData);
  const schema = yup.object().shape({
    duration: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required("Duration is required")
      .min(1, "Duration must be at least 1 month")
      .max(24, "Duration cannot exceed 2 years"),
    rentAmount: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required("Rent amount is required")
      .min(1000, "Rent amount must be at least 1000")
      .max(500000, "Rent amount cannot exceed 500000"),

    securityAmount: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required("Security amount is required")
      .min(
        yup.ref("rentAmount"),
        "Security amount must be greater than rent amount"
      )
      .max(5000000, "Rent amount cannot exceed 5000000"),

    tenantAadharCard: yup
      .string()
      .required("Tenant Aadhar card number is required")
      .matches(/^[0-9]{12}$/, "Aadhar card number must be exactly 12 digits"),

    leaseAgreement: yup
      .mixed()
      .required("A file is required")
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .test("fileFormat", "PDF only", (value) => {
        console.log(value[0]?.type);
        return value && ["application/pdf"].includes(value[0]?.type);
      })
      .test("fileSize", "PDF size should be less than 10MB", (value) => {
        console.log(value[0]?.size);
        return value && value[0]?.size <= 10485760;
      }),

    startDate: yup
      .date()
      .required("Start date is required")
      .typeError("Start date must be a valid date"),

    endDate: yup
      .date()
      .required("End date is required")
      .typeError("End date must be a valid date")
      .min(yup.ref("startDate"), "End date must be after start date"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const onSubmit = async (data) => {
    const toastId = toast.loading("Updating lease...");
    try {
      const data1 = { ...data, id: value?._id };
      const dataResponse = await axios.post(
        `${LeaseServer}/update-lease`,
        data1,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(dataResponse);
      if (dataResponse.data.success) {
        const indexOfObjectToUpdate = LeaseData.findIndex(
          (item) => item._id === value?._id
        );
        if (indexOfObjectToUpdate !== -1) {
          const updatedData = [...LeaseData];
          updatedData[indexOfObjectToUpdate].aadhar_number =
            data.tenantAadharCard;
          updatedData[indexOfObjectToUpdate].agreement_doc =
            dataResponse.data.doc;
          updatedData[indexOfObjectToUpdate].lease_end_date = new Date(
            data.endDate
          );
          updatedData[indexOfObjectToUpdate].lease_start_date = new Date(
            data.startDate
          );
          updatedData[indexOfObjectToUpdate].rent_amount = data.rentAmount;
          updatedData[indexOfObjectToUpdate].security_deposit =
            data.securityAmount;
          setLeaseData(updatedData);
        }
        console.log(LeaseData);
        reset();
        onOpenChange(!isOpen);
        toast.success("Your Aggrement has been started", {
          id: toastId,
        });
        // window.location.reload();
      }
    } catch (error) {
      toast.error(error.message, {
        id: toastId,
      });
    }
  };
  const addMonthsToCurrentDate = (monthsToAdd) => {
    const now = new Date();
    const newMonth = now.getMonth() + monthsToAdd;
    const newYear = now.getFullYear() + Math.floor(newMonth / 12); // Calculate the new year
    const adjustedMonth = newMonth % 12; // Get the adjusted month within the range [0, 11]
    now.setMonth(adjustedMonth);
    now.setFullYear(newYear); // Adjust the year
    return now;
  };
  const formatDateToString = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Adding 1 because getMonth() returns zero-based index
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDuration = (e) => {
    console.log(e.target.value);
    setStartDate(formatDateToString(new Date()));
    setEndDate(
      formatDateToString(addMonthsToCurrentDate(parseInt(e.target.value)))
    );
    setValue("startDate", formatDateToString(new Date()));
    setValue(
      "endDate",
      formatDateToString(addMonthsToCurrentDate(parseInt(e.target.value)))
    );
  };

  return (
    <>
      <Button
        color="success"
        variant="solid"
        className="w-full"
        onPress={onOpen}
      >
        {value?.tenantAadharCard === null && value?.agreement_doc === null
          ? "Update"
          : "View"}
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        scrollBehavior="outside"
        size="3xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
              {value?.tenantAadharCard === null && value?.agreement_doc === null
          ? "Update "
          : "View "}
          Agreement
              </ModalHeader>
              <ModalBody>
                {value?.tenantAadharCard === null &&
                value?.agreement_doc === null ? (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    encType="multipart/form-data"
                  >
                    <div className="flex flex-col space-y-1">
                      <div className="w-full">
                        <label
                          for="username-error"
                          className={`block mb-2 text-sm font-medium ${
                            errors.duration?.message
                              ? "text-red-700 dark:text-red-500"
                              : ""
                          } `}
                        >
                          Duration
                        </label>
                        <select
                          id="countries"
                          {...register("duration")}
                          onChange={handleDuration}
                          class={`block p-2.5 w-full text-sm  rounded-lg border ${
                            errors.duration?.message
                              ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                              : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          }  
  `}
                        >
                          <option hidden>Select Duration</option>
                          <option value={1}>1 Month</option>
                          <option value={3}>3 Months</option>
                          <option value={6}>6 Months</option>
                          <option value={9}>9 Months</option>
                          <option value={12}>1 Years</option>
                          <option value={24}>2 Years</option>
                        </select>

                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                          {errors.duration?.message}
                        </p>
                      </div>
                      <div className="flex flex-col md:flex-row space-x-1">
                        <div className="w-full">
                          <label
                            for="username-error"
                            className={`block mb-2 text-sm font-medium ${
                              errors.startDate?.message
                                ? "text-red-700 dark:text-red-500"
                                : ""
                            } `}
                          >
                            Start Date
                          </label>
                          <input
                            {...register("startDate")}
                            type="date"
                            id="username-error"
                            readOnly
                            defaultValue={StartDate}
                            class={`block p-2.5 w-full text-sm  rounded-lg border ${
                              errors.startDate?.message
                                ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                                : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            }  
              `}
                            placeholder="Enter your property size"
                          />
                          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                            {errors.startDate?.message}
                          </p>
                        </div>
                        <div className="w-full">
                          <label
                            for="username-error"
                            className={`block mb-2 text-sm font-medium ${
                              errors.endDate?.message
                                ? "text-red-700 dark:text-red-500"
                                : ""
                            } `}
                          >
                            End Date
                          </label>
                          <input
                            {...register("endDate")}
                            type="date"
                            id="username-error"
                            defaultValue={EndDate}
                            class={`block p-2.5 w-full text-sm  rounded-lg border ${
                              errors.endDate?.message
                                ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                                : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            }  
              `}
                            placeholder="Enter your property size"
                            readOnly
                          />
                          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                            {errors.endDate?.message}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row space-x-1">
                        <div className="w-full">
                          <label
                            for="username-error"
                            className={`block mb-2 text-sm font-medium ${
                              errors.rentAmount?.message
                                ? "text-red-700 dark:text-red-500"
                                : ""
                            } `}
                          >
                            Rent Amount
                          </label>
                          <input
                            {...register("rentAmount")}
                            type="number"
                            id="username-error"
                            defaultValue={value?.rent_amount}
                            class={`block p-2.5 w-full text-sm  rounded-lg border ${
                              errors.rentAmount?.message
                                ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                                : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            }  
              `}
                            placeholder="Enter rent amount"
                          />
                          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                            {errors.rentAmount?.message}
                          </p>
                        </div>
                        <div className="w-full">
                          <label
                            for="username-error"
                            className={`block mb-2 text-sm font-medium ${
                              errors.securityAmount?.message
                                ? "text-red-700 dark:text-red-500"
                                : ""
                            } `}
                          >
                            Security Amount
                          </label>
                          <input
                            {...register("securityAmount")}
                            type="number"
                            id="username-error"
                            defaultValue={value?.security_deposit}
                            class={`block p-2.5 w-full text-sm  rounded-lg border ${
                              errors.securityAmount?.message
                                ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                                : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            }  
              `}
                            placeholder="Enter security amount"
                          />
                          <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                            {errors.securityAmount?.message}
                          </p>
                        </div>
                      </div>

                      <div className="w-full">
                        <label
                          for="username-error"
                          className={`block mb-2 text-sm font-medium ${
                            errors.tenantAadharCard?.message
                              ? "text-red-700 dark:text-red-500"
                              : ""
                          } `}
                        >
                          Tenant Aadhar Card Number
                        </label>
                        <input
                          {...register("tenantAadharCard")}
                          type="number"
                          id="username-error"
                          class={`block p-2.5 w-full text-sm  rounded-lg border ${
                            errors.tenantAadharCard?.message
                              ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
                              : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          }  
              `}
                          placeholder="Enter tenant aadhar card number"
                        />
                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                          {errors.tenantAadharCard?.message}
                        </p>
                      </div>
                      <div className="w-full">
                        <label
                          for="username-error"
                          className={`block mb-2 text-sm font-medium ${
                            errors.leaseAgreement?.message
                              ? "text-red-700 dark:text-red-500"
                              : ""
                          } `}
                        >
                          Upload Lease Agreement
                        </label>
                        <input
                          {...register("leaseAgreement")}
                          type="file"
                          class=" p-1 w-full text-slate-500 text-sm rounded-full leading-6 file:bg-violet-200 file:text-violet-700 file:font-semibold file:border-none file:px-4 file:py-1 file:mr-6 file:rounded-full hover:file:bg-violet-100 border border-gray-300"
                        />
                        <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                          {errors.leaseAgreement?.message}
                        </p>
                      </div>

                      <div className="ml-auto py-5">
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          Cancel
                        </Button>
                        <Button color="primary" type="submit">
                          Submit
                        </Button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div class="bg-white overflow-hidden shadow rounded-lg border">
                    <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
                      <dl class="sm:divide-y sm:divide-gray-200">
                        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt class="text-sm font-medium text-gray-500">
                            Start Date
                          </dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {formatDateString(value?.lease_start_date)}
                          </dd>
                        </div>
                        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt class="text-sm font-medium text-gray-500">
                            End Date
                          </dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {formatDateString(value?.lease_end_date)}
                          </dd>
                        </div>
                        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt class="text-sm font-medium text-gray-500">
                            Rent Price
                          </dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            ₹ {value?.rent_amount}
                          </dd>
                        </div>
                        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt class="text-sm font-medium text-gray-500">
                            Security Deposit
                          </dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            ₹ {value?.security_deposit}
                          </dd>
                        </div>
                        <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt class="text-sm font-medium text-gray-500">
                            Tenant Aadhar Card Number
                          </dt>
                          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {value?.aadhar_number}
                          </dd>
                        </div>
                        <div class="py-3 sm:py-5  sm:gap-4 sm:px-6">
                          <dt class="text-sm font-medium text-gray-500">
                            Agreement Document
                          </dt>
                          <dd class="mt-3 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <object
                              data={value?.agreement_doc}
                              className="w-full h-screen"
                            ></object>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddLeasModal;
