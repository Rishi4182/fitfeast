import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { userContextObj } from '../../Contexts/UserContext'
import { useForm } from "react-hook-form";
import Filter from './Filter';
import MealDisplay from './MealDisplay';
import axios from 'axios';
import MealPlanner from './MealPlanner';
import SplitCalories from './SplitCalories';


function Plan() {
    const { currentUser, setCurrentUser } = useContext(userContextObj)
    const [status, setStatus] = useState(0);
    const [chng, setchng] = useState(0);
    const [fl, setfl] = useState(0);
    const [durationVal, setDuration] = useState('');
    const [activityVal, setActivity] = useState('');
    const [selectedMeals, setSelectedMeals] = useState([]);
    const [planSaved, setPlanSaved] = useState(false);
    const [validationResult, setValidationResult] = useState({ isValid: true, message: "" });


    const navigate = useNavigate();

    const handleDuration = (e) => setDuration(e.target.value);
    const handleActivity = (e) => setActivity(e.target.value);

    const {
        handleSubmit,
    } = useForm();

    const calculatePlan = () => {
        if (!durationVal || !activityVal) return;
        setStatus(1);

        let bmr = 0, cal1 = 0, fat = 0, cal2 = 0, final = 0;
        const u = currentUser;

        if (u.gender === "Male") {
            bmr = (10 * u.weight) + (6.25 * u.height) - (5 * u.age) + 5;
        } else {
            bmr = (10 * u.weight) + (6.25 * u.height) - (5 * u.age) - 161;            
        }

        if (activityVal === "Sedentary") cal1 = Math.round(bmr * 1.2);
        else if (activityVal === "Lightly Active") cal1 = Math.round(bmr * 1.375);
        else if (activityVal === "Moderately Active") cal1 = Math.round(bmr * 1.55);
        else if (activityVal === "Very Active") cal1 = Math.round(bmr * 1.725);

        if (u.desiredweight > u.weight) {
            fat = (u.desiredweight - u.weight) * 7700;
        } else {
            fat = (u.weight - u.desiredweight) * 7700;
        }

        if (durationVal === "1 week") cal2 = Math.round(fat / 7);
        else if (durationVal === "2 weeks") cal2 = Math.round(fat / 14);
        else if (durationVal === "1 month") cal2 = Math.round(fat / 4 / 7);
        else if (durationVal === "2 months") cal2 = Math.round(fat / 8 / 7);
        else if (durationVal === "3 months") cal2 = Math.round(fat / 12 / 7);

        final = u.desiredweight > u.weight ? cal1 + cal2 : cal1 - cal2;

        setchng(cal2);
        setfl(final);

        const validation = isValid(final, cal2);
        setValidationResult(validation);
    };

    const handleMealSelection = (meals) => {
        setSelectedMeals(meals);
    };

    const groupMealsByType = () => {
        const groupedVeg = {
            breakfast : [], 
            lunch: [], 
            snacks: [], 
            dinner : [], 
        };
        const groupedNonVeg = {
            breakfast: [], 
            lunch: [], 
            snacks: [], 
            dinner: [],
        }

        selectedMeals.forEach((meal) => {
            meal.type.forEach((type) => {
                if (type === "Non-vegetarian") {
                    meal.mealType.forEach((type) => {
                        if (type.toLowerCase().includes("breakfast")) groupedNonVeg.breakfast.push(meal.name);
                        if (type.toLowerCase().includes("lunch")) groupedNonVeg.lunch.push(meal.name);
                        if (type.toLowerCase().includes("snack")) groupedNonVeg.snacks.push(meal.name);
                        if (type.toLowerCase().includes("dinner")) groupedNonVeg.dinner.push(meal.name);
                    });
                } else if (type === "Vegetarian") {
                    meal.mealType.forEach((type) => {
                        if (type.toLowerCase().includes("breakfast")) groupedVeg.breakfast.push(meal.name);
                        if (type.toLowerCase().includes("lunch")) groupedVeg.lunch.push(meal.name);
                        if (type.toLowerCase().includes("snack")) groupedVeg.snacks.push(meal.name);
                        if (type.toLowerCase().includes("dinner")) groupedVeg.dinner.push(meal.name);
                    });
                }
            });
        });

        return {groupedVeg, groupedNonVeg};
    }

    const getMacroMatchStatus = () => {
        const proteinTarget = Math.round((fl * 0.3) / 4);
        const carbsTarget = Math.round((fl * 0.5) / 4);
        const fatsTarget = Math.round((fl * 0.2) / 9);
      
        let totalProtein = 0, totalCarbs = 0, totalFats = 0;
      
        selectedMeals.forEach(meal => {
          totalProtein += meal.proteinPer100g || 0;
          totalCarbs += meal.carbsPer100g || 0;
          totalFats += meal.fatsPer100g || 0;
        });
      
        return {
          proteinOK: totalProtein >= 0.9 * proteinTarget && totalProtein <= 1.1 * proteinTarget,
          carbsOK: totalCarbs >= 0.85 * carbsTarget && totalCarbs <= 1.1 * carbsTarget,
          fatsOK: totalFats >= 0.8 * fatsTarget && totalFats <= 1.05 * fatsTarget,
          protein: { total: Math.round(totalProtein), target: proteinTarget },
          carbs: { total: Math.round(totalCarbs), target: carbsTarget },
          fats: { total: Math.round(totalFats), target: fatsTarget }
        };
    };
    const matchStatus = getMacroMatchStatus();
    const allOK = matchStatus.proteinOK && matchStatus.carbsOK && matchStatus.fatsOK;

    const savePlan = async () => {
        const {groupedVeg, groupedNonVeg} = groupMealsByType();
        const planData = {
            userId: currentUser._id, 
            calories: fl, 
            veg: groupedVeg,
            nonveg: groupedNonVeg,
            duration: durationVal, 
            extra: chng,
            activity: activityVal
        };
        
        try {
            const res = await axios.post('http://localhost:4000/plan-api/plans', planData);
            if (res.status === 201) setPlanSaved(true);
        } catch(err) {
            console.log("Error saving plan: ", err);
        }
    };

    if (currentUser.age === 0 || currentUser.height === 0 || currentUser.weight === 0 || currentUser.gender === "" || currentUser.desiredweight === 0) {
        return (
          <div>
            <h1>Edit Your Profile</h1>
            <p>Please add your age, height, gender, and weight to proceed with the plans form.</p>
            <button className='btn btn-secondary' onClick={() => navigate(`/user-profile/${currentUser.email}`)}>
              Edit Profile
            </button>
          </div>
        );
    }

    const isValid = (fl, chng) => {
        if ((fl - chng) > 3000) return { isValid: false, message: "It is not recommended for you to gain weight." };
        else {
            if (currentUser.desiredweight > currentUser.weight) {
                if (fl > 3500) return { isValid: false, message: "It is dangerous to gain too much weight in short periods of time. We suggest you not to gain so much weight in a short period of time." };
            }
        }
        if ((fl + chng) < 1900) return { isValid: false, message: "It is not recommended for you to lose weight." };
        else {
            if (chng > 1000 && fl < 1500) return { isValid: false, message: "It is dangerous to lose too much weight in short periods of time. We suggest you not to lose so much weight in a short period of time." };
        }
        return { isValid: true, message: "" };
    };

    return (
        <div>
          <form onSubmit={handleSubmit(calculatePlan)}>
            <label>
              Activity:
              <select onChange={handleActivity} required>
                <option value="">Select Activity</option>
                <option value="Sedentary">Sedentary</option>
                <option value="Lightly Active">Lightly Active</option>
                <option value="Moderately Active">Moderately Active</option>
                <option value="Very Active">Very Active</option>
              </select>
            </label>
    
            <label className='ms-5'>
              Duration:
              <select onChange={handleDuration} required>
                <option value="">Select Duration</option>
                <option value="1 week">1 week</option>
                <option value="2 weeks">2 weeks</option>
                <option value="1 month">1 month</option>
                <option value="2 months">2 months</option>
                <option value="3 months">3 months</option>
              </select>
            </label>
    
            <button type="submit" className="btn btn-success ms-5">DONE</button>
            </form>
            {status === 1 && (
                <>
                    {!validationResult.isValid && (
                        <div className="alert alert-warning mt-3">
                            {validationResult.message}
                        </div>
                    )}

                    {validationResult.isValid && (
                        <>
                            <table className="table my-4">
                                <thead>
                                    <tr>
                                        <th>Activity</th>
                                        <th>Duration</th>
                                        <th>Calories {currentUser.desiredweight > currentUser.weight ? "Surplus" : "Deficit"}</th>
                                        <th>Calories Per Day</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{activityVal}</td>
                                        <td>{durationVal}</td>
                                        <td>{chng}</td>
                                        <td>{fl}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <SplitCalories fl={fl} selectedMeals={selectedMeals} />
                            {selectedMeals.length > 0 && (
                                <div className='mt-4'>
                                    <button
                                        className={`btn ${allOK ? 'btn-primary' : 'btn-danger'}`}
                                        onClick={savePlan}
                                    >
                                        Save My Plan
                                    </button>
                                    {!allOK && !planSaved && (
                                        <p className='text-danger mt-2'>
                                            Your macro values are not within healthy range. Please adjust your meals.
                                        </p>
                                    )}
                                    {planSaved && <p className='text-success mt-2'>Plan saved successfully!</p>}
                                </div>
                            )}
                            <Filter />
                            <MealPlanner selectedMeals={selectedMeals} onSelectMeals={handleMealSelection} caloriesTarget={fl} />
                        </>
                    )}
                </>
            )}
        </div>
    );

}

export default Plan;