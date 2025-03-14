const exp=require('express')
const userApp=exp.Router()
const User=require('../models/userModel')
const expressAsyncHandler=require('express-async-handler')

// get all users
userApp.get("/users",expressAsyncHandler(async(req,res)=>{
   let usersList=await User.find()
   res.status(200).send({message:"users",payload:usersList})
}))

// create user and take his details
userApp.post("/users",expressAsyncHandler(async(req,res)=>{
   const user=req.body;
   let newUser=new User(user)
   let newUserDoc=await newUser.save()
   res.status(201).send({message:"User created",payload:newUserDoc})
}))

//  modify user details by email
userApp.put("/users/email",expressAsyncHandler(async(req,res)=>{
   const modifieduser=req.body;
   const dbres=await User.findOneAndUpdate({email:modifieduser.email},{$set:{...modifieduser}},{new:true})
   res.status(200).send({message:"User Updated",payload:dbres})
}))


module.exports=userApp