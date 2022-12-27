import React, {useState, useEffect} from 'react'
import Header from '../Main/Header';

import {useHistory} from "react-router-dom";
import axios from 'axios'
import Sheader from '../Main/sHeader';


const Weightrate=(props)=>{



const history = useHistory()
const [roleau, setroleau] = useState ('');
const [categoryDetail, setcategoryDetail] = useState({
  
    upto500Gram : "",
    fivehundred1to1kg: "",
    eachkg: ""


})
    


const addPost=()=>{
    
    if(!categoryDetail.upto500Gram.trim()){
        alert("Enter upto500Gram");
        }
    else{

        const headers = { "Content-Type": "application/json" };
        axios.post(`/api/allpostweight`,{
            upto500Gram:categoryDetail.upto500Gram,
            fivehundred1to1kg:categoryDetail.fivehundred1to1kg,
            eachkg:categoryDetail.eachkg,
           
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
        history.push('/weightrate')
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
        axios.patch(`/api/weightupdate/6349c7e9d21e304d9e00a547`,{
    
            upto500Gram:categoryDetail.upto500Gram,
            fivehundred1to1kg:categoryDetail.fivehundred1to1kg,
            eachkg:categoryDetail.eachkg,
    
    },{
    headers,
    })
    
    .then((success)=>{
    console.log('success',success)
    alert("Weight Rate Updated")
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
                <h1 className="form__title">Add Weight Rate</h1>

                <div className="form__div">
                    <input type="text" className="form__input" placeholder=" "   onChange=  { (e)=>{setcategoryDetail({...categoryDetail, upto500Gram: e.target.value})} } />
                    <label className="form__label"> upto500Gram</label>
                </div>

                <div className="form__div">
                    <input type="text" className="form__input" placeholder=" "   onChange=  { (e)=>{setcategoryDetail({...categoryDetail, fivehundred1to1kg: e.target.value})} } />
                    <label className="form__label"> fivehundred1to1kg</label>
                </div>

                <div className="form__div">
                    <input type="text" className="form__input" placeholder=" "   onChange=  { (e)=>{setcategoryDetail({...categoryDetail, eachkg: e.target.value})} } />
                    <label className="form__label"> eachkg</label>
                </div>


   
{/* 
                <input type="button" className="form__button" value="Add" onClick={()=>{addPost()}} />
                <br />  */}
                <input type="button" className="form__button" value="Update Weight Rate" onClick={()=>{updatePost()}} />
            </form>

        {/* <h1>{productDetail.productName}</h1>
        <h1>{productDetail.productPrice}</h1>
        <h1>{productDetail.productImage}</h1> */}

        </div>




     


</div>


</>


)

}

export default Weightrate;
