import React from 'react'
import Header from './Common/Header'
import Footer from './Common/Footer'
import { Outlet } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if(!PUBLISHABLE_KEY){
  throw new Error("Missing Publishable key")
}


function RootLayout() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <div>
          <Header/>
          <div style={{minHeight:"90vh"}}>
              <Outlet/>
          </div>
          <Footer/>
      </div>
    </ClerkProvider>
  )
}

export default RootLayout