import React, {useState, useEffect} from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import {useHistory} from "react-router-dom";
import cartpic from '../images/shopping-cart.png'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';




const UserNavbar=(props)=>{


    const items = useSelector((state) => state.cart);

    const [products, setProducts] = useState([]);
    const [text, setText] = useState('');
    const [suggestions, setSuggestions] = useState([]);


    const history = useHistory()
    
const logout=()=>{

    
        
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('role')
        // localStorage.removeItem('hotel')

        localStorage.removeItem('price')
        localStorage.removeItem('userhotel')
        localStorage.removeItem('imageURL')
        localStorage.removeItem('hotelemail')
        localStorage.removeItem('accountstatus')

        localStorage.removeItem('contact')
        localStorage.removeItem('market')
        localStorage.removeItem('address')
        localStorage.removeItem('area')

        history.push('/login');
    }


    useEffect(() => {

        const fetchProducts = async () => {
            const res = await fetch('https://13k.up.railway.app/api/allpostdata');
            const data = await res.json();
            console.log(data, "data");
            setProducts(data);
        };
        fetchProducts();
      
    }, []);

    const onSuggestHandler =(text)=>{
        setText(text);
        setSuggestions([]);
    }

    const onChangeHandler = (text)=>{
    let matches = [];

    if(text.length > 0){

        matches = products.filter(user => {
        const regex = new RegExp(`${text}`, "gi");
        return user.productTitle.match(regex)

        })
     
    }
        console.log(matches, "matches")
        setSuggestions(matches)
        setText(text)
    }


   
return(

<>

{/* <div className='MainDiv'> */}
<nav class="navbar navbar-light fixed-top bg-light">
<Navbar  bg="light" variant={"light"} expand="lg">
                        <Navbar.Brand href="#">13Karachi</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="mr-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
    
  {/* <form class="form-inline">
    <input class="form-control mr-sm-2" type="search" placeholder="Search Products" aria-label="Search"/>
    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
  </form> */}

      
                                {/* <Nav.Link as={Link} to="/home">Home</Nav.Link>
                                <Nav.Link as={Link} to="/about">About</Nav.Link>
                                <Nav.Link as={Link} to="/contact">Contact</Nav.Link> */}

<div className='btn'>
<a class="btn btn-primary" href="/" role="button">Home</a>
<a class="btn btn-primary" href="/userProfile" role="button">Profile</a>
<a class="btn btn-primary" href="/userbooking" role="button">My Orders</a>

<a class="btn btn-outline-primary" onClick={logout} role="button">Logout</a>

<span className="cartCount"><Link to="/cart"><img src={cartpic}></img> {items.cartItems.length} </Link></span>

</div>

                            </Nav>

                        </Navbar.Collapse>
                    </Navbar>
  
                    </nav>
        
{/* </div> */}

<br />
<br />
<br />
    
    <div className='container'>

    <div class="row">

 
        <div class="col-xs-4">

    <input type="text" class="form-control"  style={{width: 1100}} placeholder="Search Products"  
    onChange={e=> onChangeHandler(e.target.value)} value={text}/>


    {suggestions && suggestions.map((suggestion, i)=>
        <div key={i} className=" suggestion col-mid-12 justify-content-md-center" onClick={()=> onSuggestHandler(suggestion.productTitle)}>{suggestion.productTitle}
       
       <Link to={`Details/${suggestion._id}`}> 
            <img src= {suggestion.imageURL} ></img> 
            </Link>
        <br />

      
        {suggestion.productPrice}
        </div>
    )}
<br />
{/* 
<a class="btn btn-outline-primary" href="#" role="button">Search</a> */}
    </div>

    </div>

</div>


</>


)

}

export default UserNavbar;
