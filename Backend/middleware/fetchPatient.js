const jwt = require(`jsonwebtoken`);
const dotenv=require(`dotenv`).config();

const fetchPatient = (req,res,next)=>
{

    //getting patient from jwt token

    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token"});
    }

    try{
        const data= jwt.verify(token,process.env.JWT);
        req.patient=data.patient;
        next();
    }catch(error)
    {
        res.status(401).send({error:"Please authenticate using a valid token"});
    }
}

module.exports = fetchPatient;