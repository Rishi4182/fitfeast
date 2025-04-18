import React, { useState , useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import {userContextObj} from '../../Contexts/UserContext'
import axios from 'axios'
// import './Product.css'

function Product(props) {

  const {currentUser, setCurrentUser} = useContext(userContextObj);
  const navigate=useNavigate()
  const [isInCart, setIsInCart] = useState(false);
  // const {counter,setCounter}=useState(0)
//  console.log(currentUser)


  useEffect(() => {
    if (currentUser && currentUser.userProducts) {
      setIsInCart(currentUser.userProducts.some(product => product._id === props.p._id));
    }
  }, [currentUser, props.p]);

  async function addToCart() {
    let temp=props.p.price
    // console.log(props.p)
    if (currentUser.email.length === 0) {
      navigate('/signin')
    } else {
      // get the user data by email
      const rep1 = await axios.get(`http://localhost:4000/user-api/users/${currentUser.email}`)
      if (rep1.data.message === "User Not Found") {
        // If user does not exist, create a new user
        await axios.post('http://localhost:4000/user-api/users', {...currentUser});
      }
      // update the userproducts field in database by using id
      const rep3 = await axios.get(`http://localhost:4000/user-api/users/${currentUser.email}`);
      let userProds = rep3.data.payload.userProducts
      await axios.put(`http://localhost:4000/user-api/users/${rep3.data.payload._id}`, {...currentUser, userProducts:[...userProds, props.p]})
      
      // Fetch updated user data
      const rep2 = await axios.get(`http://localhost:4000/user-api/users/${currentUser.email}`);
      rep2.data.payload.cost = rep2.data.payload.cost + temp 
      await axios.put(`http://localhost:4000/user-api/users/${rep3.data.payload._id}`, {cost:rep2.data.payload.cost})
      setCurrentUser(rep2.data.payload)
      // console.log(currentUser)
    }
    

    // setCounter(counter+1)
  }


 

  // console.log(props.p)
  return (
    // Own
    // <div className='ff-product-item card'>
    //     <div className="ff-product-item-head card-img-top">
    //         <img className = 'ff-product-item-img  ' src = {props.p.img} alt="" />
    //     </div>
    //     <div className="ff-product-item-body card-body">
    //         <h2 className="ff-product-item-title card-title">{props.p.title}</h2>
    //         <p className="ff-product-item-description card-text">{props.p.description}</p>
    //         <p className='ff-product-item-price card-text'>${props.p.price}</p>
    //         <button type="submit" className='btn btn-success text-white'>Add to Cart</button>
    //     </div>
    // </div>
    <div className='ff-product-item card h-100' style={{ height: "350px" }}>
    <div className="ff-product-item-head card-img-top d-flex justify-content-center">
        <img className='ff-product-item-img img-fluid' src={props.p.img} alt="" 
             style={{ height: "150px", width: "auto", objectFit: "cover" }} />
    </div>
    <div className="ff-product-item-body card-body d-flex flex-column">
        <h2 className="ff-product-item-title card-title text-truncate" style={{ fontSize: "1.2rem" }}>
            {props.p.title}
        </h2>
        <p className="ff-product-item-description card-text text-truncate">
            {props.p.description}
        </p>
        <p className='ff-product-item-price card-text fw-bold'>${props.p.price}</p>
        {/* <button type="submit" className='btn btn-success text-white mt-auto' onClick={addToCart}>Add to Cart</button> */}
        {
          isInCart ? (
            <button className='btn btn-light text-dark mt-auto' onClick={() => navigate('/cart')}>
              View Cart
            </button>
          ) : (
            <button className='btn btn-success text-white mt-auto' onClick={addToCart}>
              Add to Cart
            </button>
          )
        }
        {/* {
          currentUser.userProducts.map((Obj)=>{
            if (Obj === props.p) {
              return true 
            }
          }) ? (<button type="submit" className='btn btn-success text-white mt-auto' onClick={()=>{
            navigate('/cart')
          }}>View Cart</button>):(<button type="submit" className='btn btn-success text-white mt-auto' onClick={addToCart}>Add to Cart</button>)
        } */}
        
    </div>

</div>

  
  )
}

export default Product