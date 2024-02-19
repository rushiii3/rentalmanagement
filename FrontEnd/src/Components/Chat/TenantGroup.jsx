import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0'); // Get hours and pad with leading zero if needed
    const minutes = now.getMinutes().toString().padStart(2, '0'); // Get minutes and pad with leading zero if needed
    return `${hours}:${minutes}`;
  };
const socket = io("http://localhost:3500");
const TenantGroup = () => {
  const { user } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    // Scroll to the bottom when the component initially loads
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, []);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    const lastMessage = chatContainerRef.current.lastElementChild;
    if (lastMessage) {
      lastMessage.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {

    // Listen for incoming group messages
    socket.on("group-message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      scrollToBottom()
    });

    // Clean up when component unmounts
    return () => {
      socket.off("group-message");
    };
  }, []);
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents default form submission
      sendMessage();
    }
  };
  const sendMessage = () => {
    if (message) {
        const data = {
            username : `${user?.user?.firstname} ${user?.user?.lastname}`, 
            profile : user?.user?.imgurl ,
            message:message,
            id:user?.user?._id,
            time:getCurrentTime()
        }
        scrollToBottom()
      socket.emit("chat-message", data);
      setMessage("");
    }
  };
  return (
    <div className="relative">
      <div class="flex-1 p-3 w-full justify-between flex flex-col  h-[calc(100vh-4.05rem)] ">
        <div class="flex sm:items-center justify-between pb-3 border-b-2 border-gray-200">
          <div class="relative flex items-center space-x-4">
            <span class="text-gray-700 mr-3 text-xl">Group Chatting</span>
          </div>
        </div>
        <div
          id="messages"
          class="flex flex-col space-y-4 p-3 overflow-y-auto "
          ref={chatContainerRef}
        >
          {messages.map((msg, index) => (
            <>
              {msg.id !== user?.user?._id ? (
                <div class="chat-message" key={index}>
                  <div class="flex items-start gap-2.5 my-3">
                    <img
                      class="w-8 h-8 rounded-full"
                      src={msg.profile}
                      alt="Jese image"
                    />
                    <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                      <div class="flex items-center space-x-2 rtl:space-x-reverse">
                        <span class="text-sm font-semibold text-gray-900 dark:text-white">
                          {msg.sender}
                        </span>
                        <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                          {msg.time}
                        </span>
                      </div>
                      <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div class="chat-message" key={index}>
                  <div class="flex items-start gap-2.5 my-3 ms-auto justify-end">
                    
                    <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-blue-500 rounded-s-xl rounded-s-xl dark:bg-blue-700">
                      <div class="flex items-center space-x-2 rtl:space-x-reverse">
                        <span class="text-sm font-semibold  text-white">
                        {msg.sender}
                        </span>
                        <span class="text-sm font-normal  text-white">
                        {msg.time}
                        </span>
                      </div>
                      <p class="text-sm font-normal py-2.5 text-white">
                        {msg.message}
                      </p>
                    </div>

                    <img
                      class="w-8 h-8 rounded-full"
                      src={msg.profile}
                      alt="Jese image"
                    />
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
        <div class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0 flex">
          <input
            type="text"
            placeholder="Message"
            class="block w-full py-3 px-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700"
            name="message"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            required
            onKeyPress={handleKeyPress}
          />

          <button type="submit" onClick={sendMessage}>
            <svg
              class="w-5 h-5 text-gray-500 origin-center transform rotate-90"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TenantGroup;
