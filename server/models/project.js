const mongoose = require('mongoose');
const {Schema} = mongoose;

const projectSchema = new Schema({
    userEmail: String,
    projectCategory: String,
    projectTitle:String,
    projectSubtitle:String,
    projectDescription: [String]
});
const ProjectModel  = mongoose.model('Project',projectSchema);
module.exports = ProjectModel;