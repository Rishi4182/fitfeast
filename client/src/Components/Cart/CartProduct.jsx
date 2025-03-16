import React from 'react'
import './Product.css'

function CartProduct(props) {
    // console.log(props.p)
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
    </div>
</div>
  )
}

export default CartProduct