import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import axios from "axios";
import { ChatServer } from "../../server";
// import { server } from "../../server";
const ChatLayout = () => {
    const { user } = useSelector((state) => state.user);
  const [socket, setSocket] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");
  const [SelectedUserName, setSelectedUserName] = useState("");
  const [SelectedUserProfile, setSelectedUserProfile] = useState("");
  const chat = useSelector((state) => state.chat);
  const dispatch = useDispatch();



  const [DisplayUsers, setDisplayUsers] = useState([]);
  useEffect(() => {
    const newSocket = io("https://socketio-rental.onrender.com/");
    setSocket(newSocket);
    console.log(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, []);
  const getChatUser = async() => {
    console.log(user);
    if(user?.user?._id)
    {
      try {
        const { data } = await axios.get(
          `${ChatServer}/getChat/${user?.user?._id}`
        );
        setDisplayUsers(data);
        console.log(data)
      } catch (error) {
          console.log(error);
      }
    }
    
  };

  useEffect(() => {
    getChatUser();
  }, [user]);



  const handleUserClick = (parameters) => {
    console.log(parameters);
    const { userId, profile, username } = parameters;
    console.log(user.user._id);
    if (user) {
      console.log("Authenticating with username:", user.user._id);
      socket.emit("authenticate", user.user._id);
    }
    setSelectedUser(userId);
    setSelectedUserName(username);
    setSelectedUserProfile(profile);
  };
  const handleRemoveChat = () => {
    setSelectedUser("");
    dispatch({ type: "RemoveSelectedUser" });
  };

  return (
    <div className="h-screen w-screen flex flex-row fixed top-16  bottom-1">
    {/* person selector */}

    <div
      className={`w-screen md:w-[20%] md:block   bg-white border-r border-gray-300 ${
        selectedUser === "" ? "block" : "hidden"
      }`}
    >
      <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
        <h1 className="text-2xl font-semibold">Chat Web</h1>
      </header>

      <div className="overflow-y-auto h-screen p-3 mb-12 pb-32">
        {/* {chat?.selectedUser !== null || DisplayUsers.length === 0 ? (
          <p className="text-2xl font-semibold text-center my-40">
            No users
          </p>
        ) : (
          ""
        )} */}
        {chat?.selectedUser !== null ? (
          <div
            className={` ${
              chat?.selectedUser?.id === selectedUser
                ? "bg-indigo-600 text-white"
                : "hover:bg-gray-100 "
            }  flex  items-center mb-4 cursor-pointer  p-2 rounded-md `}
            onClick={() =>
                
              handleUserClick({
                userId: chat?.selectedUser?.id,
                profile: chat?.selectedUser?.profile,
                username: chat?.selectedUser?.username,
              })
            }
          >
            <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
              <img
                src={
                  chat?.selectedUser?.profile === null
                    ? chat?.selectedUser?.profile
                    : "https://media.tenor.com/HQx-ClEH6lYAAAAd/anime-demon-slayer.gif"
                }
                alt="User Avatar"
                className="w-12 h-12 rounded-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">
                {chat?.selectedUser?.username}
              </h2>
              {/* <p className={`${chat?.selectedUser===selectedUser?' text-white':'text-gray-600 '}`}>I just finished reading a great book! It was so captivating. </p> */}
            </div>
          </div>
        ) : (
          ""
        )}
        {DisplayUsers.map((values, keys) => {
          return (
            <div
              className={` ${
                values._id === selectedUser
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-gray-100 "
              }  flex  items-center mb-4 cursor-pointer  p-2 rounded-md `}
              onClick={() =>
                handleUserClick({
                  userId: values?._id,
                  profile: values?.avatar?.url,
                  username: `${values?.firstname} ${values?.lastname}`,
                })
              }
              key={keys}
            >
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                <img
                  src={
                    values?.avatar?.url
                  }
                  alt={values?.avatar?.url}
                  className="w-12 h-12 rounded-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{values?.firstname} {values?.lastname}</h2>
                {/* <p
                  className={`${
                    values._id === selectedUser ? " text-white" : "text-gray-600 "
                  }`}
                >
                  I just finished reading a great book! It was so captivating.{" "}
                </p> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
    {/* chatting */}
    <div
      className={`md:block md:w-full w-screen ${
        selectedUser === "" ? "hidden" : "block"
      }`}
    >
      {selectedUser ? (
        <Chat
          user={selectedUser}
          userName={SelectedUserName}
          userProfile={SelectedUserProfile}
          removeChat={handleRemoveChat}
          socket={socket}
        />
      ) : (
        <div className="hidden md:block">
          <div className="flex  justify-center content-center items-center">
            <img
              className="h-auto max-w-lg mx-auto"
              src="https://img.freepik.com/free-vector/woman-boy-with-smartphone-chat-profile_24877-53913.jpg?w=1060&t=st=1698570000~exp=1698570600~hmac=423e7df0bcb24190e598f71d62c27868ec0fffdaad032f558592170fbad9a663"
              alt=""
            />
          </div>
          <p className="text-2xl font-semibold text-center">
            Select a user to start chatting.
          </p>
        </div>
      )}
    </div>
  </div>
  );
};

export default ChatLayout;