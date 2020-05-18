const jwt = require('jsonwebtoken');
const errorResponse = require('../utilities/errorResponse');
const Tutor = require("../model/tutor");
const Student = require("../model/student");

// protect routes
exports.protect = async (req, res, next) => {

    let token;

    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer') 
        ) {
            token = req.headers.authorization.split(' ')[1];
        
    }  

    //else if(req.cookies.token) {

        //token = req.cookies.token
        
    //}

    // make sure token exists

    if (!token) {
        return next(new errorResponse('Not authorized to access this route', 401));
    }

    try {
        // verify token 

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);

        req.student = await Student.findById(decoded.id);
        req.tutor = await Tutor.findById(decoded.id);
        

        next();
    } catch (err) {
        return next(new errorResponse('Not authorized to access this route', 401));
    }
}

