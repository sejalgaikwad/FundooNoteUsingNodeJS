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
        require: [true, 'Title can not be Empty'],
        trim: true
    },
    description: {
        type: String,
        require: [true, 'Description can not be Empty'],
        trim: true
    },
    user_Id : {
        type: schema.Types.ObjectId,
        ref: 'User',
    },
    isArchive : {
        type:Boolean,
        default:false
    },
    isTrash : {
        type:Boolean,
        default:false
    },
    isPinned :{
        type:Boolean,
        default:false
    },
    color:{
        type: String
    },
    reminder: {
        type: String,
        default: null
    },
    collaborator: [{
        type: schema.Types.ObjectId,
        ref: 'User'   
    }],
    label: [{
        type: schema.Types.ObjectId,
        ref: 'Label'    
    }]
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

    updateNote(updateData, dataToBeUpadted) {
        return new Promise((resolve, reject) => {
            noteModel.findOneAndUpdate(updateData,dataToBeUpadted,{ new: true })
                .then(data => {
                    if (data != null) {
                        return resolve(data);
                    } else {
                        return reject('invalid NoteId');
                    }
                })
                .catch(err => {
                    return reject(err);
                });
        });
    }

    readNotes(findData) {
        return new Promise((resolve, reject) => {
            noteModel.find(findData)
            .then(data => {
                return resolve(data);
            })
            .catch(err => {
                return reject(err);
            });
        });
    }

    search(query,filerData) {
        return new Promise((resolve, reject) => {
            noteModel.find({
                $and: [{$or: [{ title: { $regex: query.searchKey, $options: 'i' } },
                              { description: { $regex: query.searchKey, $options: 'i' }} ]},
                              { userId: query.userId,isTrash:false}]},filerData)
            .then(data => {
                if (data !== null) {
                    return resolve(data);
                } else {
                    return reject(data);
                }
            })
            .catch(err => {
              return reject(err);
            });
        });
    }
}
module.exports = new NoteModelClass();
