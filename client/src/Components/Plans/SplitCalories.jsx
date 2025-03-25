import React from 'react'
import { userContextObj } from '../../Contexts/UserContext'
import { useContext, useState } from 'react'

function SplitCalories(props) { // fl

    const { currentUser, setCurrentUser } = useContext(userContextObj)
    // function splitCalories(calories, macroSplit) {
    //     const protein = (calories * macroSplit.protein) / 4;
    //     const carbs = (calories * macroSplit.carbs) / 4;
    //     const fats = (calories * macroSplit.fats) / 9;
    
    //     return {
    //         protein: Math.round(protein),
    //         carbs: Math.round(carbs),
    //         fats: Math.round(fats)
    //     };
    // }
    // const [macroSplit, setMacroSplit] = useState({
    //     protein:0.30,
    //     carbohydrates:0.40,
    //     fats:0.30
    // })
    // if (currentUser.desiredweight > currentUser.weight) {
    //     setMacroSplit({
    //         protein:0.30,
    //         carbohydrates:0.50,
    //         fats:0.20 
    //     })
    // } else if (currentUser.desiredweight < currentUser.weight) {
    //     setMacroSplit({
    //         protein:0.40,
    //         carbohydrates:0.40,
    //         fats:0.30 
    //     })
    // }
    // const finalMacroSplit = splitCalories(props.fl, macroSplit)
    // console.log(finalMacroSplit)

    return (
        <div>SplitCalories</div>
    )
}

export default SplitCalories