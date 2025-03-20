import { useContext, useEffect, useState } from 'react'
import { userContextObj } from '../../Contexts/UserContext'
import {useUser} from '@clerk/clerk-react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function Home() {
  const {currentUser , setCurrentUser}=useContext(userContextObj)
  // console.log(currentUser)
  const {isSignedIn , user , isLoaded}=useUser()
  const [error , setError]=useState("")
  const navigate = useNavigate()

  useEffect(()=>{
    
    if (isSignedIn === true){
      axios.get(`http://localhost:4000/user-api/users/${user?.emailAddresses[0].emailAddress}`)
      .then((rep) => {
        if (rep.data.message === "User Not Found") {
          setCurrentUser({
            ...currentUser,
            firstName:user?.firstName,
            lastName:user?.lastName,
            email:user?.emailAddresses[0].emailAddress,
            profileImageUrl:user?.imageUrl
          })
          
        } else {
          setCurrentUser(rep.data.payload)
        }
        // console.log(currentUser)
      })
      .catch(err=>console.log("Some Error occured", err))
      
      
    }
  },[isLoaded])

  return (
    <div>Home</div>
  )
}

export default Home