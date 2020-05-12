const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    category: {
        type: [String],
        required: true,
        enum: ["Primary", "JSS", "SSS"]
    },
   
    website: {
        type: String,
        validate: {
            validator: function (value) {
              return /(https?):\/\/([\w-]+(\.[\\w-]+)*\.([a-z]+))(([\w.,@?^=%&amp;:\/~+#()!-]*)([\w@?^=%&amp;\/~+#()!-]))?/gi.test(
                value
              );
            },
            message: "Enter a valid url please",
          },
    }


},
    {timestamps: true 
    
    });

    module.exports = mongoose.model('Subject', subjectSchema);
