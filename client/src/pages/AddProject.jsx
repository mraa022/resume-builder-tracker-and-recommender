import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import '../../styles/navbar.css'
export default function AddProject() {
  const navigate = useNavigate();
    const [data,setData] = useState({
        projectTitle: '',
        projectSubtitle: '',
        projectDescription: '',
        projectCategory: ''
    })
    const addProject = async(e)=>{
        e.preventDefault();
        const {projectTitle,projectSubtitle,projectCategory} = data;
        
        const projectDescription = data.projectDescription.split('\n')
        try{
            axios.defaults.withCredentials = true
            const {data} = await axios.post('/add_project',{
                projectCategory:projectCategory,
                projectTitle: projectTitle,
                projectSubtitle: projectSubtitle,
                projectDescription: projectDescription,
                withCredentials: true,
        headers: { crossDomain: true, 'Content-Type': 'application/json' }
            })
            if (data.error){
              toast.error(data.error)
            }
            else{
              setData({
                projectTitle: '',
                projectSubtitle: '',
                projectDescription: '',
                projectCategory:''
            });
              navigate('/all_projects')
              navigate(0)
  
            }
          }
          catch{
  
          }
        
    }
    
  return (
    <div>
      <form onSubmit={addProject}>
        
      
          <label>Project Category</label>
          <input value={data.projectCategory} onChange={(e)=>setData({...data, projectCategory:e.target.value})} type='text' placeholder='enter project category...'></input>
            <br/>
          <label>Project Title</label>
          <input value={data.projectTitle} onChange={(e)=>setData({...data, projectTitle:e.target.value})} type='text' placeholder='enter project title...'></input>
            <br/>

          <label>Project Subtitle</label>
          <input value={data.projectSubtitle} onChange={(e)=>setData({...data, projectSubtitle:e.target.value})} type='text' placeholder='enter project subtitle...'></input>
          <br/>
        
          <label>Project Description</label>
          <textarea  value={data.projectDescription} onChange={(e)=>setData({...data, projectDescription:e.target.value})} placeholder='enter project description'/>
          <br/>
          <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
