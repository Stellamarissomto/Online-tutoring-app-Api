const express = require("express");
const router = express.Router();

const { bookLesson} = require("../controllers/studentcontroller");

router.post("/bookLesson", bookLesson);


module.exports = router;