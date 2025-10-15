import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import session from "express-session"

//signup
export const userSignup = async (req,res)=>{
  try{
      const {name,email,password}=req.body


      const existingUser = await User.findOne({email});
      console.log(existingUser);
      
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
      const  h_password = await bcrypt.hash(password,10) 
    const user = new User({
        name,
        email:email,
        password:h_password
    })
await user.save()   
res.status(200).json({message:"User Registers Sucessfully"})
}
catch (error) {
    res.status(500).json({ error: error.message });
  }
  }

//login
export const userLogin=async(req,res)=>{
try{
   const {email,password}=req.body
   const user= await User.findOne({email})
   const match = await bcrypt.compare(password,user.password)
   
   if(!user){
   return res.status(500).json({message:"user NOt found"})
   }
  
if(!match){

   return res.status(500).json({message:"password NOt found"})

}
    req.session.useremail=user.email
    req.session.userId = user._id
    res.status(200).json({message:"logined",user: user.email})

    


}catch (error) {
    res.status(500).json({ error: error.message });
  }
}

