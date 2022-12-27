
import React, {useEffect, useState} from 'react';

import { useSelector, useDispatch,} from 'react-redux';
import { remove } from '../../store/cartSlice2';
import { Link } from 'react-router-dom';



const Cart = () => {

    const [qty, Setqty] = useState(1);
    const [tamount, setTamount] = useState(0);
 

    const dispatch = useDispatch();
    const products = useSelector((state) => state.cart);
    

    
    const totalPurchase =()=>{

        let sum = products.reduce(function(prev, current) {
            return prev + +current.productPrice
          }, 0);
          console.log(sum)
          setTamount(sum);
    
    }

    useEffect(()=>{


        totalPurchase();    
        
        }, [()=>pamountfunc()])

    const handleRemove = (productId) => {
        
        dispatch(remove(productId));
    

    };


const pamountfunc=()=>{

    let sum2 = products.reduce(function(prev2, current2) {
        return prev2 + +current2.productPrice
      },0 );

      console.log(sum2, 'remove sum')
     

  
}

const addqty=()=>{
    Setqty(qty + 1)
}

    return (
        <div>
            <h3>Cart</h3>
            <div className="cartWrapper">
                {products.map((product) => (
                    <div className="cartCard">
                        <img src={product.imageURL} alt="" />
                        <h5>{product.productName}</h5>
                        <button onClick={()=>addqty(product._id)}>Add Qty</button>
                        <input value={qty}></input>
                        <h5>{product.productPrice}</h5>

                        <button
                            className="btn"
                            onClick={() => handleRemove(product._id)
                                
                            }
                        >
                            Remove
                        </button>

                    </div>

                   
                
                ))}

<hr />

<h3>Total Amount: {tamount}</h3>
<br />
<Link to="/Booking"><a class="btn btn-primary" role="button">Proceed to Check Out</a></Link>

            </div>
        </div>
    );
};

export default Cart;
