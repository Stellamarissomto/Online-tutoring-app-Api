const express = require("express");
const router = express.Router();
const { protect } = require('../middleware/auth');
const { registerTutor, loginTutor } = require('../controllers/auth');
const {registerSubject } = require('../controllers/tutorcontroller');


router.post("/register", registerTutor);
router.post("/login", loginTutor);
router.post("/registerSubject", registerSubject);


module.exports = router;