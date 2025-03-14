const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    height:{
        type:Number,
        required:true
    },
    weight:{
        type:Number,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    desiredweight:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String
    },
    profileImageUrl:{type:String}
},{"strict":"throw"})


const User=mongoose.model('user',userSchema)

module.exports=User