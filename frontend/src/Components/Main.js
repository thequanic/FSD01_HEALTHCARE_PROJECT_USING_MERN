import React, { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Context from '../Context/context'
import Alert from './Alert'
import NavBar from './NavBar'
import headimg from "../Images/headimg.jpg"

export default function Main()
{
    const context= useContext(Context);
    const {alert,showAlert}=context;

    useEffect( ()=>{
        showAlert("It is Cells Connected...Connecting doctors to patients... ","primary")
    },[])
    return(
        <div>
             <div className='fixed-top'>
             <NavBar/>
             {alert===null?<></>:<Alert alert={alert}/>}
             </div>

             <img className="head-img" src={headimg} alt="head-img" />
             
             <div className="container ">
             <Outlet/>
             </div>
        </div>
    )
}