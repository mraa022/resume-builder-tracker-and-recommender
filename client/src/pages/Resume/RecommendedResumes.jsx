import React from 'react'
import {useLocation} from 'react-router-dom';
import Resume from '../../components/Resume/Resume';
import '../../../styles/resumes_style.css'
export default function RecommendedResumes() {
const location = useLocation();
const resumes = location.state.resumes;
  return (
    <div>
        <h1>Recommended resumes sorted in terms of relevence </h1>
      <div className='resumes'>
              
              
              {resumes.map((resume) => {
    
                return (
                    <div>
                        <Resume key = {resume._id} resume={resume['resume_html']}/>
                        <button onClick={e=>{
                            navigate('/application_list', {state: {resumeID: resume._id}})
                        }}>Stats</button>
                        <button onClick={e=>{
                            // open new window
                            var newWindow = window.open();
                            newWindow.document.write(resume['resume_html']);
                            var element = document.createElement('a');
                            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(resume['resume_html']));
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
