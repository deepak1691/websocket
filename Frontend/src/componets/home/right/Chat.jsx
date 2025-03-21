import React from 'react';
import { useAuth } from '../../ContextApi';
import useConversation from '../../zustand/conversation';

export default function Chat({message}) {
  // console.log(message);
  const{user1,send}=useAuth();
  const{selectedConversation}=useConversation();

  if(user1._id===message.senderId){
    return(
      <div>
        <div className="chat chat-end pe-3">
     <div className="chat-image avatar">
     <div className={`avatar avatar-placeholder ps-2`} >
               <div className="bg-neutral text-neutral-content w-8 rounded-full">
                <span className="text-xl">{send}</span>
                </div>
        </div>
  </div>
  <div className="chat-bubble bg-slate-300">{message.message}</div>

</div>
      </div>
    )
  }
  return (
    <div>
      <div className="chat chat-start ps-3">
     <div className="chat-image avatar">
    {/* <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    </div> */}
     <div className={`avatar avatar-placeholder  ps-2`} >
               <div className="bg-neutral text-neutral-content w-8 rounded-full">
                <span className="text-xl">{selectedConversation.username.charAt(0).toUpperCase()}</span>
                </div>
        </div>
  </div>
  <div className="chat-bubble">{message.message}</div>
</div>


    </div>
  )
}
