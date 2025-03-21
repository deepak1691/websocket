import { Schema,model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const userSchema=new Schema({
    username:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true
    },
    password:
    {
        type:String,
        required:true
    },
    
},{timestamps:true}
);

userSchema.pre("save",async function(next){
    const user=this;

    if(!user.isModified("password")){
        next();
    }
    try {
        const newPassword=await bcrypt.hash(user.password,10);
        // console.log("newpassword",newPassword);
        
        user.password=newPassword;
       
    } catch (error) {
        next(error);
    }
});

userSchema.methods.generateToken=async function(){
    const user=this;  
   try {
    const token=jwt.sign({
        userId:user._id.toString(),
        email:user.email,
        username:user.username,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "10d" }
);
    return token
    
   } catch (error) {
    console.log("jwt token error",error);
    return null
    
   }
}

userSchema.methods.comparePassword=async function(password){
    const comparePass=await bcrypt.compare(password,this.password);    
    return comparePass;
}

export const User=model("User",userSchema);