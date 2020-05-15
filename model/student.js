const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

const studentSchema = new mongoose.Schema({
name: {
    type: String,
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
    required: [true, 'please add an phone number'],
},

password: {
    type:String,
    required: [true, 'please add an password'],
    minlength: 6,
    select: false

},

admin:{
    required: true,
    default: false,
    type: Boolean
},

lessons: [{ type: mongoose.Schema.Types.ObjectId, 
    defaault: null }],

});

{timestamps: true 

// encrypt password using bcrypt

studentSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
}

// sign JWT return 

studentSchema.methods.getSignedJwtToken = function() {
    return JWT.sign({ id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
    
};

// match user entered password to hasted password

studentSchema.methods.matchPassword = async function (studentPassword) {
return await bcrypt.compare(studentPassword, this.password);
}


module.exports = mongoose.model('Student', studentSchema);