const connectToMongo = require(`./db`);

const express = require(`express`);
var cors=require(`cors`);
connectToMongo();

const app= express();



const port = 5000;

app.use(cors());

app.use(express.json());

 app.use(`/api/auth/doc`,require(`./routes/doctor.js`));
 app.use(`/api/auth/pat`,require(`./routes/patient.js`));
 app.use('/api/service',require('./routes/others.js'))

app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.listen(port,()=>
{
    console.log("Listening to port ");
})
