const mongoose = require('mongoose');
const {Schema} = mongoose;

const applicationSchema = new Schema({
    userEmail: String,
    resumeID: String,
    jobTitle: String,
    jobDescription: String
 
});
const ApplicationModel  = mongoose.model('Application',applicationSchema);
module.exports = ApplicationModel;



