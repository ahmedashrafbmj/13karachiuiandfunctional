import React, {useState, useEffect} from 'react'
import HomeNavbar from './HomeNavbar';
import { useHistory } from 'react-router-dom';
import UserNavbar from './UserNavbar';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import loadingimg from '../images/loading.gif'

import { Link } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { addToCart } from "../../store/cartSlice";




const GetshopsProducts=(props)=>{
 
    const history = useHistory()

const [loading, setLoading] = useState(false);
const [roleau, setroleau] = useState ('');
    

    document.title = "Home -  13Karachi";

    const { hotelname } = useParams("");
    console.log(hotelname);

  
      const [hotel, setHotel] = useState([]);
      const dispatch = useDispatch();

      useEffect(() => {

        const fetchMarkets = async () => {
            setLoading(true)
            const res = await fetch(`https://13k.up.railway.app/api/getshopsproducts/${hotelname}`);

            const data = await res.json();
            console.log(data);
        
            setHotel(data);
            setLoading(false)
        };
        
        fetchMarkets()

    }, []);


    const handleAdd = (product) => {
        dispatch(addToCart(product));
        // history.push("/cart");
    }; 

const getrole=()=>{

    let roleuser = localStorage.getItem('role');

    setroleau(roleuser);
    console.log(roleau, 'roleg')


}


useEffect(() => {

getrole()

// console.log(roleau, 'getroleuseeffect')

}, []);


    

    return (

      
        <>
        
        

        {
           
               (roleau === 'User' ? <UserNavbar />  : <HomeNavbar />)

        }

        <br />
        <br />
        <br />

  

        <h1>{hotelname} Shops</h1>
        
        <br />
        <br />

        {
      loading?( //if
        // <h3>Loading ... </h3>
        <img src={loadingimg} />
      ): ( //else


     <Container>
      <Row>

          
            {hotel.map((product) => (
             

            
             <Col>                    
             <Card style={{ width: '18rem' }} >

             <Link to={`../Details/${product._id}`}> 
         
             <Card.Img variant="top"  src={product.imageURL} />

             </Link>

                 <Card.Body>
                     <Card.Title><h4>{product.productTitle}</h4></Card.Title>
                     <Card.Text>
                 <h4><b>Rs.{product.productPrice}/- &nbsp; <del>Rs.{product.productwasPrice}/-</del></b></h4>

                     </Card.Text>
                     {/* <Button  variant="primary" href={`Details/${product._id}`}>Product Details</Button> 
                     <br /> */}
                     <br />
                     <Button  variant="primary" onClick={() => handleAdd(product)}>Add to Cart</Button> 
                  
                 </Card.Body>
                 </Card>
                 <br />
                 </Col>
  
                        
            ))}
      
            </Row>
      </Container>

           )
        } 


        
        


        </>
    );
};

export default GetshopsProducts;