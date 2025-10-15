import mongoose from "mongoose";

const categoerySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true

    }
})
const categoery=mongoose.model("Categoery",categoerySchema)
export default categoery