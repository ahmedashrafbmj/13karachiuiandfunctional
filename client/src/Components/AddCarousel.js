import React, {useState, useEffect} from 'react'
import Header from './Main/Header';

import {useHistory} from "react-router-dom";
import axios from 'axios';
import Sheader from '../Components/Main/sHeader';



const AddCarousel=(props)=>{



const history = useHistory()
const [roleau, setroleau] = useState ('');
const [image, setImage] = useState("");
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

  setImage([...image, file.secure_url])


  setLoading(false)

}   


const addPost=()=>{
    

        const headers = { "Content-Type": "application/json" };
        axios.post(`/api/allpostcarousel`,{
            imageURL: image,
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
      

            

const routeto=()=>{

    let roleuseradmin = localStorage.getItem('role');
    console.log(roleuseradmin, 'roleuseradmin')
    
 if (roleuseradmin === 'Super'){
        history.push('/addcarousel')
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

  const addtest=()=>{
    console.log(image, 'testarr')
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

< br />
< br />
< br />
< br />
< br />

<div class="col-12">

<div class="card text-center">
<div class="card-header">
Single Image for Carousel
</div>
<div class="card-body">
{/* <h5 class="card-title">Special title treatment</h5> */}
<p class="card-text">

{
      loading?( //if
        <h3>Loading ... </h3>
      ): ( //else


        <img src={image} width={{width: '20px'}} />
      )
    }

</p>



</div>

<div class="card-footer text-muted">

<input type='file' name = 'file' class="form-control-file" onChange = {uploadImage}/>

<button type="button" class="btn btn-primary" onClick={()=>{addPost()} }>Add Carousel</button>
{/* <button type="button" class="btn btn-primary" onClick={()=>{addtest()} }>test</button> */}
</div>
</div>
</div>


<br />
<br />
<br />



</>


)

}

export default AddCarousel;
