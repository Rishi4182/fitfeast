import {useContext} from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { useClerk , useUser } from '@clerk/clerk-react'
import { userContextObj } from '../../Contexts/UserContext'

const Header = () => {

  const {signOut} = useClerk()
  const {currentUser , setCurrentUser}=useContext(userContextObj)
  
  const navigate=useNavigate()

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


  return (
    <div>
      <nav className='header  d-flex justify-content-between align-content-cnetent py-3 '>
        <div className=' d-flex justify-content-center'>
          <Link href="/">
            LOGO
          </Link>
          <div>
            <ul className='text-white d-flex justify-content-center list-unstyled'>
              {!isSignedIn?(
                <>
                <li>
                  <Link to='signup' className='me-4'>
                    SignUp
                  </Link>
                </li>
                <li>
                  <Link to='signin' className='me-4'>
                    SignIn
                  </Link>
                </li>
                </>
              ):(
                <button onClick={handleSignOut} className='me-4'>
                  SignOut
                </button>
              )}

            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header