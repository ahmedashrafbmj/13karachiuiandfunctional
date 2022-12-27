import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './Login/Login';
import Register from './Register/Register';
import Welcome from './Welcome/Welcome';
import Welcome2 from './Welcome/sWelcome';
import Add from './Add';
import FourZeroFour from './FourZeroFour';
import Edit from './Edit/Edit'
import Home from './Home/Home';
import RoomDetails from './RoomDetails/RoomDetails';
import UserRegister from './UserRegister/UserRegister'
import Booking from './RoomDetails/Booking';
import BookingComplete from './RoomDetails/BookingComplete';
import Userbooking from './Home/userbooking';
import Bookingadmin from './Welcome/bookingadmin';
import Category from './Category';
import Getcategory from './Home/getcategory'
import Subcategory from './subcategory';
import Getsubcategory from './Home/getsubcategory';
import Getcatesub from './Home/getcatsub';
import userProfile from './Home/userProfile';
import AdminProfile from './Welcome/adminProfile';
import AllUsers from './Welcome/allUsers';
import Cart from './Home/Cart'
import ViewCategory from './Welcome/viewCategory';
import ViewCarousel from './Welcome/viewCarousel';
import EditCategory from './Welcome/EditCategory';
import EditProfile from './Welcome/EditProfile';
import Userbookingdetails from './Home/userbookigdetails';
import AllOrderUsers from './Welcome/allorderusers';
import AdminOrderDetails from './Welcome/adminorderdetails';
import EdituProfile from './Home/EdituProfile';
import Flatrate from './Welcome/flatrate';
import AdminOrders from './Welcome/adminOrders';
import AccountStatus from '../Components/Login/accountStatus';
import Area from './Area';
import Market from './Market';
import Getmarket from './Home/getMarket';
import Getshops from './Home/getShops';
import GetshopsProducts from './Home/getshopsProducts';
import Weightrate from './Welcome/weightrate';
import AddCarousel from './AddCarousel';
import ViewArea from './Welcome/viewArea';



const PrivateRoute = (props) => {
    const token = localStorage.getItem('token');
    if (token) {
        return <Route exact={true} path={props.path} component={props.component} />
        console.log(`Component ${props.component}`)
    } else {
        return <Login {...props} />
    }
}


const Router = (props) => {
    return <Switch>
        <Route path="/" component={Home} exact={true} />
        <Route path="/register" component={Register} />
        <Route path="/userregister" component={UserRegister} />
        <Route path="/login" component={Login} />
        <Route path="/Details/:id" component={RoomDetails} />
        <Route path="/ShowGallery/:productName" component={Getcategory} />
        <Route path="/ShowGallerySub/:productName" component={Getcatesub} />        
        <Route path="/ShowSub/:qty" component={Getsubcategory} />


        <Route path="/ShowMarket/:areaName" component={Getmarket} />
        <Route path="/ShowShops/:marketname" component={Getshops} />
        <Route path="/ShowShopsProducts/:hotelname" component={GetshopsProducts} />

        <Route path="/cart" component={Cart} />




        <PrivateRoute path="/bookingadmin" component={Bookingadmin} />

        
        <PrivateRoute path="/welcome" component={Welcome} />
        <PrivateRoute path="/welcome2" component={Welcome2} />
        <PrivateRoute path="/Add" component={Add} />
        <PrivateRoute path="/Category" component={Category} />
        <PrivateRoute path="/SubCategory" component={Subcategory} />
        <PrivateRoute path="/Edit/:id" component={Edit} />
        <PrivateRoute path="/Booking" component={Booking} />
        <PrivateRoute path="/Bookingcomplete" component={BookingComplete} />
        <PrivateRoute path="/userbooking" component={Userbooking} />
        <PrivateRoute path="/AllOrderUsers" component={AllOrderUsers} />
        <PrivateRoute path="/userbookingdetails/:id" component={Userbookingdetails} />
        <PrivateRoute path="/SAdminOrderDetails/:id" component={AdminOrderDetails} />

        <PrivateRoute path="/userProfile" component={userProfile} />
        <PrivateRoute path="/adminProfile" component={AdminProfile} />
        <PrivateRoute path="/allUsers" component={AllUsers} />
        <PrivateRoute path="/viewcategory" component={ViewCategory} />
        <PrivateRoute path="/viewcarousel" component={ViewCarousel} />
        <PrivateRoute path="/viewarea" component={ViewArea} />
        <PrivateRoute path="/editcategory/:id" component={EditCategory} />
        <PrivateRoute path="/editprofile/:id" component={EditProfile} />
        <PrivateRoute path="/edituprofile/:id" component={EdituProfile} />
        <PrivateRoute path="/flatrate" component={Flatrate} />

        <PrivateRoute path="/weightrate" component={Weightrate} />

        <PrivateRoute path="/adminOrders" component={AdminOrders} />
        <PrivateRoute path="/accountstatus" component={AccountStatus} />
        <PrivateRoute path="/area" component={Area} />
        <PrivateRoute path="/market" component={Market} />
        <PrivateRoute path="/addcarousel" component={AddCarousel} />
      
        

        <Route component={FourZeroFour} />
    </Switch>
}

export default Router;