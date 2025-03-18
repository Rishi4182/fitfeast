import React from 'react'
import { useContext } from 'react';
import { userContextObj } from '../../Contexts/UserContext'
import CartProduct from './CartProduct';

function Cart() {

    const {currentUser, setCurrentUser} = useContext(userContextObj);
    let userProd = currentUser.userProducts
    // console.log(userProd)

  return (
    <div>
        {
             userProd.length === 0 ? (
             <h1>Your Cart is Empty</h1>
            ) : (
             <div className='container mx-auto mt-5 mb-2'>
                <h1>Total Cost : ${currentUser.cost}</h1>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-gap-3">
                    {
                        userProd.map((Obj)=>{
                            return (
                            <div className="col" key={Obj._id}>
                                <CartProduct p={Obj}/>
                            </div>
                            );
                        })
                       
                    }
                </div>
             </div>
            )
        }
    </div>
  )
}

export default Cart