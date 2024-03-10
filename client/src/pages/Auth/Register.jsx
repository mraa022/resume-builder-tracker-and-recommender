import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router'
import '../../../styles/navbar.css'
export default function Register() {
  const navigate = useNavigate()
    const [data,setData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        linkedIn: ''
    })
    const registerUser=async(e)=>{
        e.preventDefault()
        const {name,email,password} = data;
        try{
          const{data} = await axios.post('/auth/register',{
            name,email,password
          })
          if (data.error){
            toast.error(data.error)
          }
          else{
            setData({})
            toast.success('Login Successful. Welcome!')
            navigate('/login')
          }
        }
        catch(error){
            console.log(error)
        }

    }
  return (
    <div>
      <form onSubmit={registerUser}>
          <label>Name</label>
          <input value={data.name} onChange={(e)=>setData({...data, name:e.target.value})} type='text' placeholder='enter name...'></input>

          <label>Email</label>
          <input value={data.email} onChange={(e)=>setData({...data, email:e.target.value})} type='email' placeholder='enter Email...'></input>

          <label>Password</label>
          <input value={data.password} onChange={(e)=>setData({...data, password:e.target.value})} type='password' placeholder='enter Password...'></input>

          <label>Phone</label>
          <input value={data.phone} onChange={(e)=>setData({...data, phone:e.target.value})} type='text' placeholder='enter phone...'></input>

          <label>LinkedIn</label>
          <input value={data.linkedIn} onChange={(e)=>setData({...data, linkedIn:e.target.value})} type='text' placeholder='enter linkedIn url...'></input>
          <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
