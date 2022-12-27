import React, {useState, useEffect} from 'react'
import Header from '../Main/Header'

import {useHistory} from "react-router-dom";
import axios from 'axios';
import { border } from '@mui/system';
import Button from '@mui/material/Button';
import { Alert } from '@mui/material';
import { AlertTitle } from '@mui/material';



const Bookingadmin=(props)=>{

    const history = useHistory()   
      

      const [userState, setUserState] = useState([]);

      const [useremail, setuserEmail] = useState([]);

      const [hotelname, sethotelname] = useState([]);


const getdata = async () => {

    const findEmail2 = localStorage.getItem('user'); 

    const res = await fetch(`/api/allbookbyemailadmin/${findEmail2}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
        
    });

    const data = await res.json();
    console.log(data);
    setUserState(data);    

}


const gethotelname = async () => {
    // http://localhost:4000/api/allpostdata

    // `http://localhost:4000/api/postbyemail/${useremail}`
    const findEmail = localStorage.getItem('user'); 
    console.log(findEmail)

    const res3 = await fetch(`/api/postbyemailsignup/${findEmail}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
        
    });

    const hotel = await res3.json();
    sethotelname(hotel[0]?.hotelname);

  
}

localStorage.setItem('hotel', [hotelname])  
console.log(hotelname);

useEffect(()=>{

    gethotelname()
    
}, []);


     

useEffect(()=>{
    const udata = localStorage.getItem('user');    
    setuserEmail(udata); 
    
    getdata()



    

}, []);





///delelte single data

const deletedata = async (id) => {
    // http://localhost:4000/api/allpostdata

    const res2 = await fetch(`/api/deletepost/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
        
        
    });
alert("delete successfully")

    // const deletepost = await res2.json();
    // console.log(deletepost);
    // setUserState(deletepost);
    
    getdata()

}

const routeto=()=>{

    let roleuseradmin = localStorage.getItem('role');
           console.log(roleuseradmin, 'roleuseradmin')
    
    if (roleuseradmin === 'Admin'){
        history.push('/bookingadmin')
    }else{
        history.push('/')
    }
 
}

useEffect(() => {

    routeto()
    
    
    }, []);


return(

<>
<Header />
<br />
<br />

<div className='Heading'><h1> Name: {hotelname}</h1> 
<br />

{/* <h1>{useremail}</h1> */}





</div>



<div className='MainDiva'>



<table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Hourly Price</th>
                                <th>Hour</th>
                                <th>Price</th>
                                <th>Contact</th>
                                <th>Address</th>
                                <th>Payment Status</th>
                                <th>User Email</th>
                                <th> Image</th>
                                <th> ID</th>
                                <th>Edit</th>
                                {/* <th>View</th> */}
                                <th>Delete</th>
                               
  
                            
                            </tr>
                        </thead>

                        <tbody>
            
                            {
                                userState.map((element, id) => {
                                    return (


                                        <>
                                            <tr>
                                                <th scope="row">{id + 1}</th>
                                                <td>{element.productName}</td>
                                                <td>{element.productPrice}</td>
                                                <td>{element.hotelPrice}</td>
                                                <td>{element.qty}</td>
                                                <td>{element.category}</td>
                                                <td>{element.paymentstatus}</td>
                                                <td>{element.userEmail}
                                                <br />
                                                {element.hotelDate}</td>
                                                <td><img src={element.imageURL} height='100px'></img></td>
                                                <td>{element._id}</td>
                                                <td><Button sx= {{marginRight: 5}}  variant="contained" href={`Edit/${element._id}`}>Edit</Button></td>
                                                {/* <td><Button sx= {{marginRight: 5}}  variant="contained" href={`View/${element._id}`}>View</Button></td> */}
                                                <td><Button sx= {{marginRight: 5}}  variant="contained" onClick={() => deletedata(element._id)}>Delete</Button></td>
                                      

                                                
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>







</div>

</>


)

}

export default Bookingadmin;
