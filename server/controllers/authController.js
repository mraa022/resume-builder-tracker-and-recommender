const User = require('../models/user');
const Job = require('../models/job');
const Project = require('../models/Project');
const Education = require('../models/education')
const Resume = require('../models/resume')
const {hashPassword, comparePasswords} = require('../helpers/auth')
const jwt = require('jsonwebtoken');
const test=(req,res)=>{
    res.json('test is working')
}


const registerUser = async(req,res)=>{
    try {
        const {name,email,password} = req.body
        if(!name){
            return res.json({
                error: 'name is required'
            })
        };

        if(!password || password.length<6){
            return res.json({
                error: 'password is required and should be at least 6 char long'
            })
        };

        const exist = await User.findOne({email});
        if (exist){
            return res.json({
                error: "Email already in use"
            })
        };
        

        // create user 
        const hashedPassword = await hashPassword(password)
        const user = await User.create({
            name,email,
            password: hashedPassword
        })
        return res.json(user)
    } catch (error) {
        console.log(error)
    }
}

//login
const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body
        // check if user exists 
        const user = await User.findOne({email})
        if (!user){
            return res.json({
                error: 'No user found'
            })  
        }
        // check password match
        const match = await comparePasswords(password,user.password)
        if (match){

            jwt.sign(
                { email: user.email, id: user._id, name: user.name },
                process.env.JWT_SECRET,
                {}, // Options object (you can include your options here)
                (err, token) => {
                  if (err) {
                    console.log(err);
                    // Handle the error here if needed
                  } else {
                    res.cookie('token', token).status(200).json({
                      success: true,
                      user,
                    });
                  }
                }
              );
        }
        else{
            return res.json({
                error: "passwords don't match"
            })
        }
        
    }
    catch(err){
        console.log(err)

    }
}

const getProfile = (req,res)=>{
    const {token} = req.cookies
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,{},(err,user)=>{
            if(err) throw err;
            res.json(user)
        })
    }
    else{
        res.json(null)
    }
}
const logOut = (req,res)=>{
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 5 * 1000),
        httpOnly: true,
    });
    res.status(200).json({ success: true, message: 'User logged out successfully' })
    
}

const addJob = async(req,res)=>{
    const {jobTitle,companyName,city,country,jobResponsibilities,jobCategory} = req.body
    const startDate = new Date(req.body.startDate)
    const endDate = new Date(req.body.endDate)
    const {token} = req.cookies
    
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,{},async(err,user)=>{
            if(err) throw err;
            const userEmail = user.email
            const job =  await Job.create({
                jobCategory:jobCategory,
                userEmail: userEmail,
                jobTitle: jobTitle,
                companyName: companyName,
                startDate: startDate,
                endDate: endDate,
                city: city,
                country: country,
                jobResponsibilities: jobResponsibilities
            })
            // console.log(job)
            res.json(job)
        })
        
    }
    else{
        res.json(null)
    }
}

const allJobs = async(req,res)=>{
    const {token} = req.cookies
    const job_type = req.query.type;
    
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,{},async(err,user)=>{
            if(err) throw err;
            if(job_type=='all'){
                const all_jobs = await Job.find({userEmail:user.email})
                res.json(all_jobs)
            }
            else{
                const all_jobs = await Job.find({userEmail:user.email,jobCategory:job_type})
                res.json(all_jobs)
            }
            
        })
        
    }
    else{
        res.json(null)
    }
}


const jobCategories = async(req,res)=>{
    const {token} = req.cookies
    
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,{},async(err,user)=>{
            if(err) throw err;
            const all_categories = await Job.find({userEmail:user.email}).select({jobCategory:1,_id:0})
            const all_categories_list = []
            all_categories.map(category_object=>{
                all_categories_list.push(category_object.jobCategory)
            });
            res.json(all_categories_list)
        })
        
    }
    else{
        res.json(null)
    }
}

// projects section 

const addProject = async(req,res)=>{
    const {token} = req.cookies
    
    // console.log(req.body)
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,{},async(err,user)=>{
            if(err) throw err;
            const {projectCategory,projectTitle,projectSubtitle,projectDescription} = req.body;
            const userEmail = user.email
            const project = await Project.create({
                projectCategory:projectCategory,
                userEmail:userEmail,
                projectTitle: projectTitle,
                projectSubtitle: projectSubtitle,
                projectDescription: projectDescription
            })
            res.json(project)
        })
        
    }
    else{
        res.json(null)
    }
}

const allProjects = async(req,res)=>{
    const {token} = req.cookies
    const project_type = req.query.type;
    
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,{},async(err,user)=>{
            if(err) throw err;
            if(project_type=='all'){
                const all_projects = await Project.find({userEmail:user.email})
                res.json(all_projects)
            }
            else{
                const all_projects = await Project.find({userEmail:user.email,projectCategory:project_type})
                res.json(all_projects)
            }
        
            
        })
        
    }
    else{
        res.json(null)
    }
}

const projectCategories = async(req,res)=>{
    const {token} = req.cookies
    
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,{},async(err,user)=>{
            if(err) throw err;
            const all_categories = await Project.find({userEmail:user.email}).select({projectCategory:1,_id:0})
            const all_categories_list = []
            all_categories.map(category_object=>{
                all_categories_list.push(category_object.projectCategory)
            });
            res.json(all_categories_list)
        })
        
    }
    else{
        res.json(null)
    }
}

const createEducation = async(req,res)=>{
    const {token} = req.cookies
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,{},async(err,user)=>{
            const userEmail = user.email
            if(err) throw err;
            const {degree,school,city,country,startDate,endDate} = req.body;
            const education = await Education.create({
                userEmail: userEmail,
                degree:degree,
                school:school,
                city:city,
                country:country,
                startDate:startDate,
                endDate:endDate
            })
            res.json(education) 
        })
        
    }
    else{
        res.json(null)
    }
}

const allEducation = async(req,res)=>{
    const {token} = req.cookies
    if(token){
        jwt.verify(token,process.env.JWT_SECRET,{},async(err,user)=>{
            if(err) throw err;
            
               
            const all_education = await Education.find({userEmail:user.email})
            res.json(all_education)
            
        
            
        })
        
    }
    else{
        res.json(null)
    }

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

   
module.exports={
    test,
    registerUser,
    loginUser,
    getProfile,
    logOut,
    addJob,
    allJobs,
    addProject,
    allProjects,
    projectCategories,
    jobCategories,
    createEducation,
    allEducation,
    createResume
}