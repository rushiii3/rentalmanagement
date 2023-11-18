import React, { useState } from 'react';
import ChatbotChatting from './ChatbotChatting';
const ChatDesign = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };
  return (
    <div className="fixed right-6 bottom-6 group z-50">
      
      <div
        id="speed-dial-menu-click"
        className={`flex flex-col items-center ${isMenuOpen ? 'block transition-all duration-500' : 'hidden'} mb-4 space-y-2`}
      >
       
        <ChatbotChatting />

      </div>


      {/* Menu Toggle Button */}
      <button
        type="button"
        data-dial-toggle="speed-dial-menu-click"
        data-dial-trigger="click"
        aria-controls="speed-dial-menu-click"
        aria-expanded={isMenuOpen}
        onClick={toggleMenu}
        name='ChatBotButton'
        className="flex items-center justify-center ms-auto  text-white bg-white rounded-full w-14 h-14 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800 ring-blue-800"
      >
        <img src="https://s3.ap-south-1.amazonaws.com/custpostimages/sb_images/loading.gif" alt=""  className='w-14 h-14'/>
      </button>
    </div>
  )
}

export default ChatDesign
