import {useContext} from 'react';
import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Resume from '../../components/Resume/Resume';
import {useNavigate} from 'react-router-dom'
import {UserContext} from '../../../context/userContext'
import '../../../styles/resumes_style.css'
import '../../../styles/pick_resume_style.css'
import Cookies from 'js-cookie'; // Import js-cookie
function createResume(resume,selectedResume,setSelectedResume){

    console.log(resume)
    return (
        <div className='resume-wrapper'>
        <Resume key = {resume._id} resume={resume['resume_html']}/>
        <div className="radio-button">
        <label className="checkbox-container">
          <input
            type="radio"
            name="resumeRadio"
            value={resume['id']}
            checked={selectedResume == resume['id']}
            onChange={() => setSelectedResume(resume['id'])}
          />
          <span className="checkmark"></span>
        </label>
      </div>
      </div>
    );
}
export default function PickResume() {

    const [resumes, setResume] = useState(null);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [resumeType,setResumeType] = useState('all'); // used to keep track of the resume category user wants 
    const [resumeCategories,setResumeCategory] = useState(null); // used to get all available resume categories
    const [selectedResume,setSelectedResume] = useState('')
    useEffect(() => {
        
        if (user){
            axios.get('/resume/all_resumes/?'+'type='+resumeType).then(({data})=>{
                setResume(data)
            });
            axios.get('/resume/all_resume_categories').then(({data})=>{
                
                setResumeCategory(data)
            })
            console.log(resumes)
        }
        
        
    }, [user]); 

    useEffect(()=>{
        axios.get('/resume/resumeHtml/?'+'type='+resumeType).then(({data})=>{
            
            setResume(data)
        });
    },[resumeType]);

    if (resumes && resumeCategories){
        return (
            <div>
                <h1>Pick Resume</h1>
                <label>Choose resume category to search by</label>
                <select value={resumeType} onChange={event=>{setResumeType(event.target.value)}}>
                    <option key='j'>all</option>
                    {resumeCategories.map((category,index)=>{
                        return <option key={index}>{category}</option>
                    })}
                    
                </select>
            <div className='resumes'>
              
              {resumes.map(resume => (
                    createResume(resume, selectedResume,setSelectedResume)
                    ))}
            </div>
            <button onClick={e=>{
                
                Cookies.set('pickedResume', selectedResume);
                navigate('/job_info');
            }}>SUBMIT</button>
            </div>
            
          )
    }
    else{
        <div>
              
              <h2>No Resume to pick. Please first create a resume.</h2>
              
            </div>
    }
  
}
