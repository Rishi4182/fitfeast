import React, { useContext, useEffect, useState } from 'react'
import { userContextObj } from '../../Contexts/UserContext'
import {useUser} from '@clerk/clerk-react'
import {useNavigate} from 'react-router-dom'

function Home() {
  const {currentUser , setCurrentUser}=useContext(userContextObj)

  const {isSignedIn , user , isLoaded}=useUser()
  const [error , setError]=useState("")
  const navigate = useNavigate()

  console.log("User :",user)



  useEffect(()=>{
    if (isSignedIn === true){
      setCurrentUser({
        ...currentUser,
        firstName:user.firstName,
        lastName:user.lastName,
        email:user.emailAddresses[0].emailAddress,
        profileImageUrl:user.imageUrl,

      })
    }
  },[isLoaded])

  return (
    <div>Home</div>
  )
}

export default Home