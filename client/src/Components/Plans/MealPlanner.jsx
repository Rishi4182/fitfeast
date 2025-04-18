import React, { useContext, useEffect, useState } from 'react';
import { filtercontextObj } from '../../Contexts/FilterContext';
import MealDisplay from './MealDisplay';
import './styles.css';

function MealPlanner({ selectedMeals, onSelectMeals, caloriesTarget }) {
  const { filters } = useContext(filtercontextObj);
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const query = new URLSearchParams(filters).toString();
      const response = await fetch(`http://localhost:4000/food-api/meal?${query}`);
      const data = await response.json();
      setMeals(data.payload || []);
    };
    fetchMeals();
  }, [filters]);

  const handleSelectMeal = (meal) => {
    const exists = selectedMeals.find((m) => m._id === meal._id);
    if (exists) {
      onSelectMeals(selectedMeals.filter((m) => m._id !== meal._id));
    } else {
      onSelectMeals([...selectedMeals, meal]);
    }
  };

  const mealTypes = ["Breakfast", "Lunch", "Snack", "Dinner"];

  return (
    <div className='mt-4'>
      {filters.mealType === ""
        ? mealTypes.map((type) => (
            <MealDisplay
              key={type}
              mealType={type}
              mealss={meals.filter((meal) => meal.mealType.includes(type))}
              onSelectMeal={handleSelectMeal}
              selectedMeals={selectedMeals}
            />
          ))
        : (
            <MealDisplay
              key={filters.mealType}
              mealType={filters.mealType}
              mealss={meals.filter((meal) => meal.mealType.includes(filters.mealType))}
              onSelectMeal={handleSelectMeal}
              selectedMeals={selectedMeals}
            />
          )}
    </div>
  );
}

export default MealPlanner;