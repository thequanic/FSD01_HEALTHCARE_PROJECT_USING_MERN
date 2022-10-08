import React,{ useContext, useEffect } from 'react';
import Context from '../Context/context';


export default function DoctorCard(props)
{
    const {doctor}=props;
    const context= useContext(Context);
    const {user}=context;

    const handleClick=()=>{

    }
    
    return(
        <div className="DoctorCard">
            
            <div className='DoctorCard-Info'><strong>{doctor.name.toUpperCase()}, Expert In: {doctor.expertise.toUpperCase()}, Highest Certification: {doctor.highestEducation.toUpperCase()}</strong></div>
            <button className='DoctorCard-Btn' onClick={handleClick}>details <i class="fa-solid fa-arrow-right"></i></button>
        </div>
    )
}