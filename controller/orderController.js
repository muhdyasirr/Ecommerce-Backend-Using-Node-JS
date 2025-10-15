import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

export const userOrder = async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ message: "User not logged in" });
    }

    
    const userCart = await Cart.findOne({ userId });
    if (!userCart || userCart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }


    const newOrder = new Order({
      userId,
      items: userCart.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      
           totalAmount: userCart.items.reduce(
        (acc, item) => acc+item.quantity*  item.price,
        
        
        
      )

    });

    await newOrder.save();

    
    userCart.items = [];
    await userCart.save();

    
    res.status(200).json({ message: "Order placed successfully!" });

  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//all orders

export const allorder=async(req,res)=>{
  const AllOrders= await Order.find()
  return res.status(200).json(AllOrders)
}