import React from 'react'
import { useState,useEffect } from 'react';

function MealTable() {
    const MealTable = ({ mealType, meals, onSelectMeal }) => {
        return (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">{mealType}</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-2">Select</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Calories</th>
                  <th className="border p-2">Protein</th>
                  <th className="border p-2">Carbs</th>
                  <th className="border p-2">Fats</th>
                  {/* <th className="border p-2">Popularity</th> */}
                </tr>
              </thead>
              <tbody>
                {meals.map((meal) => (
                  <tr key={meal._id} className="hover:bg-gray-100">
                    <td className="border p-2">
                      <input
                        type="checkbox"
                        onChange={() => onSelectMeal(meal)}
                      />
                    </td>
                    <td className="border p-2">{meal.name}</td>
                    <td className="border p-2">{meal.caloriesPer100g}</td>
                    <td className="border p-2">{meal.proteinPer100g}g</td>
                    <td className="border p-2">{meal.carbsPer100g}g</td>
                    <td className="border p-2">{meal.fatsPer100g}g</td>
                    {/* <td className="border p-2">{meal.popularityScore}</td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      };
}

export default MealTable