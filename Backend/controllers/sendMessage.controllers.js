import { Converstion } from "../models/converstion.model.js";
import {Message} from "../models/message.model.js";
import { getRecevierSocketId } from "../Socketio/server.js";
import { io } from "../Socketio/server.js";

export const sendMessage=async(req,res)=>{
    try {
        // console.log("reciver id",req.params.id);
        
        const receiverId=req.params.id;
        const{message}=req.body;
        const senderId=req.userData1._id;
        // console.log("sender id",senderId);
        let converstion=await Converstion.findOne({
            members:{$all:[senderId,receiverId]}
        });
        if(!converstion){
            converstion=await Converstion.create({
                members:[senderId,receiverId],
            });
        }
        
        const newMessage=await Message({
            senderId,
            receiverId,
            message
        });

        if(newMessage){
            converstion.messages.push(newMessage._id);
        }

     await Promise.all([newMessage.save(),converstion.save()]);

     //send reciverid to connect a real time 
     const receiverSocketId=getRecevierSocketId(receiverId);

     if(receiverSocketId){
        io.to(receiverSocketId).emit("newMessage",newMessage)
     }

      res.status(200).json(newMessage);
    } catch (error) {
        console.log(error);
        
    }
}


//! get messages

export const getMessage=async(req,res)=>{
    try {
        
        const receiverId=req.params.id;
        const senderId=req.userData1._id;
        let converstion=await Converstion.findOne({
            members:{$all:[senderId,receiverId]}
        }).populate("messages");
        if(!converstion){
          return res.status(201).json([]);
        }
        const getMessages=converstion.messages;
       res.status(200).json(getMessages)
    } catch (error) {
       console.log(error);
        
    }
}