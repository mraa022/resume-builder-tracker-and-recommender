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
                        
                    </div>
                )
                
              })}
            </div>
    </div>
  )
}
