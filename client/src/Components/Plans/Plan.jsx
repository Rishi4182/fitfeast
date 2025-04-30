import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { userContextObj } from '../../Contexts/UserContext'
import { useForm } from "react-hook-form";
import Filter from './Filter';
import MealDisplay from './MealDisplay';
import axios from 'axios';
import MealPlanner from './MealPlanner';
import SplitCalories from './SplitCalories';
import './plan.css';


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
        <div className="container mx-auto my-5">
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-header bg-white border-bottom-0 pt-4">
                    <h2 className="text-center mb-0">Create Your Fitness Plan</h2>
                </div>
                <div className="card-body px-4 py-4">
                    <form onSubmit={handleSubmit(calculatePlan)}>
                        <div className="row g-3 align-items-center">
                            <div className="col-md-5">
                                <label htmlFor="activity-select" className="form-label fw-medium">Activity Level</label>
                                <select 
                                    id="activity-select"
                                    className="form-select shadow-sm" 
                                    onChange={handleActivity} 
                                    required
                                >
                                    <option value="">Select Activity</option>
                                    <option value="Sedentary">Sedentary</option>
                                    <option value="Lightly Active">Lightly Active</option>
                                    <option value="Moderately Active">Moderately Active</option>
                                    <option value="Very Active">Very Active</option>
                                </select>
                            </div>
                            
                            <div className="col-md-5">
                                <label htmlFor="duration-select" className="form-label fw-medium">Plan Duration</label>
                                <select 
                                    id="duration-select"
                                    className="form-select shadow-sm" 
                                    onChange={handleDuration} 
                                    required
                                >
                                    <option value="">Select Duration</option>
                                    <option value="1 week">1 week</option>
                                    <option value="2 weeks">2 weeks</option>
                                    <option value="1 month">1 month</option>
                                    <option value="2 months">2 months</option>
                                    <option value="3 months">3 months</option>
                                </select>
                            </div>
                            
                            <div className="col-md-2 d-flex align-items-end">
                                <button type="submit" className="btn btn-primary w-100 fw-medium">
                                    Calculate Plan
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {status === 1 && (
                <>
                    {!validationResult.isValid && (
                        <div className="alert alert-warning shadow-sm border-0 mt-4">
                            <i className="bi bi-exclamation-triangle-fill me-2"></i>
                            {validationResult.message}
                        </div>
                    )}

                    {validationResult.isValid && (
                        <div className="plan-results">
                            <div className="card shadow-sm border-0 mb-4">
                                <div className="card-header bg-white border-bottom-0 pt-3">
                                    <h3 className="h5 text-center mb-0">Your Calorie Plan</h3>
                                </div>
                                <div className="card-body px-4 pb-4 pt-2">
                                    <div className="table-responsive">
                                        <table className="table table-hover align-middle mb-0">
                                            <thead className="table-light">
                                                <tr>
                                                    <th className="border-0">Activity</th>
                                                    <th className="border-0">Duration</th>
                                                    <th className="border-0">Calories {currentUser.desiredweight > currentUser.weight ? "Surplus" : "Deficit"}</th>
                                                    <th className="border-0">Calories Per Day</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><span className="fw-medium text-primary">{activityVal}</span></td>
                                                    <td><span className="fw-medium text-primary">{durationVal}</span></td>
                                                    <td><span className="fw-medium text-primary">{chng}</span></td>
                                                    <td><span className="fw-bold text-primary">{fl}</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <SplitCalories fl={fl} selectedMeals={selectedMeals} />
                            
                            {selectedMeals.length > 0 && (
                                <div className="card shadow-sm border-0 mb-4">
                                    <div className="card-body p-4 text-center">
                                        <button
                                            className={`btn ${allOK ? 'btn-primary' : 'btn-danger'} px-4 py-2`}
                                            onClick={savePlan}
                                            disabled={planSaved}
                                        >
                                            {planSaved ? 'Plan Saved' : 'Save My Plan'}
                                        </button>
                                        
                                        {!allOK && !planSaved && (
                                            <p className="text-danger mt-3 mb-0">
                                                <i className="bi bi-info-circle-fill me-2"></i>
                                                Your macro values are not within healthy range. Please adjust your meals.
                                            </p>
                                        )}
                                        
                                        {planSaved && (
                                            <p className="text-success mt-3 mb-0">
                                                <i className="bi bi-check-circle-fill me-2"></i>
                                                Plan saved successfully!
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                            
                            <div className="card shadow-sm border-0 mb-4">
                                <div className="card-header bg-white border-bottom-0 pt-3">
                                    <h3 className="h5 text-center mb-0">Meal Selection</h3>
                                </div>
                                <div className="card-body px-4 pb-4 pt-2">
                                    <Filter />
                                    <MealPlanner selectedMeals={selectedMeals} onSelectMeals={handleMealSelection} caloriesTarget={fl} />
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );

}

export default Plan;