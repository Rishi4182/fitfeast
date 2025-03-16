const exp=require('express')
const productApp=exp.Router()
const Product=require('../models/productModel')
const expressAsyncHandler=require('express-async-handler')

// get all products
productApp.get("/product",expressAsyncHandler(async(req,res)=>{
    let productList=await Product.find()
    res.status(200).send({message:"products",payload:productList})
}))

// get product by id
productApp.get("/product/:_id", expressAsyncHandler(async(req, res)=> {
    const product = await Product.findById(req.params._id)
    res.status(200).send({message:"Product", payload:product})
}))

// create a new product in database
productApp.post("/products", expressAsyncHandler(async(req, res)=>{
    const product = req.body;
    let newProduct = new Product(product);
    let newProductDoc = await newProduct.save();
    res.status(201).send({message:"Product created", payload:newProductDoc})
}))

// // update a product by id
// productApp.put("/products/:id", expressAsyncHandler(async(req, res)=>{
//     const productId = req.params.id;
//     const modifiedProduct = req.body;
//     const updatedProduct = await Product.findByIdAndUpdate(productId, {$set:{...modifiedProduct}}, {new:true})
//     res.status(200).send({message:"Product Updated", payload:updatedProduct})
// }))


module.exports=productApp