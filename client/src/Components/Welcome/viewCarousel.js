import React, {useState, useEffect} from 'react'
import Header from '../Main/Header'

import {useHistory} from "react-router-dom";
import axios from 'axios';
import { border } from '@mui/system';
import Button from '@mui/material/Button';
import { Alert } from '@mui/material';
import { AlertTitle } from '@mui/material';
import Sheader from '../Main/sHeader';



const ViewCarousel=(props)=>{

    const history = useHistory()   
    const [productDetail, setproductDetail] = useState({})
    const [roleau, setroleau] = useState ('');
      const [userState, setUserState] = useState([]);

      const [useremail, setuserEmail] = useState([]);

      const [hotelname, sethotelname] = useState([]);


const getdata = async () => {

    const findEmail2 = localStorage.getItem('user'); 
    // http://localhost:4000/api/allpostdata

    // `http://localhost:4000/api/postbyemail/${useremail}`

    // /api/allpostdata

    const res = await fetch(`/api/allgetcarousel`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
        
    });

    const data = await res.json();
    console.log(data, 'data');
    setUserState(data);    

}


const gethotelname = async () => {
    // http://localhost:4000/api/allpostdata

    // `http://localhost:4000/api/postbyemail/${useremail}`
    const findEmail = localStorage.getItem('user'); 
    console.log(findEmail)

    const res3 = await fetch(`/api/postbyemailsignup/${findEmail}`,{
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
        
    });

    const hotel = await res3.json();
    sethotelname(hotel[0]?.hotelname);

  
}

localStorage.setItem('hotel', [hotelname])  
console.log(hotelname);

useEffect(()=>{

    gethotelname()
    
}, []);


const getrole=()=>{

    let roleuser = localStorage.getItem('role');
  
    setroleau(roleuser);
    console.log(roleau, 'roleg')
  
  }
  

useEffect(()=>{
    const udata = localStorage.getItem('user');    
    setuserEmail(udata); 
    
    getdata()



    

}, []);


const routeto=()=>{

    let roleuseradmin = localStorage.getItem('role');
           console.log(roleuseradmin, 'roleuseradmin')
    
    if (roleuseradmin === 'Super'){
        history.push('/viewcarousel')
    }else{
        history.push('/')
    }
 
}

useEffect(() => {

    routeto();
    getrole();
    
    
    }, []);


    const [image, setImage] = useState('');
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






const updatePost=(id)=>{
    

        const headers = { "Content-Type": "application/json" };
        axios.patch(`/api/carouselupdate/${id}`,{
    
                imageURL: image,
          
     

},{
headers,
})

.then((success)=>{
console.log('success',success)
getdata()

})

.catch((err)=>{
    console.log('error',err)

})

}


///delelte single data

const deletedata = async (id) => {
    // http://localhost:4000/api/allpostdata

    const res2 = await fetch(`/api/deletecarousel/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
        
        
    });
alert("delete successfully")

    // const deletepost = await res2.json();
    // console.log(deletepost);
    // setUserState(deletepost);
    
    getdata()

}



return(

<>
{
           
           (roleau === 'Admin' ? <Header />  : <Sheader />)

    }
<br />
<br />

<div className='Heading'><h1>Name: {hotelname}</h1> 
<br />

{/* <h1>{useremail}</h1> */}





</div>



<div className='MainDiva'>



<table>
                        <thead>
                            <tr>
                                <th>S.No</th>
                              
                                <th> Image</th>
                                <th>ID</th>
                                <th> Edit</th>
                                <th>Update</th>
                                <th>Delete</th>
                               
  
                            
                            </tr>
                        </thead>

                        <tbody>
            
                            {
                                userState.map((element, id) => {
                                    return (


                                        <>
                                            <tr>
                                                <th scope="row">{id + 1}</th>
                                               
                                               
                                                <td><img src={element.imageURL} height='100px'></img></td>
                                                <td>{element._id}</td>
                                                <br />

                    <div className="form__div">
                    <input type="text" disabled="true" className="form__input" placeholder= "" value={productDetail.img}  onChange=  { (e)=>{setproductDetail({...productDetail, img: e.target.value})} } />
                    <label className="form__label">Image</label>
                </div>

                <input type='file' name = 'file' onChange = {uploadImage}/>
                {
      loading?( //if
        <h3>Loading ... </h3>
      ): ( //else

        <img src={image} width={{width: '20px'}} />
      )
    }

                                                <td><Button sx= {{marginRight: 5}}  variant="contained" onClick={() => updatePost(element._id)}>Update</Button></td>

                                                <td><Button sx= {{marginRight: 5}}  variant="contained" onClick={() => deletedata(element._id)}>Delete</Button></td>
                                      

                                                
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>







</div>

</>


)

}

export default ViewCarousel;
