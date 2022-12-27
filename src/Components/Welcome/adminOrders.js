import React, {useState, useEffect} from 'react'
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
// import UserNavbar from '../Home/UserNavbar';
import Header from '../Main/Header';
import Sheader from '../Main/sHeader';
import {Table} from 'react-bootstrap';







const AdminOrders=(props)=>{
    const history = useHistory()
    const [roleau, setroleau] = useState ('');

    document.title = " 13Karachi - Admin Orders";
  
    const [hotel, setHotel] = useState([0]);

    const [fOrders, setfOrders] = useState([0]);


   
    useEffect(() => {

       

        const fetchDetails= async () => {
            const res = await fetch(`https://13k.up.railway.app/api/allpostbook`);

            const data = await res.json();
            console.log(data);
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

      
        <>
        

        
        {
           
           (roleau === 'Admin' ? <Header />  : <Sheader />)

    }

    

        <br />
        <br />
        <br />
        {/* <Button onClick={()=>fetchOrders()}>fetch Orders</Button> */}

        <Table striped bordered hover size="sm" onMouseMove={()=>fetchOrders()}>
                        <thead>
                            <tr>
                            <th>SNO</th>
                            <th>Date and Product ID and Order ID</th>
                            <th> Title</th>
                            <th>Weight</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Status</th>

                            <th>Image</th>
                            <th>Seller</th>
                            <th>Email</th>

                            <th>Customer Email</th>
                            
                              
               
                               
  
                            
                            </tr>
                        </thead>

                        <tbody>
                        {/* userState.slice(0, 5).map((element, id) => { */}
                            {
                                fOrders.map((element, id) => {
                                    
                                    return (


                                        <>
                                            <tr>
                                                <td>{id + 1}</td>
                                                <td>Product ID: {element[0]} 
                                                <br />
                                                <br />
                                                Date & Time:{element[1]}
                                                <br />
                                                <br />
                                                Order ID: {element[11]}
                                                </td>

                                                <td>{element[2]}</td>
                                                <td>{element[3]}</td>
                                                <td>{element[4]}</td>
                                                <td>{element[5]}</td>
                                                <td>{element[10]}</td>
                                                <td><img src={element[6]} width='200px'></img></td>
                                                <td>{element[7]}</td>
                                                <td>{element[8]}</td>
                                                <td>{element[9]}</td>
                                             
                                                
                                            

                                                
                                                
                                      

                                                
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </Table>




        </>
    );
};

export default AdminOrders;