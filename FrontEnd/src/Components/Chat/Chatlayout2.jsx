import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ChatServer } from "../../server";
const ChatLayout2 = () => {
  const { user } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");
  const [socket, setSocket] = useState(null);

  const getChatUser = async() => {
    console.log(user);
    if(user?.user?._id)
    {
      try {
        const { data } = await axios.get(
          `${ChatServer}/getChat/${user?.user?._id}`
        );
        // setDisplayUsers(data);
        console.log(data)
      } catch (error) {
          console.log(error);
      }
    }
    
  };

  useEffect(() => {
    getChatUser();
  }, [user]);

  const sendMessage = () => {
    if (socket) {
      socket.emit("message", message);
      setMessage("");
    } else {
      console.error("Socket connection not available");
    }
  };

  return (
    <div>
      <h1>Socket.IO Example</h1>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
      <p>Received message: {receivedMessage}</p>
      <div className="flex flex-col h-screen">
        <div className="fixed top-16 w-full bg-green-400 h-16 pt-2 text-white flex justify-between shadow-md">
          <a href="/chat" className="ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-12 h-12 my-1 text-green-100"
            >
              <path
                className="text-green-100 fill-current"
                d="M9.41 11H17a1 1 0 0 1 0 2H9.41l2.3 2.3a1 1 0 1 1-1.42 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.42 1.4L9.4 11z"
              />
            </svg>
          </a>
          <div className="my-3 text-green-100 font-bold text-lg tracking-wide">
            @rallipi
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="icon-dots-vertical w-8 h-8 mt-2 mr-2"
          >
            <path
              className="text-green-100 fill-current"
              fillRule="evenodd"
              d="M12 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
            />
          </svg>
        </div>

        <div className="mt-20 mb-16">
          <div className="clearfix">
            <div className="bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-lg">
              this is a basic mobile chat layout, build with tailwind css
            </div>
          </div>

          <div className="clearfix">
            <div className="bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-lg clearfix">
              It will be used for a full tutorial about building a chat app with
              vue, tailwind and firebase.
            </div>
          </div>
          <div className="clearfix">
            <div className="bg-green-300 float-right w-3/4 mx-4 my-2 p-2 rounded-lg clearfix">
              check my twitter to see when it will be released.
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 w-full flex justify-between bg-green-100">
          <textarea
            className="flex-grow m-2 py-2 px-4 mr-1 rounded-full border border-gray-300 bg-gray-200 resize-none outline-none"
            rows="1"
            placeholder="Message..."
          ></textarea>
          <button className="m-2 outline-none">
            <svg
              className="w-12 h-12 py-2 mr-2 text-green-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout2;
