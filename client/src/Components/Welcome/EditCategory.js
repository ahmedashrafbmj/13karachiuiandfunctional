import React, {useState, useEffect} from 'react'
import Header from '../Main/Header';
import Footer from '../Main/Footer'
import {useHistory,useLocation} from "react-router-dom";
import axios from 'axios'
import {useParams} from 'react-router-dom';
import Sheader from '../Main/sHeader';




const EditCategory=(props)=>{



const history = useHistory()
const [roleau, setroleau] = useState ('');
const [productDetail, setproductDetail] = useState({})




    


const { id } = useParams("");
    console.log(id);



    const getdata = async () => {

        const res = await fetch(`/api/catid/${id}`, {
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








const updatePost=()=>{
    

        const headers = { "Content-Type": "application/json" };
        axios.patch(`/api/catupdate/${id}`,{
            categoryName:productDetail.categoryName,
            imageURL:productDetail.imageURL,

},{
headers,
})

.then((success)=>{
console.log('success',success)
history.push('/viewcategory')
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

<div className='Heading'><h1>Edit Category</h1>

</div>



<div className='MainDiva'>


<div className="l-form">
            <form action="" className="form">
                <h1 className="form__title">Edit</h1>

                <div className="form__div">
                    <input type="text" className="form__input" placeholder= "" value={productDetail.categoryName}  onChange=  { (e)=>{setproductDetail({...productDetail, categoryName: e.target.value})} } />
                    <label className="form__label">Category</label>
                </div>

                <div className="form__div">
                    <input type="text" className="form__input" placeholder=" " value={productDetail.imageURL} onChange={ (e) =>{setproductDetail({...productDetail, imageURL: e.target.value })} } />
                    <label  className="form__label"> Image</label>
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

export default EditCategory;
