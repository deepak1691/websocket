import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../componets/ContextApi";
import io from 'socket.io-client';

const SocketContext=createContext();

export const SocketProvider=({children})=>{
    const {user1}=useAuth();


    const[socket,setSocket]=useState(null);
    const[onlineUser,setOnlineUser]=useState([]);

    useEffect(()=>{
        if(user1){
            const socket=io("http://localhost:3000",
                {
                    query:{
                        userId:user1._id
                    }
                }
            )
            setSocket(socket);
            socket.on("online-user",(users)=>{
                setOnlineUser(users);
            });
            return ()=>socket.close();
        }else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
          
    },[user1])
return(
    <SocketContext.Provider value={{socket,onlineUser}}>
            {children}
    </SocketContext.Provider>
)

}

export const useSocketContext=()=>{
    return useContext(SocketContext);
}