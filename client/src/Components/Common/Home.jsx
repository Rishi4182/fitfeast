import React, { useContext, useEffect, useState } from 'react'
import { userContextObj } from '../../Contexts/UserContext'
import {useUser} from '@clerk/clerk-react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

function Home() {
  const {currentUser , setCurrentUser}=useContext(userContextObj)

  const {isSignedIn , user , isLoaded}=useUser()
  const [error , setError]=useState("")
  const navigate = useNavigate()

  function setc(nw)
  {
    setCurrentUser({
      ...currentUser,
      height:Number(nw.height),
      age:Number(nw.age),
      weight:Number(nw.weight),
      desiredweight:Number(nw.desiredweight),
      gender:nw?.gender
    })
  }

  useEffect(()=>{
    if (isSignedIn === true){
      setCurrentUser({
        ...currentUser,
        firstName:user?.firstName,
        lastName:user?.lastName,
        email:user?.emailAddresses[0].emailAddress,
        profileImageUrl:user?.imageUrl
      })
    }
  },[isLoaded])
  let res=null;
  let p=0;
  useEffect(()=>{
    axios.get(`http://localhost:4000/user-api/users`)
      .then((res)=>{
        setc(res.data.payload[0])
      })
      .catch(err=>console.log("Some Error occured"))
  },[])
 console.log("User:",currentUser)

  return (
    <div>Home</div>
  )
}

export default Home