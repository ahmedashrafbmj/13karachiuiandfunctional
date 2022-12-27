import React, {useState, useEffect} from 'react'
import Header from '../Main/Header'

import {useHistory} from "react-router-dom";
import axios from 'axios';
import { border } from '@mui/system';
import Button from '@mui/material/Button';
import { Alert } from '@mui/material';
import { AlertTitle } from '@mui/material';
import Sheader from '../Main/sHeader';



const ViewCategory=(props)=>{

    const history = useHistory()   
      
    const [roleau, setroleau] = useState ('');
      const [userState, setUserState] = useState([]);

      const [useremail, setuserEmail] = useState([]);

      const [hotelname, sethotelname] = useState([]);


const getdata = async () => {

    const findEmail2 = localStorage.getItem('user'); 
    // http://localhost:4000https://13k.up.railway.app/api/allpostdata

    // `http://localhost:4000https://13k.up.railway.app/api/postbyemail/${useremail}`

    // https://13k.up.railway.app/api/allpostdata

    const res = await fetch(`https://13k.up.railway.app/api/allgetcategory`, {
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
    // http://localhost:4000https://13k.up.railway.app/api/allpostdata

    // `http://localhost:4000https://13k.up.railway.app/api/postbyemail/${useremail}`
    const findEmail = localStorage.getItem('user'); 
    console.log(findEmail)

    const res3 = await fetch(`https://13k.up.railway.app/api/postbyemailsignup/${findEmail}`,{
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


const getrole=()=>{

    let roleuser = localStorage.getItem('role');
  
    setroleau(roleuser);
    console.log(roleau, 'roleg')
  
  }
  

useEffect(()=>{
    const udata = localStorage.getItem('user');    
    setuserEmail(udata); 
    
    getdata()



    

}, []);


const routeto=()=>{

    let roleuseradmin = localStorage.getItem('role');
           console.log(roleuseradmin, 'roleuseradmin')
    
    if (roleuseradmin === 'Super'){
        history.push('/viewcategory')
    }else{
        history.push('/')
    }
 
}

useEffect(() => {

    routeto();
    getrole();
    
    
    }, []);



///delelte single data

const deletedata = async (id) => {
    // http://localhost:4000https://13k.up.railway.app/api/allpostdata

    const res2 = await fetch(`https://13k.up.railway.app/api/deletecat/${id}`, {
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
                                <th>S.No</th>
                                <th>Category</th>
                                <th> Image</th>
                                <th>ID</th>
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
                                                <td>{element.categoryName}</td>
                                               
                                                <td><img src={element.imageURL} height='100px'></img></td>
                                                <td>{element._id}</td>
                                                <td><Button sx= {{marginRight: 5}}  variant="contained" href={`editcategory/${element._id}`}>Edit</Button></td>

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

export default ViewCategory;
