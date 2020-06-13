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

  
    addRemainder(reminderData) {
        return new Promise((resolve, reject) => {
            noteModelClassObject.updateNote({ _id: reminderData.noteId },{ remainder: reminderData.remainder })
            .then(data => {
                return resolve(data);
            })
            .catch(err => {
                return reject(err);
            });
        });
    }
 
    removeRemainder(reminderData) {
        return new Promise((resolve, reject) => {
            noteModelClassObject.updateNote({ _id: reminderData.noteId }, { reminder: null })
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


    search(searchData) {
        return new Promise((resolve, reject) => {
            noteModelClassObject.search(searchData, {title: 1,description: 1})
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

    addCollaborator(collaboratorData) {
        return new Promise((resolve, reject) => {
            noteModelClassObject.updateNote({ _id: collaboratorData.noteId },
                                            { $push: { collaborator: collaboratorData.collaboratorId } })
            .then(data => {
                return resolve(data);
            })
            .catch(err => {
                return reject(err);
            });
        })
    } 

    removeCollaborator(collaboratorData) {
        return new Promise((resolve, reject) => {
            noteModelClassObject.updateNote({ _id: collaboratorData.noteId },
                                            { $pull: { collaborator: collaboratorData.collaboratorId } })
            .then(data => {
                return resolve(data);
            })
            .catch(err => {
                return reject(err);
            });
        })
    } 

    addLabel(labelData) {
        return new Promise((resolve, reject) => {
            noteModelClassObject.updateNote({ _id: labelData.noteId },
                                            { $push: { label: labelData.labelId } })
            .then(data => {
                return resolve(data);
            })
            .catch(err => {
                return reject(err);
            });
        })
    } 

    removeLabel(labelData) {
        return new Promise((resolve, reject) => {
            noteModelClassObject.updateNote({ _id: labelData.noteId },
                                            { $pull: { label: labelData.labelId } })
            .then(data => {
                return resolve(data);
            })
            .catch(err => {
                return reject(err);
            });
        })
    } 
}
module.exports = new NoteServiceClass();