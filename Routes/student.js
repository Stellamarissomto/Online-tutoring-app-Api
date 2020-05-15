const express = require("express");
const router = express.Router();
const { protect } = require('../middleware/auth');
const { registerStudent, loginStudent } = require('../controllers/auth');

const { bookLesson} = require("../controllers/studentcontroller");


router.post("/register", registerStudent);
router.post("/login", loginStudent);
router.post("/bookLesson", protect, bookLesson);


module.exports = router;