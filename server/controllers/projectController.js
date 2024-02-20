const Project = require('../models/Project');
const jwt = require('jsonwebtoken');

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


module.exports={
    addProject,
    allProjects,
    projectCategories,
}