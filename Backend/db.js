const mongoose= require(`mongoose`);
const dotenv=require('dotenv').config();

const connectToMongo = ()=>{
    mongoose.connect(process.env.MongoURI,()=>{
        console.log("Connected to Mongo Successfuly");
    }
    ).catch(err=>{
        console.log("Cannot Connect to Mongo:",err);
    })
}
module.exports = connectToMongo;