import React, { useContext, useEffect, useState } from 'react'
import { filtercontextObj } from '../../Contexts/FilterContext'
import axios from 'axios';
import MealDisplay from './MealDisplay';


function MealPlanner() {
    const { filters, setFilters } = useContext(filtercontextObj);
    const [meals, setMeals] = useState([])

    // useEffect (()=>{
    //     const query = new URLSearchParams(filters).toString();
    //     axios.get(`http://localhost:4000/food-api/meal?${query}`)
    //     .then((res)=>{
    //         const data= res.json();
    //         console.log(data)
    //     })
    // },[filters])
    useEffect(() => {
        const fetchMeals = async () => {
            const query = new URLSearchParams(filters).toString();
            const response = await fetch(`http://localhost:4000/food-api/meal?${query}`);
            const data = await response.json();
            setMeals(data)
        };

        fetchMeals();
    }, [filters]);

    // console.log(meals)

    function handleSelectMeal(meal) {
        console.log(meal)
    }

    const mealTypes = ["Breakfast", "Lunch", "Snack", "Dinner"]

    return (
        <div>
            {
                filters.mealType === "" ? (mealTypes.map((type) => (
                    <MealDisplay 
                    key = {type} 
                    mealType = {type} 
                    mealss = {Array.isArray(meals.payload) ?meals.payload.filter((meal) => meal.mealType.includes(type)) : []} 
                    onSelectMeal = {handleSelectMeal}
                    />
                ))) : (
                        <MealDisplay 
                        key = {filters.mealType} 
                        mealType = {filters.mealType} 
                        mealss = {Array.isArray(meals.payload) ?meals.payload.filter((meal) => meal.mealType.includes(filters.mealType)) : []} 
                        onSelectMeal = {handleSelectMeal}
                        />
                )
            }
        </div>
    )
}

export default MealPlanner