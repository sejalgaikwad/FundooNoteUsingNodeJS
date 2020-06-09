const mongoose = require('mongoose');
var schema = mongoose.Schema;

// defining the mongoose schema
var noteSchema = new schema({                                  
    title: {
        type: String,
        require: [true, "Title can't be Empty"],
        trim: true
    },
    description: {
        type: String,
        require: [true, "Description can't be Empty"],
        trim: true
    },
    user_Id : {
        type:Schema.Types.ObjectId,
        ref: 'User',
    }
}, 
{
    timestamps: true
});
var noteModel =  mongoose.model('Note', noteSchema); 
