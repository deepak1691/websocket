import React from 'react';
import useConversation from '../../zustand/conversation.js';
import { useSocketContext } from '../../../context/SocketContext.jsx';

export default function ChatHeader() {
  const{selectedConversation}=useConversation();
  // console.log(selectedConversation);

    const{onlineUser,socket}=useSocketContext();
    // console.log(onlineUser);
    
  const isOnline=onlineUser.includes(selectedConversation._id);
  
  return (
   <>
    <div className='flex justify-center bg-blue-50 h-[8vh] '>
        <div className={`avatar ${isOnline?"avatar-online":"avatar-offline"}`}>
         <div className="w-13 h-13 mt-0.5 rounded-full">
      <img src="\user.png"/>
        </div>
    </div>
    <div className='ps-3 pt-2'>
        <h1 className='font-bold'>{selectedConversation.username.charAt(0).toUpperCase()+selectedConversation.username.slice(1).toLowerCase()}</h1>
        <span>{isOnline?"online":"offline"}</span>
    </div>
    </div>
   </>
  )
}
