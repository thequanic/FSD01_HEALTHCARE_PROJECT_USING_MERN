import React,{ useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import Context from '../Context/context';



export default function PatientSignup()
{

    const context=useContext(Context);
    const {showAlert}=context;

    const [cred,setCred] = useState({name:"",email:"",password:"",cpassword:"",medicalHistory:""});
    const navigate=useNavigate();

    

    const handleChange=(e)=>{
        setCred({...cred,[e.target.name]:e.target.value})
  
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();

        if(cred.password!==cred.cpassword){showAlert("Password and Confirm Password do not match","danger");return;}
        const response=await fetch("http://​localhost:5000/api/auth/pat/create/Patient",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({name:cred.name,email:cred.email,password:cred.password,medicalHistory:cred.medicalHistory})

        })

        const json= await response.json();

        console.log(json);

        if(json.success){
            localStorage.setItem('token',json.authToken);
            showAlert("Sign Up Successful","success")
            navigate("/");
        }
        else{
            showAlert("Invalid Credentials","danger")
        }
    }


    return(
        <div className='container mt-2 mb-5'>
        <h3 className='mb-2 mt-2'><strong>Sign up to use Cells-Connected <br/> Catch your doctor online</strong></h3>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">User Name</label>
            <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={handleChange} required/>
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={handleChange} required/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" onChange={handleChange} required minLength={5}/>
        </div>
        <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={handleChange} required minLength={5}/>
        </div>
        <div className="mb-3">
            <label htmlFor="medicalHistory" className="form-label ">Your Medical History</label>
            <textarea rows="3" cols="20" wrap="hard" className="form-control desc" id="medicalHistory" name="medicalHistory"  minLength={10} onChange={handleChange}  />
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
    )
}