import React, {useState, useEffect} from 'react'
import Header from './Main/Header';

import {useHistory} from "react-router-dom";
import axios from 'axios'



const Subcategory=(props)=>{



const history = useHistory()
const [category, setCategory] = useState([]);
const [categoryDetail, setcategoryDetail] = useState({
  
  categoryName: "",
  subcategoryName: ""
//   imageURL: ""

})
    


const addPost=()=>{
    
    if(!categoryDetail.categoryName.trim()){
        alert("Enter Sub Category");
        }
    else{

        const headers = { "Content-Type": "application/json" };
        axios.post(`/api/allpostsubcategory`,{
            categoryName:categoryDetail.categoryName,
            subcategoryName:categoryDetail.subcategoryName,
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
            

useEffect(() => {

    const fetchCategory = async () => {
        const res = await fetch(`/api/allgetcategory`);

        const datacategory = await res.json();
        console.log(datacategory);
    
        setCategory(datacategory);
     
    };
    
    fetchCategory()

}, []);

const routeto=()=>{

    let roleuseradmin = localStorage.getItem('role');
           console.log(roleuseradmin, 'roleuseradmin')
    
    if (roleuseradmin === 'Admin'){
        history.push('/SubCategory')
    }else{
        history.push('/')
    }
 
}

useEffect(() => {

    routeto()
    
    
    }, []);


return(

<>
<Header />




<div className='MainDiva'>


<div className="l-form">
            <form action="" className="form">
                <h1 className="form__title">Add Sub Category</h1>

                <label>Category: </label>    
                <select onChange=  { (e)=>{setcategoryDetail({...categoryDetail, categoryName: e.target.value})} } >

                    {category.map((category) => (

                    <option> {category.categoryName}</option>

                    ))}
              
                    </select>



                <div className="form__div">
                    <input type="text" className="form__input" placeholder=" " onChange={ (e)=>{setcategoryDetail({...categoryDetail, subcategoryName: e.target.value})} } />
                    <label  className="form__label"> Sub Category</label>
                </div>

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

export default Subcategory;
