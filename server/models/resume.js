const mongoose = require('mongoose');
const {Schema} = mongoose;

const resumeSchema = new Schema({
    userEmail:String,
    resumeCategory: String,
    Education: String,
    Jobs: [String],
    Projects: [String]
});
const ResumeModel  = mongoose.model('Resume',resumeSchema);
module.exports = ResumeModel;