
const errorResponse = require('../utilities/errorResponse');
const  Subject  = require("../model/subjects");
const Tutor = require("../model/tutor");
const Lesson = require("../model/lessons");



// @desc create a subject in a category

exports.createSubjects = async (req, res, next) => {
    try {
    const { name, category, data } = req.body;

    // check if subject already exists

    const subjFind = await Subject.find({ category, name}).count(
        (err, count) => {
            if (err) {
                res.status(400).json({ error: err.message});
            }
            return count;
        }
    );

    if (subjFind == 0 ) {

        const subject = await new Subject({ name,
            data,
            category,}).save();

        res.status(200).json({ data: subject});

        
    } else {

        res.status(400).json({ message: "Subject has already been created in the database"});
    }

} catch (err) {
    res.status(400).json({ succes: false, error: err.message});
}
};


// @desc update subject by id
exports.updateSubjects = async (req, res, next) => {
    try {
    const updatesubj = await Subject.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!updatesubj) {
       
        return res.status(400).json({ success: false});
    }


    res.status(200)
    .json({ success: true, data: updatesubj});
} catch (err) {
    next(err);
}
};    

// @desc delect subject by id
exports.delectSubjects = async (req, res, next) => {
    try {
        const deleteSubj = await Subject.findByIdAndDelete(req.params.id)
        if (!deleteSubj) {
            return res.status(400).json({ success: false});
        }
    
    
        res.status(200)
        .json({ success: true, data: "Subject delected"});

    } catch (err) {
        next(err);
    }
        
        
  
};

// @desc Get all Tutor

exports.getTutor = async (req, res, next) => {
try {
    const tutors = await Tutor.find();
    res.status(200).json({message: tutors});
    
} catch (err) {
    res.status(400).json({ error: err.message});
}

};


// @desc Get a Tutor by id

exports.getTutorById = async (req, res, next) => {
    try {
        const tutor = await Tutor.findById(req.params.id);
        res.status(200).json({ data: tutor});
    
      
      } catch (err) {
         next(err);
      }
};


// @desc book lessons

exports.bookLesson = async (req, res, next) => {
    try {
    const { name, category, subject, tutor, data } = req.body;

     // check if tutor already exists

     const findTutor = await Tutor.find({ name: tutor}).count(
        (err, count) => {
            if (err) {
                res.status(500).json({ error: err.message});
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

    if (isValidSubj > 0 && findTutor > 0) {

        const lesson = await new Lesson({ name,
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


// @desc retrieve all lessons

exports.getLessons = async (req, res, next) =>{
    try {
        const lesson = await Lesson.find();
        res.status(200).json({ data: lesson})
    } catch (err) {
        res.status(400).json({ error: err.message});
        
    }


}

// @desc Get a Lessons by id

exports.getLessonById = async (req, res, next) => {
    try {
        const lesson = await Lesson.findById(req.params.id);
        res.status(200).json({ data: lesson});
    
      
      } catch (err) {
    
        res.status(400)
        .json({ success: false, error: err.message});
      }


}

  // @desc update lesson by id
exports.updateLesson = async (req, res, next) => {
    try {
    const updateles = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!updateles) {
        return res.status(400).json({ success: false});
    }


    res.status(200)
    .json({ success: true, data: updateles});
} catch (err) {
    res.status(400).json({error: err.message});
}
};    

// @desc delect lesson by id
exports.delectLesson = async (req, res, next) => {
    try {
        const deleteLes = await Lesson.findByIdAndDelete(req.params.id)
        if (!deleteLes) {
            return res.status(400).json({ success: false});
        }
    
    
        res.status(200)
        .json({ success: true, data: "Lesson delected"});

    } catch (err) {
        res.status(400).json({error: err.message});
    }
        
        
  
};