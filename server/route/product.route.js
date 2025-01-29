import { Router } from 'express'
import auth from '../middleware/auth.js'
import { createProductController, deleteProductDetails, getProductByCategory, getProductController, getProductDetails, searchProduct, updateProductDetails } from '../controllers/product.controller.js'
import { admin } from '../middleware/Admin.js'
import upload from "../middleware/multer.js";

const productRouter = Router()

productRouter.post("/create", upload.fields([{ name: "coverimage", maxCount: 1 }, { name: "image", maxCount: 10 }]), auth, admin, createProductController);

// productRouter.post("/create",upload.array("image",10),auth,admin,createProductController)
productRouter.post('/get',getProductController)
productRouter.post("/get-product-by-category",getProductByCategory)
productRouter.post('/get-product-details',getProductDetails)

//update product route
productRouter.put('/update-product-details',auth,admin, upload.fields([{ name: "coverimage", maxCount: 1 }, { name: "image", maxCount: 10 }]),updateProductDetails)

//delete product
productRouter.delete('/delete-product',auth,admin,deleteProductDetails)

//search product 
productRouter.post('/search-product',searchProduct)

export default productRouter