import Context from './context';
import React, { useState } from 'react';

const State = (props)=>{

    const host="localhost:5000";

    const [userDetail,setUserDetail]=useState({});


    
    const fetchDoctorDetail=async ()=>{
        
        const response= await fetch(`http://${host}/api/auth/doc/get/Doctor`,
        {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                "auth-token":localStorage.getItem('token')
            },
            
        });
        const json= await response.json();
        setUserDetail(json);
    }

    const fetchPatientDetail=async ()=>{
        
        const response= await fetch(`http://${host}/api/auth/pat/get/Patient`,
        {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                "auth-token":localStorage.getItem('token')
            },
            
        });
        const json= await response.json();
        setUserDetail(json);
    }
    
    const [doctors,setDoctors]=useState([]);
    const fetchDoctors=async ()=>{
        
        const response= await fetch(`http://${host}/api/service/get/all/Doctor`,
        {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
            },
            
        });
        const json= await response.json();
        setDoctors(json);
    }




    const [view,setView]=useState({name:"",expertise:"",about:"Error:404 Not Found..\nEither you are not authorize to view this page\nOr you must have reloaded it\nTry by going back home and reviewing this page",highestEducation:"",email:"",index:-1});

    const[alert,setAlert]= useState(null);
    
    const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })


    setTimeout(()=>{
      setAlert(null)
    },3000)
  }

    const[user,setUser]=useState("patient");
    

    return (
        <Context.Provider value={{view,setView,alert,showAlert,user,setUser,fetchDoctorDetail,fetchPatientDetail,userDetail,setUserDetail,doctors,setDoctors,fetchDoctors}}>
            {props.children}
        </Context.Provider>
    )
}

export default State;