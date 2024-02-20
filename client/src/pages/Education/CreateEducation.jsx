import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
export default function CreateEducation() {
    const [data,setData] = useState({
        degree: '',
        school: '',
        city: '',
        country: '',
        startDate: '',
        endDate: ''
    })
    const navigate = useNavigate();

    const createEducation=async(e)=>{
        e.preventDefault()
        const {degree,school,city,country,startDate,endDate} = data;
        try{
          const{data} = await axios.post('/education/add_education',{
            degree,school,city,country,startDate,endDate
          })
          if (data.error){
            toast.error(data.error)
          }
          else{
            setData({
                degree: '',
                school: '',
                city: '',
                country: '',
                startDate: '',
                endDate: ''
            })
            navigate('/')
          }
        }
        catch(error){
            console.log(error)
        }

    }
  return (
    <div>
      <form onSubmit={createEducation}>
          <label>Degree</label>
          <input value={data.degree} onChange={(e)=>setData({...data, degree:e.target.value})} type='text' placeholder='enter degree type...'></input>

          <label>School Name</label>
          <input value={data.school} onChange={(e)=>setData({...data, school:e.target.value})} type='text' placeholder='enter school name...'></input>

          <label>City</label>
          <input value={data.city} onChange={(e)=>setData({...data, city:e.target.value})} type='text' placeholder='enter city name...'></input>

          <label>Country</label>
          <input value={data.country} onChange={(e)=>setData({...data, country:e.target.value})} type='text' placeholder='enter country name...'></input>

          <label>Start Date</label>
          <input value={data.startDate} onChange={(e)=>setData({...data, startDate:e.target.value})} type='text' placeholder='enter start date...'></input>

          <label>End Date</label>
          <input value={data.endDate} onChange={(e)=>setData({...data, endDate:e.target.value})} type='text' placeholder='enter end date...'></input>

          <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
