import React, {useState, useEffect} from 'react'
import {useHistory} from "react-router-dom";
import UserNavbar from './UserNavbar';
import { useDispatch, useSelector } from "react-redux";


// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import {Table} from 'react-bootstrap'




const Userbooking=(props)=>{

    const history = useHistory()   
      

      const [userState, setUserState] = useState([]);

      const [useremail, setuserEmail] = useState([]);




const getdata = async () => {

    const findEmail2 = localStorage.getItem('user'); 
    console.log(findEmail2, 'email')

    const res = await fetch(`/api/allbookbyemail/${findEmail2}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
        
    });

    const data = await res.json();
    // console.log(data[4].cartItems[0].hotelname, 'obj');
    setUserState(data); 
    
    document.title = findEmail2;

}



useEffect(()=>{

  
    getdata()

    setuserEmail(localStorage.getItem('user'));

}, [])

const routeto=()=>{

    let roleuseradmin = localStorage.getItem('role');
           console.log(roleuseradmin, 'roleuseradmin')
    
    if (roleuseradmin === 'User'){
        history.push('/userbooking')
    }else{
        history.push('/welcome')
    }
 
}

useEffect(() => {

    routeto()
    
 
    
    }, []);

    console.log(userState, 'bookingdata')
// console.log(userState.cartItems, 'main')

return(

<>

<UserNavbar />

<br />

<div className='Heading'><h1>My Orders </h1> 

<br />



</div>



{/* <h1>{useremail}</h1> */}



<div className='MainDiva'>




<Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Sno</th>
                                <th>Date and Order ID</th>
                                <th> Product Status</th>
                        
                                <th> Shipping</th>
                                <th> Total Bill</th>
                                <th> Action</th>
               
                               
  
                            
                            </tr>
                        </thead>

                        <tbody>
                        {/* userState.slice(0, 5).map((element, id) => { */}
                            {
                                userState.map((element, id) => {
                                    
                                    return (


                                        <>
                                            <tr>
                                                <td>{id + 1}</td>
                                                <td>{element._id} 
                                                <br />
                                                {element.hotelDate}
                                                </td>
                                                <td>{element.paymentstatus}</td>
    
                                               
                                                <td>Address1: {element.shippingOne}
                                                <br />
                                                Address2: {element.shippingTwo}
                                                <br />
                                                City: {element.orderCity}
                                                <br />
                                                State: {element.orderState}
                                                <br />
                                                Contact: {element.orderContact}
                                                </td>
                                                
                                                <td>Total: {element.totalBillAmount}
                                                <br />
                                                Charges: {element.deliveryCharges}
                                                <br />
                                                Net: {element.totalNetAmount}
                                                </td>

                                                <td><a class="btn btn-primary" href={`userbookingdetails/${element._id}`} role="button">Order Details</a></td>
                                                
                                      

                                                
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </Table>







</div>


</>


)

}

export default Userbooking;
