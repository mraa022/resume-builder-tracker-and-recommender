import {useContext} from 'react';
import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Job from '../../components/Job/Job';
import {UserContext} from '../../../context/userContext'
import '../../../styles/jobs_style.css'
import '../../../styles/navbar.css'
function createJob(job){
    const startDate = new Date(job.startDate).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}) 
    const endDate = new Date(job.endDate).toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'}) 
    return <Job key = {job._id} jobTitle={job.jobTitle} companyTitle = {job.companyName} responsibilities = {job.jobResponsibilities} startDate={startDate} endDate={endDate}/>
}
const getJobs = async()=>{
    return await axios.get('/job/all_jobs')
}

export default function JobsList() {

    const [jobs, setJobs] = useState(null);
    const { user } = useContext(UserContext);
    const [jobType,setJobType] = useState('all'); // used to keep track of the job category user wants 
    const [jobCategories,setJobCategories] = useState(null); // used to get all available job categories

    useEffect(() => {
        
        if (user){
            axios.get('/job/all_jobs/?'+'type='+jobType).then(({data})=>{
                setJobs(data)
            });
            axios.get('/job/all_jobcategories').then(({data})=>{
                
                setJobCategories(data)
            })
        }
        
        
    }, [user]); 

    useEffect(()=>{
        axios.get('/job/all_jobs/?'+'type='+jobType).then(({data})=>{
            setJobs(data)
        });
    },[jobType]);


    if (jobs && jobCategories){
        return (
            <div>
                <h1>Jobs list</h1>
                <label>Choose job category to search by</label>
                <select value={jobType} onChange={event=>{setJobType(event.target.value)}}>
                    <option>all</option>
                    {jobCategories.map((category)=>{
                        return <option>{category}</option>
                    })}
                    
                </select>
            <div className='jobs'>
              
              {jobs.map(createJob)}
              
            </div>
            </div>
            
          )
    }
    else{
        <div>
              <h1>Jobs list</h1>
              <h2>No jobs</h2>
              
            </div>
    }
  
}
