import mongoose, { mongo } from "mongoose";


const cartSchema=new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId
,
        ref:"User",
        required:true,
    },
    items:[
         {
      productId: mongoose.Schema.Types.ObjectId,
      quantity: Number,
      price:Number
    }
    ]

})
export default mongoose.model('cart',cartSchema)