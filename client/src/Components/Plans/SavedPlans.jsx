import React, {useEffect, useState, useContext} from 'react';
import { userContextObj } from '../../Contexts/UserContext'
import axios from 'axios';

function SavedPlan() {
    const { currentUser, setCurrentUser } = useContext(userContextObj)
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        const fetchPlan = async () => {
            try {
                const res = await axios.get('http://localhost:4000/plan-api/plan')
                setPlans(res.data.payload.filter((plan) => plan.userId === currentUser._id));
            } catch(err) {
                console.log("Error fetching plans:", err);
            }
        }
        fetchPlan();
    }, []);

    return (
        <div className="container mx-auto mt-4 mb-5">
            <h2 className="text-2xl font-bold mb-4">Saved Plans</h2>
            {plans.length === 0 ? (
                <p>No saved plans found.</p>
            ) : (
                plans.map((plan, index) => (
                <div key={index} className="mb-6 p-4 border rounded-lg shadow-sm bg-white text-center">
                    <h3 className="text-xl font-semibold mb-2">Calories Per Day: {plan.calories}</h3>
                    <h3 className="text-xl font-semibold mb-2">Duration: {plan.duration}-{plan.extra}</h3>
                    <h3 className="text-xl font-semibold mb-2">Activity: {plan.activity}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["Breakfast", "Lunch", "Snacks", "Dinner"].map((mealType) => (
                        <div key={mealType}>
                            <h4 className="font-medium text-primary text-decoration-underline">{mealType}</h4>
                            <h3 className='text-secondary text-decoration-underline'>Veg</h3>
                            <div className="text-sm text-gray-700">
                                {(plan.veg?.[mealType.toLowerCase()]).map((meal, idx) => (
                                    <p key={idx} className='text-success text-bolder'>{meal}</p>
                                ))}
                                {
                                    plan.veg?.[mealType.toLowerCase()].length === 0 && (<h5>No Meals</h5>)
                                }
                            </div>
                            <h3 className='text-secondary text-decoration-underline'>Non-Veg</h3>
                            <div className="text-sm text-gray-700">
                                {(plan.nonveg?.[mealType.toLowerCase()]).map((meal, idx) => (
                                    <p key={idx} className='text-success text-bolder'>{meal}</p>
                                ))}
                                {
                                    plan.nonveg?.[mealType.toLowerCase()].length === 0 && (<h5>No Meals</h5>)
                                }
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
                ))
            )}
        </div>
    );
}

export default SavedPlan;