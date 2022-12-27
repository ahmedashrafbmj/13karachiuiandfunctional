import React, {useState, useEffect} from 'react'
import {Table} from 'react-bootstrap'
import {useHistory} from "react-router-dom";
import axios from 'axios'
import { useSelector } from 'react-redux';

const Booking=(props)=>{


  

const products = useSelector((state) => state.cart);

const [totalWeight, setTotalWeight] = useState (products.cartTotalWeight);
const [deliveryCharges, setDeliveryCharges] = useState(0);
const [totalamountn, setTotalAmountn] = useState(products.cartTotalAmount);

const [hotel, setHotel] = useState([0]);

const [delcharges, setdelCharges] = useState(0);

const [weightapi, setWeightApi] = useState(0);


console.log(products.cartItems, 'redux product state')
console.log(localStorage.getItem('cartItems'), 'localstorage product state')


const history = useHistory()




const [uemail, setuemail] = useState('')

const [uprice, setuprice] = useState('')

const [tprice, settprice] = useState('')

const [contact, setcontact] = useState('')

const [prod, setProd] = useState([0])




const [productDetail, setproductDetail] = useState({
  
  shippingOne: "",
  shippingTwo: "",
  orderCity: "",
  deliveryPlan: "",


})
    







const addPost=()=>{

  

  
        const getdate = new Date().toLocaleString()

        const headers = { "Content-Type": "application/json" };
        axios.post(`https://13k.up.railway.app/api/bookingpostdata`,{

          
          
            
          //   cartItems : [prod[0].cartItems.map((element)=>{
              
                
          //     cartQuantity: prod[0].cartItems[element.cartQuantity]
                  
              

          //   })
          // ],

          //   cartItems : 
             
          //  {
            
          //             prodid: prod[0].cartItems[i].prodid,
          //             cartQuantity:prod[0].cartItems[i].cartQuantity,

          //  }
          //     },
              
    
    
            

     
      
      
      // cartItems: [

      //         {
      //           prodid: prod[0].cartItems[0].prodid,
      //           cartQuantity: prod[0].cartItems[0].cartQuantity,
      //           hotelname: prod[0].cartItems[0].hotelname,
      //           imageURL: prod[0].cartItems[0].imageURL,
      //           productName: prod[0].cartItems[0].productName,
      //           productPrice: prod[0].cartItems[0].productPrice,
      //           qty: prod[0].cartItems[0].qty,
      //           userEmail: prod[0].cartItems[0].userEmail,
      //           prodarea: prod[0].cartItems[0].prodarea,
      //           prodmarketname: prod[0].cartItems[0].prodmarketname,
      //           productTitle: prod[0].cartItems[0].productTitle,
      //           productWeight: prod[0].cartItems[0].productWeight,
      //           category: prod[0].cartItems[0].category,
      //           productSize: prod[0].cartItems[0].productSize,
      //           productColor: prod[0].cartItems[0].productColor,

      //       },
            
      //       {

      //         prodid: prod[0].cartItems[1].prodid,
      //         cartQuantity: prod[0].cartItems[1].cartQuantity,
      //         hotelname: prod[0].cartItems[1].hotelname,
      //         imageURL: prod[0].cartItems[1].imageURL,
      //         productName: prod[0].cartItems[1].productName,
      //         productPrice: prod[0].cartItems[1].productPrice,
      //         qty: prod[0].cartItems[1].qty,
      //         userEmail: prod[0].cartItems[1].userEmail,
      //         prodarea: prod[0].cartItems[1].prodarea,
      //         prodmarketname: prod[0].cartItems[1].prodmarketname,
      //         productTitle: prod[0].cartItems[1].productTitle,
      //         productWeight: prod[0].cartItems[1].productWeight,
      //         category: prod[0].cartItems[1].category,
      //         productSize: prod[0].cartItems[1].productSize,
      //         productColor: prod[0].cartItems[1].productColor,

      //       },
      //       {
            
      //         prodid: prod[0].cartItems[2].prodid,
      //         cartQuantity: prod[0].cartItems[2].cartQuantity,
      //         hotelname: prod[0].cartItems[2].hotelname,
      //         imageURL: prod[0].cartItems[2].imageURL,
      //         productName: prod[0].cartItems[2].productName,
      //         productPrice: prod[0].cartItems[2].productPrice,
      //         qty: prod[0].cartItems[2].qty,
      //         userEmail: prod[0].cartItems[2].userEmail,
      //         prodarea: prod[0].cartItems[2].prodarea,
      //         prodmarketname: prod[0].cartItems[2].prodmarketname,
      //         productTitle: prod[0].cartItems[2].productTitle,
      //         productWeight: prod[0].cartItems[2].productWeight,
      //         category: prod[0].cartItems[2].category,
      //         productSize: prod[0].cartItems[2].productSize,
      //         productColor: prod[0].cartItems[2].productColor,

      //       },
      //     ],
      

            userEmail: localStorage.getItem('user'),
            orderContact: localStorage.getItem('contact'),
            hotelDate : getdate,
            paymentstatus : "Pending",
            shippingOne : productDetail.shippingOne,
            shippingTwo : productDetail.shippingTwo,
            orderCity:    productDetail.orderCity,
            orderState: "Sindh",
            totalBillAmount : products.cartTotalAmount,

            

            deliveryChargesOne : delcharges,
            deliveryChargesTwo : deliveryCharges,
            totalNetAmount : totalamountn,




            cartItems:  products.cartItems.map((productlist)=>(
         
              {

              _id: productlist._id,
              cartQuantity: productlist.cartQuantity,
              hotelname: productlist.hotelname,
              imageURL: productlist.imageURL,
              productName: productlist.productName,
              productPrice: productlist.productPrice,
              qty: productlist.qty,
              userEmail: productlist.userEmail,
              prodarea: productlist.prodarea,
              prodmarketname: productlist.prodmarketname,
              productTitle:productlist.productTitle,
              productWeight: productlist.productWeight,
              category: productlist.category,
              productSize: productlist.productSize,
              productColor: productlist.productColor,
              }
            
            
          ))




},{
headers,
})

.then((success)=>{
console.log('success',success)
history.push('/Bookingcomplete')
})

.catch((err)=>{
    console.log('error',err)

})

}
    

            
const getuser=()=>{

    let useremail = localStorage.getItem('user');

    setuemail(useremail);


    let userprice = localStorage.getItem('price');

    setuprice(userprice);

    let contact = localStorage.getItem('contact');
    setcontact(contact)

    console.log(contact, 'contact')

}



    const olist = products.cartItems.map((productlist)=>{

      console.log(productlist.productPrice, 'price')


     })



const totdel=()=>{

//  let upto500Gram = 120;
//  let fivehundred1to1kg = 150; 
//  let eachkg = 120;

 let upto500Gram = weightapi.upto500Gram;
 let fivehundred1to1kg = weightapi.fivehundred1to1kg; 
 let eachkg = weightapi.eachkg;


if (productDetail.orderCity == "Karachi") {

if (productDetail.deliveryPlan == "Charges for Over Night"){
  



if (totalWeight <= 0.5){ /*equal and less then*/
  setDeliveryCharges(upto500Gram)
  
}

else if 
  (totalWeight >= 0.51 && totalWeight <= 1){ /*equal and greater then*/
  setDeliveryCharges(fivehundred1to1kg)
}

else if 
  (totalWeight > 1 && totalWeight <=2){ /* greater then*/
  setDeliveryCharges(fivehundred1to1kg + eachkg)
}

else if 
  (totalWeight > 2 && totalWeight <=3){ /* greater then*/
  setDeliveryCharges(fivehundred1to1kg + eachkg * 2)  
}

else if 
  (totalWeight > 3 && totalWeight <=4){ /* greater then*/
  setDeliveryCharges(fivehundred1to1kg + eachkg * 3)  
}


else if 
  (totalWeight > 4 && totalWeight <=5){ /* greater then*/
  setDeliveryCharges(fivehundred1to1kg + eachkg * 4)  
}

else if 
  (totalWeight > 5 && totalWeight <=6){ /* greater then*/
  setDeliveryCharges(fivehundred1to1kg + eachkg * 5)  
}

else if 
  (totalWeight > 6 && totalWeight <=7){ /* greater then*/
  setDeliveryCharges(fivehundred1to1kg + eachkg * 6)  
}

else if 
  (totalWeight > 7 && totalWeight <=8){ /* greater then*/
  setDeliveryCharges(fivehundred1to1kg + eachkg * 7)  
}

else if 
  (totalWeight > 8 && totalWeight <=9){ /* greater then*/
  setDeliveryCharges(fivehundred1to1kg + eachkg * 8)  
}

else if 
  (totalWeight > 9 && totalWeight <=10){ /* greater then*/
  setDeliveryCharges(fivehundred1to1kg + eachkg * 9)  
}

else if 
  (totalWeight > 10 && totalWeight <=11){ /* greater then*/
  setDeliveryCharges(fivehundred1to1kg + eachkg * 10)  

}

}



else {
  alert("Please Choose Delivery Charges Plan")
}

}



else{
    alert("Please Choose Your City For Delivery Charges")
}

}






const fetchFlat = async () => {
  const res = await fetch('https://13k.up.railway.app/api/flatid/6349c7e9d21e304d9e00a547');
  const data = await res.json();
  console.log(data, "all flat");
  setHotel(data)
  setdelCharges(data.flat)

};


const fetchWeight = async () => {
  const res = await fetch('https://13k.up.railway.app/api/weightid/636522f618af3a1d34c3e90d');
  const data = await res.json();
  console.log(data.upto500Gram, "all weight");
  setWeightApi(data)
 
};




useEffect(() => {

  fetchFlat()
  fetchWeight()
    getuser()
    



    const getdate = new Date().toLocaleString()
    console.log(getdate, 'date')

    let arr = [];

    arr.push(products);
    
    setProd(arr)
    console.log(arr, 'array')
    
}, []);

console.log(prod, 'local state prod')





return(

<>



<div class="container">
  <div class="row justify-content-md-center">
   
    <p class="h1">Check Out</p>
  
    </div>
    </div>

    <br />

{/* <div className='MainDiva'> */}


<div class="container">
  <div class="row">

  <div class="col-8">
  <form>
  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Email</label>
      <input type="email" value= {localStorage.getItem('user')} class="form-control" id="inputEmail4" />
    </div>
    <div class="form-group col-md-6">
      <label for="inputContact">Contact Number</label>
      <input type="text" value={localStorage.getItem('contact')} class="form-control" id="inputContact" />
    </div>
  </div>
  <div class="form-group">
    <label for="inputAddress">Shipping Address</label>
    <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" onChange=  { (e)=>{setproductDetail({...productDetail, shippingOne: e.target.value})} }/>
  </div>
  <div class="form-group">
    <label for="inputAddress2">Shipping Address 2</label>
    <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"onChange= { (e)=>{setproductDetail({...productDetail, shippingTwo: e.target.value})} } />
  </div>
  <div class="form-row">

  <div class="form-group col-md-6">
      <label for="inputState">City</label>
      <select  class="form-control" onChange=  { (e)=>{setproductDetail({...productDetail, orderCity: e.target.value})} }>
        <option selected>Choose...</option>
        <option>Karachi</option>
        <option>Lahore</option>
        <option>Islamabad</option>
      </select>
    </div>

    <div class="form-group col-md-6">
      <label for="inputState">State</label>
      <select id="inputState" class="form-control">
        <option selected>Sindh</option>
        {/* <option>Sindh</option> */}
      </select>
    </div>

  </div>
  <div class="form-group">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="gridCheck" />
      <label class="form-check-label" for="gridCheck">
        I Accept Terms & Conditions
      </label>
    </div>
  </div>
  <button type="button" class="btn btn-primary" onClick={()=>{addPost()}}>Check Out</button>


 


</form>

    </div>


    <div class="col-4">

    <div class="card text-center">
  <div class="card-header">
    Cart Information
  </div>
  <div class="card-body">
    {/* <h5 class="card-title">Special title treatment</h5> */}
    <p class="card-text">

    

    </p>

    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Sno</th>
                                <th>Other Info</th>
                                <th> Image</th>

                               
  
                            
                            </tr>
                        </thead>

                        <tbody>
            
                            {products.cartItems &&
                                products.cartItems.map((element, id) => {
                                    return (


                                        <>
                                            <tr>
                                                <td>{id + 1}</td>
                                                <td> {element.productTitle}
                                                <br />
                                                
                                                {element.productName}
                                                <br />
                                                <hr />
                                                Weight: {element.productWeight}
                                                <br />
                                                 Qty: {element.cartQuantity}
                                                <br />
                                                Price: {element.productPrice}

                                                <br />
                                                Total: {element.productPrice * element.cartQuantity}

                                                <br />
                                                Total Weight: {element.productWeight * element.cartQuantity}

                                          
                                                </td>
                                            
                                            
                                                <td><img src={element.imageURL} width='100px'></img></td>
     

                                      

                                                
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </Table>

  
  </div>
  <div class="card-footer text-muted">
  
  Total Weight: {totalWeight}
  
  <br />

  <select  class="form-control" onChange=  { (e)=>{setproductDetail({...productDetail, deliveryPlan: e.target.value})} }>
        <option selected>Choose Delivery Plan...</option>
        <option >Charges for Over Night</option>
        <option>Charges for Detail</option>
        <option>Chargegs for Over Land</option>
        
      </select> 
      
      <br />
      <button type="button" class="btn btn-primary" onClick={()=>{totdel()}}>With-in-City</button>


      <br />
      <br />
  Total Bill Amount: Rs.{products.cartTotalAmount}/-
  <br />

{
  
  productDetail.deliveryPlan === "Charges for Over Night" ? `Weight Rate: ${deliveryCharges}`

  :

 `Flat Rate: ${hotel.flat}`  

}




<br />
 


{
  
  productDetail.deliveryPlan === "Charges for Over Night" ? `Net Bill Amount: Rs.${totalamountn + deliveryCharges}`

  :

 `Net Bill Amount: Rs.${totalamountn + hotel.flat}`  

}



  </div>
</div>
        </div>

  </div>
  </div>





{/* </div> */}

</>


)

}

export default Booking;
