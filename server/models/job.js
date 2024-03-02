const mongoose = require('mongoose');
const {Schema} = mongoose;

const jobSchema = new Schema({
    userEmail: String,
    jobCategory:String,
    jobTitle: String,
    companyName: String,
    startDate: String,
    endDate: String,
    city: String,
    country: String,
    jobResponsibilities: [String]
 
});
const JobModel  = mongoose.model('Job',jobSchema);
module.exports = JobModel;