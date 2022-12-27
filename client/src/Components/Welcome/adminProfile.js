import React, {useState, useEffect} from 'react'
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
// import UserNavbar from '../Home/UserNavbar';
import Header from '../Main/Header';
import Sheader from '../Main/sHeader';







const AdminProfile=(props)=>{
    const history = useHistory()
    const [roleau, setroleau] = useState ('');

    document.title = " 13Karachi - Admin Profile";
  
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
        
        if (roleuseradmin === 'Admin'){
            history.push('/adminProfile')
        }

        else if (roleuseradmin === 'Super'){
            history.push('/adminProfile')
        }
        
        
        else{
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


    return (

      
        <>
        

        
        {
           
           (roleau === 'Admin' ? <Header />  : <Sheader />)

    }

    

        <br />
        <br />
        <br />

        <Container>
      <Row>

            
                    <Col>                    
                    <Card style={ { width: '30rem' }}>

                    <Card.Img variant="top" style={ { width: '30rem' }} src={hotel[0].img} />
                        <Card.Body>
                            <Card.Title> Business Name: {hotel[0].hotelname}</Card.Title>
                            <Card.Title> Name: {hotel[0].name}</Card.Title>
                            <Card.Title>  Email: {hotel[0].email}</Card.Title>
                            <Card.Title> City: {hotel[0].city}</Card.Title>
                            <Card.Title> Area: {hotel[0].area}</Card.Title>
                            <Card.Title> Market: {hotel[0].marketname}</Card.Title>
                            <Card.Title> CNIC: {hotel[0].cnic}</Card.Title>

                            <Card.Text>

                             <br />

                             <td><Button sx= {{marginRight: 5}}  variant="contained" href={`editprofile/${hotel[0]._id}`}>Edit</Button></td>
                            </Card.Text>

                        </Card.Body>
                        </Card>
                        
                        <br />
                        </Col>
         
                        
            </Row>
      </Container>




        </>
    );
};

export default AdminProfile;