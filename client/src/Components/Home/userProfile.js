import React, {useState, useEffect} from 'react'
import { Button, Card, Container, Row, Col } from 'react-bootstrap';

import UserNavbar from '../Home/UserNavbar';
import { useHistory } from 'react-router-dom';







const UserProfile=(props)=>{
const history = useHistory()
    document.title = " 13Karachi - User Profile";
  
    const [hotel, setHotel] = useState([0]);


   
    useEffect(() => {

        const userEmail = localStorage.getItem('user');

        const fetchDetails= async () => {
            const res = await fetch(`/api/postbyemailsignup/${userEmail}`);
            const data = await res.json();
            console.log(data);
            setHotel(data);
        };
        
        fetchDetails()
    }, []);


    const routeto=()=>{

        let roleuseradmin = localStorage.getItem('role');
               console.log(roleuseradmin, 'roleuseradmin')
        
        if (roleuseradmin === 'User'){
            history.push('/userProfile')
        }else{
            history.push('/welcome')
        }
     
    }
    
    useEffect(() => {
    
        routeto()
        
        
        }, []);
    



    return (

      
        <>
        

        
           <UserNavbar /> 

    

        <br />
        <br />
        <br />

        <Container>
      <Row>

            
                    <Col>                    
                    <Card style={ { width: '30rem' }}>

                    <Card.Img variant="top" style={ { width: '15rem' }} src={hotel[0].img} />
                        <Card.Body>
                            <Card.Title> Name: {hotel[0].name}</Card.Title>
                            <Card.Title> Email: {hotel[0].email}</Card.Title>
                            <Card.Title>  Address: {hotel[0].address}</Card.Title>
                            <Card.Title> Contact: {hotel[0].contact}</Card.Title>

                            <Card.Text>

                             <br />

                             <td><Button sx= {{marginRight: 5}}  variant="contained" href={`edituprofile/${hotel[0]._id}`}>Edit</Button></td>
                            </Card.Text>

                        </Card.Body>
                        </Card>
                        <br />
                        
                        </Col>
         
                        
            </Row>
      </Container>
      {/* <div class="container">
      <form>
  <div class="form-row">
    <div class="col">
      <input type="text" class="form-control" placeholder="First name" />
    </div>
    <div class="col">
      <input type="text" class="form-control" placeholder="Last name" />
    </div>
  </div>
</form>
</div> */}
        </>
    );
};

export default UserProfile;