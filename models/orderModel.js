

import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
    }
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  // shippingAddress: {
  //   type: String,
  // },
  orderDate: {
    type: Date,
    default: Date.now,
  }

})

export default mongoose.model('Order',orderSchema,'orders')