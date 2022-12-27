import React, {useState, useEffect} from 'react'
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import HomeNavbar from '../Home/HomeNavbar';
import UserNavbar from '../Home/UserNavbar';
import { useHistory } from 'react-router-dom';
// import '../RoomDetails/detail.css'
import {Table} from 'react-bootstrap'
import { addToCart } from "../../store/cartSlice";
import { useDispatch } from 'react-redux';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-toastify/dist/ReactToastify.css';
const PORT = process.env.PORT || 9000;



const RoomDetails=(props)=>{
    const dispatch = useDispatch();
    const history = useHistory()

    const [roleau, setroleau] = useState ('');

    document.title = " 13Karachi - Pacakge Details";
  
    const { id } = useParams("");
    console.log(id);

    const [hotel, setHotel] = useState([0]);


    const [lastRecord, setLastRecord] = useState([0]);
    const [delivered, setDelivered] = useState([])

    const [totalSold, setTotalSold] = useState(0);
    const [totalRem, setTotalRem] = useState(0)

    const [arrdata, setarrData] = useState([0]);
    const [psizes, setpSize] = useState([0]);
    const [pcolors, setpcolor] = useState([0]);

    const checkitem=()=>{
        let uniqueArr = [... new Set(arrdata.multiProd.map(data => data.productSize))]
        console.log(uniqueArr, 'size')
        
        setpSize(uniqueArr)
    
        let uniqueArr2 = [... new Set (arrdata.multiProd.map(data2 => data2.productColor))]
        console.log(uniqueArr2, 'color')
        setpcolor(uniqueArr2)


    }





    const fetchDetails = async () => {
        const res = await fetch(`/api/getuser/${id}`);
        const data = await res.json();
        console.log(data);
        setHotel(data);
        setarrData(data);



    };
   
    const fetchDelivered = async () => {
        const res = await fetch(`/api/delivered`);
        const dataDelivered = await res.json();
        console.log(dataDelivered, 'fetch Delivered');
        setDelivered(dataDelivered);

    };

    useEffect(() => {
        
        fetchDetails()
        fetchDelivered()

    }, []);

    localStorage.setItem('price', hotel.productPrice)
    localStorage.setItem('userhotel', hotel.hotelname)
    localStorage.setItem('imageURL', hotel.imageURL)
    localStorage.setItem('hotelemail', hotel.userEmail)
    localStorage.setItem('packageid', id)


    const func=()=>{
        let uniqueArr3 = arrdata.files.map(data3 => data3.filePath)
        console.log(uniqueArr3, 'files')
        setLastRecord(uniqueArr3)  
        
    }  

const getrole=()=>{

    let roleuser = localStorage.getItem('role');

    setroleau(roleuser);
    console.log(roleau, 'roleg')


}


const totalQty =()=>{

   
    let arr = [];
    let total= 0;
    const totals = delivered.map(p => p.cartItems.map((cart)=>{

        if (cart._id == id){
            arr.push(cart.cartQuantity)
            console.log(arr, 'total qty sold')
        }
    })

    )


const sumQty=arr.reduce((total, sum)=>{
    return total + sum

}, 0)

setTotalSold(sumQty)
console.log(sumQty, 'total qty')


}



useEffect(() => {

 
getrole()





}, []);

const handleAdd = (product) => {
    dispatch(addToCart(product));
    // history.push("/cart");
};  

// const booknow = ()=>{
//     history.push('/Booking')
// }


console.log(hotel.multiProd, 'iddetail')

    return (

      
        <>
        

        {
           
           (roleau === 'User' ? <UserNavbar /> : <HomeNavbar />)

    }

      


      <div class="container">
  <div class="row justify-content-md-left">
   
    <p class="h1">Product Details</p>
  
  
    </div>
    </div>

    <br />

{/* <div className='MainDiva'> */}


<div class="container">
  <div class="row">

  <div class="col-4" onMouseMove={() => func()} onMouseMove={()=>checkitem()}>
  
  <img src={hotel.imageURL}></img>
  
  <div class="col-12">

{lastRecord.map((last) => (

// {/* <img src={`http://karachi14.herokuapp.com:${PORT}/${last}`}></img> */}

<img src={`http://localhost:${PORT}/${last}`}></img>

))}

</div>

{/* <Button  variant="primary" onClick={() => func()}>More Pictures</Button> */}
    </div>


    <div class="col-8">

    <div class="card text-center">
  <div class="card-header">
  <b>Category: {hotel.productName}</b>
  </div>
  <div class="card-body">
    <h5 class="card-title">{hotel.productTitle}</h5>
    <p class="card-text">

    Total Qty: {hotel.qty}   <br />
  

 

    <Button  variant="primary" onClick={() => totalQty()}>Show Available Qty</Button>
    <br />
    Product Weight: {hotel.productWeight} <br />

    
<br />

Sold Qty: {totalSold} <br />
Remaining Qty: {hotel.qty - totalSold} <br />

{/* 
return(
    <ul>
    {course.map(c => (
      <>
        <li>{c.name}</li>
        <ul>
          {c.parts.map(p =>
            <li>{p.name}: {p.exercises} {c.parts.reduce((sum, item) => sum += item.exercises, 0))(</li>)}
        </ul>
        </>
    ))}
    </ul>
    
) */}






    <br />

    <div class="form-row">

    <div class="form-group col-md-6">
      {/* <label for="inputState">Select Category</label> */}

      {/* <select class="form-control" onClick={() => checkitem()}>

      <option selected>Choose Size</option> */}
<h5>Size:</h5>

{psizes.map((category) => (


// <option>{category}</option>

<Button className='margin-left'> {category}</Button>

))}

{/* </select> */}




    </div>


<hr />    

    
    <div class="form-group col-md-6">
      {/* <label for="inputState">Select Category</label> */}

<h5>Color:</h5>
{pcolors.map((category) => (

<Button className='margin-left'>{category}</Button>

))}



    </div>
    
    
    </div>



    <br />
    
    <b> <h1><del>Rs.{hotel.productwasPrice}/-</del></h1></b><br />

    <b> <h1>Rs.{hotel.productPrice}/-</h1></b><br />

  
    <Button  variant="primary" onClick={() => handleAdd(hotel)}>Add to Cart</Button> 


    
    <br />
    <br />
    <br />
    Product Description: {hotel.category}



 
    <br />

    
    </p>

    
  
  </div>
  <div class="card-footer text-muted">
  Seller: {hotel.hotelname}
  </div>
</div>
        </div>

  </div>
  </div>

  


        </>
    );

    
};

export default RoomDetails;