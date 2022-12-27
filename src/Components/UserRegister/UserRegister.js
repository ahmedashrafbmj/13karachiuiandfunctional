import React, {useState, useEffect} from 'react'
import {useHistory} from "react-router-dom";
import axios from 'axios';

const UserRegister=(props)=>{


    const [register,setRegister] = useState({
    hotelname:"",
    name:"",
    email: "",
    password: "",
    contact: "",
    address: ""

    });
    const history = useHistory()

    const registerc=()=>{

        if(!register.email.trim()){
            alert("Enter Email");
            }
            else if(!register.password.trim()){
                alert("Enter password");
                }

                else if(!register.contact.trim()){
                    alert("Enter contact number");
                    }

                    else if(!register.address.trim()){
                        alert("Enter address");
                        }
                
                
                else{
 
            const headers = { "Content-Type": "application/json" };
            axios.post('https://13k.up.railway.app/api/signup',{
                email:register.email,
                password:register.password,
                role: "User",
                name: register.name,
                contact: register.contact,
                address: register.address
},{
    headers,
  })

  .then((success)=>{
    console.log('success',success)
    history.push('/login')
  })

    .catch((err)=>{
        console.log('error',err)
    
    })

    }

        
  

    }
      

    useEffect(() =>{
       
        const getdata = localStorage.getItem('token');
        
        const roleua = localStorage.getItem('role')

        if (!roleua){
            history.push('/userregister')
        }
 
        else if (roleua === 'Admin'){
     
            history.push('/Welcome')
 
        }else{
            history.push('/')
        }
    
         
         },[]);
 

return(

<>

<div className="l-form">
            <form action="" className="form">
                <h1 className="form__title">User Register</h1>



                <div className="form__div">
                    <input type="text" className="form__input" placeholder=" "   onChange={ (e)=>{setRegister({...register, name: e.target.value})} } />
                    <label className="form__label">Name</label>
                </div>

                <div className="form__div">
                    <input type="text" className="form__input" placeholder=" "   onChange={ (e)=>{setRegister({...register, email: e.target.value})} } />
                    <label className="form__label">Email</label>
                </div>

                <div className="form__div">
                    <input type="password" className="form__input" placeholder=" " onChange={ (e)=>{setRegister({...register, password: e.target.value})} } />
                    <label  className="form__label">Password</label>
                </div>

                <div className="form__div">
                    <input type="text" className="form__input" placeholder=" " onChange={ (e)=>{setRegister({...register, contact: e.target.value})} } />
                    <label  className="form__label">Contact</label>
                </div>

                <div className="form__div">
                    <input type="text" className="form__input" placeholder=" " onChange={ (e)=>{setRegister({...register, address: e.target.value})} } />
                    <label  className="form__label">Address</label>
                </div>

                <input type="button" className="form__button" value="Register" onClick={registerc} />
                <br />
                <input type="button" className="form__button" value="Log In" onClick={()=>{history.push('/login')}} />
            </form>
        </div>
        
</>


)
}

export default UserRegister;

