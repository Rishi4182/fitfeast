const mongoose=require('mongoose')

const productSchema = new mongoose.Schema({
    img:{
        type : String
    },
    title:{
        type : String
    },
    description:{
        type : String
    }, 
    price:{
        type : Number
    },
    id:{
        type : Number
    }
},{"strict":"throw"})

const Product=mongoose.model('product',productSchema)

module.exports=Product