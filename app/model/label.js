const mongoose = require('mongoose');
var schema = mongoose.Schema;

// defining the mongoose schema
var labelSchema = new schema({                                  
    labelName: {
        type: String,
        require: [true, "Label Name can't be Empty"],
        trim: true
    },
    user_Id : {
        type: schema.Types.ObjectId,
        ref: 'User',
    }
}, 
{
    timestamps: true
});
var labelModel =  mongoose.model('Label', labelSchema); 

class LabelModelClass{
    createLabel(labelData){
        let newLabel=new labelModel({
            labelName:labelData.labelName,
            user_Id:labelData.user_Id
        })
        return new Promise((resolve, reject) => {
            newLabel.save()
            .then(data => {
                return resolve(data);
            })
            .catch(err => {
                return reject(err);
            });
        });
    }
    
}
    
module.exports = new LabelModelClass();
    