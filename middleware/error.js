
const errorResponse = require('../utilities/errorResponse');
const errorHandler = (err, req, res, next) => {
    let error = { ...err }
    error.message = err.message;
    
    // log to console for the developer
    console.log(err);

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Please enter a valid ID. ID:  ${err.value} not found.`;
        error = new errorResponse(message), 404;
        
    }



    // mongoose field validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message);
        error = new errorResponse(message, 400);
        
    }

    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || 'server Error'
    });


    

    
}

module.exports = errorHandler;