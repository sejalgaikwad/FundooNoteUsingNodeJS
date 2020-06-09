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

} 

module.exports = new LabelServiceClass();