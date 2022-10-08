import React,{ useContext, useEffect } from 'react';
import Context from '../Context/context';
import { useNavigate} from 'react-router-dom';
import DoctorCard from './DoctorCard';

export default function Doctors()
{
    const context= useContext(Context);
    const {user,fetchDoctors,doctors,setDoctors}=context;

    const navigate=useNavigate();

    useEffect(()=>{
        if(user==="patient")
        {
            fetchDoctors();
        }
        else{
            setDoctors([])
        }
    },[])
    
    return(
        <div className='container mt-5'>
            {doctors.length===0 && ` <div className="container mx-2"> No Doctors Available </div>`}
            {
               doctors.map((doctor)=>{
                return <DoctorCard doctor={doctor}/>
                })
            }
            
            
        </div>
    )
}