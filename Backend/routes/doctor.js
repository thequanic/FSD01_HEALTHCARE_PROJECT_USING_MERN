const express = require(`express`);
const router = express.Router();
const Doctor= require(`../models/Doctor`);
const {body, validationResult}= require(`express-validator`);
const bcrypt= require(`bcryptjs`);
const jwt = require(`jsonwebtoken`);
const fetchDoctor=require(`../middleware/fetchDoctor`);
const dotenv=require(`dotenv`).config();
const  JWT=`IamProudtobeanIndian`;

/*********************************************************************************************************************** */
//create a Doctor using: POST "/api/auth/create/Doctor"
router.post('/create/Doctor',[

    //validating the request body parameters
    body('name',`Enter a valid name`).isLength({min:3}),
    body('email',"Enter a valid email").isEmail(),
    body(`password`,"Password must be atleast 5 characters ").isLength({min:5}),
    body('expertise',"Expertise must be atleast 3 characters").isLength({min:3}),
    body(`about`,"About must be atleast 5 characters ").isLength({min:5}),
    body('lisenceNumber',"Lisence number must be 10 characters/numbers long").isLength({min:10,max:12}),
    body('highestEducation',"Educaton must be atleast 3 characters long").isLength({min:3})

],async (req,res)=>{
    //console.log(req.body);
    let success=false;
    //if there are errors return bad request and the errors
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors:errors.array()});
    }
    // const doctor = Doctor(req.body);
    // doctor.save();

    //check whether the doctor with same email exists already
    let doctor=await Doctor.findOne({email:req.body.email});
    if(doctor){
        return res.status(400).json({success,error:"Sorry a doctor with this email already exists"});
    }

    //ecrypting password before storing
    const salt= await bcrypt.genSalt(10);
    secPasswd = await bcrypt.hash(req.body.password,salt);

    
    //creating new doctor
    doctor=Doctor.create(
        {
            name:req.body.name,
            password:secPasswd,
            email:req.body.email,
            about:req.body.about,
            expertise:req.body.expertise,
            lisenceNumber:req.body.lisenceNumber,
            highestEducation:req.body.highestEducation

        }
    ).then( 
        //if doctor is created this will be executed
        doctor=>{
            const data={
                doctor:{
                    id:doctor.id
                }
            };

            //jwt token that will provide secure access to doctor
            const authToken=jwt.sign(data,JWT);
            success=true;
            //console.log(authToken);
            res.json({success,authToken});}
        )
    .catch(err=>{
        //if there is some error while creating doctor this will be executed
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
    );
})
/*********************************************************************************************************************** */


/*********************************************************************************************************************** */
//log in a Doctor using: POST "/api/auth/login/Doctor"
router.post('/login/Doctor',[

    //validating the request body parameters
    
    body('email',"Enter a valid email").isEmail(),
    body(`password`,"Password cannot be empty").exists()

],async (req,res)=>{
    //console.log(req.body);
    let success=false;
    //if there are errors return bad request and the errors
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    
    

    try
    {
        let doctor= await Doctor.findOne({email:req.body.email});
        if(!doctor)
        {
            return res.status(400).json({success,error:"Please try to login with correct credentials"});
        }

        const passwordCompare= await bcrypt.compare(req.body.password,doctor.password);
        if(!passwordCompare){
            return res.status(400).json({success,error:"Please try to login with correct credentials"});
        }

        const data={
            doctor:{
                id:doctor.id
            }
        };

        //jwt token that will provide secure access to doctor
        const authToken=jwt.sign(data,JWT);
        success=true;
        //console.log(authToken);
        res.json({success,authToken});
        

    }catch(err)
    {
        console.log(err.message);
        res.status(500).send("Internal Server Error");
    }

    
})
/*********************************************************************************************************************** */



/*********************************************************************************************************************** */
//get a Doctor using: GET "/api/auth/get/Doctor"
router.get('/get/Doctor',fetchDoctor,async (req,res)=>
{
    try{
        doctorId=req.doctor.id;
        const doctor= await Doctor.findById(doctorId).select("-password -_id");
        res.send(doctor);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})
/*********************************************************************************************************************** */



module.exports=router;