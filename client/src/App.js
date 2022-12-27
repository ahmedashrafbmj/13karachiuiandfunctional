import React from 'react'
import Footer from './Components/Main/Footer'
import { Provider } from 'react-redux';
import Welcome from './Components/Welcome/Welcome';
import Add from './Components/Add'
import Login from './Components/Login/Login';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './Components/Main/Main.css'
import './Components/Welcome/Welcome.css'

import './Components/Login/Login.css'
import Router from './Components/Router';
import Register from './Components/Register/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import store from './store/store';







function App(){

return(

<>


<br />
<Provider store={store}>
<BrowserRouter>


<Router />

    
    </BrowserRouter>

    {/* <Footer /> */}
    </Provider>
</>


)

}

export default App;