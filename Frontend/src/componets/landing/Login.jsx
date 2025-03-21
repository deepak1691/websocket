import React, {  useState } from 'react';
import {useAuth} from "../ContextApi";
import { Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';


export default function Login() {
    const[redirect,setRedirect]=useState(false);

    const {storeTokenLocal,checkLogin}=useAuth();

    const[data,setData]=useState({
        email:"",
        password:""
    });

    const handleChange=(e)=>{
        let{name,value}=e.target;
        setData({...data,[name]:value})
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch(`${import.meta.env.VITE_URL}user/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        });
        const result=await response.json();
        if(response.ok){
            storeTokenLocal(result.token);
        setData({
         email:"",
        password:""
        });
        toast.success(result.message);
        setRedirect(true)
        }else{
            toast.error(result.message)
        }
       
       
    }


    if(redirect){
        // console.log("checkLogin",redirect);
        return  <Navigate to="/chat"/>
    }
   
  return (
    <>

        <form onSubmit={handleSubmit} >

            <label htmlFor="email"  >Email</label><br />
            <input type="email" name="email" id="email" placeholder='Enter your email'
             className='w-[70%] px-3 py-1 border rounded-md outline-none mt-1 mb-3' value={data.email} onChange={handleChange}/><br />

            <label htmlFor="password" >Password</label><br />
            <input type="password" name="password" id="password" placeholder='Enter your password'
             className='w-[70%] px-3 py-1 border rounded-md outline-none mt-1' value={data.password} onChange={handleChange}/><br />

            <button className='btn  btn-neutral mt-3 px-5'>Login</button>
        </form>

    </>
  )
}
