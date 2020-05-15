const errorResponse = require('../utilities/errorResponse');
const  Subject  = require("../model/subjects");
const Tutor = require("../model/tutor");
const Lesson = require("../model/lessons");
const Student = require("../model/student");

// @desc register to take subject in a category

exports.takeSubject = async (req, res) => {
    const { subject, category } = req.body;

    //check that it's a valid category
    const validCategory = ["primary", "jss", "sss"];
    if (validCategory.includes(category)) {
      //check that subject exist
      const subjectCount = await Subject.find({
        name: subject, category}).count((err, count) => {
        if (err) {
          return res.status(500).json({ error: err });
        }
        return count;
      });
    }

    
}