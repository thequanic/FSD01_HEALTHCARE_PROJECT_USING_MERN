const express = require(`express`);
const router = express.Router();
const Doctor= require(`../models/Doctor`);
const Patient= require(`../models/Patient`);
const {body, validationResult}= require(`express-validator`);
const fetchDoctor=require(`../middleware/fetchDoctor`);
const fetchPatient=require(`../middleware/fetchPatient`);

/*********************************************************************************************************************** */
//get a Doctor using: GET "/api/auth/get/Doctor"
router.get('/get/all/Doctor',async (req,res)=>
{
    try{
        const doctor= await Doctor.find().select("-password -_id");
        res.send(doctor);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})
/*********************************************************************************************************************** */


module.exports=router;