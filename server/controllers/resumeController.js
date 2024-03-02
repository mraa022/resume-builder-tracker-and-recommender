
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
            if(resume_type=='all' || !resume_type){
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

const createHeader = (resume)=>{
    const header = `<div><div id="resumeHeaderId" style="width: 100%; padding: 15.4708mm 16mm 7.67908mm; background-color: rgb(84, 39, 39); line-height: 16px; font-size: 9.5pt; white-space: pre-wrap; border: none; backface-visibility: hidden;"><div style="width: 100%; display: flex; flex-direction: column; align-items: center;"><style> imageContainer img { width: 100%; height: auto; } </style><div style="width: 0px; max-width: 0px; height: 0px; max-height: 0px; padding-top: 0px; padding-bottom: 0px;"><div class="imageContainer" style="width: 130px;"></div></div><div style="width: 100%;"><div style="width: 100%; color: rgb(255, 255, 255); display: flex; flex-direction: column; align-items: center; text-align: center; padding-bottom: 0.436em;"><span class="name" style="font-weight: 700; font-size: 18pt; letter-spacing: inherit; font-family: inherit; line-height: 27px;">Adnan Badri</span></div><div style="width: 100%; display: flex; justify-content: center; align-items: center;"><div style="width: 100%;"><div style="width: 100%; display: flex; flex-wrap: wrap; justify-content: center; text-align: center;"><a href="mailto:adnanbadri99@gmail.com" target="_blank" class="detailsItem" rel="noopener noreferrer" style="display: flex; min-width: 0px; padding-bottom: 0.61em; overflow-wrap: break-word; align-items: stretch; text-decoration: none; color: rgb(255, 255, 255); margin-left: 43px; margin-right: 0px; background-color: transparent;"><span style="width: 1em; min-width: 1em; height: 16px; margin-right: 0.455em;"><style> .ddfcbdfbbedisplayEmailIcon svg { width: 100%; height: auto; fill: #ffffff; } </style><span class="ddfcbdfbbedisplayEmailIcon" style="display: flex; justify-content: center; align-items: center; height: 16px; padding-bottom: 1px; margin-top: 0.06em; color: rgb(255, 255, 255);"><svg xmlns="" viewBox="0 0 36 36"><title>Email icon</title><path d="M32.33 6a2 2 0 00-.41 0h-28a2 2 0 00-.53.08l14.45 14.39z" class="clr-i-solid clr-i-solid-path-1"></path><path d="M33.81 7.39l-14.56 14.5a2 2 0 01-2.82 0L2 7.5a2 2 0 00-.07.5v20a2 2 0 002 2h28a2 2 0 002-2V8a2 2 0 00-.12-.61zM5.3 28H3.91v-1.43l7.27-7.21 1.41 1.41zm26.61 0h-1.4l-7.29-7.23 1.41-1.41 7.27 7.21z" class="clr-i-solid clr-i-solid-path-2"></path><path fill="none" d="M0 0h36v36H0z"></path></svg></span></span><span>${resume.education.userEmail}</span></a><span class="spacer" style="width: 1em; display: block; margin-left: 0px; margin-right: 0px; visibility: visible;"><span style="color: rgb(255, 255, 255); display: flex; justify-content: center; align-items: center; height: 16px; padding-top: 1px;"></span></span><a href="tel:2266001966" target="_blank" class="detailsItem" rel="noopener noreferrer" style="display: flex; min-width: 0px; padding-bottom: 0.61em; overflow-wrap: break-word; align-items: stretch; text-decoration: none; color: rgb(255, 255, 255); margin-left: 0px; margin-right: 0px; background-color: transparent;"><span style="width: 1em; min-width: 1em; height: 16px; margin-right: 0.455em;"><style> .ddfcbdfbbephoneIcon svg { width: 100%; height: auto; fill: #ffffff; } </style><span class="ddfcbdfbbephoneIcon" style="display: flex; justify-content: center; align-items: center; height: 16px; padding-bottom: 1px; margin-top: 0.06em; color: rgb(255, 255, 255);"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><title>Phone </title><path d="M15.22 20.64a20.37 20.37 0 007.4 4.79l3.77-3a.67.67 0 01.76 0l7 4.51a2 2 0 01.33 3.18l-3.28 3.24a4 4 0 01-3.63 1.07 35.09 35.09 0 01-17.15-9A33.79 33.79 0 011.15 8.6a3.78 3.78 0 011.1-3.55l3.4-3.28a2 2 0 013.12.32L13.43 9a.63.63 0 010 .75l-3.07 3.69a19.75 19.75 0 004.86 7.2z"></path><path fill="none" d="M0 0h36v36H0z"></path></svg></span></span><span>2266001966</span></a><span class="spacer" style="width: 1em; display: block; margin-left: 0px; margin-right: 0px; visibility: visible;"><span style="color: rgb(255, 255, 255); display: flex; justify-content: center; align-items: center; height: 16px; padding-top: 1px;"></span></span><div class="detailsItem" style="display: flex; min-width: 0px; padding-bottom: 0.61em; overflow-wrap: break-word; align-items: stretch; text-decoration: none; color: rgb(255, 255, 255); margin-left: 0px; margin-right: 0px; background-color: transparent;"><span style="width: 1em; min-width: 1em; height: 16px; margin-right: 0.455em;"><style> .ddfcbdfbbelinkedInIcon svg { width: 100%; height: auto; fill: #ffffff; } </style><span class="ddfcbdfbbelinkedInIcon" style="display: flex; justify-content: center; align-items: center; height: 16px; padding-bottom: 1px; margin-top: 0.02em; color: rgb(255, 255, 255);"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"> <path d="M6.348 21H2V8.045h4.348V21zM4.176 6.318c-.576 0-1.13-.226-1.538-.63a2.152 2.152 0 01-.003-3.054A2.181 2.181 0 015.71 2.63a2.152 2.152 0 01.003 3.053c-.408.406-.96.634-1.537.634zM22 21h-4.18v-6.305c0-1.503-.029-3.436-2.173-3.436-2.176 0-2.511 1.637-2.511 3.327V21h-4.18V8.036h4.011v1.77h.06c.556-1.019 1.92-2.093 3.956-2.093 4.234 0 5.017 2.686 5.017 6.177V21z"></path></svg></span></span><span>https://www.linkedin.com/in/adnan-badri-901426215/</span></div><span class="spacer" style="width: 43px; display: block; margin-left: 0px; margin-right: 0px; visibility: hidden;"><span style="color: rgb(255, 255, 255); display: flex; justify-content: center; align-items: center; height: 16px; padding-top: 1px;"></span></span></div></div></div></div></div></div></div>`
    return header
}

const createEducation = (resume)=>{
    return `<div id="educationHeading" style="width: 100%;"><div style="display: flex; align-items: center; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; font-size: 10.5pt; line-height: 18px; color: rgb(84, 39, 39);"><div style="width: 100%; display: flex; align-items: center; border-bottom: 2px solid rgb(84, 39, 39); margin-bottom: 0.6032em;"><div style="margin-left: 0px; margin-bottom: 0.15em;"></div>Education</div></div></div> <div style="width: 100%; display: flex; line-height: 16px;"><div style="width: 79%;"><div style="width: 100%; font-size: 9.5pt; line-height: 16px; padding-bottom: 0px; color: rgb(0, 0, 0);"><span class="title" style="font-weight: bold; display: inline-block; white-space: pre-wrap;">${resume.education.degree}</span> <span class="subTitle" style="font-weight: normal; font-style: italic; display: inline;"><span class="subTitle" style="white-space: pre-wrap; display: inline-block;">${resume.education.school} </span></div></div><div style="width: 21%; padding-left: 1em;"><span style="display: flex; flex-flow: column wrap; align-items: flex-end; line-height: 16px; font-size: 9.5pt;"><span color="#000000" style="color: rgb(0, 0, 0); font-variant-ligatures: normal; text-align: right;">${resume.education.startDate} – ${resume.education.endDate}</span><span style="text-align: right;"><span>${resume.education.city},</span><span> ${resume.education.country}</span></span></span></div></div> <div id="educationBottomSpace" style="width: 100%;"><div style="height: 17px;"></div></div>`
}

const createWorkExperienceTitle=()=>{
    return '<div id="workHeading" style="width: 100%;"><div style="display: flex; align-items: center; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; font-size: 10.5pt; line-height: 18px; color: rgb(84, 39, 39);"><div style="width: 100%; display: flex; align-items: center; border-bottom: 2px solid rgb(84, 39, 39); margin-bottom: 0.6032em;"><div style="margin-left: 0px; margin-bottom: 0.15em;"></div>Professional Experience</div></div></div>'

}

const createJobResponsibility = (job_responsibility)=>{
    const responsibility = `<li style="display: flex; white-space: pre-wrap;"><div style="padding-left: 1px; width: 0.9em; min-width: 0.9em; display: flex; align-items: center; height: 16px;"><svg viewBox="0 0 20 20" version="1.1" preserveAspectRatio="xMidYMid meet" width="4px" height="4px"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><circle fill="#000000" fill-opacity="1" fill-rule="nonzero" cx="10" cy="10" r="10"></circle></g></svg></div><span style="display: inline-block;"><span style="font-size: 1px; color: white; width: 0px; max-width: 0px; min-width: 0px; height: 0px; max-height: 0px; min-height: 0px; display: inline-block;">•</span>${job_responsibility}</span></li>`
    return responsibility
}

const createJob = (job)=>{
    const responsibilities = job.jobResponsibilities.map(createJobResponsibility).join('')
    return `<div id="xnPowLRCYfCzeFHYUyalJ" style="width: 100%;"> <div style="width: 100%; word-break: break-word;"> <div style="width: 100%; display: flex; line-height: 16px;"> <div style="width: 79%;"> <div style="width: 100%; font-size: 9.5pt; line-height: 16px; padding-bottom: 0px; color: rgb(0, 0, 0);"><span class="title" style="font-weight: bold; display: inline-block; white-space: pre-wrap;">${job.jobTitle} </span><span class="subTitle" style="font-weight: normal; font-style: italic; display: inline;"><span class="subTitle" style="white-space: pre-wrap; display: inline-block;">${job.companyName}</span></span></div> <div style="width: 100%; white-space: pre-wrap; line-height: 16px; word-break: break-word;">${responsibilities}</div></div><div style="width: 21%; padding-left: 1em;"><span style="display: flex; flex-flow: column wrap; align-items: flex-end; line-height: 16px; font-size: 9.5pt;"><span color="#000000" style="color: rgb(0, 0, 0); font-variant-ligatures: normal; text-align: right;">${job.startDate} – ${job.endDate}</span><span style="text-align: right;"><span>${job.city},</span><span> ${job.country}</span></span></span></div></div></div></div>`

}

const createJobs = (jobs)=>{
    return jobs.map(createJob).join('')

}


const createProjectTitle = ()=>{
    return '<div id="educationBottomSpace" style="width: 100%;"><div style="height: 17px;"></div></div><div style="display: flex; align-items: center; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px; font-size: 10.5pt; line-height: 18px; color: rgb(84, 39, 39);"><div style="width: 100%; display: flex; align-items: center; border-bottom: 2px solid rgb(84, 39, 39); margin-bottom: 0.6032em;"><div style="margin-left: 0px; margin-bottom: 0.15em;"></div>Projects</div></div>'
}

const createProjectResponsibility=(project_responsibility)=>{
    return `<li style="display: flex; white-space: pre-wrap;"><div style="padding-left: 1px; width: 0.9em; min-width: 0.9em; display: flex; align-items: center; height: 16px;"><svg viewBox="0 0 20 20" version="1.1" preserveAspectRatio="xMidYMid meet" width="4px" height="4px"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><circle fill="#000000" fill-opacity="1" fill-rule="nonzero" cx="10" cy="10" r="10"></circle></g></svg></div><span style="display: inline-block;"><span style="font-size: 1px; color: white; width: 0px; max-width: 0px; min-width: 0px; height: 0px; max-height: 0px; min-height: 0px; display: inline-block;">•</span>${project_responsibility}.</span></li>`
}

const createProject=(project)=>{
    const responsibilities = project.projectDescription.map(createProjectResponsibility).join('')
    return `<div style="width: 100%;"><a href="https://github.com/mraa022/tic-tac-toe-IRL-algorithm" target="_blank" rel="noopener noreferrer" style="display: inline-block; width: 100%; font-size: 9.5pt; line-height: 16px; padding-bottom: 0px; color: rgb(0, 0, 0);"><span class="title" style="font-weight: bold; display: inline-block; white-space: pre-wrap;">${project.projectTitle} </span><span class="title" style="font-weight: bold; display: inline-block; white-space: pre-wrap;">trainer, </span><span class="subTitle" style="font-weight: normal; font-style: italic; display: inline;"><span class="subTitle" style="white-space: pre-wrap; display: inline-block;">${project.projectSubtitle}<span style="vertical-align: baseline; padding-left: 0.4em; padding-right: 0.2em;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" style="display: inline-block; vertical-align: middle; fill: rgb(0, 0, 0); width: 0.7em; height: 0.7em; padding-bottom: 0.05em;"><path d="M27 33H5a2 2 0 01-2-2V9a2 2 0 012-2h10v2H5v22h22V21h2v10a2 2 0 01-2 2z"></path><path d="M18 3a1 1 0 000 2h11.59L15.74 18.85a1 1 0 101.41 1.41L31 6.41V18a1 1 0 002 0V3z"></path><path fill="none" d="M0 0h36v36H0z"></path></svg></span></span></span></a><div style="width: 100%; white-space: pre-wrap; line-height: 16px; word-break: break-word;">${responsibilities}</div></div>`
}

const createProjects = (projects)=>{
    return projects.map(createProject).join('')

}


const resumePreview = async(req,res)=>{
    const {token} = req.cookies
    const resume_type = req.query.type;
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,{},async(err,user)=>{
            if(err) throw err;
            var resumes = null;
            if(resume_type=='all' || !resume_type){
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
            var resumesHTML = []
            for (let i = 0; i < resumes.length; i++){
                const resume = result[i]
                resumesHTML.push(createHeader(resume)+createEducation(resume)+createWorkExperienceTitle()+createJobs(resume.jobs)+createProjectTitle()+createProjects(resume.projects))
                
            }
            res.send(resumesHTML);
        })
        
    }
    else{
        res.json(null)
    }
}

module.exports={
    createResume,
    resumeCategory,
    resumesList,
    resumePreview
}