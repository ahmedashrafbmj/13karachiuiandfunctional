import React, {useState, useEffect} from 'react'
import Header from '../Main/Header';
import Footer from '../Main/Footer'
import {useHistory,useLocation} from "react-router-dom";
import axios from 'axios'
import {useParams} from 'react-router-dom';
import Sheader from '../Main/sHeader';




const Edit=(props)=>{


    const [roleau, setroleau] = useState ('');


const history = useHistory()

const [productDetail, setproductDetail] = useState({})

const [img2, Setimg2] =useState('')

const imgupdate =()=>{

    Setimg2(productDetail.imageURL)
    console.log(image, 'image')
}


useEffect(() => {
    
    imgupdate()
    

}, []);

const [image, setImage] = useState(img2);
const [loading, setLoading] = useState(false);


    


const { id } = useParams("");
    console.log(id);



    const getdata = async () => {

        const res = await fetch(`https://13k.up.railway.app/api/getuser/${id}`, {
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


    
const getrole=()=>{

    let roleuser = localStorage.getItem('role');
  
    setroleau(roleuser);
    console.log(roleau, 'roleg')
  
  }
  
    useEffect(() => {
        
        getdata();
        getrole();
       
        

    }, []);





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
        axios.patch(`https://13k.up.railway.app/api/updateuser/${id}`,{
            productName:productDetail.productName,
            productPrice:productDetail.productPrice,
            // imageURL:productDetail.imageURL,
            imageURL:image,
            // userEmail: localStorage.getItem('user'),
            qty:productDetail.qty,
            category:productDetail.category,
            productTitle:productDetail.productTitle,
            productWeight:productDetail.productWeight,
},{
headers,
})

.then((success)=>{
console.log('success',success)

let roleuseradmin = localStorage.getItem('role');
           console.log(roleuseradmin, 'roleuseradmin')
    
    if (roleuseradmin === 'Admin'){
        history.push('/welcome')
    }

    
    else{
        history.push('/welcome2')
    }
 





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


<div className='Heading'><h1>Edit Products</h1>

</div>



<div className='MainDiva'>


<div className="l-form">
            <form action="" className="form">
                <h1 className="form__title">Edit</h1>

                <div className="form__div">
                    <input type="text" disabled="true" className="form__input" placeholder= "" value={productDetail.productName}  onChange=  { (e)=>{setproductDetail({...productDetail, productName: e.target.value})} } />
                    <label className="form__label">Category</label>
                </div>

                <div className="form__div">
                    <input type="text" className="form__input" placeholder=" " value={productDetail.productTitle} onChange={ (e) =>{setproductDetail({...productDetail, productTitle: e.target.value })} } />
                    <label  className="form__label">Product Title</label>
                </div>

                <div className="form__div">
                    <input type="text" className="form__input" placeholder=" " value={productDetail.productPrice} onChange={ (e) =>{setproductDetail({...productDetail, productPrice: e.target.value })} } />
                    <label  className="form__label">Product Price</label>
                </div>

                <div className="form__div">
                    <input type="text" className="form__input" placeholder=" " value={productDetail.productWeight} onChange={ (e) =>{setproductDetail({...productDetail, productWeight: e.target.value })} } />
                    <label  className="form__label">Product Weight</label>
                </div>

                <div className="form__div">
                    <input type="text" disabled="true" className="form__input" placeholder=" " value={productDetail.imageURL} onChange={ (e) =>{setproductDetail({...productDetail, imageURL: e.target.value })} } />
                    <label  className="form__label"> Image</label>
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
                    <input type="text" className="form__input" placeholder=" " value={productDetail.qty} onChange={ (e) =>{setproductDetail({...productDetail, qty: e.target.value })} } />
                    <label  className="form__label">Qty</label>
                </div>

                <div className="form__div">
                    <input type="text" className="form__input" placeholder=" " value={productDetail.category} onChange={ (e) =>{setproductDetail({...productDetail, category: e.target.value })} } />
                    <label  className="form__label">Product Details</label>
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

export default Edit;
