import {useContext} from 'react';
import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Project from '../components/Project/Project';
import {UserContext} from '../../context/userContext'
import '../../styles/projects_style.css'
import Cookies from 'js-cookie'; // Import js-cookie
import {useNavigate} from 'react-router-dom'
const getProjects = async()=>{
    return await axios.get('/all_projects')
}

function createProject(project,isChecked, toggleCheckbox){

    
    return (
        <div className="job-wrapper">
        <Project key = {project._id} projectTitle = {project.projectTitle} projectSubtitle = {project.projectSubtitle} projectDescription = {project.projectDescription}/>
        <label className="checkbox-container">
          <input type="checkbox" className="checkbox" 
          checked={isChecked} 
          onChange={() => toggleCheckbox(project._id)}/>
          <span className="checkmark"></span>
        </label>
      </div>
    );
        
    
        
}

export default function PickProjects() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState(null); // used to get a list of projects from database

    const [projectType,setProjectType] = useState('all'); // used to keep track of the project category user wants 

    const [projectCategories,setProjectCategories] = useState(null); // used to get all available project categories

    const { user } = useContext(UserContext);
    const [checkedProjects, setcheckedProjects] = useState([]);
    const [dictCheckedProjects, setDictCheckedProjects] = useState({}); // State to track checked jobs (used to reset on new job category)


    const toggleCheckbox = (projectId) => {
        
        if (checkedProjects.includes(projectId)) {
            // Remove projectId if already present in the array
            setcheckedProjects(prevState => prevState.filter(id => id !== projectId));
          } else {
            // Add  projectId to the end of the array
            setcheckedProjects(prevState => [...prevState, projectId]);
          }

          setDictCheckedProjects(prevState => ({
            ...prevState,
            [projectId]: !prevState[projectId]
            }));
        
        
      };

    useEffect(() => {
        
        if (user){
            
            axios.get('/all_projects/?'+'type='+projectType).then(({data})=>{
                setProjects(data)
            });
            axios.get('/all_categories').then(({data})=>{
                
                setProjectCategories(data)
            })

        }
        
    }, [user]); 

    useEffect(() => {
        if (projects) {
          const initialCheckedProjects = projects.reduce((acc, project) => {
            acc[project._id] = false; // Set each project's initial state to unchecked
            return acc;
          }, {});
          setDictCheckedProjects(initialCheckedProjects);
        }
      }, [projects,user]);


    useEffect(()=>{
        axios.get('/all_projects/?'+'type='+projectType).then(({data})=>{
            setProjects(data)
        });
        setcheckedProjects([]);
    },[projectType])

    if (projects && projectCategories){
        return (
            <div>
                <h1>Select projects</h1>
                <label>Choose Project category to search by</label>
                <select value={projectType} onChange={event=>{setProjectType(event.target.value)}}>
                    <option>all</option>
                    {projectCategories.map((category)=>{
                        return <option>{category}</option>
                    })}
                    
                </select>
            <div className='projects'>
              
              {projects.map(project => (
                createProject(project, dictCheckedProjects[project._id], toggleCheckbox)))}
              
            </div>
            <button onClick={e=>{
                console.log(checkedProjects);
                Cookies.set('checkedProjects', checkedProjects);
                navigate('/pick_education');
            }}>SUBMIT</button>

            </div>
            
          )
    }
    else{
        <div>
              
              <h1>No Projects to select. first add a project</h1>
              
            </div>
    }
  
}
