
const errorResponse = require('../utilities/errorResponse');
const errorHandler = (err, req, res, next) => {
    let error = { ...err }
    error.message = err.message;
    
    // log to console for the developer
    console.log(err);

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Please enter a valid ID. ID:  ${err.value} not found.`;
        error = new errorResponse(message, 404);
        
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'server Error'
    });


    

    
}

module.exports = errorHandler;