import React, {useState, useEffect} from 'react'
import Header from './Main/Header';
import {useHistory,useLocation} from "react-router-dom";
import axios from 'axios'
import FileUploadScreen from '../screens/FileUploadScreen';
import {getSingleFiles, getMultipleFiles} from '../data/api';
import Sheader from '../Components/Main/sHeader'
import { breakpoints } from '@mui/system';





const Add=(props)=>{



const history = useHistory()
const [roleau, setroleau] = useState ('');
const [category, setCategory] = useState([]);

const [multiproducts, setMultiprod] = useState([]);
const [exmultiproducts, exsetMultiprod] = useState([]);
const [totalpcount, settotalpcount] = useState([0])

const [subcategory, setsubCategory] = useState([]);
const [singleFiles, setSingleFiles] = useState([]);
  const [multipleFiles, setMultipleFiles] = useState([]);

  const [othertotal, setOtherTotal] = useState(0);

  const [matchqty, setmatchqty] = useState(0);

  const [lastmultipleRecord, setlastmultipleRecord] = useState([]);

  const getSingleFileslist = async () => {
    try {
        const fileslist = await getSingleFiles();
        setSingleFiles(fileslist);
    } catch (error) {
      console.log(error);
    }
  }
  const getMultipleFilesList = async () => {
    try {
        const fileslist = await getMultipleFiles();
        setMultipleFiles(fileslist);
        console.log(multipleFiles);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    // getSingleFileslist();
    // getMultipleFilesList();
  }, []);


const [productDetail, setproductDetail] = useState({
  
  productName: "",
  productPrice: "",
  productwasPrice: "",
  productImage: "",
  productQty: "",
  productCategory: "",
  productTitle: "",
  productWeight: "",
  productSize: "",
  productColor: "",
  otherQty: "",
})
    


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

  setImage(file.secure_url)

  setLoading(false)

}   

const fetchCategory = async () => {
  const res = await fetch(`https://13k.up.railway.app/api/allgetcategory`);

  const datacategory = await res.json();
  console.log(datacategory);

  setCategory(datacategory);

};


useEffect(() => {

    fetchCategory()
    

}, []);



    const fetchsubCategory = async () => {

        const res = await fetch(`https://13k.up.railway.app/api/getsubcategorybyname/${productDetail.productName}`);

        const datasubcategory = await res.json();
        console.log(datasubcategory);
        console.log(productDetail.productName, "fetchsubcat")
    
        setsubCategory(datasubcategory);
     
    };
    

    // const multi = multiproducts.map((prod)=>{

    //   console.log(prod.value[0], 'color')
    //   console.log(prod.value[1], 'size')
    //   console.log(prod.value[2], 'qty')
    //  })

    const lastRecord = async () => {
      const res = await fetch(`https://13k.up.railway.app/api/lastmulti`);

      const lastRecordMulti = await res.json();
      console.log(lastRecordMulti, 'lastmulti');
  
      setlastmultipleRecord(lastRecordMulti);
   
  };
  


  const totalPurchase =()=>{

    // const sum = multiproducts.reduce((prev, current)=> prev + +current.value[2],0);
        
      // return prev += +current.value[2]
        
     
      // }, 0);
      
      // let arr = [];
      // arr.push([productDetail.otherQty])
      // console.log(arr, 'arr')
      // settotalpcount(arr)

     
      // console.log(totalpcount, ' p array')

      // const sum = totalpcount.reduce((total, current)=> total + +current,0);
      // console.log(sum, 'sum func')
      // setOtherTotal(sum)
      // console.log(othertotal, 'sum func state')

      const sum = totalpcount.reduce((total, current)=> total + +current,0);
      setOtherTotal(sum)
      console.log(sum, 'sum func')

}



