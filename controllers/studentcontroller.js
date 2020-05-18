const errorResponse = require('../utilities/errorResponse');
const  Subject  = require("../model/subjects");
const Tutor = require("../model/tutor");
const Lesson = require("../model/lessons");
const Student = require("../model/student");


// @desc book lessons

exports.bookLesson = async (req, res, next) => {
    try {
        const { name, subject, tutor} = req.body;

        const validLesson = await Lesson.find({ name, subject, tutor}).count(
           (err, count) => {
               if (err) {
                   res.status(500).json({ error: err.message});
               }
               return count;
           }
        
        );

        if (validLesson == 0) {
            
            res.status(400).json({ success: false, message: "Please enter a valid Lesson"});
        } else {
            
            res.status(200).json({ success: true, message: `Your have book ${name} successfully`});
        }

        
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
};

