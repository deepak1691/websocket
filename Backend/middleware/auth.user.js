
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

export const authMiddleware=async(req,res,next)=>{
    const token=req.header("Authorization");
    //  console.log("token",token);
    if (!token) {
        return res.status(401).json({message: "Token not provided" });
      }
     
      
    const verifiedToken=token.replace("Bearer","").trim();
    // console.log(verifiedToken);
    
    if (!verifiedToken) {
        return res.status(401).json({message: "Invalid token" });
      }
  try {
    const decodedToken=jwt.verify(verifiedToken,process.env.JWT_SECRET_KEY);
    const userData1 = await User.findOne({email:decodedToken.email}).select({ password: 0 });
    const userData = await User.find({email:{$nin:decodedToken.email}}).select({ password: 0 });
    req.user=userData;
    req.userData1=userData1;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);

  }
    
}