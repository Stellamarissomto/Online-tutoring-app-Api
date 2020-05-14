const express = require("express");
const dotenv = require('dotenv');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// conncet to database
connectDB();

// route files
const generalroute = require('./Routes/general');
const adminroute = require('./Routes/adminroute');
const studentroute = require('./Routes/student');


//load env files
dotenv.config({ path: './config/config.env'});

const app = express(); 

// Body parser
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// deve logging middleware
if (process.env.NODE_ENV === 'deveploment') {
    app.use(morgan('dev'));
}


 // mount routers
 app.use('/api/v1/general', generalroute);
 app.use('/api/v1/admin', adminroute);
 app.use('/api/v1/student', studentroute);



app.use(errorHandler);

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, 
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`) );


    // handle unhanled promise rejections
process.on('unhandledRejection', (err, Promise) => {
    console.log(`Error: ${err.message}`);
    // close server 

    server.close(() => process.exit(1));
});