import {useContext} from 'react';
import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Resume from '../../components/Resume/Resume';
import {UserContext} from '../../../context/userContext'
import { useNavigate } from 'react-router'
import html2pdf from 'html2pdf.js';
import { saveAs } from 'file-saver';



export default function RecommendResume() {

    const { user } = useContext(UserContext);
    const [resumeType,setResumeType] = useState('all'); // used to keep track of the resume category user wants 
    const [resumeCategories,setResumeCategory] = useState(null); // used to get all available resume categories
    const [jobDescription,setJobDescription] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        
        if (user){
           
            axios.get('/resume/all_resume_categories').then(({data})=>{
                
                setResumeCategory(data)
            })
        }
        
        
    }, [user]); 

    



    if (resumeCategories){
        return (
            <div>
                <label>Choose resume category to recommend from</label>
                <select value={resumeType} onChange={event=>{setResumeType(event.target.value)}}>
                    <option>all</option>
                    {resumeCategories.map((category,index)=>{
                        return <option key={index}>{category}</option>
                    })}
                    
                </select>
                <br />

                <label>Enter job descriptoin</label>
                <input value={jobDescription} onChange={(e)=>setJobDescription(e.target.value)} type='text' placeholder='enter job description...'></input>

                <br />
                <button onClick={()=>{
                    console.log("HI")
                    // axios.defaults.withCredentials = true
                     axios.post('/resume/recommend_resume/?'+'type='+resumeType,{jobDescription}).then(({data})=>{
                        navigate('/recommended_resumes', {state: {resumes: data}})
                    });

                    
                }}>Recommend</button>
            
            </div>
            
          )
    }
    else{
        <div>
              
              <h2>No Resumes to recommend</h2>
              
            </div>
    }
  
}
