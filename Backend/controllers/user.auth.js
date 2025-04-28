import { User } from "../models/userSchema.js";

//register a user
export const registerUser=async(req,res)=>{
    try {

        let{username,email,password}=req.body;
        const userMail=await User.findOne({email});
        
        
        if(userMail){
            return res.status(408).json({message:"email is already exixts"});
        }
        const newUser=await User({
            username,
            email,
            password
        });

        res.status(200).json({
            token:await newUser.generateToken(),
            userID: newUser._id.toString(),
            message:"register successfully"
        });
        await newUser.save();
        
    } catch (error) {
        console.log("error",error);
        
    }
}


export const uploadImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Cloudinary stores image automatically via multer-storage-cloudinary
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // Get the Cloudinary URL from multer result
    const imageUrl = req.file.path;

    // Save to user in MongoDB
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { image: imageUrl },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Image uploaded and saved successfully",
      imageUrl,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Image upload failed", error });
  }
};

//login route

export const loginUser=async(req,res)=>{
    try {
        let{email,password}=req.body;
        const userExists=await User.findOne({email});
        if(!userExists){
            return res.status(400).json({message:"Enter valid email or password"});
        }
        const user=await userExists.comparePassword(password);
        // console.log("compare ",user);
        
        if(user){
            res.status(200).json({
                token:await userExists.generateToken(),
                userID:userExists._id,
                message:"login successfully"
            })
        }else{
            res.status(400).json({
             message:"Invalid !!"
            });
        }
    } catch (error) {
        console.log(error);
        
    }
}

//user data route
export const userData=async(req,res)=>{
    try {
        const user=req.user;
        const user1=req.userData1
        // console.log(user);
        
        res.status(200).json({user,user1});
    } catch (error) {
        console.log(error);
        
    }
}