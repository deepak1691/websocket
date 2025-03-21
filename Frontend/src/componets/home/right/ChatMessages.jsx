import React, { useEffect, useRef } from 'react'
import Chat from './Chat';
import useGetMessages from '../../useGetMessages.js';
import Loading from '../../loading.jsx';
import useGetSocketMessage from '../../../context/useGetSocketMessage.js';

export default function ChatMessages() {
  const{message,loading}=useGetMessages();

  //listning incoming
 useGetSocketMessage();
  // console.log( useGetSocketMessage());
  

  const lastMsgRef=useRef();
  useEffect(()=>{
    setTimeout(()=>{
      if(lastMsgRef.current){
        lastMsgRef.current.scrollIntoView({behavior:"smooth"})
      }
    },100)
  },[message])
  
  return (
    <div className='flex-fl overflow-y-auto' style={{minHeight:"calc(92vh - 8vh)"}}>

    {loading?(<Loading/>):(message.length>0 && message.map((crr)=>(<div key={crr._id}  ref={lastMsgRef}><Chat  message={crr}/></div>)))}

     {loading || message.length===0 && (
      <div className='text-center mt-[10%]'>
      
       <img src="\hello-hi.gif" alt="hello-hi" className='h-30 ms-[42%]'/>
      <p >  Say! hii to start the conversation</p> 
      </div>
     )
     }
      
    </div>
  )
}
