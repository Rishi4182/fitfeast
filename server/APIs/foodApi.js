const exp = require('express')
const foodApp = exp.Router()
const Food=require('../models/foodModel')
const expressAsyncHandler = require('express-async-handler')

foodApp.get('/meal', expressAsyncHandler(async(req,res)=>{
    const {type , mealType , excludeAllergens ,sortBy }=req.query;

    // GET /meals?type=Veg&mealType=Lunch&excludeAllergens=Nuts&sortBy=popularityScore

    let query={};

    if (type){
        query.type=type;
    }
    if (mealType){
        query.mealType=mealType;
    }

    if (excludeAllergens){
        query.allergens={$nin : excludeAllergens.split(',')};
    }

    let sortOptions={}
    if (sortBy){
        sortOptions[sortBy]=-1;
    }

    const meals = await Food.find(query)
    // const meals = await Food.find(query).sort(sortOptions);
    res.status(200).send({message:"Meals",payload:meals})


}) )

foodApp.post("/meals", expressAsyncHandler(async(req, res) => {
    const meal = req.body;
    let newMeal = new Food(meal);
    let newMealDoc = await newMeal.save();
    res.status(201).send({message:"Meal Saved", payload:newMealDoc})
}))

module.exports=foodApp;
