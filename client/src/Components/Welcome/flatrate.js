import React, {useState, useEffect} from 'react'
import Header from '../Main/Header';

import {useHistory} from "react-router-dom";
import axios from 'axios'
import Sheader from '../Main/sHeader';


const Flatrate=(props)=>{



const history = useHistory()
const [roleau, setroleau] = useState ('');
const [categoryDetail, setcategoryDetail] = useState({
  
  flat: "",
  

})
    


const addPost=()=>{
    
    if(!categoryDetail.flat.trim()){
        alert("Enter Flat");
        }
    else{

        const headers = { "Content-Type": "application/json" };
        axios.post(`/api/allpostflat`,{
            flat:categoryDetail.flat,
           
            userEmail: localStorage.getItem('user'),
            hotelname: localStorage.getItem('hotel'),
},{
headers,
})

.then((success)=>{
console.log('success',success)
history.push('/Welcome')
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
        history.push('/flatrate')
    }else{
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

    const updatePost=()=>{
    

        const headers = { "Content-Type": "application/json" };
        axios.patch(`/api/flatupdate/6349c7e9d21e304d9e00a547`,{
    
            flat: categoryDetail.flat,
    
    },{
    headers,
    })
    
    .then((success)=>{
    console.log('success',success)
    alert("Rate Updated")
    history.push('/welcome2')

    })
    
    .catch((err)=>{
    console.log('error',err)
    
    })
    
    }
    

return(

<>

{
           
           (roleau === 'Admin' ? <Header />  : <Sheader />)

    }
<br />
<br />
<br />


<div className='MainDiva'>


<div className="l-form">
            <form action="" className="form">
                <h1 className="form__title">Add Flat Rate</h1>

                <div className="form__div">
                    <input type="text" className="form__input" placeholder=" "   onChange=  { (e)=>{setcategoryDetail({...categoryDetail, flat: e.target.value})} } />
                    <label className="form__label"> Flat Rate</label>
                </div>


   

                {/* <input type="button" className="form__button" value="Add" onClick={()=>{addPost()}} />
                <br /> */}
                <input type="button" className="form__button" value="Update Rate" onClick={()=>{updatePost()}} />
            </form>

        {/* <h1>{productDetail.productName}</h1>
        <h1>{productDetail.productPrice}</h1>
        <h1>{productDetail.productImage}</h1> */}

        </div>




     


</div>


</>


)

}

export default Flatrate;
