import React,{ useContext,useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import Context from '../Context/context';



export default function DoctorMyProfile()
{
    const context= useContext(Context);
    const {userDetail,fetchDoctorDetail}=context;
    const navigate=useNavigate();

    useEffect(()=>{
        if(localStorage.getItem('token'))
       {fetchDoctorDetail();}
        //setView({title:"",description:"Error:404 Not Found..\nEither you are not authorize to view this page\nOr you must have reloaded it\nTry by going back home and reviewing this page",tag:"",date:"",index:-1});}
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
         <h4><strong>Expert In: {userDetail.expertise.toUpperCase()} || Lisence Number: {userDetail.lisenceNumber}<br/>Highest Education: {userDetail.highestEducation.toUpperCase()}</strong></h4>
         <h4>{userDetail.email}</h4>   

         <h3 className='about-me-title'><strong>About Me:</strong></h3>
         <div className='container about-me'>
            <p><strong>{userDetail.about}</strong></p>
         </div>
            
        </div>
    )
}
