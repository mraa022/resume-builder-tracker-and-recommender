import {useContext} from 'react';
import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Project from '../../components/Project/Project';
import {UserContext} from '../../../context/userContext'
import '../../../styles/projects_style.css'
function createProject(project){
    return <Project key = {project._id} projectTitle = {project.projectTitle} projectSubtitle = {project.projectSubtitle} projectDescription = {project.projectDescription}/>
}
const getProjects = async()=>{
    return await axios.get('/project/all_projects')
}

export default function ProjectsList() {

    const [projects, setProjects] = useState(null); // used to get a list of projects from database

    const [projectType,setProjectType] = useState('all'); // used to keep track of the project category user wants 

    const [projectCategories,setProjectCategories] = useState(null); // used to get all available project categories

    const { user } = useContext(UserContext);

    useEffect(() => {
        
        if (user){
            
            axios.get('/project/all_projects/?'+'type='+projectType).then(({data})=>{
                setProjects(data)
            });
            axios.get('/project/all_categories').then(({data})=>{
                
                setProjectCategories(data)
            })

        }
        
    }, [user]); 


    useEffect(()=>{
        axios.get('/project/all_projects/?'+'type='+projectType).then(({data})=>{
            setProjects(data)
        });
    },[projectType])

    if (projects && projectCategories){
        return (
            <div>
                <h1>Projects list</h1>
                <label>Choose Project category to search by</label>
                <select value={projectType} onChange={event=>{setProjectType(event.target.value)}}>
                    <option>all</option>
                    {projectCategories.map((category)=>{
                        return <option>{category}</option>
                    })}
                    
                </select>
            <div className='projects'>
              
              {projects.map(createProject)}
              
            </div>
            </div>
            
          )
    }
    else{
        <div>
              <h1>Projects List</h1>
              <h2>No Projects</h2>
              
            </div>
    }
  
}
