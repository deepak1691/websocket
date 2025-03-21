import React, { useEffect } from 'react'
import { useSocketContext } from './SocketContext'
import useConversation from '../componets/zustand/conversation';

const useGetSocketMessage=()=> {
    const{socket}=useSocketContext();
    const{message,setMessage}=useConversation();

    useEffect(()=>{
      socket.on("newMessage",(newMessage)=>{
        // console.log("newMessage",newMessage);
        
        setMessage([...message,newMessage]);
      });
      return()=>{
        socket.off("newMessage");
      };
    },[socket,message,setMessage])
}

export default useGetSocketMessage;
