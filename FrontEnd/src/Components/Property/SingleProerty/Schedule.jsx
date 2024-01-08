import React, { useState } from "react";
import { Tabs, Tab, Button, Card, CardBody } from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import "./map.css";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PhysicalVisitServer, VideoConferenceServer } from "../../../server";
const Schedule = ({id}) => {
  const {isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [selected, setSelected] = React.useState("login");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // const [value, onChange] = useState(new Date());

  const physicalVisitSchema = yup.object().shape({
    visitDate: yup
      .date()
      .nullable()
      .typeError("Please enter a valid date")
      .required("Visit date is required")
      .min(new Date(new Date()), "Visit date cannot be in the past")
      .test(
        "future-date",
        "Visit date should be at least 5 days from now",
        (value) =>
          value &&
          value.getTime() > new Date().getTime() + 5 * 24 * 60 * 60 * 1000
      ),
    visitTime: yup
      .string()
      .matches(
        /^(10|11|12|13|14|15|16|17):[0-5][0-9]:[AaPp][Mm]$/,
        "Please enter a valid time between 10 AM and 5 PM in HH:mm:A format"
      )
      .required("Visit time is required"),
  });
  const videoConferenceSchema = yup.object().shape({
    visitDate: yup
      .date()
      .nullable()
      .typeError("Please enter a valid date")
      .required("Visit date is required")
      .min(new Date(new Date()), "Visit date cannot be in the past")
      .test(
        "future-date",
        "Visit date should be at least 5 days from now",
        (value) =>
          value &&
          value.getTime() > new Date().getTime() + 5 * 24 * 60 * 60 * 1000
      ),
    visitTime: yup
      .string()
      .matches(
        /^(10|11|12|13|14|15|16|17):[0-5][0-9]:[AaPp][Mm]$/,
        "Please enter a valid time between 10 AM and 5 PM in HH:mm:A format"
      )
      .required("Visit time is required"),
  });
  // For Physical Visit form
  const { handleSubmit: handlePhysicalSubmit, control: physicalControl, formState: physicalFormState, reset: resetPhysicalForm } = useForm({
    resolver: yupResolver(physicalVisitSchema),
    mode: "all",
  });
  const { errors: physicalErrors } = physicalFormState;
  
  // For Video Conference form
  const { handleSubmit: handleVideoSubmit, control: videoControl, formState: videoFormState, reset: resetVideoForm } = useForm({
    resolver: yupResolver(videoConferenceSchema),
    mode: "all",
  });
  const { errors: videoErrors } = videoFormState;

  const onSubmitphysicalVisit = async(data) => {
    if(isAuthenticated){
      try {
        const datas = {...data,id:id,userid:user?.user?._id};
      const serverResponse = await axios.post(`${PhysicalVisitServer}/add`,datas);
      console.log(serverResponse.data.success);
      if(serverResponse.data.success){
        toast.success("Your booking for physical visit has been done successfully!");
        resetPhysicalForm();
      }
      } catch (error) {
        toast.error(error.message);
      }
      
    }else{
      toast.error("You need to login first!");
      navigate('/login');
    }
    
  };
  const onSubmitvideoConference = async(data) => {
    if(isAuthenticated){
      try {
        const datas = {...data,id:id,userid:user?.user?._id};
      const serverResponse = await axios.post(`${VideoConferenceServer}/add`,datas);
      console.log(serverResponse.data.success);
      if(serverResponse.data.success){
        toast.success("Your booking for video conference has been done successfully!");
        resetVideoForm();
      }
      } catch (error) {
        toast.error(error.message);
      }
      
    }else{
      toast.error("You need to login first!");
      navigate('/login');
    }
  };
  return (
    <div>
      <div className="max-w-full h-auto hidden lg:block  p-6 bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-zinc-900 dark:border-zinc-900">
        <h1 className="mb-8 text-3xl text-center">Schedule a tour</h1>
        <Tabs
          fullWidth
          size="md"
          aria-label="Tabs form"
          selectedKey={selected}
          onSelectionChange={setSelected}
        >
          <Tab key="physicalvisit" title="Physical Visit">
            <form
              onSubmit={handlePhysicalSubmit(onSubmitphysicalVisit)}
              className="flex flex-col  gap-4"
            >
              <div>
                <label
                  htmlFor="username-error"
                  className={`block mb-2 text-sm font-medium ${
                    physicalErrors.visitDate?.message
                      ? "text-red-700 dark:text-red-500"
                      : ""
                  } `}
                >
                  Date
                </label>
                <Controller
                  className="w-full"
                  control={physicalControl}
                  name="visitDate"
                  render={({ field: { onChange, name, value } }) => (
                    <DatePicker
                      style={{
                        width: "100%",
                        boxSizing: "border-box",
                      }}
                      containerStyle={{
                        width: "100%",
                      }}
                      calendarPosition="bottom-center"
                      value={value || ""}
                      onChange={(date) => {
                        onChange(date?.isValid ? date : "");
                      }}
                      render={
                        <CustomMultipleInput
                          placeholder={"Select Time"}
                          errors={physicalErrors?.visitDate?.message}
                        />
                      }
                    />
                  )}
                />
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {physicalErrors.visitDate?.message}
                </p>
              </div>
              <div>
                <label
                  htmlFor="username-error"
                  className={`block mb-2 text-sm font-medium ${
                    physicalErrors.visitTime?.message
                      ? "text-red-700 dark:text-red-500"
                      : ""
                  } `}
                >
                  Time
                </label>
                <Controller
                  className="w-full"
                  control={physicalControl}
                  name="visitTime"
                  render={({ field: { onChange, name, value } }) => (
                    <DatePicker
                      disableDayPicker
                      format="HH:mm:A"
                      plugins={[<TimePicker hideSeconds />]}
                      style={{
                        width: "100%",
                        boxSizing: "border-box",
                      }}
                      containerStyle={{
                        width: "100%",
                      }}
                      calendarPosition="bottom-center"
                      value={value || ""}
                      onChange={(date) => {
                        onChange(date?.isValid ? date : "");
                      }}
                      render={
                        <CustomMultipleInput
                          placeholder={"Select Time"}
                          errors={physicalErrors?.visitTime?.message}
                        />
                      }
                    />
                  )}
                />
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {physicalErrors.visitTime?.message}
                </p>
              </div>
              <div className="flex gap-2 justify-end mt-3">
                <Button type="submit" fullWidth color="primary">
                  Submit
                </Button>
              </div>
            </form>
          </Tab>
          <Tab key="video-conference" title="Video Conference">
            <form
              onSubmit={handleVideoSubmit(onSubmitvideoConference)}
              className="flex flex-col  gap-4"
            >
              <div>
                <label
                  htmlFor="username-error"
                  className={`block mb-2 text-sm font-medium ${
                    videoErrors.visitDate?.message
                      ? "text-red-700 dark:text-red-500"
                      : ""
                  } `}
                >
                  Date
                </label>
                <Controller
                  className="w-full"
                  control={videoControl}
                  name="visitDate"
                  render={({ field: { onChange, name, value } }) => (
                    <DatePicker
                      style={{
                        width: "100%",
                        boxSizing: "border-box",
                      }}
                      containerStyle={{
                        width: "100%",
                      }}
                      calendarPosition="bottom-center"
                      value={value || ""}
                      onChange={(date) => {
                        onChange(date?.isValid ? date : "");
                      }}
                      render={
                        <CustomMultipleInput
                          placeholder={"Select Time"}
                          errors={videoErrors?.visitDate?.message}
                        />
                      }
                    />
                  )}
                />
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {videoErrors.visitDate?.message}
                </p>
              </div>
              <div>
                <label
                  htmlFor="username-error"
                  className={`block mb-2 text-sm font-medium ${
                    videoErrors.visitTime?.message
                      ? "text-red-700 dark:text-red-500"
                      : ""
                  } `}
                >
                  Time
                </label>
                <Controller
                  className="w-full"
                  control={videoControl}
                  name="visitTime"
                  render={({ field: { onChange, name, value } }) => (
                    <DatePicker
                      disableDayPicker
                      format="HH:mm:A"
                      plugins={[<TimePicker hideSeconds />]}
                      style={{
                        width: "100%",
                        boxSizing: "border-box",
                      }}
                      containerStyle={{
                        width: "100%",
                      }}
                      calendarPosition="bottom-center"
                      value={value || ""}
                      onChange={(date) => {
                        onChange(date?.isValid ? date : "");
                      }}
                      render={
                        <CustomMultipleInput
                          placeholder={"Select Time"}
                          errors={videoErrors?.visitTime?.message}
                        />
                      }
                    />
                  )}
                />
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {videoErrors.visitTime?.message}
                </p>
              </div>
              {/* <input type="submit" /> */}
              <div className="flex gap-2 justify-end mt-3">
                <Button type="submit" fullWidth color="primary">
                  Submit
                </Button>
              </div>
            </form>
          </Tab>
        </Tabs>
      </div>
      <div class="lg:hidden block fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        <Modal size="full" isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Schedule a tour
                </ModalHeader>
                <ModalBody>
                <Tabs
          fullWidth
          size="md"
          aria-label="Tabs form"
          selectedKey={selected}
          onSelectionChange={setSelected}
        >
          <Tab key="physicalvisit" title="Physical Visit">
            <form
              onSubmit={handlePhysicalSubmit(onSubmitphysicalVisit)}
              className="flex flex-col  gap-4"
            >
              <div>
                <label
                  htmlFor="username-error"
                  className={`block mb-2 text-sm font-medium ${
                    physicalErrors.visitDate?.message
                      ? "text-red-700 dark:text-red-500"
                      : ""
                  } `}
                >
                  Date
                </label>
                <Controller
                  className="w-full"
                  control={physicalControl}
                  name="visitDate"
                  render={({ field: { onChange, name, value } }) => (
                    <DatePicker
                      style={{
                        width: "100%",
                        boxSizing: "border-box",
                      }}
                      containerStyle={{
                        width: "100%",
                      }}
                      calendarPosition="bottom-center"
                      value={value || ""}
                      onChange={(date) => {
                        onChange(date?.isValid ? date : "");
                      }}
                      render={
                        <CustomMultipleInput
                          placeholder={"Select Time"}
                          errors={physicalErrors?.visitDate?.message}
                        />
                      }
                    />
                  )}
                />
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {physicalErrors.visitDate?.message}
                </p>
              </div>
              <div>
                <label
                  htmlFor="username-error"
                  className={`block mb-2 text-sm font-medium ${
                    physicalErrors.visitTime?.message
                      ? "text-red-700 dark:text-red-500"
                      : ""
                  } `}
                >
                  Time
                </label>
                <Controller
                  className="w-full"
                  control={physicalControl}
                  name="visitTime"
                  render={({ field: { onChange, name, value } }) => (
                    <DatePicker
                      disableDayPicker
                      format="HH:mm:A"
                      plugins={[<TimePicker hideSeconds />]}
                      style={{
                        width: "100%",
                        boxSizing: "border-box",
                      }}
                      containerStyle={{
                        width: "100%",
                      }}
                      calendarPosition="bottom-center"
                      value={value || ""}
                      onChange={(date) => {
                        onChange(date?.isValid ? date : "");
                      }}
                      render={
                        <CustomMultipleInput
                          placeholder={"Select Time"}
                          errors={physicalErrors?.visitTime?.message}
                        />
                      }
                    />
                  )}
                />
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {physicalErrors.visitTime?.message}
                </p>
              </div>
              <div className="flex gap-2 justify-end mt-3">
                <Button type="submit" fullWidth color="primary">
                  Submit
                </Button>
              </div>
            </form>
          </Tab>
          <Tab key="video-conference" title="Video Conference">
            <form
              onSubmit={handleVideoSubmit(onSubmitvideoConference)}
              className="flex flex-col  gap-4"
            >
              <div>
                <label
                  htmlFor="username-error"
                  className={`block mb-2 text-sm font-medium ${
                    videoErrors.visitDate?.message
                      ? "text-red-700 dark:text-red-500"
                      : ""
                  } `}
                >
                  Date
                </label>
                <Controller
                  className="w-full"
                  control={videoControl}
                  name="visitDate"
                  render={({ field: { onChange, name, value } }) => (
                    <DatePicker
                      style={{
                        width: "100%",
                        boxSizing: "border-box",
                      }}
                      containerStyle={{
                        width: "100%",
                      }}
                      calendarPosition="bottom-center"
                      value={value || ""}
                      onChange={(date) => {
                        onChange(date?.isValid ? date : "");
                      }}
                      render={
                        <CustomMultipleInput
                          placeholder={"Select Time"}
                          errors={videoErrors?.visitDate?.message}
                        />
                      }
                    />
                  )}
                />
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {videoErrors.visitDate?.message}
                </p>
              </div>
              <div>
                <label
                  htmlFor="username-error"
                  className={`block mb-2 text-sm font-medium ${
                    videoErrors.visitTime?.message
                      ? "text-red-700 dark:text-red-500"
                      : ""
                  } `}
                >
                  Time
                </label>
                <Controller
                  className="w-full"
                  control={videoControl}
                  name="visitTime"
                  render={({ field: { onChange, name, value } }) => (
                    <DatePicker
                      disableDayPicker
                      format="HH:mm:A"
                      plugins={[<TimePicker hideSeconds />]}
                      style={{
                        width: "100%",
                        boxSizing: "border-box",
                      }}
                      containerStyle={{
                        width: "100%",
                      }}
                      calendarPosition="bottom-center"
                      value={value || ""}
                      onChange={(date) => {
                        onChange(date?.isValid ? date : "");
                      }}
                      render={
                        <CustomMultipleInput
                          placeholder={"Select Time"}
                          errors={videoErrors?.visitTime?.message}
                        />
                      }
                    />
                  )}
                />
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                  {videoErrors.visitTime?.message}
                </p>
              </div>
              {/* <input type="submit" /> */}
              <div className="flex gap-2 justify-end mt-3">
                <Button type="submit" fullWidth color="primary">
                  Submit
                </Button>
              </div>
            </form>
          </Tab>
        </Tabs>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Action
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
        {/* <div class="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
          <button
            type="button"
            class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <svg
              class="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            <span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Home
            </span>
          </button>
          <button
            type="button"
            class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <svg
              class="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M11.074 4 8.442.408A.95.95 0 0 0 7.014.254L2.926 4h8.148ZM9 13v-1a4 4 0 0 1 4-4h6V6a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1v-2h-6a4 4 0 0 1-4-4Z" />
              <path d="M19 10h-6a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1Zm-4.5 3.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2ZM12.62 4h2.78L12.539.41a1.086 1.086 0 1 0-1.7 1.352L12.62 4Z" />
            </svg>
            <span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Wallet
            </span>
          </button>
          <button
            type="button"
            class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <svg
              class="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"
              />
            </svg>
            <span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Settings
            </span>
          </button>
          <button
            type="button"
            class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
          >
            <svg
              class="w-5 h-5 mb-2 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            <span class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
              Profile
            </span>
          </button>
        </div> */}
        <div className="flex justify-between items-center">
          <div>
            <p className="pl-5 text-lg font-semibold text-black lg:text-xl sm:px-16 xl:px-48 dark:text-white">
              Schedule a tour now
            </p>
          </div>
          <div>
            <Button
              class="bg-black rounded-lg text-white text-md text-center self-center px-3 py-2 my-2 mx-2"
              onPress={onOpen}
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;

function CustomMultipleInput({ onFocus, value, placeholder, errors }) {
  return (
    <input
      onFocus={onFocus}
      value={value}
      readOnly
      className={`block p-2.5 w-full text-sm rounded-lg border ${
        errors
          ? "dark:bg-red-100 dark:border-red-400 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500 bg-red-50"
          : "text-gray-900 bg-gray-50 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      }`}
      placeholder={placeholder}
    />
  );
}
