import React from "react";
import { Tabs, Tab, Button } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/analog_time_picker";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PhysicalVisitServer, VideoConferenceServer } from "../../../../server";
const ScheduleComponent = ({ id, Data }) => {
  const [selected, setSelected] = React.useState("login");
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
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
  const {
    handleSubmit: handlePhysicalSubmit,
    control: physicalControl,
    formState: physicalFormState,
    reset: resetPhysicalForm,
  } = useForm({
    resolver: yupResolver(physicalVisitSchema),
    mode: "all",
  });
  const { errors: physicalErrors } = physicalFormState;

  // For Video Conference form
  const {
    handleSubmit: handleVideoSubmit,
    control: videoControl,
    formState: videoFormState,
    reset: resetVideoForm,
  } = useForm({
    resolver: yupResolver(videoConferenceSchema),
    mode: "all",
  });
  const { errors: videoErrors } = videoFormState;

  const onSubmitphysicalVisit = async (data) => {
    if (isAuthenticated) {
      try {
        const datas = { ...data, id: id, userid: user?.user?._id };
        const serverResponse = await axios.post(
          `${PhysicalVisitServer}/add`,
          datas
        );
        if (serverResponse.data.success) {
          toast.success(
            "Your booking for physical visit has been done successfully!"
          );
          resetPhysicalForm();
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("You need to login first!");
      navigate("/login");
    }
  };
  const onSubmitvideoConference = async (data) => {
    if (isAuthenticated) {
      try {
        const datas = { ...data, id: id, userid: user?.user?._id };
        const serverResponse = await axios.post(
          `${VideoConferenceServer}/add`,
          datas
        );
        console.log(serverResponse.data.success);
        if (serverResponse.data.success) {
          toast.success(
            "Your booking for video conference has been done successfully!"
          );
          resetVideoForm();
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("You need to login first!");
      navigate("/login");
    }
  };
  return (
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
            <Button
              type="submit"
              fullWidth
              color="primary"
              isDisabled={
                Data?.landlord_id?._id && user?.user?._id ? (Data?.landlord_id?._id === user?.user?._id ? true : false) : false
              }
            >
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
            <Button
              type="submit"
              fullWidth
              color="primary"
              isDisabled={
                Data?.landlord_id?._id && user?.user?._id ? (Data?.landlord_id?._id === user?.user?._id ? true : false) : false
              }
            >
              Submit
            </Button>
          </div>
        </form>
      </Tab>
    </Tabs>
  );
};

export default ScheduleComponent;

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
