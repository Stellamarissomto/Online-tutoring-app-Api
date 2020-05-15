const express = require("express");
const router = express.Router();
const { protect } = require('../middleware/auth');
const { registerTutor, loginTutor } = require('../controllers/auth');


router.post("/register", registerTutor);
router.post("/login", loginTutor);



module.exports = router;