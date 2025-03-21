import express from 'express';
import { connectionDB } from './DB/connection.js';
import userRoute from './routes/user.route.js';
import messageRoute from './routes/message.route.js';
import cors from "cors";
import { app,server } from './Socketio/server.js';
import { errorMid } from './middleware/error.js';



app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors({
    origin:"*",
    methods:["GET","POST"],
    credentials:true
}));

const PORT=process.env.PORT||3000;

app.use("/api/user",userRoute);
app.use("/api/message",messageRoute);

app.get("/",(req,res)=>{
    res.send("hello");
})


const start=()=>{
    connectionDB();
    server.listen(PORT,()=>{
    console.log(`app is listing ${PORT}`);
    });
}

start();
app.use(errorMid);