import React from 'react'

function MealDisplay(props) { // {mealType, mealss, onSelectMeal}
    console.log(props)
    return (
    <div>
        <h2>{props.mealType}</h2>
        {
        props.mealss.length !== 0 ? (
        <div>
        <table>
            <thead>
                <tr>
                    <th>Select</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Calories</th>
                    <th>Protein</th>
                    <th>Carbohydrates</th>
                    <th>Fats</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.mealss.map((meal) => (
                        <tr key={meal.id}>
                            <td>
                                <input type="checkbox" onChange={()=>props.onSelectMeal(meal)}/>
                            </td>
                            <td>{meal.name}</td>
                            <td>{meal.category}</td>
                            <td>{meal.caloriesPer100g}</td>
                            <td>{meal.proteinPer100g}</td>
                            <td>{meal.carbsPer100g}</td>
                            <td>{meal.fatsPer100g}</td>
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