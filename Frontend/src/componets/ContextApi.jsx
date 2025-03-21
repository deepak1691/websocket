import { createContext, useContext, useEffect, useState } from "react"
import { Navigate } from "react-router-dom";

export const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const[isLoggedIn,setIsLoggedIn]=useState(localStorage.getItem("store"));
    const[data,setData]=useState([]);
    const[user1,setUser1]=useState("");
    const[send,setSend]=useState("");
    const[isLoading,setIsLoading]=useState(false);
    const checkLogin=!!isLoggedIn;


    const storeTokenLocal=(token)=>{
      setIsLoggedIn(token);
      return  localStorage.setItem("store",token);
    }

    const logoutUser=()=>{
        setIsLoggedIn("");
      return  localStorage.removeItem("store");
     
    }

//user data and jwt auth


  const getData=async()=>{
    if(!isLoggedIn) return;
   try {
    setIsLoading(true);
    const response=await fetch(`${import.meta.env.VITE_URL}user/users`,{
      method:"GET",
      headers:{
        "Authorization":`Bearer ${isLoggedIn}`
      }
    }); 
    if(response.ok){
      
      const result=await response.json();   
      setSend(result.user1.username[0].toUpperCase());
      
      setData(result.user);
     setUser1(result.user1);
     setIsLoading(false)
    }else{
      setIsLoading(false)
    }

   } catch (error) {
    console.log(error);
    
   }
    
  }


  useEffect(() => {
    if (isLoggedIn) {
      getData();
    } else {
      setIsLoading(false); // Set loading to false when not logged in
    }
  }, [isLoggedIn]);

  // console.log("check",checkLogin);
  

    return <AuthContext.Provider value={{storeTokenLocal,logoutUser,checkLogin,isLoggedIn,data,user1,send,isLoading}}>
            {children}
    </AuthContext.Provider>
}

export const useAuth=()=>{
    return useContext(AuthContext);
}