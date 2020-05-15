const errorResponse = require('../utilities/errorResponse');
const Tutor = require("../model/tutor");
const Student = require("../model/student");

// @desc   register Student
// @route  POST /api/v1/student/register
// @access public

exports.registerStudent = async(req, res) => {
    try {
        const { name, email, phone, password} = req.body;
    
    // check if student already exists

    const findStudent = await Student.find({name, email}).count(
        (err, count) => {
            if (err) {
                res.status(500).json({ error: err.message});
            }
            return count;
        }
    );

    if (findStudent == 0 ) {

        const student = await new Student({ name,
            email,
            phone,
            password}).save();

    // create token

    const token = student.getSignedJwtToken();

    res.status(200).json({ success: true, message: "Student registered successfully", token});

        
    } else {

        res.status(400).json({ message: "User already exits "});

    }
        
    } catch (err) {
        res.status(400).json({ success: false, error: err.message});
    }
}

// @desc   register Tutor
// @route  POST /api/v1/tutor/register
// @access public

exports.registerTutor = async(req, res) => {
    try {
        const { name, email, phone, password} = req.body;
    
    // check if tutor already exists

    const findTutor = await Tutor.find({name, email}).count(
        (err, count) => {
            if (err) {
                res.status(500).json({ error: err.message});
            }
            return count;
        }
    );

    if (findTutor > 0 ) {

        return res.status(400).json({ message: "User already exits "});
    } 

        const tutor = await new Tutor({ name,
            email,
            phone,
            password}).save();

    // create token

    const token = tutor.getSignedJwtToken();

    res.status(200).json({ success: true, message: "Tutor registered successfully", token});
        
    } catch (err) {
        res.status(400).json({ success: false, error: err.message});
    }
}

// @desc   Login student
// @route  POST /api/v1/student/login
// @access public

exports.loginStudent = async(req, res) => {
    try {
        const { email, password} = req.body;
      // validate email and password
      if (!email || !password) {

        return res.status(400).json({ success: false, message: "please provide an email and password"});
          
      }

      // check for user

      const student = await Student.findOne({ email }).select('+password');
      if (!student) {
        return res.status(401).json({ success: false, message: "Invalid email or password"});
      }

      // check if password matches

      const isMatch = await student.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid email or password"});
      
      }


      // create token and cookie for student

      sendTokenResponseStudent(student, 200, res);
        
    } catch (err) {
        res.status(400).json({ success: false, error: err.message});
    }
}


// @desc   Login tutor
// @route  POST /api/v1/tutor/login
// @access public

exports.loginTutor = async(req, res) => {
    try {
        const { email, password} = req.body;
      // validate email and password
      if (!email || !password) {

        return res.status(400).json({ success: false, message: "please provide an email and password"});
          
      }

      // check for user

      const tutor = await Tutor.findOne({ email }).select('+password');
      if (!tutor) {
        return res.status(401).json({ success: false, message: "Invalid email or password"});
      }

      // check if password matches

      const isMatch = await tutor.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid email or password"});
      
      }


      // create token and cookies

      sendTokenResponse(tutor, 200, res);
        
    } catch (err) {
        res.status(400).json({ success: false, error: err.message});
    }
}



// Get token from tutor, create cookie and send response

const sendTokenResponse = (tutor, statusCode, res) => {

    // create token

    const token = tutor.getSignedJwtToken();
   

   const options = {
       expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
       httpOnly: true
   };

   if (process.env.NODE_ENV === 'production') {
       options.secure = true
       
   }

   res
   .status(statusCode)
   .cookie('token', token, options)
   .json({
       success: true,
       message: "Tutor loged in successfully",
       token
   });


}


// Get token from Student, create cookie and send response

const sendTokenResponseStudent = (student, statusCode, res) => {

    // create token

    const token = student.getSignedJwtToken();
   

   const options = {
       expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
       httpOnly: true
   };

   res
   .status(statusCode)
   .cookie('token', token, options)
   .json({
       success: true,
       message: "Student loged in successfully",
       token
   });


}