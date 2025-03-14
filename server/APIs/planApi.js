const exp= require('express');
const planApp = exp.Router();
const Plan = require('../models/planModel');
const expressAsyncHandler = require('express-async-handler');

//Get all plans
planApp.get("/plans", expressAsyncHandler(async (req, res) => {
    const plansList = await Plan.find();
    res.status(200).send({ message: "Plans retrieved", payload: plansList });
}));

//Create a new plan
planApp.post("/plans", expressAsyncHandler(async (req, res) => {
    const plan = req.body;
    const newPlan = new Plan(plan);
    const savedPlan = await newPlan.save();
    res.status(201).send({ message: "Plan created", payload: savedPlan });
}));

//Update plan by ID
planApp.put("/plans/:id", expressAsyncHandler(async (req, res) => {
    const planId = req.params.id;
    const modifiedPlan = req.body;
    
    const updatedPlan = await Plan.findByIdAndUpdate(planId, { $set: { ...modifiedPlan } }, { new: true });
    
    if (updatedPlan) {
        res.status(200).send({ message: "Plan updated", payload: updatedPlan });
    } else {
        res.status(404).send({ message: "Plan not found" });
    }
}));

//DELETE a plan by ID
planApp.delete("/plans/:id", expressAsyncHandler(async (req, res) => {
    const planId = req.params.id;
    
    const deletedPlan = await Plan.findByIdAndDelete(planId);
    
    if (deletedPlan) {
        res.status(200).send({ message: "Plan deleted successfully", payload: deletedPlan });
    } else {
        res.status(404).send({ message: "Plan not found" });
    }
}));

module.exports = planApp;



