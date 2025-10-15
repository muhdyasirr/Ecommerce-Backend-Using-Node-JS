import express from "express";
import { addCategoery, adminlogin,viewCategoery ,updateCategoery,deleteCategory, addProduct, viewProductById, updateProduct, deleteProduct, getProductsByCategory, allUsers, getAllproduct} from "../controller/AdminController.js";
import { isAdminAuth } from "../middleware/middleware.js";



const aroute= express.Router();

aroute.post("/login",adminlogin );
aroute.get("/allCategoery",viewCategoery)
aroute.get("/Allproduct",viewProductById)
aroute.get("/categoery/:id",getProductsByCategory)
aroute.get("/allproducts",getAllproduct)

aroute.use(isAdminAuth)

aroute.post("/add/Categoery",addCategoery)
aroute.patch("/updateCategoery/:id",updateCategoery)
aroute.delete("/delete/:id",deleteProduct)
aroute.delete("/Delete/Categoery/:id",deleteCategory)
aroute.post("/add/product",addProduct)

aroute.patch("/update/product",updateProduct)

aroute.get("/allUsers",allUsers)
aroute.get("/allproducts",getAllproduct)

export default aroute;
