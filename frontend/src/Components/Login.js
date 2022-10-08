import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import Context from '../Context/context';
import DoctorLogin from './DoctorLogin';
import PatientLogin from './PatientLogin';


export default function Login()
{
    const context = useContext(Context);
    const {showAlert,user,setUser}=context;

    
    return(
        <div className='container login-form mt-5 mb-5'>
            <div className='container opt-btn'>
            <button  className="btn btn-dark doc-button mx-2" onClick={()=>setUser("doctor")}>Log In as Doctor</button>
            <button  className="btn btn-dark pat-button mx-2" onClick={()=>setUser("patient")}>Log In as Patient</button>
            </div>
            {user==='doctor'?
            <DoctorLogin/>:
            <PatientLogin/>}
        </div>
    )
}