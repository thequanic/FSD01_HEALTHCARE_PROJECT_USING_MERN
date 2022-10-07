const mongoose = require(`mongoose`);
const {Schema}=mongoose;
const PatientSchema = new Schema({
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
    medicalHistory:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now
    }

})

const Patient=mongoose.model(`patient`,PatientSchema);
//User.createIndexes();
module.exports= Patient;