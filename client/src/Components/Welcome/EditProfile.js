import React, {useState, useEffect} from 'react'
import Header from '../Main/Header';
import Footer from '../Main/Footer'
import {useHistory,useLocation} from "react-router-dom";
import axios from 'axios'
import {useParams} from 'react-router-dom';
import Sheader from '../Main/sHeader'




const EditProfile=(props)=>{

    const [roleau, setroleau] = useState ('');

const history = useHistory()

const [productDetail, setproductDetail] = useState({})




    


const { id } = useParams("");
    console.log(id);



    const getdata = async () => {

        const res = await fetch(`/api/profileid/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

   if (res.status === 422 || !data) {
  console.log("error ");

} else {
    setproductDetail(data)


console.log("get data");

 }
    }

    useEffect(() => {
        getdata();
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






const updatePost=()=>{
    

        const headers = { "Content-Type": "application/json" };
        axios.patch(`/api/profileupdate/${id}`,{
            cnic:productDetail.cnic,
            contact:productDetail.contact,
            address:productDetail.address,
            
                // img:productDetail.img,
           
                img: image,
           
            
           
            
     

},{
headers,
})

.then((success)=>{
console.log('success',success)
history.push('/adminProfile')
})

.catch((err)=>{
    console.log('error',err)

})

}
      

const getrole=()=>{

    let roleuser = localStorage.getItem('role');
  
    setroleau(roleuser);
    console.log(roleau, 'roleg')
  
  }          
    

return(

    

<>

{
           
           (roleau === 'Admin' ? <Header />  : <Sheader />)

    }





<div className='MainDiva'>


<div className="l-form">
            <form action="" className="form">
                <h1 className="form__title">Edit</h1>

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

    <br />
    <br />

                <div className="form__div">
                    <input type="text" className="form__input" placeholder= "" value={productDetail.cnic}  onChange=  { (e)=>{setproductDetail({...productDetail, cnic: e.target.value})} } />
                    <label className="form__label">CNIC</label>
                </div>

                <div className="form__div">
                    <input type="text" className="form__input" placeholder= "" value={productDetail.contact}  onChange=  { (e)=>{setproductDetail({...productDetail, contact: e.target.value})} } />
                    <label className="form__label">contact</label>
                </div>

                <div className="form__div">
                    <input type="text" className="form__input" placeholder= "" value={productDetail.address}  onChange=  { (e)=>{setproductDetail({...productDetail, address: e.target.value})} } />
                    <label className="form__label">Address</label>
                </div>





                
                

                <input type="button" className="form__button" value="Update" onClick={()=>{updatePost()}} />
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
<Footer />
</>


)

}

export default EditProfile;
