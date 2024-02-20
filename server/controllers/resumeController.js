
const Resume = require('../models/resume')

const jwt = require('jsonwebtoken');

const createResume = async(req,res)=>{
    const {token} = req.cookies
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,{},async(err,user)=>{
            if(err) throw err;
            
            const projects = req.cookies.checkedProjects.split(',')
            const education = req.cookies.checkedEducation
            const jobs = req.cookies.checkedJobs.split(',')
            userEmail = user.email 

            const resume = await Resume.create({
                userEmail:user.email,
                resumeCategory: req.body.category,
                Education: education,
                Jobs: jobs,
                Projects: projects

            })
            res.json(resume)
            
        
            
        })
        
    }
    else{
        res.json(null)
    }
}

   
module.exports={
    createResume
}