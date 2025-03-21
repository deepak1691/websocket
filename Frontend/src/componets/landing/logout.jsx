import React, { useEffect, useState } from 'react'

import { useAuth } from "../ContextApi";
import { Navigate } from 'react-router-dom';

export default function Logout() {
    const[redirect,setRedirect]=useState(false);
const {logoutUser}=useAuth();

useEffect(()=>{
    logoutUser();
    setRedirect(true);
},[logoutUser]);

 if(redirect){
    return <Navigate to="/"/>
 }
}


