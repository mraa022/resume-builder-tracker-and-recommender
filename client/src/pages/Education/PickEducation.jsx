
import {useContext} from 'react';
import React, { useState,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Education from '../../components/Education/Education';
import {UserContext} from '../../../context/userContext'
import '../../../styles/educations_style.css'
import '../../../styles/pick_education_style.css'
import Cookies from 'js-cookie'; // Import js-cookie
const getJobs = async()=>{
    return await axios.get('/education/all_jobs')
}


function createEducation(education, selectedEducation, setSelectedEducation){
   
    return (
        <div className='education-wrapper'>
        <Education 
        className='education'
          key={education._id}
          degreeType={education.degree}
          schoolName={education.school}
          cityName={education.city}
          countryName={education.country}
          startDate={education.startDate}
          endDate={education.endDate}
        />
        <div className="radio-button">
        <label className="checkbox-container">
          <input
            type="radio"
            name="educationRadio"
            value={education._id}
            checked={selectedEducation === education._id}
            onChange={() => setSelectedEducation(education._id)}
          />
          <span className="checkmark"></span>
        </label>
      </div>
      </div>
    );
        
    
        
}

export default function PickJobs() {

    const [Educations, setEducation] = useState(null);
    const { user } = useContext(UserContext);
    
    const navigate = useNavigate();
    const [selectedEducation,setSelectedEducation] = useState('')



   
    useEffect(() => {
        
        if (user){
            axios.get('/education/all_education/').then(({data})=>{
                setEducation(data)
                

                
            });
        }
       
        
    }, [user]); 

    

    if (Educations){
        return (
            <div>
                <h1>Select Education</h1>
            <div className='educations'>
                {Educations.map(education => (
                    createEducation(education, selectedEducation,setSelectedEducation)
                    ))}
            
            </div>
            <button onClick={e=>{
                
                Cookies.set('checkedEducation', selectedEducation);
                navigate('/pick_category');
            }}>SUBMIT</button>
            </div>
            
          )
    }
    else{
        <div>
              <h1>no jobs to select. First add jobs.</h1>
              
            </div>
    }
  
}
