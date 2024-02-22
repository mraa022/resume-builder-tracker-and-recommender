import {useContext} from 'react';
import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Resume from '../../components/Resume/Resume';
import {UserContext} from '../../../context/userContext'
import '../../../styles/navbar.css'
import '../../../styles/resumes_style.css'
import { useNavigate } from 'react-router'

function createResume(resume){
    const job_names = resume.jobs.map(job=>job.jobTitle)
    
    return (
        <div>
            <Resume key = {resume._id} job_names={job_names}/>
            <button onClick={e=>{
                
                console.log("RESUME, ", resume._id, " clicked" )
            }}>Stats</button>
        </div>
    )

}
export default function ResumesList() {

    const [resumes, setResume] = useState(null);
    const { user } = useContext(UserContext);
    const [resumeType,setResumeType] = useState('all'); // used to keep track of the resume category user wants 
    const [resumeCategories,setResumeCategory] = useState(null); // used to get all available resume categories
    const navigate = useNavigate();
    useEffect(() => {
        
        if (user){
            axios.get('/resume/all_resumes/?'+'type='+resumeType).then(({data})=>{
                setResume(data)
            });
            axios.get('/resume/all_resume_categories').then(({data})=>{
                
                setResumeCategory(data)
            })
        }
        
        
    }, [user]); 

    useEffect(()=>{
        axios.get('/resume/all_resumes/?'+'type='+resumeType).then(({data})=>{
            setResume(data)
        });
    },[resumeType]);


    if (resumes && resumeCategories){
        return (
            <div>
                <h1>Resumes list</h1>
                <label>Choose resume category to search by</label>
                <select value={resumeType} onChange={event=>{setResumeType(event.target.value)}}>
                    <option>all</option>
                    {resumeCategories.map((category,index)=>{
                        return <option key={index}>{category}</option>
                    })}
                    
                </select>
            <div className='resumes'>
              
              
              {resumes.map((resume) => {
                const job_names = resume.jobs.map(job=>job.jobTitle)
    
                return (
                    <div>
                        <Resume key = {resume._id} job_names={job_names}/>
                        <button onClick={e=>{
                            navigate('/application_list', {state: {resumeID: resume._id}})
                            console.log("RESUME, ", resume._id, " clicked" )
                        }}>Stats</button>
                    </div>
                )
                
              })}
            </div>
            </div>
            
          )
    }
    else{
        <div>
              <h1>Resumes list</h1>
              <h2>No Resumes</h2>
              
            </div>
    }
  
}
