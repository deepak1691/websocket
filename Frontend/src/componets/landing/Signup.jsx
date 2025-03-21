import React, { useEffect, useState } from 'react'
import { useAuth } from '../ContextApi';
import { Link, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Login from './Login';
import toast from 'react-hot-toast';





export default function Signup() {
     const[redirect,setRedirect]=useState(false);

    const {storeTokenLocal,checkLogin}=useAuth();

    //signup 
    const[signupdata,setSignUpData]=useState({
        username:"",
        email:"",
        password:"",
    });

    const handleChangeSignup=(e)=>{
        let{name,value}=e.target;
        setSignUpData({...signupdata,[name]:value});
       
    }


    

    const handleSubmitSignup=async(e)=>{
        e.preventDefault();
        const response=await fetch(`${import.meta.env.VITE_URL}user/register`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(signupdata)
        });
        const result=await response.json();
        // console.log(result);
        
        if(response.ok){
          // console.log("res",response.ok);
          
           storeTokenLocal(result.token);
        setSignUpData({
          username:"",
          email:"",
          password:""
        })
        toast.success(result.message);
        setRedirect(true);
        
       return null;
        }else{
       toast.error(result.message);
       }
    }


if(redirect){  
return  <Navigate to="/chat"/>
}
   
  return (
    <div className=' py-2 test-style'>
      <h1 className='font-bold text-2xl text-center'>Sign Up</h1>
        <form onSubmit={handleSubmitSignup} className='text-center'>
 <Box
  sx={{ '& > :not(style)': { m: 1, width: '30ch' } }}
  noValidate
  autoComplete="off"
>
  <TextField
    id="outlined-basic"
    label="Username"
    variant="outlined"
    sx={{
      '& .MuiOutlinedInput-root': {
        height: 45, // Adjust the height here
       
      }  
    }}
    name="username" value={signupdata.username} onChange={handleChangeSignup}
   
  />
  

<TextField
          
          id="outlined-email-input"
          label="Email"
          type="email"
          autoComplete="current-email"
          sx={{
            '& .MuiOutlinedInput-root': {
              height: 45, // Adjust the height here
             padding:"10px "
            },   
          }}
          name="email"  value={signupdata.email} onChange={handleChangeSignup}
        />

<TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          sx={{
            '& .MuiOutlinedInput-root': {
              height: 45, // Adjust the height here
           
             
            }, 
          }}
          name="password"  value={signupdata.password} onChange={handleChangeSignup}
        />

  </Box>
  

  <Stack spacing={2} direction="row" sx={{
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
    width: "100%", // Ensure the Stack takes up the full width of the parent container
    marginTop:"2%"
  }}>
      <Button type='submit' variant="contained" sx={{backgroundColor:"#424242"}}>Signup</Button>
      
    </Stack>

        </form>
        <p className='ps-3 mt-2'>I have already an account <Link  className='text-blue-500 underline' onClick={()=>document.getElementById('my_modal_3').showModal()}>Login</Link></p>
       
    <dialog id="my_modal_3" className="modal">
     <div className="modal-box">
      <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <Login/>
  </div>
</dialog>
    </div>
  )
}

