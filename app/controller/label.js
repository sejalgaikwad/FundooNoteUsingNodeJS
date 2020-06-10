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

    updateLabel(req, res) {
        const response = {};
            const idData = {};
            const updateData = {};
            idData._id = req.params.labelId;           
            updateData.labelName = req.body.labelName;
        
            labelServiceClassObject
              .updateLabel(idData, updateData)
              .then(data => {
                response.success = true;
                response.message = "Label Successfully Updated";
                response.data = data;
                return res.status(200).send(response);
              })
              .catch(err => {
                response.success = false;
                response.error = err;
                return res.status(400).send(response);
            });
        }

        getAllLabels(req, res) {
            const getAllLabelData = {};
            const response = {};
            getAllLabelData.userId = req.decoded._id;
            labelServiceClassObject.getAllLabels(getAllLabelData)
              .then(data => {
                response.success = true;
                response.message='Get all Label data ';
                response.data = data;
                return res.status(200).send(response);
              })
              .catch(err => {
                response.success = false;
                response.error = err;
                return res.status(400).send(response);
              });
          }

          removeLabel(req, res) {
    
            var errors = req.validationErrors();
            var response = {};
            if (errors) {
              response.success = false;
              response.error = errors[0].msg;
              return res.status(400).send(response);
            } else {
              // logger.info('REquest in Controller'+req.body);
              const removeData = {};
              removeData.labelId = req.params.labelId;
              new Promise((resolve, reject) => {
                labelServiceClassObject
                  .removeLabel(removeData)
                  .then(data => {
                  
        
                    const response = {};
                    response.success = true;
                    response.message = "Label Successfully deleted";
                    // response.data=data;
                    resolve(data);
                    return res.status(200).send(response);
                  })
                  .catch(err => {
                  
        
                    const response = {};
                    response.success = false;
                    if (err == null) {
                      response.error = "Invalid labelId";
                    } else {
                      response.error = err;
                    }
                    reject(err);
        
                    // response.data=err;
                    return res.status(400).send(response);
                  });
              });
            }
          }
}    

module.exports = new LabelControllerClass();