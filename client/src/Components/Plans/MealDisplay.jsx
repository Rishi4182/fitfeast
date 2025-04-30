import React from 'react';
import './MealDisplay.css';

function MealDisplay({ mealType, mealss, onSelectMeal, selectedMeals }) {
  
  const handleQuantityChange = (meal, change) => {
    // Create a unique key combining meal ID and meal type
    const uniqueKey = `${meal._id}-${mealType}`;
    
    // Find the selected meal with this specific combination
    const existingMeal = selectedMeals.find(m => 
      m._id === meal._id && m.mealTypeKey === mealType
    );
    
    const newQuantity = Math.max(0, (existingMeal?.quantity || 0) + change);
    
    // Create a new meal object with the appropriate mealType to ensure unique selection
    const mealWithSpecificType = {
      ...meal,
      mealType: [mealType], // Only associate this meal with the current meal type section
      mealTypeKey: mealType, // Add a key to track which section this meal belongs to
      uniqueKey: uniqueKey,  // Add a unique identifier for this meal+section combination
      quantity: newQuantity
    };
    
    onSelectMeal(mealWithSpecificType);
  };
  
  // Find if a meal is selected specifically for this mealType
  const findSelectedMeal = (mealId) => {
    return selectedMeals.find(
      m => m._id === mealId && m.mealTypeKey === mealType
    );
  };

  return (
    <div className="meal-section mb-4">
      <h2 className="meal-type-heading">{mealType}</h2>
      
      {mealss.length === 0 ? (
        <div className="no-meals-message">No {mealType.toLowerCase()} options available.</div>
      ) : (
        <div className="meals-grid">
          {mealss.map((meal) => {
            const selectedMeal = findSelectedMeal(meal._id);
            const isSelected = !!selectedMeal;
            const quantity = selectedMeal ? selectedMeal.quantity || 1 : 0;
            
            return (
              <div 
                key={`${meal._id}-${mealType}`} 
                className={`meal-card ${isSelected ? 'selected' : ''}`}
              >
                <div className="meal-header">
                  <h3 className="meal-name">{meal.name}</h3>
                  <div className="meal-tags">
                    {meal.type.map((type, index) => (
                      <span 
                        key={index} 
                        className={`meal-tag ${type.toLowerCase().replace('-', '')}`}
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="meal-calories">
                  <span className="calorie-value">{meal.caloriesPer100g}</span>
                  <span className="calorie-unit">calories</span>
                </div>
                
                <div className="meal-nutrients">
                  <div className="nutrient">
                    <span className="nutrient-value">{meal.proteinPer100g}g</span>
                    <span className="nutrient-name">protein</span>
                  </div>
                  <div className="nutrient">
                    <span className="nutrient-value">{meal.carbsPer100g}g</span>
                    <span className="nutrient-name">carbs</span>
                  </div>
                  <div className="nutrient">
                    <span className="nutrient-value">{meal.fatsPer100g}g</span>
                    <span className="nutrient-name">fats</span>
                  </div>
                </div>
                
                <div className="meal-quantity-controls">
                  <button 
                    className="quantity-btn decrease" 
                    onClick={() => handleQuantityChange(meal, -1)}
                    disabled={!isSelected}
                  >
                    <i className="bi bi-dash">-</i>
                  </button>
                  
                  <span className="quantity">{quantity}</span>
                  
                  <button 
                    className="quantity-btn increase" 
                    onClick={() => handleQuantityChange(meal, 1)}
                  >
                    <i className="bi bi-plus">+</i>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MealDisplay;