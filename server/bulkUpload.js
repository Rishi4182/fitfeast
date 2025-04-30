const mongoose = require('mongoose');
require('dotenv').config();

const foodSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: [String], required: true },
  type: { type: [String], required: true },
  mealType: { type: [String], required: true },
  caloriesPer100g: { type: Number, required: true },
  proteinPer100g: { type: Number },
  carbsPer100g: { type: Number },
  fatsPer100g: { type: Number }
});

const Food = mongoose.model('food', foodSchema);

const foodItems = [{
    id: 31, name: "Mixed Vegetable Sabzi", category: ["Vegetable"], type: ["Vegan", "Vegetarian"], mealType: ["Lunch", "Dinner"], caloriesPer100g: 95, proteinPer100g: 2.8, carbsPer100g: 12, fatsPer100g: 4
  },
  {
    id: 32, name: "Stuffed Paratha", category: ["Grains"], type: ["Vegetarian"], mealType: ["Breakfast", "Lunch"], caloriesPer100g: 180, proteinPer100g: 5, carbsPer100g: 25, fatsPer100g: 6
  },
  {
    id: 33, name: "Vegetable Biryani", category: ["Grains"], type: ["Vegetarian"], mealType: ["Lunch", "Dinner"], caloriesPer100g: 170, proteinPer100g: 4, carbsPer100g: 24, fatsPer100g: 6
  },
  {
    id: 34, name: "Methi Thepla", category: ["Grains", "Vegetable"], type: ["Vegetarian"], mealType: ["Breakfast"], caloriesPer100g: 130, proteinPer100g: 3.2, carbsPer100g: 18, fatsPer100g: 5
  },
  {
    id: 35, name: "Curd Rice", category: ["Grains", "Dairy"], type: ["Vegetarian"], mealType: ["Lunch", "Dinner"], caloriesPer100g: 140, proteinPer100g: 3, carbsPer100g: 22, fatsPer100g: 3
  },
  {
    id: 36, name: "Omelette", category: ["Egg"], type: ["Vegetarian", "Keto"], mealType: ["Breakfast"], caloriesPer100g: 154, proteinPer100g: 11, carbsPer100g: 1.5, fatsPer100g: 12
  },
  {
    id: 37, name: "Boiled Shrimp", category: ["Seafood"], type: ["Non-vegetarian"], mealType: ["Lunch", "Dinner"], caloriesPer100g: 99, proteinPer100g: 24, carbsPer100g: 0.2, fatsPer100g: 0.3
  },
  {
    id: 38, name: "Grilled Chicken Salad", category: ["Meat", "Vegetable"], type: ["Non-vegetarian"], mealType: ["Lunch", "Dinner"], caloriesPer100g: 120, proteinPer100g: 20, carbsPer100g: 4, fatsPer100g: 3
  },
  {
    id: 39, name: "Vegetable Soup", category: ["Vegetable"], type: ["Vegan", "Vegetarian"], mealType: ["Dinner", "Snack"], caloriesPer100g: 45, proteinPer100g: 1.5, carbsPer100g: 8, fatsPer100g: 1
  },
  {
    id: 40, name: "Lauki Curry", category: ["Vegetable"], type: ["Vegan", "Vegetarian"], mealType: ["Lunch", "Dinner"], caloriesPer100g: 60, proteinPer100g: 1, carbsPer100g: 5, fatsPer100g: 3
  },
  {
    id: 41, name: "Khichdi", category: ["Grains", "Legume"], type: ["Vegetarian"], mealType: ["Lunch", "Dinner"], caloriesPer100g: 130, proteinPer100g: 4.2, carbsPer100g: 20, fatsPer100g: 4
  },
  {
    id: 42, name: "Sattu Drink", category: ["Legume"], type: ["Vegan", "Vegetarian"], mealType: ["Breakfast", "Snack"], caloriesPer100g: 120, proteinPer100g: 9, carbsPer100g: 15, fatsPer100g: 2
  },
  {
    id: 43, name: "Dry Fruit Laddu", category: ["Nuts"], type: ["Vegetarian"], mealType: ["Snack"], caloriesPer100g: 280, proteinPer100g: 6, carbsPer100g: 20, fatsPer100g: 18
  },
  {
    id: 44, name: "Banana Shake (Low Sugar)", category: ["Fruit", "Dairy"], type: ["Vegetarian"], mealType: ["Breakfast", "Snack"], caloriesPer100g: 90, proteinPer100g: 3, carbsPer100g: 18, fatsPer100g: 1.2
  }
];

mongoose.connect(process.env.DBURL)
  .then(async () => {
    console.log("Connected to MongoDB");
    await Food.insertMany(foodItems);
    console.log("✅ Bulk data uploaded successfully!");
    mongoose.disconnect();
  })
  .catch(err => {
    console.error("❌ Upload failed:", err);
  });
