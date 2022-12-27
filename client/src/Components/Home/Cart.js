import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "../../store/cartSlice";

import { Link } from "react-router-dom";

const Cart = () => {
  const [psizes, setpSize] = useState([0]);
  const [pcolors, setpcolor] = useState([0]);
  const [arrdata, setarrData] = useState([0]);
  const [productDetail, setproductDetail] = useState({
  

    productSize: "",

  })


  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();


      const fetchDetails = async (id) => {

        const res = await fetch(`https://13k.up.railway.app/api/getuser/${id}`);
        const data = await res.json();
        console.log(data);
        setarrData(data);


        let uniqueArr = [... new Set(arrdata.multiProd.map(data => data.productSize))]
        console.log(uniqueArr, 'size')
        
        setpSize(uniqueArr)
        console.log(psizes, 'state size')
    
        // let uniqueArr2 = [(arrdata.multiProd.map(data2 => data2.productColor))]
    
        console.log(productDetail.productSize, 'select')


    };


const checkColor=(()=>{

    let arr = []
    let fetchcolor = arrdata.multiProd.map((color)=>{
        if (color.productSize === productDetail.productSize){

            arr.push([color.productColor])
        }
        setpcolor(arr)
        console.log(arr, 'color')
    })

})



  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const handleDecreaseCart = (product) => {
    dispatch(decreaseCart(product));
  };
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart());


  };
  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is currently empty</p>
          <div className="start-shopping">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-arrow-left"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                />
              </svg>
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
           
          </div>
          <div className="cart-items">
            {cart.cartItems &&
              cart.cartItems.map((cartItem) => (
                <div className="cart-item" key={cartItem._id}>
                  <div className="cart-product">
                    <img src={cartItem.imageURL} alt={cartItem.productName} />
                    <div>
                      <h3>{cartItem.productName}</h3>
                      <p>{cartItem.category}</p>
                      <p>{cartItem.productWeight} KG</p>
                      <p>{cartItem.productSize} </p>
                      <p>{cartItem.productColor}</p>
                    


                      


<select class="form-control" onChange={ (e) =>{setproductDetail({...productDetail, productSize: e.target.value })} } onClick={() => fetchDetails(cartItem._id)}>

<option selected >Choose Size</option>
<h5>Size:</h5>

{psizes.map((category) => (


<option>{category}</option>




))}

</select>





<hr />    




  <select class="form-control"  onClick={() => checkColor()}>

<option selected >Choose Color</option>
<h5>Color:</h5>

{pcolors.map((category) => (


<option>{category}</option>




))}

</select>



                     
                      <button onClick={() => handleRemoveFromCart(cartItem)}>
                        Remove
                      </button>
                    </div>
                  </div>

      


                  <div className="cart-product-price">Rs.{cartItem.productPrice}/-</div>
                  <div className="cart-product-quantity">
                    <button onClick={() => handleDecreaseCart(cartItem)}>
                      -
                    </button>
                    <div className="count">{cartItem.cartQuantity}</div>
                    <button onClick={() => handleAddToCart(cartItem)}>+</button>
                  </div>
                  <div className="cart-product-total-price">
                    Rs.{cartItem.productPrice * cartItem.cartQuantity}/-
                    <br />
                    <br />
                    <br />
                    
                    {cartItem.productWeight * cartItem.cartQuantity} KG

                  </div>
                </div>
              ))}
          </div>
          <div className="cart-summary">
            <button className="clear-btn" onClick={() => handleClearCart()}>
              Clear Cart
            </button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">Rs.{cart.cartTotalAmount}/-</span>
              </div>
              <p>Taxes and shipping calculated at checkout</p>
              <Link to="/Booking"><a class="btn btn-primary" role="button">Proceed to Check Out</a></Link>
              <div className="continue-shopping">
                <Link to="/">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
