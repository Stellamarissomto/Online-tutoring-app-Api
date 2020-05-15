const express = require("express");
const router = express.Router();
const { registerTutor, loginTutor } = require('../controllers/auth');


router.post("/register", registerTutor);
router.post("/login", loginTutor);



module.exports = router;