const express = require("express");
const router = express.Router();

const { getSubject, getCategory, 
       getSubjects, searchSubject, 
       searchTutors } = require('../controllers/general');

router.get('/retriveSubject/:id', getSubject);

router.get('/retriveSubjects', getSubjects);

router.get('/retriveCategories', getCategory);

router.post('/searchSubjects', searchSubject);

router.post('/searchTutors', searchTutors);

module.exports = router;