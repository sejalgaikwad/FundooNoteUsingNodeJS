const mongoose = require('mongoose');
var schema = mongoose.Schema;

// defining the mongoose schema
var labelSchema = new schema({                                  
    labelName: {
        type: String,
        require: [true, "Label Name can't be Empty"],
        trim: true
    },
    user_Id : {
        type: schema.Types.ObjectId,
        ref: 'User',
    }
}, 
{
    timestamps: true
});
var noteModel =  mongoose.model('Labe;', labelSchema); 