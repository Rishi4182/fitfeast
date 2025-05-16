import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { userContextObj } from '../../Contexts/UserContext'
import CartProduct from './CartProduct';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import './Cart.css';

function Cart() {
    const { currentUser, setCurrentUser } = useContext(userContextObj);
    const [totalCost, setTotalCost] = useState(0);
    const userProd = currentUser.userProducts || [];
    const navigate = useNavigate()
    
    // Calculate total cost correctly based on current cart items
    useEffect(() => {
        const calculatedTotal = userProd.reduce((total, item) => {
            return total + (item.price * (item.quantity || 1));
        }, 0);
        
        setTotalCost(calculatedTotal);
        
        // Update the cost in currentUser if it's different
        if (calculatedTotal !== currentUser.cost) {
            setCurrentUser({
                ...currentUser,
                cost: calculatedTotal
            });
        }
    }, [userProd, currentUser.cost]);
    
    return (
        <div className="cart-page">
            {userProd.length === 0 ? (
                <div className="empty-cart">
                    <div className="empty-cart-container">
                        <i className="bi bi-cart-x empty-cart-icon"></i>
                        <h2>Your Cart is Empty</h2>
                        <p>Looks like you haven't added any products to your cart yet.</p>
                        <Link to="/products" className="browse-products-btn">
                            Browse Products
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="cart-container">
                    <div className="cart-header">
                        <h1>Your Shopping Cart</h1>
                        <p>{userProd.length} {userProd.length === 1 ? 'item' : 'items'} in your cart</p>
                    </div>
                    
                    <div className="cart-content">
                        <div className="cart-items">
                            {userProd.map((item) => (
                                <div className="cart-item-wrapper" key={item._id || item.id}>
                                    <CartProduct p={item} />
                                </div>
                            ))}
                        </div>
                        
                        <div className="cart-summary">
                            <div className="summary-card">
                                <h2>Order Summary</h2>
                                
                                <div className="summary-row">
                                    <span>Subtotal</span>
                                    <span>${totalCost.toFixed(2)}</span>
                                </div>
                                
                                <div className="summary-row">
                                    <span>Shipping</span>
                                    <span>Free</span>
                                </div>
                                
                                <div className="summary-row total">
                                    <span>Total</span>
                                    <span>${totalCost.toFixed(2)}</span>
                                </div>
                                
                                <button className="checkout-btn" onClick={() => navigate('/checkout')}>
                                    Proceed to Checkout
                                </button>
                                {/* <Link to="/checkout" className="checkout-btn">
                                    Proceed to Checkout
                                </Link> */}

                                
                                <Link to="/products" className="continue-shopping">
                                    <i className="bi bi-arrow-left"></i> Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart;