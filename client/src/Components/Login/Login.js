import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from "react-router-dom";
import Register from '../Register/Register';
import Link from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../store/orderslice';


const Login = (props) => {



    const [userRole, setRole] = useState([""]);

    const [userContact, setuserContact] = useState([""]);

    const [userAddress, setuserAddress] = useState([""]);

    const [userMarket, setuserMarket] = useState([""]);
    const [userArea, setuserArea] = useState([""]);

    const [accountStatus, setAccountStatus] = useState([""]);
    const dispatch = useDispatch();
    const [data, setData] = useState({

        email: "",
        password: ""

    });






    const history = useHistory()

    const loginc = () => {

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
                    alert("Something Went Wrong")
                    console.log('error', err)

                })

        }

    }





    /////get email with role

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




    ///// end    



    useEffect(() => {

        const getdata = localStorage.getItem('token');

        const roleua2 = localStorage.getItem('role');

        const roleua3 = localStorage.getItem('accountstatus');




        if (!roleua2) {
            history.push('/login')
        }

        else if (roleua2 === 'Admin' && roleua3 === 'Enabled') {

            history.push('/Welcome')
        }

        else if (roleua2 === 'Admin' && roleua3 === 'Disabled') {

            history.push('/accountstatus')
        }

        else if (roleua2 === 'Super') {

            history.push('/Welcome2')

        }

        else {
            history.push('/')
        }






    }, []);




    return (

        <>

            <div className="l-form">
                <form action="" className="form">
                    <h1 className="form__title">Log In</h1>

                    <div className="form__div">
                        <input type="text" onKeyPress={getrole} className="form__input" placeholder=" " onChange={e => setData({ ...data, email: e.target.value })} />
                        <label className="form__label">Email</label>
                    </div>

                    <div className="form__div">
                        <input type="password" onKeyPress={getrole} className="form__input" placeholder=" " onChange={(e) => { setData({ ...data, password: e.target.value }) }} />
                        <label className="form__label">Password</label>
                    </div>

                    <input type="button" className="form__button" value="Log In" onClick={() => { loginc(); }} />

                    <br />

                    {/* <input type="button" className="form__button" value="Register" onClick={()=>{history.push('/register')}} /> */}

                    <br />

                    {/* <input type="button" className="form__button" value="Role" onClick={()=>{getrole(); }} /> */}
                    <h1>{data.email}</h1>
                    {/* <h1>{data.password}</h1> */}


                </form>


            </div>

        </>


    )
}

export default Login;

