import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';


const ProductCard = ({ product , button , height , price , name , discrip }) => {
    let { productName, productPrice, imageURL } = product
    return (
        <Card

            style={{
                boxShadow: "5px 5px 15px  grey",
                // border: "1px solid #5F093D"
            }}
            className="prodCard"
            sx={{ maxWidth: 200, height: {height} }}>
            <CardActionArea>
                {/* <CardMedia
          component="img"
          style={{width:"90%" , height:"100px" ,}}
          image="https://th.bing.com/th/id/OIP.xdZpmVFglruNLbMkWuhSDwHaNb?pid=ImgDet&rs=1"
          alt="green iguana"
        /> */}
                <img className='ProdImage' style={{ height: 110, width: "100%", objectFit: "contain" }} src={imageURL} />
                <CardContent style={{ paddingTop: 3, paddingBottom: 0 }}>
                    <Typography style={{ marginBottom: 0 }} gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>

                    {discrip ? <Typography className="discription" style={{ width: "100%", overflow: "hidden", textOverflow: "ellipsis" }} variant="body2" color="text.secondary">
                        This is the ...
                    </Typography> : null}
                    {price ? <Typography className='price' style={{ marginBottom: 0 }} gutterBottom variant="h6" component="div" color="#5F093D">
                        Rs {productPrice}
                    </Typography> : null}
                </CardContent>
            </CardActionArea>
            <CardActions>
                {button ? <Button className="buyBTN" size="small" color="primary" style={{ height: 25, width: 20, backgroundColor: "#5F093D", color: "white" }}>
                    Buy
                </Button> : null}
            </CardActions>
        </Card>
    )
}

export default ProductCard;