import React, { Children, createContext , useState} from 'react'
export const userContextObj = createContext();

function UserContext({children}) {

    let [currentUser, setCurrentUser] = useState(
       {
        firstName:"",
        lastName:"",
        email:"",
        profileImageUrl:"",
        height:0,
        weight:0,
        age:0,
        gender:"",
        desiredweight:0
       }
    )

  return (
    <userContextObj.Provider value={{currentUser,setCurrentUser}}>
      {children}
    </userContextObj.Provider>
  )
}

export default UserContext