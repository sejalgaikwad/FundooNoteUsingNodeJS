/******************************************************************************
 *  @description    : Model is basically a wrapper around the schema, which 
 *                    allows us to actually interface with the database in order
 *                    to create, delete, update and read document,
 *  @file           : notes.js
 *  @since          : 09-06-2020
 ******************************************************************************/
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
        type: schema.Types.ObjectId,
        ref: 'User',
    }
}, 
{
    timestamps: true
});
var noteModel =  mongoose.model('Note', noteSchema); 

class NoteModelClass{

/*************************************************************************************
* @description:     The save() method is designed to insert documents by calling the 
*                   instance of that document, meaning the model that has been created.
* @param {object}   noteData
***************************************************************************************/
    createNote(noteData){
        let newNote=new noteModel({
            title:noteData.title,
            description:noteData.description,
            user_Id:noteData.user_Id
        })
        return new Promise((resolve, reject) => {
            newNote.save()
            .then(data => {
                return resolve(data);
            })
            .catch(err => {
                return reject(err);
            });
        });
    }
}

module.exports = new NoteModelClass();
