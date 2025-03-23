import React, { useContext } from 'react'
import { useState,useEffect } from 'react';
import { filtercontextObj } from '../../Contexts/FilterContext';

function Filter() {
    const {filters,setFilters}=useContext(filtercontextObj);
        function handleChange(e) {
          const { name, value } = e.target;
          setFilters((prev) => ({
            ...prev,
            [name]: value
          }))
        //   console.log(filters)
        };
        return (
          <div className="flex gap-4 p-4 bg-gray-100 rounded-xl">
            {/* Type */}
            <select name="type" value={filters.type} onChange={handleChange} className="border p-2 rounded">
              <option value="">All Types</option>
              <option value="Vegetarian">Veg</option>
              <option value="Non-vegetarian">Non-Veg</option>
              <option value="Vegan">Vegan</option>
              <option value="Keto">Keto</option>
            </select>
      
            {/* Meal Type */}
            <select name="mealType" value={filters.mealType} onChange={handleChange} className="border p-2 rounded">
              <option value="">All Meals</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Snack">Snack</option>
              <option value="Dinner">Dinner</option>
            </select>
      
            {/* Allergens */}
            {/* <select
              name="excludeAllergens"
              value={filters.excludeAllergens}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">No Allergens</option>
              <option value="Gluten">Gluten</option>
              <option value="Nuts">Nuts</option>
              <option value="Dairy">Dairy</option>
              <option value="Eggs">Eggs</option>
            </select> */}
      
            {/* Sorting */}
            {/* <select name="sortBy" value={filters.sortBy} onChange={handleChange} className="border p-2 rounded">
              <option value="popularityScore">Popularity</option>
              <option value="preparationTime">Preparation Time</option>
              <option value="caloriesPer100g">Calories</option>
            </select> */}
          </div>
        );
      
}

export default Filter