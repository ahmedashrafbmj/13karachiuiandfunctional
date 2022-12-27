import React from 'react'
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { Navbar, Nav } from 'react-bootstrap'
import {useHistory} from "react-router-dom";




const Sheader=(props)=>{
    // console.log(props, 'headerprops')
   
    
const history = useHistory();

const logout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    localStorage.removeItem('role')
    localStorage.removeItem('hotel')

    localStorage.removeItem('accountstatus')

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
                        <Navbar.Brand href="#">Super Admin</Navbar.Brand>
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
<a class="btn btn-primary" href="/Category" role="button">Add Cat</a>
<a class="btn btn-primary" href="/flatrate" role="button">Add Rate</a>
<a class="btn btn-primary" href="/viewcategory" role="button">View Cat</a>
<a class="btn btn-primary" href="/adminProfile" role="button">Profile</a>

<a class="btn btn-primary" href="/allUsers" role="button"> Users</a>
<a class="btn btn-primary" href="/AllOrderUsers" role="button"> Orders</a>



{/* <a class="btn btn-primary" href="#" role="button"> Admin Orders</a> */}

<a class="btn btn-primary" href="/area" role="button"> Add Area</a>
<a class="btn btn-primary" href="/viewarea" role="button"> View Area</a>
<a class="btn btn-primary" href="/market" role="button"> Add Market</a>

<a class="btn btn-primary" href="/weightrate" role="button"> Add Weight Rate</a>

<a class="btn btn-primary" href="/addcarousel" role="button"> Add Carousel</a>
<a class="btn btn-primary" href="/viewcarousel" role="button"> View Carousel</a>

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

export default Sheader;
