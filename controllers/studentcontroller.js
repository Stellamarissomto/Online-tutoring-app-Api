const errorResponse = require('../utilities/errorResponse');
const  Subject  = require("../model/subjects");
const Tutor = require("../model/tutor");
const Lesson = require("../model/lessons");
const Student = require("../model/student");

exports.bookLesson = async (req, res, next) => {
    try {
    const { name, category, subject, date, data } = req.body;
    
    // verify if the tutor is in the db

    const isValidTutor = await Tutor.find({ name: tutor}).count(
        (err, count) => {
            if (err) {
                res.status(400).json({ error: err.message});
            }
            return count;
        }
    );

    // verify if the subject is in the db

    const isValidSubj = await Subject.find({ category, name: subject}).count(
        (err, count) => {
            if (err) {
                res.status(400).json({ error: err.message});
            }
            return count;
        }
    );

    if (isValidSubj > 0 && isValidTutor > 0) {

        const lesson = await new Lesson({ name,
            date,
            tutor,
            data,
            subject,
            category}).save();

        res.status(200).json({ data: lesson});

        
    } else {

        res.status(400).json({ error: "Ensure you Entered a valid Tutor name and Subject in the correct category"});
    }



} catch (err) {
    res.status(400).json({ error: err.message});
}
};