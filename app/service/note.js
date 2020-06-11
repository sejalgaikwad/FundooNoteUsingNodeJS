let noteModelClassObject = require('../model/notes')

class NoteServiceClass {
    
    createNote(noteData) {        
        return new Promise((resolve, reject) => {
            noteModelClassObject.createNote(noteData)
            .then(data => {
                return resolve(data);
            })
            .catch(err => {
                return reject(err);
            });
        });
    } 
    
    updateNote(idData, updateData) {    
        return new Promise((resolve, reject) => {
            noteModelClassObject.updateNote(idData, updateData)
            .then(data => {
                return resolve(data);
            })
            .catch(err => {
                return reject(err);
            });
        });
    }

    getAllNotes(getAllNotesData) {
        return new Promise((resolve, reject) => {
            noteModelClassObject.readNotes({
                user_Id: getAllNotesData.userId,
                isTrash: false,
                isArchive: false,
                isPinned: false
            })
            .then(data => {
                return resolve(data);
            })
            .catch(err => {
                return reject(err);
            });
        });
    }

     getAllTrashNotes(getAllNotesData) {
        return new Promise((resolve, reject) => {
            noteModelClassObject.readNotes({
                user_Id: getAllNotesData.userId,
                isTrash: true
            })
            .then(data => {
                return resolve(data);
            })
            .catch(err => {
                return reject(err);
            });
        });
    }

    getAllArchiveNotes(getAllNotesData) {
        return new Promise((resolve, reject) => {
            noteModelClassObject.readNotes({
                user_Id: getAllNotesData.userId,
                isArchive: true
            })
            .then(data => {
                return resolve(data);
            })
            .catch(err => {
                return reject(err);
            });
        });
    }
   
} 

module.exports = new NoteServiceClass();