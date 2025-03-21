import React from 'react';
import { useAuth } from '../../ContextApi';
import useConversation from '../../zustand/conversation.js';
import { useSocketContext } from '../../../context/SocketContext.jsx';

export default function ({username}) {
  // console.log(username);
  
  const { selectedConversation, setSelectedConversation } = useConversation();
  
  const isSelected= selectedConversation?._id===username._id
  
  const{onlineUser,socket}=useSocketContext();
  // console.log(onlineUser);
  
const isOnline=onlineUser.includes(username._id);
  
  return (
    <div className={`${isSelected?"bg-slate-300 rounded":""}`} onClick={()=>setSelectedConversation(username)}>
          <div className='flex mt-4 ps-3 hover:bg-gray-300 transition duration-300 ease-in-out hover:rounded hover:cursor-pointer'>
          <div className={`avatar ${isOnline?"avatar-online":"avatar-offline"}`}>
           <div className="w-12 rounded-full">
          <img src="user.png"/>
            </div>
             </div>
             <div className='px-4'>
             <h1 className='font-bold'>{username.username[0].toUpperCase()+username.username.slice(1).toLowerCase()}</h1>
             <span>@{username.username.toLowerCase()}</span>
             </div>
       </div>
    </div>
  )
}
