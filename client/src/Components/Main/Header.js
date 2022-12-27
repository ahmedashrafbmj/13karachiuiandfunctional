import React from 'react'
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { Navbar, Nav } from 'react-bootstrap'
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



<div className='MainDiv'>

<nav class="navbar navbar-light fixed-top bg-light">
<Navbar  bg="light" variant={"light"} expand="lg">
                        <Navbar.Brand href="#">Admin Panel</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="mr-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >



<div className='btn'>
<a class="btn btn-primary" href="/" role="button">Home</a>
<a class="btn btn-primary" href="/Add" role="button">Add Products</a>
<a class="btn btn-primary" href="/adminProfile" role="button">Profile</a>
<a class="btn btn-primary" href="/adminOrders" role="button"> Orders</a>

{/* <a class="btn btn-primary" href="/Category" role="button">Add Category</a>

<a class="btn btn-primary" href="/viewcategory" role="button">View Category</a>


<a class="btn btn-primary" href="/allUsers" role="button">Super Admin Users</a>
<a class="btn btn-primary" href="/AllOrderUsers" role="button">Super Admin Orders</a>
<br />
<a class="btn btn-primary" href="/flatrate" role="button">Super Admin Flat Rate</a> */}

{/* <a class="btn btn-primary" href="#" role="button"> Admin Orders</a> */}




<a class="btn btn-outline-primary" onClick={logout} role="button">Logout</a>


</div>

                            </Nav>

                        </Navbar.Collapse>
                    </Navbar>
  
                    </nav>






</div>


</>


)

}

export default Header;
