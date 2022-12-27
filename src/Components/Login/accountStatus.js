import { style } from "@mui/system";
import React from "react";
import {useHistory} from "react-router-dom";


function AccountStatus(){

    const history = useHistory()
    const logout=()=>{

        localStorage.removeItem('token')
        localStorage.removeItem('user')
    
        localStorage.removeItem('role')
        localStorage.removeItem('hotel')
    
        localStorage.removeItem('accountstatus')
    
        history.push('/')
    }
    
    return (
        <>
        <h1>This Account is Temporary Disabled, While Super Admin can see this and fix this error with 24 Hours..... Please Logout after 24 Hours and Login again Thank you</h1>

        <br />

        <input type="button" className="form__button" value="Logout" onClick={()=>{logout(); }} />
        </>
    )
}

export default AccountStatus;