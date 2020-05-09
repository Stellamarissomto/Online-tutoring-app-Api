const express = require("express");
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');

// conncet to database
connectDB();

// route files
const generalroute = require('./Routes/general');

//load env files
dotenv.config({ path: './config/config.env'});

const app = express(); 

// deve logging middleware
if (process.env.NODE_ENV === 'deveploment') {
    app.use(morgan('dev'));
}


 // mount routers
 app.use('/api/v1/general', generalroute)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, 
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`) );


    // handle unhanled promise rejections
process.on('unhandledRejection', (err, Promise) => {
    console.log(`Error: ${err.message}`);
    // close server 

    server.close(() => process.exit(1));
});