import mongoose from "mongoose";

export const userSChema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },


})

const User = mongoose.model('User',userSChema)
export default User