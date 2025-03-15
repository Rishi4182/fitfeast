import React from 'react'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { userContextObj } from '../../Contexts/UserContext'
import { useForm } from "react-hook-form";

function UserProfile() {
  const {currentUser , setCurrentUser}=useContext(userContextObj)
  console.log(currentUser)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  async function adddetails(newuser) {
    if(newuser.male==="on")
      newuser.gender="Male"
    else
    newuser.gender="Female"
    setCurrentUser({
      ...currentUser,
      height:Number(newuser.height),
      age:Number(newuser.age),
      weight:Number(newuser.weight),
      desiredweight:Number(newuser.desiredweight),
      gender:newuser?.gender
    })
    let rep=await axios.get(`http://localhost:4000/user-api/users/${currentUser.email}`)
    if(rep.data.message==="User Not Found")
    {
      let pst=await axios.post('http://localhost:4000/user-api/users',currentUser)
      console.log(pst.data.message)
    }
    else
    {
    let pt=await axios.put(`http://localhost:4000/user-api/users/${rep.data.payload._id}`,currentUser)
    console.log(pt.data.payload)
  } 
  }
  return (
    <div className="king">
    <form onSubmit={handleSubmit(adddetails)}>
      <div className="user">
        <label htmlFor="firstName" className="form-label">
          FirstName
        </label>
        <input defaultValue={currentUser.firstName}
          type="text"
          {...register("firstName", {
            required: true,
            minLength: 4,
            maxLength: 20,
          })}
          id="firstName"
          className="form-control"
        />
      </div>
      <div className="dte">
      <label htmlFor="lastName" className="form-label">
          LastName
        </label>
        <input defaultValue={currentUser.lastName}
          type="text"
          {...register("lastName", {
            required: true,
            minLength: 4,
            maxLength: 20,
          })}
          id="lastName"
          className="form-control"
        />
      </div>
      <div className="selt">
      <label htmlFor="email" className="form-label">
          Email
        </label>
        <input defaultValue={currentUser.email}
          type="text"
          {...register("email")}
          id="email"
          className="form-control"
        />
      </div>
      <div className='gender'>
            <label className="gender">Gender</label>
            <div className="d-flex king">
              <div className="form-check lot">
                <input
                  type="radio"
                  {...register("male")}
                  className="form-check-input"
                />
                <label htmlFor="female" className="form-check-label">
                  Male
                </label>
              </div>
              <div className="form-check lot">
                <input
                  type="radio"
                  {...register("female")}
                  className="form-check-input"
                />
                <label htmlFor="male" className="form-check-label">
                  Female
                </label>
              </div>
            </div>
          </div>
      <div className='age'>
        <label htmlFor="age" className="form-label">Age</label>
        <input defaultValue={currentUser.age} type="number" {...register("age")} id="age" className="form-control"/>
      </div>
      <div className='height'>
      <label htmlFor="height" className="form-label">Height</label>
      <input defaultValue={currentUser.height} type="number" {...register("height")} id="height" className="form-control" />
      </div>
      <div className='weight'>
      <label htmlFor="weight" className="form-label">Weight</label>
      <input  defaultValue={currentUser.weight} type="number" {...register("weight")} id="weight" className="form-control"/>
      </div>
      <div className='desiredweight'>
      <label htmlFor="desiredweight" className="form-label">Desired Weight</label>
      <input  defaultValue={currentUser.desiredweight} type="number" {...register("desiredweight")} id="desiredweight" className="form-control"/>
      </div>

      <button type="submit" className="btn btn-success">
        Submit
      </button>
    </form>
  </div>
  )
}

export default UserProfile