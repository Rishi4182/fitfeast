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
import Products from './Components/Cart/Products'
import Cart from './Components/Cart/Cart'
import Plan from './Components/Plans/Plan'
import './App.css'
import FilterContext from './Contexts/FilterContext'
import SavedPlans from './Components/Plans/SavedPlans'
import MealPlanner from './Components/Plans/MealPlanner'
import PlanContext from './Contexts/PlanContext'
import Checkout from './Components/Cart/Checkout'
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
        path:"products",
        element:<Products/>
      },
      {
        path:"plans",
        element:<Plan/>
      },
      {
        path:"meals",
        element:<MealPlanner/>
      },
      {
        path:"cart",
        element:<Cart/>
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
      }, 
      {
        path: "saved-plans", 
        element: <SavedPlans/>
      },
      {
        path:"checkout",
        element:<Checkout/>
      }
    ]
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContext>
      <FilterContext>
        <PlanContext>
          <RouterProvider router = {browserRouterObj}/>
          </PlanContext>
      </FilterContext>
      {/* <App /> */}
      </UserContext>
  </StrictMode>,
)
