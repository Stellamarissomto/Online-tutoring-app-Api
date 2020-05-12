
const  Subject  = require("../model/subjects");
const Tutor = require("../model/tutor");


// @desc create a subject in a category
exports.createSubjects = async (req, res, next) => {
    try {
    const subj = await Subject.create(req.body);

    res.status(201).json({
        success: true,
        data: subj
    });

} catch (err) {
    res.status(400).json({ error: err.message});
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
    res.status(400).json({error: err.message});
}
};    

// @desc delect subject by id
exports.delectSubjects = async (req, res, next) => {

    res.status(200)
    .json({ success: true, message: `Delect Subject ${ req.params.id}`});
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

exports.getTutor = async (req, res, next) => {
    try {
        const tutor = await Tutor.findById(req.params.id);
        res.status(200).json({ data: tutor});
    
      
      } catch (err) {
    
        res.status(400)
        .json({ success: false, error: err.message});
      }
};
