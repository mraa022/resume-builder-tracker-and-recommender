import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'


export default function Logout() {
  const navigate = useNavigate()
  axios.post('/auth/logout').then(({data})=>{
    navigate('/')
    navigate(0)
  })
  
  return (
    <div>
      Logged out
    </div>
  )
}