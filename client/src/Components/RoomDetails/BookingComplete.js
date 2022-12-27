import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {
    
    clearCart,

 
  } from "../../store/cartSlice";




const BookingComplete=(props)=>{

    const dispatch = useDispatch()

    const history = useHistory()
    // const [booking, setbooking] = useState([]);
    // const [pkgid, setpkgid] = useState(localStorage.getItem('packageid'));

    // const { packageid } = useParams("");
    

   
    // useEffect(() => {

    //     console.log(pkgid);




    //     const fetchDetails= async () => {
    //         const res = await fetch(`/api/getbookuserid/${pkgid}`);
    //         const data = await res.json();
    //         console.log(data);
    //         setbooking(data);
    //     };
        
    //     fetchDetails()
    // }, []);

    const handleClearCart = () => {
        dispatch(clearCart());
      };
      
useEffect(()=>{
    handleClearCart()
}, [])

return(

<>




<Container>
      <Row>

            
                    <Col>                    
                    <Card style={ { width: '30rem' }}>

                    <Card.Img variant="top"/>
                        <Card.Body>
                        <Card.Title> Congratulation Your Booking is Complete...</Card.Title>
                        {/* <br />
                            <Card.Title> Total Bill: {booking.hotelPrice}</Card.Title>
                            <Card.Title> Pacakge ID: {pkgid}</Card.Title>
                            <Card.Title> Your Booking ID: {booking._id}</Card.Title>
                            <Card.Title> Date and Time: {booking.hotelDate}</Card.Title>
                        

                            <Card.Text>

                             <br />
                             Note: To Confirm your Booking Please Deposit the Amount of Rs. {booking.hotelPrice}/- to HBL Bank Account No. is 000876676767 and upload Slip into Your Booking or send Deposit Slip to our WhatsApp Number: 09877774 to update the payment status unpaid to paid Thank You.

                            </Card.Text>*/}

                            <a class="btn btn-primary" onClick={()=> (history.push('/'))} role="button">Go to Home</a> 
                            
                        </Card.Body>
                        </Card>
                        <br />
                        </Col>
         
                        
            </Row>
      </Container>


</>


)

}

export default BookingComplete;
