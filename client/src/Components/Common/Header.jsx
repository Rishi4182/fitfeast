import {useContext} from 'react'
import { Link , useNavigate, useLocation } from 'react-router-dom'
import { useClerk , useUser } from '@clerk/clerk-react'
import { userContextObj } from '../../Contexts/UserContext'
import  logo from "../../assets/logo.png"
import './Header.css'

const Header = () => {

  const {signOut} = useClerk()
  const {currentUser , setCurrentUser}=useContext(userContextObj)
  
  const navigate=useNavigate()
  const location=useLocation()

  const {isSignedIn ,user , isLoaded }= useUser() ; 
  const handleSignOut = async ()=>{
    console.log("signout called")
    try{
      await signOut();
      setCurrentUser(null)
      navigate('/')
    }
    catch(err){
      console.log("Error Signed Out" , err)
    }
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active-link' : '';
  };


  return (
    <header className='site-header'>
      <div className='header-container'>
        <div className='logo-container'>
          <Link to="/" className="logo-link">
            <div className="logo">
              <img src={logo} alt="" className='smmm'/>
            </div>
          </Link>
        </div>
          <nav className='main-navigation'>
            <ul className='nav-links'>
              <li>
                <Link to='/' className={`nav-link ${isActive('/')}`}>
                  Home
                </Link>
              </li>
              <li>
                <Link to='/products' className={`nav-link ${isActive('/products')}`}>
                  Products
                </Link>
              </li>
              {isSignedIn && (
                <li>
                  <Link to='/plans' className={`nav-link ${isActive('/plans')}`}>
                    Plans
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          <div className='auth-container'>
            {!isSignedIn?(
              <div className='auth-buttons'>
                <Link to='/signup' className='auth-button signup'>
                  SignUp
                </Link>
                <Link to='/signin' className='auth-button signin'>
                  SignIn
                </Link>
              </div>
            ):(
              <div className="user-menu">
                <Link to='/saved-plans' className='me-4'>
                  View Saved Plans
                </Link>
                <Link to="/cart" className="cart-link">
                  <span className="cart-icon">🛒</span>
                </Link>
                <div className="user-profile-dropdown">
                  <div className="user-avatar">
                    {currentUser?.profileImageUrl ? (
                      <img src={currentUser.profileImageUrl} alt={currentUser.firstName} />
                    ) : (
                      <div className="avatar-placeholder">{currentUser?.firstName?.charAt(0) || 'U'}</div>
                    )}
                    <span className="user-name">{currentUser?.firstName}</span>
                  </div>
                  <div className="dropdown-content">
                    <Link to={`/user-profile/${currentUser?.email}`} className="dropdown-item">
                      My Profile
                    </Link>
                    <button onClick={handleSignOut} className="dropdown-item signout-button">
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        <button className="mobile-menu-toggle">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </header>
  )
}

export default Header