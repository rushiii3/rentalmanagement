import React from "react";
import { CircularProgress } from "@nextui-org/react";
import { IoCloudUploadSharp } from "react-icons/io5";
const UploadSection = ({
  UploadProgress,
  handleDragOver,
  handleDrop,
  handleFileChange,
}) => {
  return (
    <div className="flex items-center justify-center w-full">
      {UploadProgress === 0 ? (
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <IoCloudUploadSharp className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />

            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              JPEG, PNG, JPG or WEBP
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
            Size of the video must be less than 50mb
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            accept="image/jpeg, image/png, image/webp, video/*, .mov, .mp4, .webm"
            onChange={handleFileChange}
          />
        </label>
      ) : (
        <CircularProgress
          color="success"
          classNames={{
            svg: "w-36 h-36 drop-shadow-md",
            indicator: "stroke-success",
            track: "stroke-white/10",
            value: "text-3xl font-semibold text-green-500",
          }}
          value={UploadProgress}
          strokeWidth={10}
          showValueLabel={true}
        />
      )}
    </div>
  );
};

export default UploadSection;
