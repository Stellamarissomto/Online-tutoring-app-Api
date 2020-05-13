const express = require("express");
const router = express.Router();

const { getTutor, createSubjects, 
       updateSubjects, delectSubjects, getLessons, bookLesson} = require('../controllers/admincontroller');

router.get('/retriveTutor/:id', getTutor);

router.get('/retriveTutors', getTutor);
router.get('/retriveLessons', getLessons);

router.post('/createSubject', createSubjects);
router.post('/booklesson', bookLesson);

router.put('/updateSubject/:id', updateSubjects);

router.delete('/delectSubject/:id', delectSubjects);




module.exports = router;