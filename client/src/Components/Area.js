import React, {useState, useEffect} from 'react'
import Header from './Main/Header';

import {useHistory} from "react-router-dom";
import axios from 'axios';
import Sheader from '../Components/Main/sHeader';



const Area=(props)=>{



const history = useHistory()
const [roleau, setroleau] = useState ('');
const [area, setArea] = useState({
  areaName: "",

})
    


const addPost=()=>{
    
    if(!area.areaName.trim()){
        alert("Enter Area");
        }
    else{

        const headers = { "Content-Type": "application/json" };
        axios.post(`/api/allpostarea`,{
            areaName:area.areaName,
            // imageURL:categoryDetail.imageURL,
            userEmail: localStorage.getItem('user'),
            hotelname: localStorage.getItem('hotel'),
},{
headers,
})

.then((success)=>{
console.log('success',success)
history.push('/Welcome2')
})

.catch((err)=>{
    console.log('error',err)

})

}
      
}
            

const routeto=()=>{

    let roleuseradmin = localStorage.getItem('role');
    console.log(roleuseradmin, 'roleuseradmin')
    
 if (roleuseradmin === 'Super'){
        history.push('/area')
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

    routeto();
    getrole();
    
    
    }, []);


return(

<>

{
           
           (roleau === 'Admin' ? <Header />  : <Sheader />)

    }




<div className='MainDiva'>


<div className="l-form">
            <form action="" className="form">
                <h1 className="form__title">Add Area</h1>

                <div className="form__div">
                    <input type="text" className="form__input" placeholder=" "   onChange=  { (e)=>{setArea({...area, areaName: e.target.value})} } />
                    <label className="form__label"> Area Name</label>
                </div>


                {/* <div className="form__div">
                    <input type="text" className="form__input" placeholder=" " onChange={ (e)=>{setcategoryDetail({...categoryDetail, imageURL: e.target.value})} } />
                    <label  className="form__label"> Image</label>
                </div> */}

                <input type="button" className="form__button" value="Add" onClick={()=>{addPost()}} />
            </form>

        {/* <h1>{productDetail.productName}</h1>
        <h1>{productDetail.productPrice}</h1>
        <h1>{productDetail.productImage}</h1> */}

        </div>




     


</div>

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

</>


)

}

export default Area;
