import React,{ useContext } from 'react';
import Context from '../Context/context';



export default function DoctorMyProfile()
{
    const handleClick=()=>{

    }
    
    return(
        <div className='profile-card'>
         <button  className="btn btn-dark profile-edit-button mx-2" onClick={handleClick}>Edit Profile</button>
         <h2><strong>Devansh Goel</strong></h2>
         <h4><strong>Expert In: ENT || Lisence Number: 1234567890<br/>Highest Education: MBBS</strong></h4>
         <h4>devansh052003@gmail.com</h4>   

         <h3 className='about-me-title'><strong>About Me:</strong></h3>
         <div className='container about-me'>
            <p><strong>But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure</strong></p>
         </div>
            
        </div>
    )
}
