const labelServiceClassObject = require('../service/label')

class LabelControllerClass {

    createLabel(req, res) {  
        req.checkBody("labelName", "title should not be empty.").notEmpty();
        let errors = req.validationErrors();
        var response = {};
        if (errors) {
            response.success = false;
            response.error = errors;
            return res.status(400).send(response);
        } else {
            const labelData = {};
            labelData.user_Id = req.decoded._id;
            labelData.labelName = req.body.labelName;

            labelServiceClassObject.createLabel(labelData)
            .then(data => {
                response.success = true;
                response.message = "Label Successfully created";
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

module.exports = new LabelControllerClass();