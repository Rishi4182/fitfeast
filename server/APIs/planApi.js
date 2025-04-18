const exp = require('express')
const planApp = exp.Router()
const Plan = require('../models/planModel')
const expressAsyncHandler = require('express-async-handler')

// get all plans
planApp.get("/plan", expressAsyncHandler(async(req, res)=> {
    let planList = await Plan.find()
    res.status(200).send({message:"Plans", payload:planList})
}))

// get plan by calories
planApp.get("/plan/:calories", expressAsyncHandler(async(req, res)=> {
    const plan = await Plan.findOne({calories:req.params.calories})
    if (plan == null) {
        res.send({message:"Plan not found"})
    } else {
        res.status(200).send({message:"Plan Found", payload: plan})
    }
}))

planApp.get("/plan/:id", expressAsyncHandler(async(req, res) => {
    const plans = await Plan.find({ userId: req.params.id });
    if (!plans || plans.length === 0) {
        res.send({ message: "Plans Not Found" });
    } else {
        res.send({ message: "Plans Found", payload: plans });
    }
}));

// create a new plan in database
planApp.post("/plans", expressAsyncHandler(async(req, res)=> {
    const plan = req.body;
    let newPlan = new Plan(plan);
    let newPlanDoc = await newPlan.save();
    res.status(201).send({message:"Plan created", payload:newPlanDoc})
}))

module.exports = planApp 