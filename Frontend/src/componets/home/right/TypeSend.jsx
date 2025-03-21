import React, {  useState } from 'react'
import { LuSendHorizontal } from "react-icons/lu";
import useConversation from '../../zustand/conversation.js';
import { useAuth } from '../../ContextApi';

export default function TypeSend() {
  const[inputMsg,setInputMsg]=useState("");
  const{selectedConversation,message,setMessage}=useConversation();
  const{isLoggedIn}=useAuth();

  const sendMessages=async()=>{
    const response=await fetch(`${import.meta.env.VITE_URL}message/send/${selectedConversation._id}`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${isLoggedIn}`
      },
      body:JSON.stringify({ message: inputMsg })
    });
    if(response.ok){
      const data=await response.json();
      setMessage([...message,data]);
    }
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    sendMessages();
    setInputMsg("");
  }


  return (
    <div>
      <form  className='flex justify-center h-[8vh] bg-gray-600' onSubmit={handleSubmit}>
      <input type="text" placeholder="Type here" name='message' className="border border-white bg-gray-300 rounded-xl mt-1.5 outline-none px-4 h-[80%] w-[70%]"
      value={inputMsg}
      onChange={(e)=>setInputMsg(e.target.value)}
      /> 
      <button className='text-3xl ms-1'><LuSendHorizontal/></button>
      </form>
       
    </div>
  )
}
