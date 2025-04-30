import React, { useContext } from 'react'
import './Product.css'
import { userContextObj } from '../../Contexts/UserContext'
import axios from 'axios'

function CartProduct(props) {
    // console.log(props.p)

    const {currentUser,setCurrentUser}=useContext(userContextObj)

    async function deleteItem(){
        let temp = props.p.price
        let id=props.p.id
        // console.log(id)
        let updatedUserProducts=currentUser.userProducts.filter(product=>product.id!=id)
        // console.log(updatedUserProducts)
        
        await axios.put(`http://localhost:4000/user-api/users/${currentUser._id}`,{...currentUser,userProducts:updatedUserProducts})

        const rep=await axios.get(`http://localhost:4000/user-api/users/${currentUser.email}`)
        rep.data.payload.cost=rep.data.payload.cost - temp
        await axios.put(`http://localhost:4000/user-api/users/${rep.data.payload._id}`, {cost:rep.data.payload.cost})
        setCurrentUser(rep.data.payload);
        // console.log(rep.data.payload)
    }




  return (
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
        <button className='btn btn-danger ' onClick={deleteItem}>Remove</button>

    </div>
</div>
  )
}

export default CartProduct