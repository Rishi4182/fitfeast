import React from 'react'
import { SignUp } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import './Auth.css'

function Signup() {
  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-panel">
          <div className="auth-header">
            <h1>Create Account</h1>
            <p>Join our community and start exploring</p>
          </div>
          
          <div className="clerk-container">
            <SignUp />
          </div>
          
          <div className="auth-footer">
            <p>Already have an account? <Link to="/signin" className="auth-link">Sign In</Link></p>
          </div>
        </div>
        
        {/* <div className="auth-image signup-image">
          <div className="image-overlay">
            <h2>Start Your Journey</h2>
            <p>Create an account to unlock all features and benefits</p>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default Signup