const addPost=()=>{

    
    if(!productDetail.productName.trim()){
        alert("Enter Category");
        }
 

            else if(!productDetail.productTitle.trim()){
                alert("Enter Title");
                }

                else if(!productDetail.productPrice.trim()){
                    alert("Enter Price");
                    }
                else if(!productDetail.productWeight.trim()){
                    alert("Enter Weight");
                   
                    }

                    else if(!productDetail.productQty.trim()){
                        alert("Enter Qty");
                        }

                        else if(!productDetail.productCategory.trim()){
                            alert("Enter Description");
                            }
            
            
            else{
   
        const headers = { "Content-Type": "application/json" };
        // const multi = multiproducts.map((prod)=>{
        axios.post(`https://13k.up.railway.app/api/postdata`, {
          
          

            productName:productDetail.productName,
            productPrice:productDetail.productPrice,
            productwasPrice:productDetail.productwasPrice,
            imageURL: image,
            userEmail: localStorage.getItem('user'),
            qty:productDetail.productQty,
            category:productDetail.productCategory,
            hotelname: localStorage.getItem('hotel'),
            prodarea: localStorage.getItem('area'),
            prodmarketname: localStorage.getItem('market'),
            productTitle:productDetail.productTitle,
            productWeight:productDetail.productWeight,
           


     
            multiProd:  multiproducts.map((prod)=>(

          
         
              {
                productColor: prod.value[0],
                productSize: prod.value[1],
                otherQty: prod.value[2],
              }
            
            
          )),

          files:  lastmultipleRecord[0].files.map((last)=>(

            {
              fileName: last.fileName,
              filePath: last.filePath,
              fileType: last.fileType,
              fileSize: last.fileSize
            }
          
          
        ))
            

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

}
            

const routeto=()=>{

    let roleuseradmin = localStorage.getItem('role');
           console.log(roleuseradmin, 'roleuseradmin')
    
    if (roleuseradmin === 'Admin'){
        history.push('/Add')
    }

       
    else if (roleuseradmin === 'Super'){
      history.push('/Add')
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

    routeto()
    getrole()
 
    
    }, []);


 

    const addMultiProducts=()=>{
      
      // totalPurchase()
      // if (productDetail.productQty  > othertotal ||  othertotal < productDetail.productQty ){  
      //   console.log(productDetail.productQty, 'qty')
      //     alert("qty limit")
      
      // }
      //   else{
          
      productDetail.productQty <= othertotal ? alert('maximum qty')
:
      setMultiprod([... multiproducts, {

        id: multiproducts.length,
        value: [productDetail.productColor , productDetail.productSize, productDetail.otherQty]

      }])
   
      settotalpcount(current => [...current, productDetail.otherQty]);
     
      // arr.push([...productDetail.otherQty])
      // settotalpcount(arr)
      // console.log(arr, 'arr other')
    

      // const sum = (multiproducts.reduce((prev, {current})=> prev + parseInt(current.value[2]),0));
      // console.log(sum, 'sum other')


    }
    
    // totalPurchase()


    

   
  

    console.log(productDetail.productQty, 'qty')
    console.log(multiproducts, 'multiprod')
    console.log(totalpcount, 'pcount other state')
    // console.log(othertotal, 'other total')
    // console.log(lastmultipleRecord[0].files, 'checklast')



return(

<>

{
           
           (roleau === 'Admin' ? <Header />  : <Sheader />)

    }

<br />
  <br />
  <br />
  <br />
  <br />


<div class="container">
  <div class="row justify-content-md-center">


    <p class="h1">Add Products</p>
  
    </div>
    </div>

    <br />

    <div class="container">
  <div class="row">

  <div class="col-8">
  <form>


  <div class="form-row">

    <div class="form-group col-md-12">
      <label for="inputState">Select Category</label>

      <select class="form-control" onClick={()=>{fetchsubCategory()}} onChange=  { (e)=>{setproductDetail({...productDetail, productName: e.target.value})} } >

      <option selected>Choose...</option>
{category.map((category) => (


<option>{category.categoryName}</option>

))}

</select>


    </div>

  </div>

  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Prdouct Title</label>
      <input type="text"  class="form-control"  onChange={ (e) =>{setproductDetail({...productDetail, productTitle: e.target.value })} }/>
    </div>



    <div class="form-group col-md-3">
      <label for="inputContact">Was Price</label>
      <input type="text"  class="form-control" onChange={ (e) =>{setproductDetail({...productDetail, productwasPrice: e.target.value })} } />
    </div>

    <div class="form-group col-md-3">
      <label for="inputContact">Sale Price</label>
      <input type="text"  class="form-control" onChange={ (e) =>{setproductDetail({...productDetail, productPrice: e.target.value })} } />
    </div>

  </div>
  

  

  <div class="form-row">
    <div class="form-group col-md-6">
      <label for="inputEmail4">Prdouct Weight</label>
      <input type="text"  class="form-control"  onChange={ (e) =>{setproductDetail({...productDetail, productWeight: e.target.value })} }/>
    </div>

    <div class="form-group col-md-6">
      <label for="inputContact">Product Qty</label>
      <input type="text"  class="form-control" onChange={ (e) =>{setproductDetail({...productDetail, productQty: e.target.value })} } />
    </div>
  </div>
  <div class="form-row">

  <div class="form-group col-md-3">
      <label for="inputState">Size</label>
      <select id="inputState" class="form-control" onChange={ (e) =>{setproductDetail({...productDetail, productSize: e.target.value })} }>
        <option selected>Select Size</option>
        <option>Small</option>
        <option>Medium</option>
        <option>Large</option>
        <option>XL</option>
        <option>XXL</option>
        <option>22</option>
        <option>24</option>
        <option>26</option>
        <option>28</option>
        <option>30</option>
        <option>32</option>
        <option>Other</option>
      </select>
    </div>

 
    <div class="form-group col-md-3">

    <label for="inputColor">Color</label>
      <select id="inputColor" class="form-control" onChange={ (e) =>{setproductDetail({...productDetail, productColor: e.target.value })} }>
        <option selected>Select Color</option>
        <option>Red</option>
        <option>Blue</option>
        <option>Green</option>
        <option>Black</option>
        <option>Yellow</option>
        <option>Other</option>
      </select>

    </div>
    
    <div class="form-group col-md-2">
      <label for="inputContact">Other Qty</label>
      <input type="text"  class="form-control" onChange={ (e) =>{setproductDetail({...productDetail, otherQty: e.target.value })} } />
      
    </div>

    <div class="form-group col-md-3">
    <br />
    
      <button type="button" class="btn btn-primary" onClick={()=>{addMultiProducts()}}>Add Multi Product</button>
      <button type="button" class="btn btn-primary" onClick={()=>{totalPurchase()}}>Set Products</button>

    
    </div>
  

  </div>
  
  
  <div class="form-group col-md-12">
    
      
      <ul>


{multiproducts.map(item=>{

  return <li key={item.id}> {item.value[0]} <br /> 
  {item.value[1]} <br/ >{item.value[2]}</li>

})


}
</ul>

{`Other Total: ${othertotal}`}
      
    </div>
  
  <div class="form-group">
    <label for="inputAddress">Product Description</label>
    <input type="text" class="form-control" onClick={()=>{lastRecord()} } placeholder="" onChange={ (e)=>{setproductDetail({...productDetail, productCategory: e.target.value})} }/>
  </div>


  <button type="button" class="btn btn-primary" onClick={()=>{addPost()} }>Add Product</button>
</form>

    </div>


<div class="col-4">

<div class="card text-center">
<div class="card-header">
Single Image for Product Title
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


</div>


<br />
<br />
<br />






<div class="card text-center">
<div class="card-header">
Multiple Image for Product Title
</div>
<div class="card-body">
{/* <h5 class="card-title">Special title treatment</h5> */}
<p class="card-text">



</p>



</div>

<div class="card-footer text-muted">

<FileUploadScreen />


</div>




</div>






</div>
    </div>












    

</div>
</div>




<br/>


<div className="container">
          <h3 className="text-danger font-weight-bolder border-bottom text-center"></h3>
          {/* <FileUploadScreen getsingle={() => getSingleFileslist()} getMultiple={() => getMultipleFilesList()}/> */}
       </div> 
       <div className="container-fluid mt-5">
         <div className="row">
           <div className="col-6">
             {/* <h4 className="text-success font-weight-bold">Single Files List</h4> */}
             <div className="row">
                {singleFiles.map((file, index) => 
                  <div className="col-6">
                    <div className="card mb-2 border-0 p-0">
                      <img src={`/${file.filePath}`} height="200" className="card-img-top img-responsive" alt="img"/>
                      </div>
                  </div>
                )}
             </div>
           </div>
           <div className="col-6">
             {/* <h4 className="text-success font-weight-bold">Multiple Files List</h4> */}
             {multipleFiles.map((element, index) =>
                <div key={element._id}>
                    <h6 className="text-danger font-weight-bold">{element.title}</h6>
                    <div className="row">
                      {element.files.map((file, index) =>
                        <div className="col-6">
                            <div className="card mb-2 border-0 p-0">
                              <img src={`/${file.filePath}`} height="200" className="card-img-top img-responsive" alt="img"/>
                              </div>
                          </div>
                       )}
                      </div>
                </div>
              )}
           </div>
         </div>
       </div>


</>


)

}

export default Add;
