import React,{ useContext,useEffect } from 'react';

import { useNavigate} from 'react-router-dom';
import Context from '../Context/context';

export default function PatientMyProfile()
{
    const context= useContext(Context);
    const {userDetail,fetchPatientDetail}=context;
    const navigate=useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('token'))
         {fetchPatientDetail();}
        else{
            
            navigate("/login");
        }
    },[])

    const handleClick=()=>{

    }
    
    return(
        <div className='profile-card'>
         <button  className="btn btn-dark profile-edit-button mx-2" onClick={handleClick}>Edit Profile</button>
         <h2><strong>{userDetail.name}</strong></h2>
         <h4>{userDetail.email}</h4>   
         <h3 className='about-me-title'><strong>Medical History:</strong></h3>
         <div className='container about-me'>
            
            <p><strong>{userDetail.medicalHistory}</strong></p>
         </div>
            
        </div>
    )
}
