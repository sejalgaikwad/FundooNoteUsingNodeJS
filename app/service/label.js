let labelModelClassObject = require('../model/label')

class LabelServiceClass {
    
    createLabel(labelData) {        
        return new Promise((resolve, reject) => {
            labelModelClassObject.createLabel(labelData)
            .then(data => {
                return resolve(data);
            })
            .catch(err => {
                return reject(err);
            });
        });
    }
    
    updateLabel(idData, updateData) {
        return new Promise((resolve, reject) => {
            labelModelClassObject
            .updateLabel(idData, updateData)
            .then(data => {
                return resolve(data);
            })
            .catch(err => {
                return reject(err);
            });
        });
    }

    

    getAllLabels(getAllLabelData) {
        return new Promise((resolve, reject) => {
            labelModelClassObject.getallLabels()
            .then(data => {
              return resolve(data);
            })
            .catch(err => {
              return reject(err);
            });
        });
    }

    removeLabel(removeLabel) {
        return new Promise((resolve, reject) => {
          const deleteData = { _id: removeLabel.labelId };
          labelModelClassObject
            .deleteLabel(deleteData)
            .then(data => {
              return resolve(data);
            })
            .catch(err => {
              return reject(err);
            });
        });
      }
    

} 

module.exports = new LabelServiceClass();