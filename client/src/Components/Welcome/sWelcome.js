import React, {useState, useEffect} from 'react'
import Header from '../Main/Header'
import Sheader from '../Main/sHeader'

import {useHistory} from "react-router-dom";
import axios from 'axios';
import { border } from '@mui/system';
import Button from '@mui/material/Button';
import { Alert } from '@mui/material';
import { AlertTitle } from '@mui/material';



const Welcome2=(props)=>{

    const history = useHistory()   

    const [roleau, setroleau] = useState ('');
      const [userState, setUserState] = useState([]);

      const [useremail, setuserEmail] = useState([]);

      const [hotelname, sethotelname] = useState([]);


const getdata = async () => {

    const findEmail2 = localStorage.getItem('user'); 
    // http://localhost:4000/api/allpostdata

    // `http://localhost:4000/api/postbyemail/${useremail}`

    // /api/allpostdata

    const res = await fetch(`/api/allpostdata`, {
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


const routeto=()=>{

    let roleuseradmin = localStorage.getItem('role');
           console.log(roleuseradmin, 'roleuseradmin')
    
    if (roleuseradmin === 'Admin'){
        history.push('/welcome')
    }

    else if (roleuseradmin === 'Super'){
        history.push('/welcome2')
    }
    
    else{
        history.push('/')
    }
 
}

useEffect(() => {

    routeto()
    getrole()
    
    
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

const getrole=()=>{

    let roleuser = localStorage.getItem('role');

    setroleau(roleuser);
    console.log(roleau, 'roleg')


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
                                <th> Seller Info</th>
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

                                                <td>{element.hotelname}
                                                <br />
                                                {element.userEmail}
                                                </td>

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

export default Welcome2;
