import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router'
import '../../../styles/navbar.css'
export default function SlectResumeCategory() {
  const navigate = useNavigate()
    const [data,setData] = useState({
        category: ''
    })
    const createResume=async(e)=>{
        e.preventDefault()
        const {category} = data;
        try{
          const{data} = await axios.post('/resume/create_resume',{
           category
          },{
            withCredentials: true, // Include this line to send cookies with the request
            credentials: 'include'
        })
          if (data.error){
            toast.error(data.error)
          }
          else{
            setData({
                category: ''
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
      <form onSubmit={createResume}>
          <label>Category name</label>
          <input value={data.category} onChange={(e)=>setData({...data, category:e.target.value})} type='text' placeholder='enter resume category...'></input>
          <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
