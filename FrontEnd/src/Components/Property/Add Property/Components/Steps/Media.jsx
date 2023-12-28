import axios from "axios";
import React, { useState } from "react";
import Resizer from "react-image-file-resizer";
import { motion as m } from "framer-motion";
import UploadSection from "./MediaComponents/UploadSection";
import ImageVideoCarousal from "./MediaComponents/ImageVideoCarousal";
import ImageVideoModal from "./MediaComponents/ImageVideoModal";
const Media = () => {
  const [ModelOpen, setModelOpen] = useState(false);
  const [ModalViewer, setModalViewer] = useState();
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
  const [UploadProgress, setUploadProgress] = React.useState(0);
  const [ImageVideoData, setImageVideoData] = useState([]);
  const CLOUD_NAME = "dmuhioahv";
  const UPLOAD_PRESET = "rtl8kav3";
  const uploadVideo = async (file) => {
    if (!file) {
      console.error("Please select a file.");
      return;
    }

    const uniqueUploadId = generateUniqueUploadId();
    const chunkSize = 5 * 1024 * 1024;
    const totalChunks = Math.ceil(file.size / chunkSize);
    let currentChunk = 0;

    const uploadChunk = async (start, end) => {
      const formData = new FormData();
      formData.append("file", file.slice(start, end));
      formData.append("cloud_name", CLOUD_NAME);
      formData.append("upload_preset", UPLOAD_PRESET);
      const contentRange = `bytes ${start}-${end - 1}/${file.size}`;

      console.log(
        `Uploading chunk for uniqueUploadId: ${uniqueUploadId}; start: ${start}, end: ${
          end - 1
        }`
      );

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
          formData,
          {
            headers: {
              "X-Unique-Upload-Id": uniqueUploadId,
              "Content-Range": contentRange,
              "Content-Type": "multipart/form-data", // Ensure proper content type for FormData
            },
            onUploadProgress: (progressEvent) => {
              const uploadedBytes = start + progressEvent.loaded;
              const overallProgress = (uploadedBytes / file.size) * 100;
              setUploadProgress(Math.round(overallProgress));
              if (Math.round(overallProgress) === 100) {
                setUploadProgress(0);
              }
              // You can update your UI with the overall progress percentage if needed
            },
          }
        );

        currentChunk++;

        if (currentChunk < totalChunks) {
          const nextStart = currentChunk * chunkSize;
          const nextEnd = Math.min(nextStart + chunkSize, file.size);
          uploadChunk(nextStart, nextEnd);
        } else {
          setImageVideoData((prevData) => [
            ...prevData,
            {
              url: response.data.secure_url,
              deleteToken: response.data.delete_token,
              publicKey: response.data.public_id,
              type: "video",
            },
          ]);
          console.info("File upload complete.");
        }
      } catch (error) {
        console.error("Error uploading chunk:", error);
      }
    };
    const start = 0;
    const end = Math.min(chunkSize, file.size);
    uploadChunk(start, end);
  };

  const generateUniqueUploadId = () => {
    return `uqid-${Date.now()}`;
  };
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "WEBP",
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });
  const deleteImage = async (token) => {
    try {
      const url = "https://api.cloudinary.com/v1_1/dmuhioahv/delete_by_token";

      // Delete the image data using the provided token
      await axios.post(url, { token });

      // Remove the deleted image data from the state
      setImageVideoData((prevData) =>
        prevData.filter((data) => data.deleteToken !== token)
      );
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const uploadImage = async (file) => {
    const image = await resizeFile(file);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "rtl8kav3");
    data.append("cloud_name", "dmuhioahv");

    // Axios configuration for file upload
    const config = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percentCompleted = Math.round((loaded * 100) / total);
        console.log("Upload Progress:", percentCompleted);
        // Update the state with the current upload progress if needed
        setUploadProgress(percentCompleted);
      },
    };

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dmuhioahv/image/upload",
        data,
        config // Pass the Axios config
      );
      setImageVideoData((prevData) => [
        ...prevData,
        {
          url: response.data.secure_url,
          deleteToken: response.data.delete_token,
          publicKey: response.data.public_id,
          type: "image",
        },
      ]);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setUploadProgress(0);
    }
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    // Get the MIME type of the file
    const fileType = file.type;

    // Check if the file type starts with 'image'
    if (fileType.startsWith("image")) {
      // It's an image file
      uploadImage(file);
    } else if (fileType.startsWith("video")) {
      // It's a video file
      uploadVideo(file);
    } else {
      // It's neither an image nor a video
      console.log("This is neither an image nor a video");
    }

    console.log(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;

    // Handle multiple files
    const resizedImages = [];
    for (const file of files) {
      const image = await resizeFile(file);
      resizedImages.push(image);
    }

    console.log("Dropped files:", resizedImages);
  };

  return (
    <>
      <m.div
        className="w-full p-4 items-start flex-col rounded-xl shadow-2xl lg:shadow-none text-left bg-white  transform -translate-y-20 max-w-full overflow-hidden md:p-8 md:mt-0 md:text-left  lg:transform-none md:max-w-full md:w-full"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <h1 className="text-2xl font-bold text-marine-blue mb-2 md:text-3xl md:mb-1">
          Media
        </h1>
        {/* <p className="text-cool-gray mb-4">
        Please provide your name, email address, and phone number.
      </p> */}
        <div className="mt-5">
          <h1 className="text-lg font-bold text-marine-blue mb-2 md:text-xl">
            Upload your property images & videos
          </h1>
          {/* upload */}
          <UploadSection UploadProgress={UploadProgress} handleDragOver={handleDragOver} handleDrop={handleDrop} handleFileChange={handleFileChange} />
          {/* image coursol */}
          <ImageVideoCarousal ImageVideoData={ImageVideoData} deleteImage={deleteImage} setModalViewer={setModalViewer} setModelOpen={setModelOpen}/>
        </div>

        <div>
          <ImageVideoModal ModelOpen={ModelOpen} setModelOpen={setModelOpen} ModalViewer={ModalViewer}/>
          </div>
      </m.div>
    </>
  );
};

export default Media;
