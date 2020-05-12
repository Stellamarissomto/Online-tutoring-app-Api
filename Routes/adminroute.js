const express = require("express");
const router = express.Router();

const { getTutor, createSubjects, 
       updateSubjects, delectSubjects} = require('../controllers/admincontroller');

router.get('/retriveTutor/:id', getTutor);

router.get('/retriveTutors', getTutor);

router.post('/createSubject', createSubjects);

router.put('/updateSubject/:id', updateSubjects);

router.delete('/delectSubject/:id', delectSubjects);



module.exports = router;