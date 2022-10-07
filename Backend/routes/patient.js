const express = require(`express`);
const router = express.Router();
const Patient= require(`../models/Patient`);
const {body, validationResult}= require(`express-validator`);
const bcrypt= require(`bcryptjs`);
const jwt = require(`jsonwebtoken`);
const fetchPatient=require(`../middleware/fetchPatient`); 
const dotenv=require(`dotenv`).config();


/*********************************************************************************************************************** */
//create a Patient using: POST "/api/auth/create/Patient"
router.post('/create/Patient',[

    //validating the request body parameters
    body('name',`Enter a valid name`).isLength({min:3}),
    body('email',"Enter a valid email").isEmail(),
    body(`password`,"Password must be atleast 5 characters ").isLength({min:5}),
    body('medicalHistory',"Medical History must be 10 characters long atleast").isLength({min:10})

],async (req,res)=>{
    //console.log(req.body);
    let success=false;
    //if there are errors return bad request and the errors
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success,errors:errors.array()});
    }
    // const patient = Patient(req.body);
    // patient.save();

    //check whether the patient with same email exists already
    let patient=await Patient.findOne({email:req.body.email});
    if(patient){
        return res.status(400).json({success,error:"Sorry a patient with this email already exists"});
    }

    //ecrypting password before storing
    const salt= await bcrypt.genSalt(10);
    secPasswd = await bcrypt.hash(req.body.password,salt);

    
    //creating new patient
    patient=Patient.create(
        {
            name:req.body.name,
            password:secPasswd,
            email:req.body.email,
            medicalHistory:req.body.medicalHistory

        }
    ).then( 
        //if patient is created this will be executed
        patient=>{
            const data={
                patient:{
                    id:patient.id
                }
            };

            //jwt token that will provide secure access to patient
            const authToken=jwt.sign(data,process.env.JWT);
            success=true;
            //console.log(authToken);
            res.json({success,authToken});}
        )
    .catch(err=>{
        //if there is some error while creating patient this will be executed
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
    );
})
/*********************************************************************************************************************** */


/*********************************************************************************************************************** */
//log in a Patient using: POST "/api/auth/login/Patient"
router.post('/login/Patient',[

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
        let patient= await Patient.findOne({email:req.body.email});
        if(!patient)
        {
            return res.status(400).json({success,error:"Please try to login with correct credentials"});
        }

        const passwordCompare= await bcrypt.compare(req.body.password,patient.password);
        if(!passwordCompare){
            return res.status(400).json({success,error:"Please try to login with correct credentials"});
        }

        const data={
            patient:{
                id:patient.id
            }
        };

        //jwt token that will provide secure access to patient
        const authToken=jwt.sign(data,process.env.JWT);
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
//get a Patient using: GET "/api/auth/get/Patient"
router.get('/get/Patient',fetchPatient,async (req,res)=>
{
    try{
        patientId=req.patient.id;
        const patient= await Patient.findById(patientId).select("-password");
        res.send(patient);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})
/*********************************************************************************************************************** */



module.exports=router;