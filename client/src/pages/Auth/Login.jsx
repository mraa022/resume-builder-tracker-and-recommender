import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import '../../../styles/navbar.css'
export default function Login() {
  const navigate = useNavigate();
    const [data,setData] = useState({
        email: '',
        password:''
    })
    const loginUser  = async(e)=>{
        e.preventDefault()
        const {email,password} = data;
        try{
          axios.defaults.withCredentials = true
          const {data} = await axios.post('/auth/login',{
            email,password,
            withCredentials: true,
      headers: { crossDomain: true, 'Content-Type': 'application/json' }
          })
          if (data.error){
            toast.error(data.error)
          }
          else{
            console.log("LOGED IN")
            setData({});
            navigate('/dashboard')
            navigate(0)

          }
        }
        catch{

        }

    }
  return (
    <div>
      <form onSubmit={loginUser}>
        
          <label>Email</label>
          <input value={data.email} onChange={(e)=>setData({...data, email:e.target.value})} type='email' placeholder='enter Email...'></input>

          <label>Password</label>
          <input value={data.password} onChange={(e)=>setData({...data, password:e.target.value})}type='password' placeholder='enter Password...'></input>

          <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
