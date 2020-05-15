const mongoose = require("mongoose");

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
      /*validate: {
          validator: function(value) {
            return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
        },
     message: "please enter a valid email"

      }, */
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,

        'please add a valid email'

      ]

},

phone: {
    type: Number,
    required: true
},

password: {
    type:String,
    required: true,

},

admin: {
     type: Boolean,
     required: true,
     
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

module.exports = mongoose.model('Tutor', tutorSchema);