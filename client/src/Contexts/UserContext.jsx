import React, { children, createContext, useState, useEffect } from 'react'
export const userContextObj = createContext();

function UserContext({children}) {

    let [currentUser, setCurrentUser] = useState(() => {
        // Try to get user data from localStorage
        try {
            const storedUser = localStorage.getItem('fitFeastUser');
            return storedUser ? JSON.parse(storedUser) : {
                firstName:"",
                lastName:"",
                email:"",
                profileImageUrl:"",
                height:0,
                weight:0,
                age:0,
                gender:"",
                desiredweight:0,
                userProducts:[],
                cost:0
            };
        } catch (error) {
            console.error("Error loading user from localStorage:", error);
            return {
                firstName:"",
                lastName:"",
                email:"",
                profileImageUrl:"",
                height:0,
                weight:0,
                age:0,
                gender:"",
                desiredweight:0,
                userProducts:[],
                cost:0
            };
        }
    });

    // Update localStorage whenever currentUser changes
    useEffect(() => {
        try {
            if (currentUser) {
                localStorage.setItem('fitFeastUser', JSON.stringify(currentUser));
            } else {
                localStorage.removeItem('fitFeastUser');
            }
        } catch (error) {
            console.error("Error saving user to localStorage:", error);
        }
    }, [currentUser]);

    // Create a wrapper for setCurrentUser that also updates localStorage
    const updateCurrentUser = (userData) => {
        setCurrentUser(userData);
    };

  return (
    <userContextObj.Provider value={{currentUser, setCurrentUser: updateCurrentUser}}>
      {children}
    </userContextObj.Provider>
  )
}

export default UserContext