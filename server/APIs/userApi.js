const exp=require('express')
const userApp=exp.Router()
const User=require('../models/userModel')
const expressAsyncHandler=require('express-async-handler')

userApp.get("/users/:email",expressAsyncHandler(async(req,res)=>{
   let email=req.params.email
   const user=await User.findOne({email:email})
   if(user==null)
   {
      res.send({message:"User Not Found"})
   }
   else{
      res.send({message:"User Found",payload:user})
   }
}))
// get all users
userApp.get("/user",expressAsyncHandler(async(req,res)=>{
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

//  modify user details by id
userApp.put("/users/:id",expressAsyncHandler(async(req,res)=>{
   const userId=req.params.id;
   const modifiedUser = req.body
   const updatedUser = await User.findByIdAndUpdate(userId,{$set:{...modifiedUser}},{new:true})
   res.status(200).send({message:"User Updated",payload:updatedUser})
}))


module.exports=userApp