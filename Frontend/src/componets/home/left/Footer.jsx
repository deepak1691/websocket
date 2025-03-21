import React from 'react';
import { CiLogout } from "react-icons/ci";
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../ContextApi';

export default function () {
  let{user1,send,checkLogin}=useAuth();
  // console.log(checkLogin);
  // console.log(send);
  

  return (
    <div className='h-[11vh]'>

      <div className={`avatar ${checkLogin?"avatar-online":"avatar-offline"} avatar-placeholder hover:cursor-pointer ps-2`} title={user1.username}>
               <div className="bg-neutral text-neutral-content w-8 rounded-full">
                <span className="text-xl">{send}</span>
                </div>
        </div>

        <div className='text-2xl ps-2 pt-2 hover:cursor-pointer' title='logout'>
            <NavLink to="/logout"><CiLogout/></NavLink>
          
        </div>
       
    </div>
  )
}

