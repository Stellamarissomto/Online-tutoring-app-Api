const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },
   

});