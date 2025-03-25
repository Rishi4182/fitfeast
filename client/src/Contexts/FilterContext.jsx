import React, { useState,children } from 'react'
import { createContext } from 'react'

export const filtercontextObj= createContext();

function FilterContext({children}) {

     let [filters, setFilters] = useState({
            type: "",
            mealType: "",
            // excludeAllergens: '',
            // sortBy: 'popularityScore'
          });
  return (
    <filtercontextObj.Provider value={{filters,setFilters}}>
        {children}
    </filtercontextObj.Provider>
  )
}

export default FilterContext