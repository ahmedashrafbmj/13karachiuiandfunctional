import React, { useState, useEffect } from 'react'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import HomeNavbar from './HomeNavbar';
import { Link, useHistory } from 'react-router-dom';
import UserNavbar from './UserNavbar';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import banner1 from '../images/banner1.jpg'
import banner2 from '../images/banner2.jpg'
import { useDispatch } from 'react-redux';
import { add } from '../../store/orderslice';
import { addToCart } from "../../store/cartSlice";
import NavBar from '../NavBar/NavBar';
import loadingimg from '../images/loading.gif'
import Products from '../Products'
import ProductCard from '../ProductCard/ProductCard';
import banner from "../banner/banner.jpeg"
import mobBanner from "../banner/mobBanner.jpeg"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Carousel from 'react-img-carousel';
import CarouselA from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import "./home.css"
import MenuItem from '@mui/material/MenuItem';
import MuiButton from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useSelector from 'react-redux'
import axios from 'axios';
import AreaCard from '../AreaCard/areaCard';
import { Info } from '@mui/icons-material';







require('react-img-carousel/lib/carousel.css');





const Home = (props) => {
    const [text, setText] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const [filterList, setFilterList] = useState({
        area: [],
        markets: [{ label: "select area to see markets" }],
        category: [],
    })
    const [renderProducts, setRenderProducts] = useState([])
    const [currentArea, setCurrentArea] = useState()
    const [currentMarket, setCurrentMarket] = useState()
    const [currentCategory, setCurrentCategory] = useState()





    document.title = "Home -  13Karachi";





    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 10
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };


    const history = useHistory()
    const [loading, setLoading] = useState(false);
    const [roleau, setroleau] = useState('');

    const [areaData, setAreaData] = useState(['']);

    const [sliderData, setSliderData] = useState([])

    useEffect(() => {

        fetchCarousel()

    }, []);





    const [hotel, setHotel] = useState([]);

    const [category, setCategory] = useState([]);
    const [subcategory, setsubCategory] = useState([]);
    const [categoryCount, setCategoryCount] = useState([]);
    const [subcategoryCount, setsubCategoryCount] = useState([]);
    const [accountStatus, setAccountStatus] = useState([]);

    const dispatch = useDispatch();

    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    const getdata = async () => {

        const findEmail2 = localStorage.getItem('user');

        const res = await fetch(`/api/allbookbyemail/${findEmail2}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }

        });

        const data = await res.json();
        // console.log(data[4].cartItems[0].hotelname, 'obj');
        setOrders(data);



    }
    //   useEffect(() => {

    //     const fetchHotels = async () => {
    //         setLoading(true)
    //         const res = await fetch('/api/allpostdata');

    //         const data = await res.json();
    //         console.log(data);

    //         setHotel(data);


    //         setLoading(false)
    //     };

    //     fetchHotels()

    // }, []);

    const getroleauth = async () => {

        let femail = localStorage.getItem('user');

        const res3 = await fetch(`/api/postbyemailsignup/${femail}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }

        });



        const role = await res3.json();

        setAccountStatus(role[0]?.accountsstatus)

        // console.log(role[0]?.accountsstatus, 'status')

        localStorage.setItem('accountstatus', [accountStatus]);


    }
    useEffect(() => {
        // getroleauth()
        getdata()



        const fetchProducts = async () => {
            const res = await fetch('/api/allpostdata');
            const data = await res.json();
            setRenderProducts(data);
            setProducts(data);
        };
        fetchProducts();

    }, [accountStatus]);
    const handleAdd = (product) => {
        dispatch(addToCart(product));
        // history.push("/cart");
    };
    useEffect(() => {

        const fetcharea = async () => {
            const res = await fetch(`/api/allgetarea`);

            const dataarea = await res.json();
            console.log(dataarea);

            setAreaData(dataarea);

        };

        fetcharea()

    }, []);

    useEffect(() => {

        const fetchCategory = async () => {
            const res = await fetch(`/api/allgetcategory`);

            const datacategory = await res.json();
            // console.log(datacategory);

            const countCategory = datacategory.length;

            setCategory(datacategory);

            setCategoryCount(countCategory)

            // console.log(countCategory, 'category count')

        };

        fetchCategory()

    }, [accountStatus]);

    useEffect(() => {

        const fetchsubCategory = async () => {
            const res = await fetch('/api/allgetsubcategory');

            const datasubcategory = await res.json();
            // console.log(datasubcategory);
            const countsubCategory = datasubcategory.length;

            setsubCategory(datasubcategory);
            setsubCategoryCount(countsubCategory)

            // console.log(countsubCategory, 'subcategory count')

        };

        fetchsubCategory()
        // fetchCarousel()

    }, []);

    const fetchCarousel = async () => {
        const res = await fetch('/api/allgetcarousel');

        const datacarousel = await res.json();

        console.log(datacarousel, 'carousel');

        setSliderData(datacarousel);

    };

    // console.log(products, "products")
    const getrole = () => {

        let roleuser = localStorage.getItem('role');

        setroleau(roleuser);
        // console.log(roleau, 'roleg')


    }

    useEffect(() => {
        takeorder()
        getrole()

        // console.log(roleau, 'getroleuseeffect')

    }, [accountStatus]);

    const routeto = () => {



        let roleuseradmin = localStorage.getItem('role');
        // console.log(roleuseradmin, 'roleuseradmin')

        const roleua3 = localStorage.getItem('accountstatus');

        if (roleuseradmin === 'User') {
            history.push('/')
        }

        else if (roleuseradmin === 'Admin') {
            history.push('/welcome')
        }



        else if (roleuseradmin === 'Super') {
            history.push('/welcome2')
        }


        else {
            history.push('/')
        }

    }

    useEffect(() => {

        routeto()


    }, [accountStatus]);

    const takeorder = (orders) => {
        dispatch(add(orders));
    };
    useEffect(() => {
        const setFilterListItems = () => {
            let areaArr = []
            let categoryArr = []
            function List(val, lbl) {
                this.value = val
                this.label = lbl
            }
            areaData.forEach(value => {
                let obj = new List(value.areaName, value.areaName)
                areaArr.push(obj)
            })
            category.forEach(value => {
                let obj = new List(value.categoryName, value.categoryName)
                categoryArr.push(obj)
            })
            setFilterList({ ...filterList, category: [...categoryArr], area: [...areaArr] })
        }
        console.log(filterList)
        setFilterListItems()
    }, [category, areaData])

    const getMarket = async (area) => {
        let marketArr = []
        await axios.get(`/api/getareaname/${area}`)
            .then((res) => {
                if (res.data[0]) {
                    // console.log(res, res)
                    function List(val, lbl) {
                        this.value = val
                        this.label = lbl
                    }
                    res.data.forEach(value => {
                        // console.log(value)
                        let obj = new List(value.marketName, value.marketName)
                        marketArr.push(obj)
                    })
                    setFilterList({ ...filterList, markets: [...marketArr] })
                } else {
                    setFilterList({ ...filterList, markets: [{ label: "" }] })
                    console.log("else")
                }
                console.log(filterList)
            })
            .catch((err) => {
                console.log(err)
            })
    }




    const filterData = () => {

        let filterData = products.filter(product => product.prodarea === currentArea
            && (currentMarket ? (product.prodmarketname === currentMarket) : true)
            && (false ? (product.category === currentCategory) : true)
        )

        setRenderProducts(filterData)
        handleClose()
    }


    const onchnage = (property, value) => {

        switch (property) {
            case "area":
                setCurrentArea(value)
                getMarket(value)
                break;
            case "market":
                setCurrentMarket(value)
                break;
            case "category":
                setCurrentCategory(value)
        }

        console.log(currentArea)

    }


    const clearFilter = () => {
        setCurrentArea("")
        setCurrentCategory("")
        setCurrentMarket("")
        setRenderProducts(products)

    }


    const onSuggestHandler = (text) => {
        setText(text);
        setSuggestions([]);
    }

    const onChangeHandler = (text) => {
        let matches = [];

        if (text.length > 0) {

            matches = products.filter(user => {
                const regex = new RegExp(`${text}`, "gi");
                return user.productTitle.match(regex)

            })

        }
        console.log(matches, "matches")
        setSuggestions(matches)
        setText(text)
    }
























    //         /////////////////////////                                         RENDER
    return (


        <div>

            {/* {NavBar} */}
            <NavBar />



            <img
                // className='cssanimation fadeInLeft'
                src={banner}
                className="webBanner"
                style={{
                    height: "75px",
                    width: "100%"
                }}
            />
            <img
                // className='cssanimation fadeInLeft'
                src={mobBanner}
                className="mobBanner"
                 style={{
                     height: "335px",
                    width: "100%"
                 }}
            />







            {/* Slider */}
            <Carousel
                style={{zIndex: 1}}
                className="banner"
                autoplaySpeed={2000}
                lazyLoad={true}
                height={"200px"}
                // viewportHeight={500}
                slideWidth={"100%"}
                slideHeight={"200"}
                autoplay={true}
                cellPadding={5}>
                {
                    sliderData.map((data, i) => {
                        return (

                            <img key={i} className='bannerImg' src={data.imageURL[0]} />
                        )

                    })
                }
                <img className='bannerImg' src='https://th.bing.com/th/id/OIP.xEbcztsACaZL-Aw5DeLuZwHaDZ?w=338&h=160&c=7&r=0&o=5&pid=1.7' />
                {/* <img className='bannerImg' src='https://th.bing.com/th/id/OIP.BdPytLefrQ1tDTGZBkPq4wHaE8?pid=ImgDet&rs=1' /> */}
                
            </Carousel>


            {/* Categories */}

            <div className="webCategory">
                <div className='categoryContainer' style={{ marginTop: 70 }}>

                    {<CarouselA
                        itemClass="item"
                        // additionalTransfrom={-10}
                        slidesToSlide={2}
                        centerMode={true}
                        style={{ marginTop: 100 }}
                        responsive={responsive} >
                        {
                            category.map((category) => (

                                // <Col style={{width:120 , backgroundColor:"pink" , borderRadius:50}}>
                                <Card style={{ width: '8rem' }}>
                                    <Card.Img className="categoryImage" variant="top" src={category.imageURL} />
                                    <Card.Body>
                                        <Card.Title style={{ fontFamily: "arial black", color: "#5F093D", textAlign: "center", fontWeight: "bold", fontSize: 20 }}>{category.categoryName} </Card.Title>
                                        {/* <Button variant="primary" href={`ShowGallery/${category.categoryName}`}> Show Products By Category</Button> */}
                                        {/* <Button  variant="primary" href={`ShowGallerySub/${category.categoryName}`}> Products By Sub-Category</Button>  */}
                                    </Card.Body>
                                </Card>
                                // </Col>


                            ))
                        }
                    </CarouselA>}

                </div>
            </div>

            <div className="mobileCategory">
                <div className='categoryContainer' style={{ marginTop: 120 }}>

                    {<CarouselA
                        itemClass="item"
                        containerClass="carousel-container"
                        slidesToSlide={2}
                        centerMode={true}
                        style={{ marginTop: -50 }}
                        responsive={responsive} >
                        {
                            category.slice(1, (category.length / 2) - 1).map((category) => (

                                // <Col style={{width:120 , backgroundColor:"pink" , borderRadius:50}}>
                                <Card style={{ width: '8rem' }}>
                                    <Card.Img className="categoryImage" variant="top" src={category.imageURL} />
                                    <Card.Body>
                                        <Card.Title style={{ fontFamily: "arial black", color: "#5F093D", textAlign: "center", fontWeight: "bold", fontSize: 20 }}>{category.categoryName} </Card.Title>
                                        {/* <Button variant="primary" href={`ShowGallery/${category.categoryName}`}> Show Products By Category</Button> */}
                                        {/* <Button  variant="primary" href={`ShowGallerySub/${category.categoryName}`}> Products By Sub-Category</Button>  */}
                                    </Card.Body>
                                </Card>
                                // </Col>


                            ))
                        }
                    </CarouselA>}

                </div>
                <div className='categoryContainer' style={{ marginTop: 30 }}>

                    {<CarouselA
                        itemClass="item"
                        slidesToSlide={2}
                        centerMode={true}
                        responsive={responsive} >
                        {
                            category.slice(category.length / 2, category.length).map((category) => (

                                // <Col style={{width:120 , backgroundColor:"pink" , borderRadius:50}}>
                                <Card style={{ width: '8rem' }}>
                                    <Card.Img className="categoryImage" variant="top" src={category.imageURL} />
                                    <Card.Body>
                                        <Card.Title style={{ fontFamily: "arial black", color: "#5F093D", textAlign: "center", fontWeight: "bold", fontSize: 20 }}>{category.categoryName} </Card.Title>
                                        {/* <Button variant="primary" href={`ShowGallery/${category.categoryName}`}> Show Products By Category</Button> */}
                                        {/* <Button  variant="primary" href={`ShowGallerySub/${category.categoryName}`}> Products By Sub-Category</Button>  */}
                                    </Card.Body>
                                </Card>
                                // </Col>


                            ))
                        }
                    </CarouselA>}

                </div>
            </div>





            {/* AREAS */}

            <div
                style={{
                    borderTop: "1px solid #D67BA8",
                    maxWidth: "1190px",
                    // textAlign:"center",
                    // backgroundColor:"green",
                    margin: "auto",
                    padding: "15px",
                    color: "#B21368",
                    marginTop: "25px",
                    display: "flex",
                    justifyContent: "Space-between",

                }}
            >
                <h1
                    style={{ width: "13rem", borderBottom: "1px solid #D67BA8", textAlign: "center" }}>
                    Our Areas
                </h1>
            </div>
            <div className='products'>
                {
                    areaData.map((product, ind) => {
                        return (
                            <AreaCard
                                height={190}
                                key={product._id}
                                product={product}
                                button={false}
                                price={false}
                                name={product.areaName}
                                discrip={false}
                            />
                        )
                    })
                }
            </div>

            {/* Products */}

            <div
                style={{
                    borderTop: "1px solid #D67BA8",
                    maxWidth: "1190px",
                    // textAlign:"center",
                    // backgroundColor:"green",
                    margin: "auto",
                    padding: "15px",
                    color: "#B21368",
                    marginTop: "25px",
                    display: "flex",
                    justifyContent: "Space-between",

                }}
            >
                <h1
                    style={{ width: "13rem", borderBottom: "1px solid #D67BA8", textAlign: "center" }}>
                    Products
                </h1>
                <FilterAltIcon onClick={handleClickOpen} fontSize="large" />
            </div>
            <div className='products'>
                {
                    renderProducts.map((product, ind) => {
                        return (
                            <Link style={{ textDecoration: 'none' }} to={`Details/${product._id}`}>
                            <ProductCard
                                height={250}
                                button={true}
                                key={product._id}
                                product={product}
                                price={true}
                                name={product.productName}
                                discrip={true}
                            />
                            </Link>
                        )
                    })
                }
            </div>













            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Filter</DialogTitle>


                    <TextField

                        id="standard-select-currency"
                        select
                        // label="Select"
                        // value={currentArea}
                        onChange={e => { onchnage("area", e.target.value) }}
                        helperText="Select Area"
                        variant="standard"
                        style={{ padding: "0px 20px 20px 20px", minWidth: "300px" }}
                        color='secondary'
                    >
                        {filterList.area.map((option) => (
                            <MenuItem key={option._id} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="standard-select-currency"
                        select
                        // label="Select"
                        // value={currentMarket}
                        onChange={e => { onchnage("market", e.target.value) }}
                        helperText="Select Markets"
                        variant="standard"
                        style={{ padding: "0px 20px 20px 20px", minWidth: "300px" }}
                        color='secondary'
                    >
                        {filterList.markets.map((option) => (
                            <MenuItem key={option._id} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="standard-select-currency"
                        select
                        // label="Select"
                        // value={currentCategory}
                        onChange={e => { onchnage("category", e.target.value) }}
                        helperText="Select Category"
                        variant="standard"
                        style={{ padding: "0px 20px 20px 20px", minWidth: "250px" }}
                        color='secondary'
                    >
                        {filterList.category.map((option) => (

                            <MenuItem key={option._id} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>

                    <DialogActions>
                        <MuiButton onClick={e => { handleClose() }} variant="outlined" color="secondary" >{`Clear Filter`}</MuiButton>
                        <MuiButton onClick={e => { filterData() }} variant="contained" color="secondary" >{` See products`}</MuiButton>
                    </DialogActions>
                </Dialog>
            </div>


        
       

        </div>

    );
};

export default Home;