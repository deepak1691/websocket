import React, { useEffect, useState } from 'react';
import useConversation from './zustand/conversation.js';
import { useAuth } from './ContextApi.jsx';

const useGetMessages = () => {
  const{isLoggedIn}=useAuth();
  const [loading, setLoading] = useState(false);
  const { message, setMessage, selectedConversation } = useConversation();

  const getMessageData = async () => {
    
    try {
      // console.log("Fetching messages..."); // Log before fetch
    //  console.log(selectedConversation);
     
      if (selectedConversation && selectedConversation._id) {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_URL}message/get/${selectedConversation._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization":`Bearer ${isLoggedIn}`
          }
        });
        

        if (response.ok) {
          const data = await response.json();
          // console.log("message",message);
          // console.log("data",data);
          
          setMessage(data);
          setLoading(false);
        } else {
          console.error("API Error: ", response.status, response.statusText);
        }
      }
    } catch (error) {
      // console.error("Error fetching messages:", error); // Log any errors that occur during the fetch
    } finally {
      // Ensure that loading is set to false after fetching
    }
  };

  useEffect(() => {
    getMessageData();
  }, [selectedConversation]); // Only depend on selectedConversation

  return { message, loading };
};

export default useGetMessages;
