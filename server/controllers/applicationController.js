const Application = require('../models/application');
const ObjectId = require('mongodb').ObjectId;
const jwt = require('jsonwebtoken');
const createApplication = async(req,res)=>{
    const {token} = req.cookies
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,{},async(err,user)=>{
            const userEmail = user.email
            if(err) throw err;
            const {jobTitle,jobDescription} = req.body;
            const application = await Application.create({
                userEmail: userEmail,
                resumeID:req.cookies.pickedResume,
                jobTitle:jobTitle,
                jobDescription:jobDescription
            })
        })
        
    }
    else{
        res.json(null)
    }
}

const getApplications = async(req,res)=>{
    const {token} = req.cookies
   
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,{},async(err,user)=>{
            const userEmail = user.email
            if(err) throw err;
            const applications = await Application.find({userEmail:userEmail,resumeID:req.params.id})
            res.json(applications)
        })
        
    }
    else{
        res.json(null)
    }
}



module.exports={
    createApplication,
    getApplications
}