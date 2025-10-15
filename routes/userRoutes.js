import express from 'express'
import { userLogin, userSignup } from '../controller/UserController.js'
import { addCart, deleteProductInCart } from '../controller/cartController.js'
import { isUserAuth } from '../middleware/middleware.js'
import { userOrder,allorder } from '../controller/orderController.js'
import Product from '../models/productModel.js'
import { viewProductById,getProductsByCategory,viewCategoery ,getAllproduct} from '../controller/AdminController.js'

const routes = express.Router()

routes.all("/products",viewProductById)
routes.post('/signup',userSignup)
routes.post("/login",userLogin)
routes.post("/cart",isUserAuth,addCart)
routes.delete("/cart",isUserAuth,deleteProductInCart)

routes.get('/order',userOrder)
routes.get("/allCategoery",viewCategoery)
routes.get("/Categoery/product/:id",getProductsByCategory)
routes.get("/allproducts",getAllproduct)
routes.get("/allorders",allorder)

export default routes