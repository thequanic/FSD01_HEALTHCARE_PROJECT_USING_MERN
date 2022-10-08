import React,{ useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Context from '../Context/context';
import DoctorSignup from './DoctorSignup';
import PatientSignup from './PatientSignup';



export default function Signup()
{

    const context=useContext(Context);
    const {showAlert,user,setUser}=context;

    


    return(
        <div className='container login-form mt-3 mb-3'>
            <div className='container opt-btn'>
            <button  className="btn btn-dark doc-button mx-2" onClick={()=>setUser("doctor")}>Sign Up as Doctor</button>
            <button  className="btn btn-dark pat-button mx-2" onClick={()=>setUser("patient")}>Sign Up as Patient</button>
            </div>
            {user==='doctor'?
            <DoctorSignup/>:
            <PatientSignup/>}
        
        </div>
    )
}


