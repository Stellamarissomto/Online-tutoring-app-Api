const errorResponse = require('../utilities/errorResponse');
const jwt = require('jsonwebtoken');
const  Subject  = require("../model/subjects");
const Tutor = require("../model/tutor");
const Lesson = require("../model/lessons");
const Student = require("../model/student");

// @desc register to take subject in a category

  exports.registerSubject = async (req, res) => {
    try {

      const { subject, category } = req.body;
     
      //check that it's a valid category

      const validCat = ["Primary", "JSS", "SSS"];
      if (validCat.includes(category)) {

        //check that subject exist
        const subjCount = await Subject.find({name: subject,category}).count((err, count) => {
          if (err) {
            return res.status(500).json({ error: err });
          }
          return count;
        });

        //return all valid subjects and format it
        const validSubject = await Subject.find();
        const validSubjectData = [];

        validSubject.forEach((subject) => {
          validSubjectData.push(`${subject.name} : ${subject.category}`);
        });

        if (subjCount > 0) {

          //get the logged in tutor and update their document accordingly
          const token = req.cookies.token;
          const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
              res.status(500).json({ error: err });
            }
            return decoded;
          });


          //get id of logged in user

          const loggedInUserId = decoded.id;

          //get the subjects of the logged in user

          let tutorSubject = await Tutor.find({ _id: loggedInUserId });

          //to get the id of the subject you want to register

          let subjectId = await Subject.find({ name: subject, category });

          //check that the subject hasn't been registered before

        if (tutorSubject[0].subjects.includes(subjectId[0]._id)) {

          return res.status(400).json({ error: "You can't register for same subject twice" });

          }

          await tutorSubject[0].subjects.push(subjectId[0]._id);
          await Tutor.updateOne(
            { _id: loggedInUserId },
            {
              $set: {
                subjects: tutorSubject[0].subjects,
              },
            }
          );
          await res.json({ message: "Registered subject succcessfully" });
        } else {
          res.status(400).json({
            error: `Please Enter a valid subject. 
            Here is a list of valid subjects and their categories you can register for -> ${validSubjectData}`,
          });
        }
      } else {
        res.status(400).json({ error: "You entered an invalid category" });
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
