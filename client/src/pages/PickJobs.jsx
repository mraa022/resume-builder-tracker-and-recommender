
import {useContext} from 'react';
import React, { useState,useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Job from '../components/Job/Job';
import {UserContext} from '../../context/userContext'
import '../../styles/jobs_style.css'
import '../../styles/navbar.css'
import '../../styles/add_job.css'
import Cookies from 'js-cookie'; // Import js-cookie
const getJobs = async()=>{
    return await axios.get('/all_jobs')
}


function createJob(job,isChecked, toggleCheckbox){

    const startDate = new Date(job.startDate).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}) 
    const endDate = new Date(job.endDate).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}) 
    
    return (
        <div className="job-wrapper">
        <Job
          key={job._id}
          jobTitle={job.jobTitle}
          companyTitle={job.companyName}
          responsibilities={job.jobResponsibilities}
          startDate={startDate}
          endDate={endDate}
        />
        <label className="checkbox-container">
          <input type="checkbox" className="checkbox" 
          checked={isChecked} 
          onChange={() => toggleCheckbox(job._id)}/>
          <span className="checkmark"></span>
        </label>
      </div>
    );
        
    
        
}

export default function PickJobs() {

    const [jobs, setJobs] = useState(null);
    const { user } = useContext(UserContext);
    const [jobType,setJobType] = useState('all'); // used to keep track of the job category user wants 
    const [jobCategories,setJobCategories] = useState(null); // used to get all available job categories
    const navigate = useNavigate();
    const [checkedJobs, setCheckedJobs] = useState([]);
    const [dictCheckedJobs, setDictCheckedJobs] = useState({}); // State to track checked jobs (used to reset on new job category)



    
    useEffect(() => {
        
        if (user){
            axios.get('/all_jobs/?'+'type='+jobType).then(({data})=>{
                setJobs(data)

                
            });
            axios.get('/all_jobcategories').then(({data})=>{
                
                setJobCategories(data)
            })
        }
        
    }, [user]); 

    useEffect(() => {
        if (jobs) {
          const initialCheckedJobs = jobs.reduce((acc, job) => {
            acc[job._id] = false; // Set each job's initial state to unchecked
            return acc;
          }, {});
          setDictCheckedJobs(initialCheckedJobs);
          
        }
      }, [jobs,user]);

    useEffect(()=>{
        axios.get('/all_jobs/?'+'type='+jobType).then(({data})=>{
            setJobs(data)
        });
        setCheckedJobs([]);
    },[jobType]);

    const toggleCheckbox = (jobId) => {
        
        if (checkedJobs.includes(jobId)) {
            // Remove jobId if already present in the array
            setCheckedJobs(prevState => prevState.filter(id => id !== jobId));
          } else {
            // Add jobId to the end of the array
            setCheckedJobs(prevState => [...prevState, jobId]);
          }

        setDictCheckedJobs(prevState => ({
        ...prevState,
        [jobId]: !prevState[jobId]
        }));
        
        
      };

    if (jobs && jobCategories){
        return (
            <div>
                <h1>Select jobs</h1>
                <label>Choose job category to search by</label>
                <select value={jobType} onChange={event=>{setJobType(event.target.value)}}>
                    <option>all</option>
                    {jobCategories.map((category)=>{
                        return <option>{category}</option>
                    })}
                    
                </select>
            <div className='jobs'>
                
            {jobs.map(job => (
            createJob(job, dictCheckedJobs[job._id], toggleCheckbox)
          ))}
            </div>
            <button onClick={e=>{
                console.log(checkedJobs);
                Cookies.set('checkedJobs', checkedJobs);
                navigate('/pick_projects');
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
