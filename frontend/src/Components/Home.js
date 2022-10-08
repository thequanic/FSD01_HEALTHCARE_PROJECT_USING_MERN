import React,{ useContext, useEffect } from 'react';
import Context from '../Context/context';
import DoctorMyProfile from './DoctorMyProfile';
import PatientMyProfile from './PatientMyProfile';


export default function Home()
{
    const context= useContext(Context);
    const {user}=context;
    
    return(
        <div className='my-4'>
            {user==="doctor"?
             <><h1><strong>Welcome..Your patients are waiting for you...</strong></h1>
             <DoctorMyProfile/></>:
             <><h1><strong>Welcome..Your doctor is waiting for you...</strong></h1>
             <PatientMyProfile/></>
            }
            
            
        </div>
    )
}
