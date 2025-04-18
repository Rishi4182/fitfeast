import React from 'react'
import { SignIn } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import './Auth.css'

function Signin() {
  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-panel">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to access your account</p>
          </div>
          
          <div className="clerk-container">
            <SignIn />
          </div>
          
          <div className="auth-footer">
            <p>Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin