import React, { useEffect, useState } from "react";
import { VideoSDKMeeting } from "@videosdk.live/rtc-js-prebuilt";
import { useParams } from "react-router-dom";
import axios from "axios";
import { VideoConferenceServer } from "../../server";
import { useSelector } from "react-redux";
import Loader from "../Loader/loader";
import ErrorPage from "../Loader/ErrorPage";

const convertToUTC = () => {
  // Create a Date object from the input string
  const date = new Date();

  // Calculate the UTC timestamp by subtracting the timezone offset
  const utcTimestamp = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  );

  // Convert the UTC timestamp to ISO 8601 format
  const isoString = utcTimestamp.toISOString();

  return isoString;
};
const CompareDate = (date12, date22) => {
  const date1String = date12;
  const date2String = date22;

  const date1 = new Date(date1String);
  const date2 = new Date(date2String);

  const date1Year = date1.getUTCFullYear();
  const date1Month = date1.getUTCMonth();
  const date1Day = date1.getUTCDate();

  const date2Year = date2.getUTCFullYear();
  const date2Month = date2.getUTCMonth();
  const date2Day = date2.getUTCDate();

  if (
    date1Year === date2Year &&
    date1Month === date2Month &&
    date1Day === date2Day
  ) {
    return true;
  } else {
    return false;
  }
};
const VideoConference = () => {
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const [Error, setError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${VideoConferenceServer}/verify-video-conference/${id}`
        );
        if (data.success) {
          setLoading(false);
  
          if (data.verify.vc_status === "Accepted") {
            if (CompareDate(data.verify.vc_date, convertToUTC())) {
              if (
                data?.verify?.user_id === user?.user?._id ||
                data?.verify?.property_id?.landlord_id?._id
              ) {
                setError(false);
                const link =
                  "http://" + window.location.host + "/video-conference/" + id;
  
                const config = {
                  joinScreen: {
                    visible: true,
                    title: `${data.verify.property_id.landlord_id.firstname} ${data.verify.property_id.landlord_id.lastname} Video Conference`,
                    meetingUrl: `${link}`,
                  },
                  name: `${user?.user?.firstname} ${user?.user?.lastname}`,
                  meetingId: `${id}`,
                  apiKey: "402ae2fc-1e0c-463e-9aff-1aee2bfa6fb6",
                  participantCanLeave: true,
                  // redirectOnLeave: "https://www.youtube.com/",
                  containerId: null,
                  micEnabled: true,
                  webcamEnabled: true,
                  participantCanToggleSelfWebcam: true,
                  participantCanToggleSelfMic: true,
                  theme: "LIGHT",
                  chatEnabled: true,
                  screenShareEnabled: true,
                  waitingScreen: {
                    imageUrl: `https://lottie.host/e651a0a3-fcb5-4b18-af2b-242e89ac03ba/m9wPBquhsm.json`,
                    text: "Connecting to the meeting...",
                  },
                  permissions: {
                    endMeeting:
                      data?.verify?.property_id?.landlord_id?._id ===
                      user?.user?._id
                        ? true
                        : false,
                    removeParticipant:
                      data?.verify?.property_id?.landlord_id?._id ===
                      user?.user?._id
                        ? true
                        : false,
                    askToJoin:
                      data?.verify?.property_id?.landlord_id?._id ===
                      user?.user?._id
                        ? false
                        : true,
                    toggleParticipantWebcam: false,
                    toggleParticipantMic: false,
                    toggleParticipantScreenshare: false,
                  },
                  leftScreen: {
                    actionButton: {
                      label: "Video SDK",
                      href: "https://videosdk.live/",
                    },
                    rejoinButtonEnabled: true,
                  },
                };
                const meeting = new VideoSDKMeeting();
                meeting.init(config);
              } else {
                setError(true);
                setErrorMessage("You are not a part of this meeting!!")
              }
            } else {
              setError(true);
              setErrorMessage("Your Meeting date is not matched !!")
            }
          } else {
            setError(true);
            setErrorMessage("Your Meeting is not accepted yet!")
          }
        }
      } catch (error) {
        setError(true);
        setLoading(false);
        setErrorMessage(error.response.data.message)
      }
      
    };
    getData();
  }, []);
  return Loading ? <Loader /> : Error && Error === true ? (<ErrorPage message={ErrorMessage}/>) : <></>;
};

export default VideoConference;
