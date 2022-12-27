import React, {useState, useEffect} from 'react'
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
// import UserNavbar from '../Home/UserNavbar';
import Header from '../Main/Header';
// import Sheader from '../Main/sHeader';
import {Table} from 'react-bootstrap';
import classes from "./Order.module.css"
// import { Link } from 'react-router-dom';
import Sheader from '../Main/sHeader';






const AdminOrders=(props)=>{
    const history = useHistory()
    const [roleau, setroleau] = useState ('');

    document.title = " Shop Hub - Admin Orders";
  
    const [hotel, setHotel] = useState([0]);

    const [fOrders, setfOrders] = useState([0]);


   
    useEffect(() => {

       

        const fetchDetails= async () => {
            const res = await fetch(`https://13k.up.railway.app/api/allpostbook`);

            const data = await res.json();
            console.log(data,"data");
            setHotel(data);
        };
        
        fetchDetails()
    }, []);




    const routeto=()=>{

        let roleuseradmin = localStorage.getItem('role');
               console.log(roleuseradmin, 'roleuseradmin')
        
        if (roleuseradmin === 'Admin'){
            history.push('/adminOrders')
        }

        else if (roleuseradmin === 'Super'){
            history.push('/adminOrders')
        }
        
        
        else{
            history.push('/')
        }
     
    }
    

    const fetchOrders =()=>{
        let arr = [];
        const userEmail = localStorage.getItem('user');
        const totals = hotel.map(p => p.cartItems.map((cart)=>{
    
            if (cart.userEmail == userEmail){
                
                arr.push([cart._id, cart.dt, cart.productTitle, cart.productWeight, cart.cartQuantity, cart.productPrice, cart.imageURL, cart.hotelname, cart.userEmail, p.userEmail, p.paymentstatus, p._id])
                
                setfOrders(arr)
                console.log(arr, 'seller orders')
                console.log(fOrders, 'localstate')
            }
        })
    
        )
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


    return (

      
    //     <>
        

        
    //     {
           
    //        (roleau === 'Admin' ? <Header />  : <Sheader />)

    // }

    

    //     <br />
    //     <br />
    //     <br />

    //     <Table striped bordered hover size="sm" onMouseMove={()=>fetchOrders()}>
    //                     <thead>
    //                         <tr>
    //                         <th>SNO</th>
    //                         <th>Date and Product ID and Order ID</th>
    //                         <th> Title</th>
    //                         <th>Weight</th>
    //                         <th>Qty</th>
    //                         <th>Price</th>
    //                         <th>Status</th>

    //                         <th>Image</th>
    //                         <th>Seller</th>
    //                         <th>Email</th>

    //                         <th>Customer Email</th>
                            
                              
               
                               
  
                            
    //                         </tr>
    //                     </thead>

    //                     <tbody>
    //                         {
    //                             fOrders.map((element, id) => {
                                    
    //                                 return (


    //                                     <>
    //                                         <tr>
    //                                             <td>{id + 1}</td>
    //                                             <td>Product ID: {element[0]} 
    //                                             <br />
    //                                             <br />
    //                                             Date & Time:{element[1]}
    //                                             <br />
    //                                             <br />
    //                                             Order ID: {element[11]}
    //                                             </td>

    //                                             <td>{element[2]}</td>
    //                                             <td>{element[3]}</td>
    //                                             <td>{element[4]}</td>
    //                                             <td>{element[5]}</td>
    //                                             <td>{element[10]}</td>
    //                                             <td><img src={element[6]} width='200px'></img></td>
    //                                             <td>{element[7]}</td>
    //                                             <td>{element[8]}</td>
    //                                             <td>{element[9]}</td>
                                             
                                                
                                            

                                                
                                                
                                      

                                                
    //                                         </tr>
    //                                     </>
    //                                 )
    //                             })
    //                         }
    //                     </tbody>
    //                 </Table>




    //     </>
    <>
    {
           
        (roleau === 'Admin' ? <Header />  : <Sheader />)

 }
    <div onMouseMove={()=>fetchOrders()} style={{ backgroundColor: "", minHeight: "100vh" }}>
    <div className="container-xxl py-5">
      <div className={`me-lg-4`}>
        <h2 className={`text-center pt-2 fw-bold`}>Order</h2>
        <div className="table-responsive px-4 pt-4">
          <table className={`table  ${classes.table}`}>
            <thead className={classes.thead}>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Order Date</th>
                <th scope="col">Product Id</th>
                <th scope="col">Order ID: </th>
                <th scope="col">Product Title </th>
                {/* <th scope="col">Weight</th> */}
                <th scope="col">Product Quantity</th>
                <th scope="col">Delivery status</th>
                <th scope="col">Product Price</th>
              </tr>
            </thead>
            <tbody>
              {/* {
                Orders.map((item)=>(
                  <OrderItem item={item}/>
                ))
              } */}
            {
                fOrders.map((element,id)=>{
                    return(
                        <>
                        <tr>
    <td valign="middle">{id + 1}</td>
    <td valign="middle">{element[1]}</td>
    <td valign="middle">{element[0]}</td>
    <td  valign="middle">{element[11]}</td>
    <td>{element[2]}</td>
    {/* <td>{element[3]}</td> */}
    <td>{element[4]}</td>
    <td>{element[10]}</td>
    <td>{element[5]}</td>
    <td className={`${classes.item} px-2`}>
<img src={element.imageURL}alt=""/> 
            {/* } */}
    </td>
    <Link to="Edit/${element._id}">
    <td className={classes.btn} valign="middle">{"Edit"}</td>

    </Link>
    {/* <td onClick={() => deletedata(element._id)} className={classes.btnDelete} valign="middle"><span className="pe-1">X</span>Delete</td> */}
</tr>
                        </>
                    )
                })
            }
             
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  </>
    );
};

export default AdminOrders;