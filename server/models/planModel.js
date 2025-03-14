const mongoose = require("mongoose");

//exercise schema
const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Cardio', 'Strength', 'Flexibility', 'Balance'],
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
}, { _id: false });

// Plan Schema
const planSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    type: {
        type: String,
        enum: ['meal', 'workout', 'combined'],
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    goals: {
        type: [String],
        required: true
    },
    dietaryPreferences: {
        type: [String]
    },
    steps: {
        type: [String]
    },
    exercises: {
        type: [exerciseSchema]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { "strict": "throw" });

const Plan = mongoose.model('plan', planSchema);

module.exports = Plan;
