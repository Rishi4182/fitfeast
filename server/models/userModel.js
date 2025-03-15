const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    height:{
        type:Number
    },
    weight:{
        type:Number
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    },
    desiredweight:{
        type:Number
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