const mongoose = require('mongoose');
const {Schema} = mongoose;

const educationSchema = new Schema({
    userEmail: String,
    degree: String,
    school: String,
    city: String,
    country: String,
    startDate: String,
    endDate: String
 
});
const EducationModel  = mongoose.model('Education',educationSchema);
module.exports = EducationModel;



