const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
name: {
    type: String,
    nested: {
        firstName: { type: String },
        lastName: { type: String }
      },
    required: [true, 'please add a name'],
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters']
},

email: {
      type: String,
      required: [true, 'please add an email'],
      trim: true,
      validate: {
          validator: function(value) {
            return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
        },
     message: "please enter a valid email"

      },
},

phone: {
    type: Number,
    required: true
},

password: {
    type:String,
    required: true,

},

admin:{
    required: true,
    default: false,
    type: Boolean
},

lessons: [{ type: mongoose.Schema.Types.ObjectId, 
    defaault: null }],

});

module.exports = mongoose.model('Student', studentSchema);