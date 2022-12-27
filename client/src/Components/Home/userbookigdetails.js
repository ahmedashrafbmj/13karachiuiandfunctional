import React, {useState, useEffect} from 'react'
import {useHistory} from "react-router-dom";
import UserNavbar from './UserNavbar';
import { useDispatch, useSelector } from "react-redux";
import {useParams} from 'react-router-dom';


// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import {Table} from 'react-bootstrap'




const Userbookingdetails=(props)=>{

    const history = useHistory()   
      


      const [useremail, setuserEmail] = useState([]);

      const [orders, setOrders] = useState([])



      const { id } = useParams("");
      console.log(id);
  
  
  
      const getdata = async () => {
  
          const res = await fetch(`/api/getbookuserid/${id}`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json"
              }
          });
  
          const data = await res.json();
          console.log(data, 'booking id data');
  
     if (res.status === 422 || !data) {
    console.log("error ");
  
  } else {
      setOrders(data)
     
  
  console.log("get data");
  
  
   }
      }
  




useEffect(()=>{

  
    getdata()

    setuserEmail(localStorage.getItem('user'));

}, [])

// const routeto=()=>{

//     let roleuseradmin = localStorage.getItem('role');
//            console.log(roleuseradmin, 'roleuseradmin')
    
//     if (roleuseradmin === 'User'){
//         history.push('/userbookingdetails')
//     }else{
//         history.push('/welcome')
//     }
 
// }

// useEffect(() => {

//     routeto()
    
 
    
//     }, []);


// console.log(userState.cartItems, 'main')

return(

<>

<UserNavbar />

<br />
<br />





{/* <h1>{useremail}</h1> */}






<div class="col-12">

    <div class="card text-center">
  <div class="card-header">
<h5 class="card-title">Order Details</h5>
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
            
                            {orders.cartItems &&
                                orders.cartItems.map((element, id) => {

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
                                            
                                            
                                                <td><img src={element.imageURL} width='200px'></img></td>
     

                                      

                                                
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </Table>

  
  </div>
</div>
</div>
</>


)

}

export default Userbookingdetails;
