import {useContext} from 'react';
import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Resume from '../../components/Resume/Resume';
import {UserContext} from '../../../context/userContext'
import '../../../styles/navbar.css'
import '../../../styles/resumes_style.css'
import { useNavigate } from 'react-router'
import html2pdf from 'html2pdf.js';
import { saveAs } from 'file-saver';


function downloadResume(resume) {
    // Assume 'resume' contains the HTML content
    const element = document.createElement('div');
    element.innerHTML = resume;
  
    // Convert HTML to PDF with A4 landscape paper size
    html2pdf()
      .from(element)
      .set({
        filename: 'resume.pdf',
        pagebreak: { mode: 'avoid-all', before: '.page-break' },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
      })
      .save()
      .then(() => {
        console.log('PDF downloaded successfully');
      })
      .catch((error) => {
        console.error('Error downloading PDF:', error);
      });
  }


export default function ResumesList() {

    const [resumes, setResume] = useState(null);
    const { user } = useContext(UserContext);
    const [resumeType,setResumeType] = useState('all'); // used to keep track of the resume category user wants 
    const [resumeCategories,setResumeCategory] = useState(null); // used to get all available resume categories
    const navigate = useNavigate();
    useEffect(() => {
        
        if (user){
            axios.get('/resume/resumeHtml/?'+'type='+resumeType).then(({data})=>{
                setResume(data)
            });
            axios.get('/resume/all_resume_categories').then(({data})=>{
                
                setResumeCategory(data)
            })
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
    
                return (
                    <div>
                        <Resume key = {resume._id} resume={resume}/>
                        <button onClick={e=>{
                            navigate('/application_list', {state: {resumeID: resume._id}})
                            console.log("RESUME, ", resume._id, " clicked" )
                        }}>Stats</button>
                        <button onClick={e=>{
                            // open new window
                            var newWindow = window.open();
                            newWindow.document.write(resume);
                            var element = document.createElement('a');
                            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(resume));
                            element.setAttribute('download', "resume.html");
                            element.style.display = 'none';
                            element.click();

                        }}>View in new window & Download</button>
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
