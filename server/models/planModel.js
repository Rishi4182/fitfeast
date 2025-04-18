const mongoose = require("mongoose");

// Food schema
const foodSchema = new mongoose.Schema({
    breakfast: {
        type: [String]
    }, 
    lunch: {
        type: [String]
    }, 
    snacks: {
        type: [String]
    }, 
    dinner: {
        type: [String]
    }, 
}, { "strict": "throw" });
// }, { _id: false });

// Plan schema
const planSchema = new mongoose.Schema({
    userId:{
        type: String
    },
    calories: {
        type: Number
    }, 
    veg: {
        type: foodSchema
    }, 
    nonveg: {
        type: foodSchema
    }, 
    duration: {
        type: String
    }, 
    extra: {
        type: String
    }, 
    activity: {
        type: String
    }
}, { "strict": "throw" });

const Plan = mongoose.model('plan', planSchema);

module.exports = Plan;
