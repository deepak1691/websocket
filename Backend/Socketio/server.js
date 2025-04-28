import { Server } from "socket.io";
import http from 'http';
import express from 'express';

const app=express();

const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:"https://webchat-92vs.onrender.com",
        methods:["GET","POST"]
    }
});

//realtime message 
export const getRecevierSocketId=(reciverId)=>{
    return users[reciverId]
}

const users={}

io.on("connection",(socket)=>{
    console.log("user connected",socket.id);
    const userId=socket.handshake.query.userId;
    if(userId){
        users[userId]=socket.id;
        console.log("hello user",users);
        
    }

    io.emit("online-user",Object.keys(users))

    socket.on("disconnect",()=>{
        console.log("disconnected user",socket.id);
        delete users[userId];
        io.emit("online-user",Object.keys(users))
    });
    
});

export{app,io,server}