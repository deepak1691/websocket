import React, { useEffect, useState } from 'react';
import Profile from './Profile';
import { useAuth } from '../../ContextApi';



export default function () {
 const[search,setSearch]=useState("");
  const{data,isLoading}=useAuth();

let Data=data.filter((crr)=>
  crr.username.toLowerCase().includes(search.toLowerCase()));
// console.log(Data);



return (
  <>

<div className=''>
      <form className='  bg-white ps-1' >
      <label className=" input mt-1.5">
       <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
       <input type="search" className="grow outline-0 " placeholder="Search" value={search} onChange={(e)=>setSearch(e.target.value)}/>
      </label>
      </form>
       
  </div>

<div className='flex-fl overflow-y-auto ' style={{maxHeight:"calc(89vh-11vh )",minHeight:"calc(89vh - 11vh)"}}>


  <h1 className='ps-3  text-slate-400 mt-6'>Messages........</h1>
    {
     Data.length>0?(
      Data.map((crr,indx)=>{
        return <Profile key={indx} username={crr}/>
      })
     ):(<>
     <p className='text-center mt-7 text-red-300 font-semibold'>No User Found.....</p>
     </>)
    }
 
  </div>
  </>
)
}
