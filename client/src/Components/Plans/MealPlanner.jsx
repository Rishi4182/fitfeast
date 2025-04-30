import React, { useContext, useEffect, useState } from 'react'
import { filtercontextObj } from '../../Contexts/FilterContext'
import axios from 'axios';
import MealDisplay from './MealDisplay';
import Filter from './Filter'
import './styles.css'
import SplitCalories from './SplitCalories';
import Plan from './Plan';
import { plancontextObj } from '../../Contexts/PlanContext';


function MealPlanner() {
    const { filters, setFilters } = useContext(filtercontextObj);
    const {plans,setPlans}=useContext(plancontextObj)
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

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col"></th>
                        <th scope="col">Activity</th>
                        <th scope="col">Time Period</th>
                        <th scope="col">Calories Surplus</th>
                        <th scope="col">Calories Per Day</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row"></th>
                        <td>{plans.activ}</td>
                        <td>{plans.duration}</td>
                        <td>{plans.change}</td>
                        <td>{plans.fll}</td>
                    </tr>
                </tbody>
            </table>
            <SplitCalories />
            <Filter />
            {
                filters.mealType === "" ? (mealTypes.map((type) => (
                    <MealDisplay
                        key={type}
                        mealType={type}
                        mealss={Array.isArray(meals.payload) ? meals.payload.filter((meal) => meal.mealType.includes(type)) : []}
                        onSelectMeal={handleSelectMeal}
                    />
                ))) : (
                    <MealDisplay
                        key={filters.mealType}
                        mealType={filters.mealType}
                        mealss={Array.isArray(meals.payload) ? meals.payload.filter((meal) => meal.mealType.includes(filters.mealType)) : []}
                        onSelectMeal={handleSelectMeal}
                    />
                )
            }
        </div>
    )
}

export default MealPlanner