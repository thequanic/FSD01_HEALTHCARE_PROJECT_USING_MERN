const mongoose = require(`mongoose`);
const {Schema}=mongoose;
const DoctorSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    expertise:{
        type:String,
        required: true
    },
    lisenceNumber:{
        type:String,
        required:true,
    },
    about:
    {
        type:String,
        required:true
    },
    highestEducation:
    {
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }



})

const Doctor=mongoose.model(`doctor`,DoctorSchema);
//User.createIndexes();
module.exports= Doctor;