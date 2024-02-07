
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Logout from './pages/Logout'
import AddJob from './pages/AddJob'
import AddProject from './pages/AddProject'
import JobsList from './pages/JobsList' 
import ProjectsList from './pages/ProjectsList'
import PickJobs from './pages/PickJobs'
import PickProjects from './pages/PickProjects'
import axios from 'axios'

import {Toaster} from 'react-hot-toast'
import {UserContextProvider} from '../context/userContext'

import {UserContext} from '../context/userContext'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {
  
  return (
    
    
    
    <UserContextProvider>
      <Navbar/>
      <Toaster position='bottom-right' toastOptions = {{duration:2000}}/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/logout' element={<Logout/>} />
        <Route path='/add_job' element={<AddJob/>} />
        <Route path='/all_jobs' element={<JobsList/>} />
        <Route path='/all_projects' element={<ProjectsList/>} />
        <Route path='/add_project' element={<AddProject/>} />
        <Route path='/pick_jobs' element={<PickJobs/>} />
        <Route path='/pick_projects' element={<PickProjects/>} />
        
        
      </Routes>
    </UserContextProvider>
    
    
  )
}

export default App
