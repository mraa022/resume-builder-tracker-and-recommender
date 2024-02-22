
const Resume = require('../models/resume')
const Job = require('../models/job');
const Education = require('../models/education');
const Project = require('../models/project');
const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectId;

const findJob = async(jobId)=>{
    const job = await Job.findById({_id:new ObjectId(jobId)})
    return job
}
const findEducation = async(educationId)=>{
    const education = await Education.findById({_id:new ObjectId(educationId)})
    return education
}
const findProject = async(projectId)=>{
    const project = await Project.findById({_id:new ObjectId(projectId)})
    return project

}


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



const resumeCategory = async(req,res)=>{
    const {token} = req.cookies
    
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,{},async(err,user)=>{
            if(err) throw err;
            const all_categories = await Resume.find({userEmail:user.email}).select({resumeCategory:1,_id:0})
            const all_categories_list = []
            all_categories.map(category_object=>{
                all_categories_list.push(category_object.resumeCategory)
            });
            res.json(all_categories_list)
        })
        
    }
    else{
        res.json(null)
    }
}




const resumesList = async(req,res)=>{
    const {token} = req.cookies
    const resume_type = req.query.type;
    
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,{},async(err,user)=>{
            if(err) throw err;
            var resumes = null;
            if(resume_type=='all'){
                resumes = await Resume.find({userEmail:user.email})
            }
            else{
                resumes = await Resume.find({userEmail:user.email,resumeCategory:resume_type})
            }
            result = []
            for (let i = 0; i < resumes.length; i++){
                const resume = resumes[i]
                const jobs = []
                const projects = []
                const education = await findEducation(resume.Education)
                for (let j = 0; j < resume.Jobs.length; j++){
                    const job = await findJob(resume.Jobs[j])
                    jobs.push(job)
                }
                for (let j = 0; j < resume.Projects.length; j++){
                    const project = await findProject(resume.Projects[j])
                    projects.push(project)
                }
                result.push({
                    _id: resume._id,
                    jobs: jobs,
                    projects: projects,
                    education: education
                })
            }
            res.json(result);
        })
        
    }
    else{
        res.json(null)
    }
}

   
module.exports={
    createResume,
    resumeCategory,
    resumesList
}