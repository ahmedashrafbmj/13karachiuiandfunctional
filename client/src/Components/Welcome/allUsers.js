import React, {useState, useEffect} from 'react'
import {useHistory} from "react-router-dom";
import Header from '../Main/Header'
import Button from '@mui/material/Button';
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import {Table} from 'react-bootstrap';
import Sheader from '../Main/sHeader';
import axios from 'axios';





const AllUsers=(props)=>{

    const history = useHistory()
    const [roleau, setroleau] = useState ('');

      const [userState, setUserState] = useState([]);
      const [productDetail, setproductDetail] = useState({})


const getdata = async () => {


    const res = await fetch(`/api/allsignup`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
        
    });

    const data = await res.json();
    console.log(data);
    setUserState(data); 

}



const routeto=()=>{

    let roleuseradmin = localStorage.getItem('role');
           console.log(roleuseradmin, 'roleuseradmin')
    
    if (roleuseradmin === 'Super'){
        history.push('/allUsers')
    }else{
        history.push('/')
    }
 
}

const getrole=()=>{

    let roleuser = localStorage.getItem('role');
  
    setroleau(roleuser);
    console.log(roleau, 'roleg')
  
  }


  const updatePost=(id)=>{
    

    const headers = { "Content-Type": "application/json" };
    axios.patch(`/api/profileupdate/${id}`,{

        accountsstatus: productDetail.accountsstatus,

},{
headers,
})

.then((success)=>{
console.log('success',success)
alert("Status Updated")
getdata()
})

.catch((err)=>{
console.log('error',err)

})

}


useEffect(() => {

    routeto()
    getrole()
    
    }, []);



useEffect(()=>{
    getdata()

}, [])



///delelte single data

const deletedata = async (id) => {

    const res2 = await fetch(`/api/deletesignup/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
        
        
    });
alert("delete successfully")

    getdata()

}



return(

<>

{
           
           (roleau === 'Admin' ? <Header />  : <Sheader />)

    }

<br />
<br />

<div className='Heading'><h1>All Users </h1> 

<br />
<br />
<br />


</div>



{/* <h1>{useremail}</h1> */}



<div className='MainDiva'>




<Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Business Name</th>
                                <th> Name</th>
                                <th> Role</th>
                                <th> Email</th>
                                <th> Shop Card</th>
                                <th> More Info</th>
                                <th> Address</th>
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
                                                <td>{element.hotelname} 
                                        
                                                </td>
                                                <td>{element.name}</td>
                                                <td>{element.role}
                                                <br />

                                                <br />
                                                {element.accountsstatus}

                                                <br />

                                                <div class="form-group">

<select id="inputState" class="form-control" onChange={ (e) =>{setproductDetail({...productDetail, accountsstatus: e.target.value })} }>
  <option selected>Choose</option>
  <option>Enabled</option>
  <option>Disabled</option>
</select>
</div>
                                                
                                                </td>
                                                <td>{element.email}</td>
                                                <td><img src={element.img} height='50px'></img></td>
                                                <td>CNIC: {element.cnic} <br /> Contact: { element.contact}
                                                <br /> City: { element.city}
                                                <br /> Area: { element.area}
                                                <br /> Market: { element.marketname}
                                                {/* <br /> ID: { element._id} */}
                                                </td>
                                                
                                                
                                                
                                                <td>{element.address}</td>
                                               
                                                <td><Button sx= {{marginRight: 5}}  variant="contained" onClick={() => deletedata(element._id)}>Delete</Button>
                                                <br />
                                                <br />
                                                <Button sx= {{marginRight: 5}}  variant="contained" onClick={() => updatePost(element._id)}>Set Auth</Button></td>
                                      

                                                
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

export default AllUsers;
