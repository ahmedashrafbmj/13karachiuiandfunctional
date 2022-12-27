import React, {useState, useEffect} from 'react'
import Header from '../Main/Header'
import Sheader from '../Main/sHeader'

import {useHistory} from "react-router-dom";
import axios from 'axios';
import { border } from '@mui/system';
import Button from '@mui/material/Button';
import { Alert } from '@mui/material';
import { AlertTitle } from '@mui/material';



const Welcome=(props)=>{

    const history = useHistory()   

    const [roleau, setroleau] = useState ('');
      const [userState, setUserState] = useState([]);
      const [accountStatus, setAccountStatus] = useState([]);

      const [useremail, setuserEmail] = useState([]);

      const [hotelname, sethotelname] = useState([]);


const getdata = async () => {

    const findEmail2 = localStorage.getItem('user'); 
    // http://localhost:4000/api/allpostdata

    // `http://localhost:4000/api/postbyemail/${useremail}`

    // /api/allpostdata

    const res = await fetch(`/api/postbyemail/${findEmail2}`, {
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
    
}, [accountStatus]);


     

useEffect(()=>{
    const udata = localStorage.getItem('user');    
    setuserEmail(udata); 
    
    getdata()



    

}, [accountStatus]);


const routeto=()=>{

    let roleuseradmin = localStorage.getItem('role');
    console.log(roleuseradmin, 'roleuseradmin')
    
    const roleua3 = localStorage.getItem('accountstatus');

     if (roleuseradmin === 'Admin'  && roleua3 === 'Enabled'){
        history.push('/welcome')
    }

    else if (roleuseradmin == 'Admin' && roleua3 === 'Disabled'){
        history.push('/accountstatus')
    }

    else if (roleuseradmin === 'Super'){
        history.push('/welcome2')
    }
    
    else{
        history.push('/')
    }
 
}

useEffect(() => {
    // getroleauth()
    routeto()
    getrole()
    
    
    }, [accountStatus]);



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

const getrole=()=>{

    let roleuser = localStorage.getItem('role');

    setroleau(roleuser);
    console.log(roleau, 'roleg')

   

}


const getroleauth = async () => {
    
    let femail = localStorage.getItem('user');

    const res3 = await fetch(`/api/postbyemailsignup/${femail}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
        
    });


   
    const role = await res3.json();

    setAccountStatus(role[0]?.accountsstatus)

    console.log(accountStatus, 'status')

    localStorage.setItem('accountstatus', [accountStatus])


}



return(

<>


{
           
           (roleau === 'Admin' ? <Header />  : <Sheader />)

    }




<br />
<br />

<div className='Heading'><h1>Name: {hotelname}</h1> 
<br />

{/* <h1>{useremail}</h1> */}





</div>



<div className='MainDiva'>



<table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Category</th>
                                <th>Title</th>
                                <th>Weight</th>
                                <th> Qty</th>
                                <th> Price</th>
                                <th> Image</th>
                                <th>Product ID</th>
                                <th>Edit</th>
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
                                                <td>{element.productTitle}</td>
                                                <td>{element.productWeight}</td>
                                                <td>{element.qty}</td>
                                                <td>{element.productPrice}</td>
                                               
                                                <td><img src={element.imageURL} height='100px'></img></td>
                                                <td>{element._id}</td>
                                                <td><Button sx= {{marginRight: 5}}  variant="contained" href={`Edit/${element._id}`}>Edit</Button></td>

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

export default Welcome;
