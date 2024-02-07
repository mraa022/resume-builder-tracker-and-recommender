import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import '../../styles/form_style.css'
export default function AddJob() {
  const navigate = useNavigate();
    const [data,setData] = useState({
        jobTitle: '',
        companyName: '',
        startDate: '',
        endDate: '',
        city: '',
        country: '',
        jobResponsibilities: '',
        jobCategory:''
    })
    const addJob = async(e)=>{
        e.preventDefault();
        const {jobTitle,companyName,startDate,endDate,city,country,jobCategory } = data;
        
        const jobResponsibilities = data.jobResponsibilities.split('\n')
        try{
            axios.defaults.withCredentials = true
            const {data} = await axios.post('/add_job',{
                jobTitle: jobTitle,
                jobCategory:jobCategory,
                companyName: companyName,
                startDate: startDate,
                endDate: endDate,
                city: city,
                country: country,
                jobResponsibilities: jobResponsibilities,
                withCredentials: true,
        headers: { crossDomain: true, 'Content-Type': 'application/json' }
            })
            if (data.error){
              toast.error(data.error)
            }
            else{
              setData({
                jobTitle: '',
                companyName: '',
                startDate: '',
                endDate: '',
                city: '',
                country: '',
                jobResponsibilities: '',
                jobCategory:''
              });
              navigate('/all_jobs')
              navigate(0)
  
            }
          }
          catch{
  
          }
        
    }
    
  return (
    <div>
      <form onSubmit={addJob}>
        
      
          <label>Job Title</label>
          <input value={data.jobTitle} onChange={(e)=>setData({...data, jobTitle:e.target.value})} type='text' placeholder='enter job title...'></input>
            <br/>
            <label>Job Category</label>
          <input type='text'  value={data.jobCategory} onChange={(e)=>setData({...data, jobCategory:e.target.value})} placeholder='enter job category'/>
            <br/>
          <label>Company Name</label>
          <input value={data.companyName} onChange={(e)=>setData({...data, companyName:e.target.value})} type='text' placeholder='enter company name...'></input>
          <br/>
          <label>End Date</label>
          <input value={data.startDate} onChange={(e)=>setData({...data, startDate:e.target.value})} type='text' placeholder='enter start date (YYYY-MM-DD)'></input>
          <br/>
          <label>Start Date</label>
          <input value={data.endDate} onChange={(e)=>setData({...data, endDate:e.target.value})} type='text' placeholder='enter end date (YYYY-MM-DD)'></input>
          <br/>
          <label>City</label>
          <input value={data.city} onChange={(e)=>setData({...data, city:e.target.value})} type='text' placeholder='enter city name'></input>
          <br/>
          <label>Country</label>
          <input value={data.country} onChange={(e)=>setData({...data, country:e.target.value})} type='text' placeholder='enter country name'></input>
          <br/>
          <label>Job Descriptoin</label>
          <textarea  value={data.jobResponsibilities} onChange={(e)=>setData({...data, jobResponsibilities:e.target.value})} placeholder='enter job description'/>
          <br/>
          
          <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
