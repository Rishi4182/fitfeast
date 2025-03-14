import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './Components/RootLayout'
import Home from './Components/Common/Home'
import Signin from './Components/Common/Signin'
import Signup from './Components/Common/Signup'
import UserProfile from './Components/User/UserProfile'
import UserContext from './Contexts/UserContext'
// import App from './App.jsx'

const browserRouterObj = createBrowserRouter([
  {
    path: "/", 
    element: <RootLayout/>, 
    children: [
      {
        path: "", 
        element: <Home/>
      },
      {
        path: "signin", 
        element: <Signin/>
      }, 
      {
        path: "signup", 
        element: <Signup/>
      }, 
      {
        path: "user-profile/:email", 
        element: <UserProfile/>
      }
    ]
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContext>
      <RouterProvider router = {browserRouterObj}/>
      {/* <App /> */}
      </UserContext>
  </StrictMode>,
)
