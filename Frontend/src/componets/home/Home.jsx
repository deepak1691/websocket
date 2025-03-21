import React, { useState } from 'react';
import Left from './left/Left';
import Right from './right/Right';
import { useAuth } from '../ContextApi';
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';


export default function Home() {
  const { checkLogin } = useAuth();
  const [isLeftVisible, setIsLeftVisible] = useState(false); // State to toggle Left component visibility

  if (!checkLogin) {
    toast.error("You are not LoggedIn!!");
    return <Navigate to="/" />;
  }

  // Toggle the visibility of Left component
  const toggleLeftVisibility = () => {
    setIsLeftVisible(!isLeftVisible);
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Left component */}
      <div
        className={`w-full md:w-[25%] md:ms-0 transition-all duration-300 ease-in-out ${
          isLeftVisible ? 'block z-20' : 'hidden md:block' // Hide Left on mobile screens, show on toggle
        }`}
      >
        <Left />
      </div>

      {/* Right component */}
      <div className="w-full md:w-[75%] ">
        <Right />
      </div>

      {/* Toggle Button for mobile */}
      <button
        className="fixed top-4 left-4 md:hidden z-20 p-2 bg-blue-500 text-white rounded-full"
        onClick={toggleLeftVisibility}
      >
        {/* Change the icon or text as you prefer */}
        {isLeftVisible ? 'Close' : 'Open'}
      </button>
    </div>
  );
}
