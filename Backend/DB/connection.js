import mongoose from "mongoose";

export const connectionDB=async()=>{
  await mongoose.connect(process.env.DB_URL);
    console.log("DB is connected");
    
}