const noteServiceClassObject = require('../service/note')

class NoteControllerClass {

    createNote(req, res) {  
        req.checkBody("title", "title should not be empty.").notEmpty();
        req.checkBody("description", "description should not be empty.").notEmpty();
        let errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.success = false;
            response.error = errors;
            return res.status(400).send(response);
        } else {
            const noteData = {};
            noteData.user_Id = req.decoded._id;
            noteData.title = req.body.title;
            noteData.description = req.body.description;

            noteServiceClassObject.createNote(noteData)
            .then(data => {
                response.success = true;
                response.message = "Note Successfully created";
                response.data=data;
                return res.status(200).send(response);
            })
            .catch(err => {
                response.success = false;
                response.message = "Error while creating Note";
                response.error = err;
                return res.status(400).send(response);
            });
        }
    }

    updateNote(req, res) {
        const response = {};
        const idData = {};
        const updateData = {};
        idData._id = req.params.noteId;  
        if (req.body.title !== undefined) {
            updateData.title = req.body.title;
        }
        if (req.body.description !== undefined) {
            updateData.description = req.body.description;
        }
        if (req.body.isArchive == "true" ) {
          updateData.isPinned = false;
          updateData.isArchive = true;
          updateData.isTrash = false;           
        }
        if (req.body.isPinned == "true" ) {
          updateData.isPinned = true;
          updateData.isArchive = false;
          updateData.isTrash = false;   
        }
        if (req.body.isTrash == "true" ) {
          updateData.isPinned = false;
          updateData.isArchive = false;
          updateData.isTrash = true;    
        }
        if (req.body.color !== undefined) {
          updateData.color = req.body.color;
        }

        noteServiceClassObject.updateNote(idData, updateData)    
        .then(data => {
            response.success = true;
            response.message = "Note Successfully Updated";
            response.data = data;
            return res.status(200).send(response);
        })
        .catch(err => {
            response.success = false;
            response.error = err;
            return res.status(400).send(response);
        });
    }

    addReminder(req, res) {
        const reminderData = {};
        reminderData.noteId = req.params.noteId;
        reminderData.remainder = req.body.remainder;
        const response = {};
        noteServiceClassObject.addReminder(reminderData)
        .then(data => {
            response.success = true;
            response.message = "reminder Added successfully";
            response.data = data;
            return res.status(200).send(response);
        })
        .catch(err => {
            response.success = false;
            response.error = err;
            return res.status(400).send(response);
        });
    }
     
    removeReminder(req, res) {
        const reminderData = {};
        reminderData.noteId = req.params.noteId;
        reminderData.userId = req.decoded._id;
        const response = {};
        noteServiceClassObject.removeReminder(reminderData)
        .then(data => {
            response.success = true;
            response.message = "reminder Deleted successfully";
            response.data = data;
            return res.status(200).send(response);
        })
        .catch(err => {
            response.success = false;
            response.error = "Error while deleting";
            response.data = err;
            return res.status(400).send(response);
        });
    }      

    getAllNotes(req, res) {
        const getAllNotesData = {};
        const response = {}
        getAllNotesData.userId = req.decoded._id;
        noteServiceClassObject.getAllNotes(getAllNotesData)
        .then(data => {
            response.success = true;
            response.data = data;
            return res.status(200).send(response);
        })
        .catch(err => {
          response.success = false;
          response.error = err;
          return res.status(400).send(response);
        });
    }

    getAllTrashNotes(req, res) {
        const getAllNotesData = {};
        const response = {}
        getAllNotesData.userId = req.decoded._id;
        noteServiceClassObject.getAllTrashNotes(getAllNotesData)
        .then(data => {
            response.success = true;
            response.data = data;
            return res.status(200).send(response);
        })
        .catch(err => {
          response.success = false;
          response.error = err;
          return res.status(400).send(response);
        });
    }

    getAllArchiveNotes(req, res) {
        const getAllNotesData = {};
        const response = {}
        getAllNotesData.userId = req.decoded._id;
        noteServiceClassObject.getAllArchiveNotes(getAllNotesData)
        .then(data => {
            response.success = true;
            response.data = data;
            return res.status(200).send(response);
        })
        .catch(err => {
          response.success = false;
          response.error = err;
          return res.status(400).send(response);
        });
    }

    search(req, res) {
        const response = {};
        const searchData = {};
        searchData.user_Id = req.decoded._id;
        searchData.searchKey = req.body.searchKey;
        noteServiceClassObject.search(searchData)
        .then(data => {
            if (data == null) {
                response.success = false;
                response.error = "Invalid UserId";
                return res.status(400).send(response);
            } else {
                response.success = true;
                response.data = data;
                return res.status(200).send(response);
            }
        })
        .catch(err => {
            response.success = false;
            response.error = err;
            return res.status(400).send(response);
        });
    }

    addCollaborator(req, res) {
        const response = {};
        const collaboratorData = {};
        collaboratorData.noteId = req.params.noteId;
        collaboratorData.collaboratorId = req.body.collaboratorId;
        collaboratorData.userId = req.decoded._id;
        noteServiceClassObject.addCollaborator(collaboratorData)
        .then(data => {
            response.success = true;
            response.message = "Note Collaborate successfully";
            response.data = data;
            return res.status(200).send(response);
        })
        .catch(err => {
            response.success = false;
            response.error = err;
            response.data = err;
            return res.status(400).send(response);
        });
    }

    removeCollaborator(req, res) {
        const response = {};
        const collaboratorData = {};
        collaboratorData.noteId = req.params.noteId;
        collaboratorData.collaboratorId = req.body.collaboratorId;
        collaboratorData.userId = req.decoded._id;
        noteServiceClassObject.removeCollaborator(collaboratorData)
        .then(data => {
            response.success = true;
            response.message = "Collaborate remove successfully form note";
            response.data = data;
            return res.status(200).send(response);
        })
        .catch(err => {
            response.success = false;
            response.error = err;
            response.data = err;
            return res.status(400).send(response);
        });
    }

    addLabel(req, res) {
        const response = {};
        const labelData = {};
        labelData.noteId = req.params.noteId;
        labelData.labelId = req.body.labelId;
        labelData.userId = req.decoded._id;
        noteServiceClassObject.addLabel(labelData)
        .then(data => {
            response.success = true;
            response.message = "Add Label on note successfully";
            response.data = data;
            return res.status(200).send(response);
        })
        .catch(err => {
            response.success = false;
            response.error = err;
            response.data = err;
            return res.status(400).send(response);
        });
    }

    removeLabel(req, res) {
        const response = {};
        const labelData = {};
        labelData.noteId = req.params.noteId;
        labelData.labelId = req.body.labelId;
        labelData.userId = req.decoded._id;
        noteServiceClassObject.removeLabel(labelData)
        .then(data => {
            response.success = true;
            response.message = "Remove label from note unsuccessfully";
            response.data = data;
            return res.status(200).send(response);
        })
        .catch(err => {
            response.success = false;
            response.error = err;
            response.data = err;
            return res.status(400).send(response);
        });
    }
}    

module.exports = new NoteControllerClass();