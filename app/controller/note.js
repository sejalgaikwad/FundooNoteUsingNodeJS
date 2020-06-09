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
    
}    


module.exports = new NoteControllerClass();