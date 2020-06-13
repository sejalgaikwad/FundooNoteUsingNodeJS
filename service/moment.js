const noteModelClassObject = require('../app/model/notes.js');
const moment = require("moment");

class MomentClass {
    notificationServiceForRemainder() {
        var now = new Date();
        var dateStringWithTime = moment(now).format("YYYY-MM-DD h:mm:ss a");
        console.log("Todays Date and current Time :: ", dateStringWithTime);
        return new Promise((resolve, reject) => {
            noteModelClassObject.readNotes({ remainder: dateStringWithTime },
                                            { title: 1, description: 1 })
            .then(data => {
                if (data !== null) {
                    data.forEach(remainder => console.log("Reminder Note :: ", remainder));
                } else {
                    return reject(data);
                }
            })
            .catch(err => {
                return reject(err);
            });
        });
    }
}

module.exports = new MomentClass();
