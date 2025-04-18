import React, { useContext, useEffect, useState } from 'react';
import { userContextObj } from '../../Contexts/UserContext';

function SplitCalories({ fl, selectedMeals }) {
  const { currentUser } = useContext(userContextObj);
  const [totals, setTotals] = useState({ protein: 0, carbs: 0, fats: 0 });
  const [targets, setTargets] = useState({
    protein: 0,
    carbs: 0,
    fats: 0,
    proteinRange: [0, 0],
    carbsRange: [0, 0],
    fatsRange: [0, 0]
  });

  useEffect(() => {
    const proteinTarget = Math.round((fl * 0.3) / 4);
    const carbsTarget = Math.round((fl * 0.5) / 4);
    const fatsTarget = Math.round((fl * 0.2) / 9);

    setTargets({
      protein: proteinTarget,
      carbs: carbsTarget,
      fats: fatsTarget,
      proteinRange: [Math.round(proteinTarget * 0.9), Math.round(proteinTarget * 1.1)],
      carbsRange: [Math.round(carbsTarget * 0.85), Math.round(carbsTarget * 1.1)],
      fatsRange: [Math.round(fatsTarget * 0.8), Math.round(fatsTarget * 1.05)]
    });
  }, [fl]);

  useEffect(() => {
    let totalProtein = 0, totalCarbs = 0, totalFats = 0;
    selectedMeals.forEach(meal => {
      totalProtein += meal.proteinPer100g || 0;
      totalCarbs += meal.carbsPer100g || 0;
      totalFats += meal.fatsPer100g || 0;
    });
    setTotals({
      protein: Math.round(totalProtein),
      carbs: Math.round(totalCarbs),
      fats: Math.round(totalFats)
    });
  }, [selectedMeals]);

  const getColor = (macro, value) => {
    const [min, max] = targets[`${macro}Range`];
    if (value >= min && value <= max) return 'bg-green-500';
    return 'bg-red-500';
  };

  const isMacroValid = (macro) => {
    const [min, max] = targets[`${macro}Range`];
    return totals[macro] >= min && totals[macro] <= max;
  };

  return (
    <div className='my-6 p-4 bg-white shadow rounded-xl'>
      <h2 className='text-lg font-semibold mb-4'>Your Macronutrient Progress</h2>
      {['protein', 'carbs', 'fats'].map((macro) => (
        <div className='mb-4' key={macro}>
          <div className='flex justify-between mb-1'>
            <span className='capitalize'>
              {macro} ({targets[`${macro}Range`][0]}–{targets[`${macro}Range`][1]}g)
            </span>
            <span className='font-medium'>
              {totals[macro]}g / {targets[macro]}g {isMacroValid(macro) ? '✅' : '❌'}
            </span>
          </div>
          <div className='w-full bg-gray-200 rounded h-4 overflow-hidden'>
            <div
              className={`${getColor(macro, totals[macro])} h-full transition-all duration-300`}
              style={{ width: `${Math.min(100, (totals[macro] / targets[macro]) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SplitCalories;