import React, { useEffect } from "react";
import { VideoSDKMeeting } from "@videosdk.live/rtc-js-prebuilt";

const VideoConference = () => {
    let meetingId =  'xxxxyxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    console.log("http://"+ window.location.host + "?meetingId="+ meetingId)
    useEffect(() => {
        const config = {
            joinScreen: {
                visible: true,
                title: "Daily scrum",
                meetingUrl: "customURL.com",
              },
          name: "Demo User",
          meetingId: "milkyway",
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
            imageUrl: "<imageUrl || lottieUrl>",
            text: "Connecting to the meeting...",
          },
          permissions: {
            endMeeting: true,
            removeParticipant: true,
            askToJoin: false,
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
    
          /*
    
         Other Feature Properties
          
          */
        };
    
        const meeting = new VideoSDKMeeting();
        meeting.init(config);
      }, []);
  return (
    <div></div>
  )
}

export default VideoConference
