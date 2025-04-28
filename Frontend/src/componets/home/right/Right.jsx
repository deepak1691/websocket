import React, { useEffect } from 'react'
import ChatHeader from './ChatHeader'
import TypeSend from './TypeSend'
import ChatMessages from './ChatMessages'
import useConversation from '../../zustand/conversation.js'
import { useAuth } from '../../ContextApi.jsx'

export default function Right() {
  const{selectedConversation,setSelectedConversation}=useConversation();
  const{user1}=useAuth();
  useEffect(()=>{
    return setSelectedConversation(null)
  },[setSelectedConversation])
  return (
   <div >
    {!selectedConversation?(<div className='flex justify-center items-center h-screen '>
   <div className='text-center'>
   <img src="\hii logo.gif" alt="hii image" className='h-40 ms-[30%]'/>
   <p >"Hello! Welcome to <span className='font-semibold'>{user1.username}</span> We're happy to have you!" </p>
   </div>
      </div>):(
      
      <div className=' bg-stone-200'>
      <ChatHeader/>
      <div className='flex-fl overflow-y-auto' >
      <ChatMessages/>
      </div>
    
     
      <TypeSend/>
    </div>

    )}
   </div>
  )
}
