const mongoose= require(`mongoose`);
const dotenv=require('dotenv').config();
//process.env.MongoURI
const connectToMongo = async ()=>{
    await mongoose.connect(`mongodb://localhost:27017/healthcareProject?readPreference=primary&appname=MongoDB%20Compass&ssl=false`).then(()=>{
        console.log("Connected to Mongo Successfuly");
    }
    ).catch(err=>{
        console.log("Cannot Connect to Mongo:",err);
    })
}
module.exports = connectToMongo;