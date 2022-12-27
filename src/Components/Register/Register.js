import React, {useState, useEffect} from 'react'
import {useHistory} from "react-router-dom";
import axios from 'axios';

const Register=(props)=>{


    const [register,setRegister] = useState({
    hotelname:"",
    name:"",
    city:"",
    area: "",
    marketname: "",
    cnic: "",
    email: "",
    password: ""

    });
    const history = useHistory()

    const [image, setImage] = useState("");
    const [areaData, setAreaData] = useState(['']);

    const [areaDaTaName, setAreaNameData] = useState(['']);

    const [loading, setLoading] = useState(false);

const uploadImage = async e =>{
  const files = e.target.files
  const data = new FormData()
  data.append('file', files[0])
  data.append('upload_preset', 'testforecommerce')
  setLoading(true)

  const res = await fetch("https://api.cloudinary.com/v1_1/fimgcloud/image/upload",
  {
    method: 'POST',
    body: data
  })

  const file = await res.json()
  console.log(file)

  setImage(file.secure_url)

  setLoading(false)

}


    const registerc=()=>{

        if(!register.email.trim()){
            alert("Enter Email");
            }
            else if(!register.password.trim()){
                alert("Enter password");
                }

                else if(!register.name.trim()){
                    alert("Enter Name");
                    }

                    else if(!register.marketname.trim()){
                        alert("Enter Market Name");
                        }
                        else if(!register.hotelname.trim()){
                            alert("Enter Business Name");
                            }

                            else if(!register.area.trim()){
                                alert("Select Area");
                                }
                
                else{
 
            const headers = { "Content-Type": "application/json" };
            axios.post(`https://13k.up.railway.app/api/signup`,{
                email:register.email,
                password:register.password,
                role: "Admin",
                hotelname: register.hotelname,
                name: register.name,
                city: "Karachi",
                area: register.area,
                marketname: register.marketname,
                cnic: register.cnic,
                img: image,
                accountsstatus: "Disabled"
},{
    headers,
  })



  .then((success)=>{
    console.log('success',success)
    history.push('/login')
  })

    .catch((err)=>{
        
    alert("User Already Exist")
    console.log('error',err)
    
    })

    }

        
  

    }
      

    useEffect(() =>{
        const getdata = localStorage.getItem('token');
        
        const roleua = localStorage.getItem('role')

        if (!roleua){
            history.push('/register')
        }
 
        else if (roleua === 'Admin'){
     
            history.push('/Welcome')
 
        }else{
            history.push('/')
        }
    
         
         },[]);


         useEffect(() => {

            const fetcharea = async () => {
                const res = await fetch(`https://13k.up.railway.app/api/allgetarea`);
        
                const dataarea = await res.json();
                console.log(dataarea);
            
                setAreaData(dataarea);
             
            };
            
            fetcharea()
        
        }, []);


     

            const fetchareaName = async () => {
                const res = await fetch(`https://13k.up.railway.app/api/getareaname/${register.area}`);
        
                const dataareaname = await res.json();
                console.log(dataareaname);
            
                setAreaNameData(dataareaname);
             
            };
            
 

return(

<>

<div className="l-form">
            <form action="" className="form">
                <h1 className="form__title">Register</h1>

                <div className="form__div">
                    <input type="text" className="form__input" placeholder=" "   onChange={ (e)=>{setRegister({...register, hotelname: e.target.value})} } />
                    <label className="form__label">Business Name</label>
                </div>


                <div className="form__div">
                    <input type="text" className="form__input" placeholder=" "   onChange={ (e)=>{setRegister({...register, name: e.target.value})} } />
                    <label className="form__label">Name</label>
                </div>

                <div className="form__div">
                    <input type="text" className="form__input" placeholder=" "  value="Karachi"/>
                    <label className="form__label">City</label>
                </div>

                <div>
                <label>Area: </label>    
                <select onClick={()=>fetchareaName()} onChange=  { (e)=>{setRegister({...register, area: e.target.value})} } >

                <option> Choose Area </option>     
{/* 
    <option value="Saddar">Saddar</option>
  <option value="North Karachi">North Karachi</option>
  <option value="Clifton">Clifton</option> */}

{areaData.map((area) => (
    
<option> {area.areaName}</option>

))}

              
              
                    </select>

               
                </div>

                <div className="form__div">
                    {/* <input type="text" className="form__input" placeholder=" "   onChange={ (e)=>{setRegister({...register, marketname: e.target.value})} } />
                    <label className="form__label">Market Name</label> */}

<label>Market: </label>    
<select onChange=  { (e)=>{setRegister({...register, marketname: e.target.value})} } >

<option> Choose Market </option>        
{/* 
    <option value="Saddar">Saddar</option>
  <option value="North Karachi">North Karachi</option>
  <option value="Clifton">Clifton</option> */}

{areaDaTaName.map((areadata) => (

<option> {areadata.marketName}</option>

))}

              
              
                    </select>
                </div>
                <div className="form__div">
                    <input type="text" className="form__input" placeholder=" "   onChange={ (e)=>{setRegister({...register, cnic: e.target.value})} } />
                    <label className="form__label">CNIC</label>
                </div>

                <input type='file' name = 'file' onChange = {uploadImage}/>
                {
      loading?( //if
        <h3>Loading ... </h3>
      ): ( //else

        <img src={image} width={{width: '20px'}} />
      )
    }

<br />
<br />

                <div className="form__div">
                    <input type="text" className="form__input" placeholder=" "   onChange={ (e)=>{setRegister({...register, email: e.target.value})} } />
                    <label className="form__label">Email</label>
                </div>

                <div className="form__div">
                    <input type="password" className="form__input" placeholder=" " onChange={ (e)=>{setRegister({...register, password: e.target.value})} } />
                    <label  className="form__label">Password</label>
                </div>


                <input type="button" className="form__button" value="Register" onClick={registerc} />
                <br />
                <input type="button" className="form__button" value="Log In" onClick={()=>{history.push('/login')}} />
            </form>
        </div>
        
</>


)
}

export default Register;

