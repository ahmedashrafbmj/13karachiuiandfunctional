import React, {useState, useEffect} from 'react'
import HomeNavbar from './HomeNavbar';
import { useHistory } from 'react-router-dom';
import UserNavbar from './UserNavbar';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import loadingimg from '../images/loading.gif'







const Getshops=(props)=>{
 
    const history = useHistory()

const [loading, setLoading] = useState(false);
const [roleau, setroleau] = useState ('');
    

    document.title = "Home -  13Karachi";

    const { marketname } = useParams("");
    console.log(marketname);

  
      const [hotel, setHotel] = useState([]);


      useEffect(() => {

        const fetchMarkets = async () => {
            setLoading(true)
            const res = await fetch(`/api/getmarket/${marketname}`);

            const data = await res.json();
            console.log(data);
        
            setHotel(data);
            setLoading(false)
        };
        
        fetchMarkets()

    }, []);




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

  

        <h1>{marketname} Shops</h1>
        
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
                    <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={product.img}/>
                        <Card.Body>
                            <Card.Title>{product.hotelname}</Card.Title>
                            <Card.Text>
                        {/* Rs.{product.productPrice}/-  */}

                            </Card.Text>
                            <Button  variant="primary" href={`../ShowShopsProducts/${product.hotelname}`}> Shop Products</Button> 
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

export default Getshops;