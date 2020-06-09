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
            noteModelClassObject
            .updateNote(idData, updateData)
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