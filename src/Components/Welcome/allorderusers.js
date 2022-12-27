import React, {useState, useEffect} from 'react'
import {useHistory} from "react-router-dom";
import Header from '../Main/Header'
import Button from '@mui/material/Button';
// import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import {Table} from 'react-bootstrap';
import Sheader from '../Main/sHeader';




const AllOrderUsers=(props)=>{

    const history = useHistory()
    const [roleau, setroleau] = useState ('');
      const [userState, setUserState] = useState([]);
      const [productDetail, setproductDetail] = useState({})


const getdata = async () => {


    const res = await fetch(`https://13k.up.railway.app/api/allpostbook`, {
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
        history.push('/AllOrderUsers')
    }else{
        history.push('/')
    }
 
}

const getrole=()=>{

    let roleuser = localStorage.getItem('role');
  
    setroleau(roleuser);
    console.log(roleau, 'roleg')
  
  }

useEffect(() => {

    routeto()
    getrole()
    
    
    }, []);



useEffect(()=>{
    getdata()

}, [])



// router.patch('/ordersupdate/:id', authbook.ordersupdate)

const updatePost=(id)=>{
    

    const headers = { "Content-Type": "application/json" };
    axios.patch(`https://13k.up.railway.app/api/ordersupdate/${id}`,{

        paymentstatus: productDetail.paymentstatus,

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



///delelte single data

const deletedata = async (id) => {

    const res2 = await fetch(`https://13k.up.railway.app/api/deleteorders/${id}`, {
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

<div className='Heading'><h1>All Orders </h1> 

<br />
<br />
<br />


</div>



{/* <h1>{useremail}</h1> */}



<div className='MainDiva'>




<Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                            <th>Sno</th>
                                <th>Date and Order ID</th>
                                <th> Name & Email</th>
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
                                                <td>{element.userEmail}</td>
                                                <td>{element.paymentstatus}
                                                <br />
                                                <br />

        <div class="form-group">

      <select id="inputState" class="form-control" onChange={ (e) =>{setproductDetail({...productDetail, paymentstatus: e.target.value })} }>
        <option selected>Pending</option>
        <option>Processing</option>
        <option>Delivered</option>
      </select>
    </div>

                                                </td>
    
                                               
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

                                                <td><a class="btn btn-primary" href={`SAdminOrderDetails/${element._id}`} role="button">Order Details</a>
                                                <br />
                                                <br />
                                                <a class="btn btn-primary" onClick={() => updatePost(element._id)} role="button">Status Update</a>
                                                <br />
                                                <br />
                                                <a class="btn btn-primary" onClick={() => deletedata(element._id)} role="button">Order Delete</a>
                                                </td>
                                               
                                                
                                      

                                                
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

export default AllOrderUsers;
