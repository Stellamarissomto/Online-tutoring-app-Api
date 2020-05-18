const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const tutorSchema = new mongoose.Schema({
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
role:  {
    type: String,
    enum: ['tutor', 'student'],
    default: 'tutor'
},

admin: {
     type: Boolean,
     required: true,
     default: false
     
},

subject: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    defaault: null, 
    ref: 'Subject'
}]
    

});

// encrypt password using bcrypt

tutorSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });


  // sign JWT return 

tutorSchema.methods.getSignedJwtToken = function() {
    return JWT.sign({ id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
    
};

// match user entered password to hasted password

tutorSchema.methods.matchPassword = async function (tutorPassword) {
return await bcrypt.compare(tutorPassword, this.password);
}

module.exports = mongoose.model('Tutor', tutorSchema);