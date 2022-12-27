import React from 'react'
import "./navBar.css"
import logo from "../images/logo.png"
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { borderBottom } from '@mui/system';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Avatar from '../Avatar/Avatar';







const NavBar = () => {
    const [user , setUser] = useState()
    const [products, setProducts] = useState([]);
    const [text, setText] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [open, setOpen] = React.useState(false);
    console.log(user)

    const handleClickOpen = () => {
        console.log("open")
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let [search, setSearch] = useState("")


    useEffect(() => {
        // getroleauth()

        const fetchProducts = async () => {
            const res = await fetch('/api/allpostdata');
            const data = await res.json();
            setProducts(data);
        };
        fetchProducts();

    }, []);


    const handleLogout = () => {



        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('role')
        // localStorage.removeItem('hotel')

        localStorage.removeItem('price')
        localStorage.removeItem('userhotel')
        localStorage.removeItem('imageURL')
        localStorage.removeItem('hotelemail')

        setUser("")
        // localStorage.removeItem('accountstatus')

        // localStorage.removeItem('contact')
        // localStorage.removeItem('market')
        // localStorage.removeItem('address')
        // localStorage.removeItem('area')

    }





    //////////////////////////////////////// LOGIN FUNCTIONS //////////////////////////////////

    // login states
    const [userRole, setRole] = useState([""]);

    const [userContact, setuserContact] = useState([""]);

    const [userAddress, setuserAddress] = useState([""]);

    const [userMarket, setuserMarket] = useState([""]);
    const [userArea, setuserArea] = useState([""]);

    const [accountStatus, setAccountStatus] = useState([""]);
    const dispatch = useDispatch();
    const history = useHistory()
    let [data, setData] = useState({ email: "", password: "" })

    const getrole = async () => {



        const res3 = await fetch(`/api/postbyemailsignup/${data.email}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }

        });



        const role = await res3.json();



        setRole(role[0]?.role);

        setuserContact(role[0]?.contact);
        setuserAddress(role[0]?.address);

        setuserArea(role[0]?.area);
        setuserMarket(role[0]?.marketname);
        setAccountStatus(role[0]?.accountsstatus)

        console.log(accountStatus, 'status')

        localStorage.setItem('role', [userRole])

        localStorage.setItem('accountstatus', [accountStatus])

        localStorage.setItem('contact', [userContact])
        localStorage.setItem('address', [userAddress])

        localStorage.setItem('area', [userArea])
        localStorage.setItem('market', [userMarket])

    }
    const handleLogin = () => {

        if (!data.email.trim()) {
            alert("Enter Email");
        }
        else if (!data.password.trim()) {
            alert("Enter password");
        }
        else if (data.message === 'Password Incorrect!') {
            // console.log(response.data.message)
            // alert(response.data.message);


        } else {

            const headers = { "Content-Type": "application/json" };
            axios.post(`/api/signin`, {

                email: data.email,
                password: data.password
            }, {
                headers,
            })

                .then((success) => {
                    console.log('success', success)

                    localStorage.setItem('token', 'thisismytoken')
                    localStorage.setItem('user', data.email)

                    console.log(userRole, 'role');
                    localStorage.setItem('role', [userRole])

                    const roleua = localStorage.getItem('role')

                    const citem = localStorage.getItem('cartItems')


                    const roleua4 = localStorage.getItem('accountstatus');

                    if (roleua === 'Admin' && roleua4 === 'Enabled') {

                        history.push('/Welcome')
                    }

                    else if (roleua === 'Admin' && roleua4 === 'Disabled') {

                        history.push('/accountstatus')
                    }

                    else if (roleua === 'Super') {

                        history.push('/Welcome2')

                    }


                    else {

                        if (!citem) {

                            history.push('/')

                        } else {
                            history.push('/Booking')
                        }


                    }



                })

                .catch((err) => {
                    let msg = err.response.data.message
                    alert(msg)
                    console.log('error', msg)

                })

        }

    }
    const handleInputs = (property, value) => {
        setData({ ...data, [property]: value })
        console.log(data)
    }
    const onSuggestHandler = (text) => {
        setText(text);
        setSuggestions([]);
    }

    const onChangeHandler = (text) => {
        let matches = [];

        if (text.length > 0) {

            matches = products.filter(user => {
                const regex = new RegExp(`${text}`, "gi");
                return user.productTitle.match(regex)

            })

        }
        console.log(matches, "matches")
        setSuggestions(matches)
        setText(text)
    }

    useEffect(()=>{
        const userEmail = localStorage.getItem('user')
        setUser(userEmail)
    },[])







    return (
        <div
            className='container'>
            <div className='nav'>
                <div className='logo'>
                    Logo
                    {/* <img className='logoImg' src={logo} /> */}
                </div>














                <div
                    style={{
                        zIndex: 1
                        , width: "60%"
                        , marginTop: "20px"
                        , borderRadius: "50px"
                        // , border: "1px solid black"
                        , height: "30px"
                    }}
                    className="row">




                    <input type="text" class="form-control" style={{
                        width: "100%",
                        borderRadius: "20px",
                        height: "30px",
                        padding: "5px 9px 5px 9px",
                        fontSize: "20px",
                        border: "none",
                        outline: "none"
                    }} placeholder="Search Products"

                        onChange={e => onChangeHandler(e.target.value)} value={text} />


                    {suggestions && suggestions.map((suggestion, i) =>
                        <div style={{ border: "none" }} key={i} className=" suggestion col-mid-12 justify-content-md-center" onClick={() => onSuggestHandler(suggestion.productTitle)}>
                            {suggestion.productTitle}
                            <Link to={`Details/${suggestion._id}`}>
                                <img src={suggestion.imageURL} ></img>
                            </Link>



                            {suggestion.productPrice}
                        </div>
                    )}




                </div>


























                {/* <div className='searchBar'>

                    <input value={search} onChange={e => { setSearch(e.target.value) }} className='inputt' type="text" placeholder="Search" />
                    <div onClick={e => { setSearch("") }} style={{ backgroundColor: "white", width: "30px", height: "40px", borderBottom: "solid black 1px", borderRadius: "0px 7px 7px 0px", lineHeight: 2.4, textAlign: "center" }}>
                        {search ? "X" : null}
                    </div>
                </div> */}
                <div className='personal'>  
                    {user ?
                        <Avatar logout={handleLogout} />
                        :

                    <div onClick={handleClickOpen} style={{ paddingRight: 15 }} className='personalText' >

                        <PersonIcon style={{ color: "#B21368", marginTop: 10, marginRight: 5 }} fontSize='small' />
                        <p className='personalP'>SigniN</p></div>
                    }
                    <div className='personalText' style={{ borderLeft: "solid 1px", borderColor: "#D67BA8" }}>
                        <ShoppingCartIcon style={{ color: "#B21368", marginTop: 10, marginRight: 5 }} fontSize='small' />
                        <p className='personalP'>Cart</p></div>

                </div>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
            Login
          </DialogContentText> */}
                    <TextField
                        onChange={e => { handleInputs("email", e.target.value) }}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        onChange={e => { handleInputs("password", e.target.value) }}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="passwords"
                        type="Password"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLogin}>Login</Button>
                    <Button onClick={e => { history.push("/register") }}>SignUp</Button>
                </DialogActions>
            </Dialog>


        </div>
    )
}


// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [

];





export default NavBar