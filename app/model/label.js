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
var LabelModel =  mongoose.model('Label', labelSchema); 

class LabelModelClass{
    createLabel(labelData){
        let newLabel=new LabelModel({
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

    updateLabel(idData, updateData) {  
        return new Promise((resolve, reject) => {
            LabelModel.findOneAndUpdate(idData,updateData,{ new: true })
            .then(data => {
                if (data != null) {
                    return resolve(data);
                } else {
                    return reject("invalid NoteId");
                }
            })
            .catch(err => {
               return reject(err);
            });
        });
    }

    deleteLabel(deleteData) {
        return new Promise((resolve, reject) => {
          LabelModel
            .findOneAndRemove(deleteData)
            .then(data => {
              if (data != null) {
                return resolve(data);
              } else if (data == null) {
                return reject(data);
              }
            })
            .catch(err => {
              return reject(err);
            });
        });
      }

    getallLabels() {
        return new Promise((resolve, reject) => {
            LabelModel.find()
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
    