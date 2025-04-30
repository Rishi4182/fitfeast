import React from 'react'
import './styles.css'

function MealDisplay(props) { // {mealType, mealss, onSelectMeal}
    // console.log(props)
    return (
    <div>
        <h2>{props.mealType}</h2>
        {
        props.mealss.length !== 0 ? (
        <div className='mt-4'>
        <table className='w-full border-collapse border border-gray-300'>
            <thead>
                <tr className='bg-gray-200'>
                    <th className='border p-2'>Select</th>
                    <th className='border p-2'>Name</th>
                    <th className='border p-2'>Category</th>
                    <th className='border p-2'>Calories</th>
                    <th className='border p-2'>Protein</th>
                    <th className='border p-2'>Carbohydrates</th>
                    <th className='border p-2'>Fats</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.mealss.map((meal) => (
                        <tr key={meal.id} className='hover:bg-gray-100'>
                            <td className='border p-2'>
                                <input type="checkbox" checked={props.selectedMeals?.some((m) => m._id === meal._id)} onChange={()=>props.onSelectMeal(meal)}/>
                            </td >
                            <td className='border p-2'>{meal.name}</td>
                            <td className='border p-2'>{meal.category}</td>
                            <td className='border p-2'>{meal.caloriesPer100g}</td>
                            <td className='border p-2'>{meal.proteinPer100g}</td>
                            <td className='border p-2'>{meal.carbsPer100g}</td>
                            <td className='border p-2'>{meal.fatsPer100g}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </div>) : (
            <h2>Not Found</h2>
        )
        }
    </div>
  )
}

export default MealDisplay