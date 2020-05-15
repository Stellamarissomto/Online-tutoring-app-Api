const express = require("express");
const router = express.Router();
const { registerTutor } = require('../controllers/auth');


router.post("/register", registerTutor);



module.exports = router;