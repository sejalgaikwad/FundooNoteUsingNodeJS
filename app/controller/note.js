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
}    

module.exports = new NoteControllerClass();