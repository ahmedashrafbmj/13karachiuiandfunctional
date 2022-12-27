import React from 'react'
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { Navbar, Nav, Container } from 'react-bootstrap'
import {useHistory} from "react-router-dom";




const Header=(props)=>{
    // console.log(props, 'headerprops')
   
    
const history = useHistory();

const logout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('accountstatus')
    localStorage.removeItem('role')
    localStorage.removeItem('hotel')

    localStorage.removeItem('contact')
    localStorage.removeItem('market')
    localStorage.removeItem('address')
    localStorage.removeItem('area')
    

    history.push('/')
}
  



return(

<>








<Navbar style={{background:"#CCFF33",fontWeight:"bold"}} expand="lg">
      {/* <Navbar style={{background:"#CCFF33",fontWeight:"bold"}} expand="lg"> */}
      <Container fluid>
        <Navbar.Brand href="#">13karachi</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Add">Add Products</Nav.Link>
            <Nav.Link href="/adminProfile">Profile</Nav.Link>
            <Nav.Link href="/adminOrders">My Orders</Nav.Link>
          </Nav>
          <Nav>
        <Nav.Link onClick={logout}>Logout</Nav.Link>
 
      </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>










</>


)

}

export default Header;
