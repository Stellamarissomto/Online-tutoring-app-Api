const express = require("express");
const router = express.Router();
const { protect } = require('../middleware/auth');

const { getTutor,
        getTutorById,
       createSubjects, 
       updateSubjects, 
       delectSubjects, 
       getLessons,
       getLessonById, 
       bookLesson, 
       updateLesson, 
       delectLesson, 
       deleteCategory, 
       deactivateTutor } = require('../controllers/admincontroller');


router.get('/retriveTutor/:id', getTutorById);

router.get('/retriveTutors', getTutor);

router.get('/retriveLessons', getLessons);

router.get('/retriveLessons/:id', getLessonById);

router.post('/createSubject', createSubjects);

router.post('/bookLesson', bookLesson);

router.put('/updateSubject/:id',updateSubjects);

router.put('/updateLesson/:id', updateLesson);

router.delete('/delectSubject/:id',  delectSubjects);

router.delete('/deleteLesson/:id', delectLesson);

router.delete('/deleteCategory', deleteCategory);

router.delete('deactivateTutor/:id', deactivateTutor );




module.exports = router;