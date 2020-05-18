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
       deactivateTutor,
       makeAdmin } = require('../controllers/admincontroller');


router.get('/retriveTutor/:id',  protect, getTutorById);

router.get('/retriveTutors',  protect, getTutor);

router.get('/retriveLessons',  protect, getLessons);

router.get('/retriveLessons/:id',  protect, getLessonById);

router.post('/createSubject',  protect, createSubjects);

router.post('/bookLesson',  protect, bookLesson);

router.post('/makeAdmin',  protect, makeAdmin);


router.put('/updateSubject/:id',  protect, updateSubjects);

router.put('/updateLesson/:id',  protect, updateLesson);

router.delete('/delectSubject/:id',  protect,  delectSubjects);

router.delete('/deleteLesson/:id',  protect, delectLesson);

router.delete('/deleteCategory',  protect, deleteCategory);

router.delete('deactivateTutor/:id',  protect, deactivateTutor );




module.exports = router;