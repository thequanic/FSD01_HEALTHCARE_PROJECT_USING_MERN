const jwt = require(`jsonwebtoken`);
const dotenv=require(`dotenv`).config();



const fetchDoctor = (req,res,next)=>
{

    //getting doctor from jwt token

    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate using a valid token"});
    }

    try{
        const data= jwt.verify(token,process.env.JWT);
        req.doctor=data.doctor;
        next();
    }catch(error)
    {
        res.status(401).send({error:"Please authenticate using a valid token"});
    }
}

module.exports = fetchDoctor;