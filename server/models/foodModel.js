const mongoose=require('mongoose')

const foodSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String ,
        required:true
    },
    category:{
        type:[String],
        required:true
    },
    type :{
        type:[String],
        require:true
    },
    mealType:{
        type:[String],
        require:true
    },
    caloriesPer100g: {
        type: Number, 
        required: true
    },
    proteinPer100g:{
        type:Number
    },
    carbsPer100g:{
        type:Number
    },
    fatsPer100g:{
        type:Number,
    },
    // allergens:{
    //     type:[String],
    //     default: [""]
    // },
    // preperationTime:{
    //     type:Number,
    //     default:0
    // },
    // popularityScore:{
    //     type:Number,
    //     default:0
    // }
},{"strict":"throw"})

const Food=mongoose.model('food',foodSchema)

module.exports=Food