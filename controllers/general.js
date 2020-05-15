const errorResponse = require('../utilities/errorResponse');

const Tutor = require('../model/tutor');
const Subject = require('../model/subjects');


// @desc Get all category

exports.getCategory = async (req, res, next) => {
  try{

    const category = await Subject.find({category} );
    res.status(200).json({ data: category});

  }
  catch (err) {
     res.status(400).json({ error: err.message});
  }

};



// @desc Get a subject from a category by id

exports.getSubject = async (req, res, next) => {
  try {
    const subject = await Subject.findById(req.params.id);
    
   res.status(200).json({ data: subject});

  
  } catch (err) {

    next(err);
  }
    
};



// @desc Get all subject in a category

exports.getSubjects = async (req, res) =>{
try{
  const { category } = req.body;
  const isValidCat = [ "SSS", "Primary", "JSS"];
 if (isValidCat.includes(category)) {
   const subjectInCat = await Subject.find({ category });
   res.status(200).json({ message: subjectInCat});
 
 } 
 else {
   res.status(400).json({ message: " Invalid Category"});
 }

} catch (err) {
  res.status(400).json({ error: err.message});
}

} 

// search for subjects

exports.searchSubject = async (req, res) => {
    try {
      const { subjectName } = req.body;
      const subject = await Subject.find({$text: { $search: subjectName }}).exec();
      res.status(200).json({ message: subject });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  };

  // search for tutors
  exports.searchTutors = async (req, res) => {
    try{
      const{ tutorName } = req.body;
      const tutor = await Tutor.find({ $text: { $search: tutorName }}).exec();
      res.status(200).json({ message: tutor});
    } catch (err) {
      res.status(200).json({ error: err.message});
    }
    

  };


