import React, {useState, useEffect} from 'react'
import HomeNavbar from './HomeNavbar';
import { useHistory } from 'react-router-dom';
import UserNavbar from './UserNavbar';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import loadingimg from '../images/loading.gif'



const Getcatesub=(props)=>{
 
    const history = useHistory()

const [loading, setLoading] = useState(false);
const [roleau, setroleau] = useState ('');
    

    document.title = "Home -  13Karachi";

    const { productName } = useParams("");
    console.log(productName);

  
      const [hotel, setHotel] = useState([]);


      useEffect(() => {

        const fetchHotels = async () => {
            setLoading(true)
            const res = await fetch(`https://13k.up.railway.app/api/getsubcategorybyname/${productName}`);

            const data = await res.json();
            console.log(data);
        
            setHotel(data);
            setLoading(false)
        };
        
        fetchHotels()

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

  

        <h1>{productName} Products</h1>
        
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
                    <Card.Img variant="top" src={'https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg'}/>
                        <Card.Body>
                            <Card.Title>{product.subcategoryName}</Card.Title>
                            <Card.Text>
                    

                            </Card.Text>
                            <Button  variant="primary" href={`../ShowSub/${product.subcategoryName}`}> Show Products</Button> 
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

export default Getcatesub;