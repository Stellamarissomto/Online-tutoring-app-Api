const student = require("../model/student");

// @desc Get all category

exports.getCategory = (req, res, next) => {
    res.status(200)
    .json({ success: true, message: "show all Categories"});
};

// @desc Get a subject from a category by id

exports.getSubject = (req, res, next) => {
    res.status(200)
    .json({ success: true, message: `Get Subject ${ req.params.id}`});
};

// @desc Get all subject

exports.getSubjects = (req, res, next) => {
    res.status(200)
    .json({ success: true, message: "show all subjects"});
};

// search for subjects

exports.searchSubject = async (req, res) => {
    try {
      const { subjectName } = req.body;
      const subject = await Subject.find({
        $text: { $search: subjectName },
      }).exec();
      res.status(200).json({ message: subject });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  // search for tutors
  exports.searchTutors = async (req, res) => {
    try {
      const { tutorName } = req.body;
      const tutor = await Tutor.find({ $text: { $search: tutorName } }).exec();
      res.status(200).json({ message: tutor });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

