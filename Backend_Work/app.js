const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv/config');
const app = express();
var cors = require('cors');

app.use(cors())
app.use(bodyparser.json());   
//Routes
const Employee_router = require('./routes/employees');
app.use('/employees', Employee_router);

app.get('/', (req,res) =>{
   res.send("Home Page"); 
});

//Connect to DB
mongoose.connect(
   process.env.DB_Connection,
   { useNewUrlParser: true , useUnifiedTopology: true },
   () => {
      console.log("Connected to Database!")
   }
)


//Listen to Port
app.listen(3000);