import React, { Children, createContext , useState} from 'react'
export const userContextObj = createContext();

function UserContext({children}) {

    let [currentUser, setCurrentUser] = useState(
       {
        firstName:"",
        lastName:"",
        email:"",
        profileImageUrl:"",
       }
    )

  return (
    <userContextObj.Provider value={{currentUser,setCurrentUser}}>
      {children}
    </userContextObj.Provider>
  )
}

export default UserContext