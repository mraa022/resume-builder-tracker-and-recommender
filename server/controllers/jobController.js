const Job = require('../models/job');
const jwt = require('jsonwebtoken');


const addJob = async(req,res)=>{
    const {jobTitle,companyName,city,country,jobResponsibilities,jobCategory} = req.body
    
    const startDate = req.body.startDate
    const endDate = req.body.endDate
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


   
module.exports={
    addJob,
    allJobs,
    jobCategories,
}