//Package imports
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5001;
const { connectDB } = require('./config/db');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//Database Connection
connectDB();

//File imports
const mainRouter = require('./routes/index');


//Middlewares
app.use(bodyParser.json());
app.use(cors());


//API Routes
app.use('/api/v1',mainRouter);


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})

