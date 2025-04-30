import React, { useState,children } from 'react'
import { createContext } from 'react'

export const plancontextObj = createContext()

function PlanContext({children}) {
    let [plans , setPlans]=useState({
        activ:"",
        duration:"",
        change:0,
        fll:0,

    })
  return (
    <plancontextObj.Provider value={{plans,setPlans}}>
        {children}
    </plancontextObj.Provider>
  )
}

export default PlanContext