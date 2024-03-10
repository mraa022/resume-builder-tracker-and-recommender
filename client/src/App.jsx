
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import Dashboard from './pages/Dashboard'
import Logout from './pages/Auth/Logout'
import AddJob from './pages/Job/AddJob'
import AddProject from './pages/Project/AddProject'
import JobsList from './pages/Job/JobsList' 
import ProjectsList from './pages/Project/ProjectsList'
import PickJobs from './pages/Job/PickJobs'
import PickProjects from './pages/Project/PickProjects'
import CreateEducation from './pages/Education/CreateEducation'
import PickEducation from './pages/Education/PickEducation'
import axios from 'axios'

import {Toaster} from 'react-hot-toast'
import {UserContextProvider} from '../context/userContext'

import {UserContext} from '../context/userContext'
import SlectResumeCategory from './pages/Resume/SelectResumeCategory'
import ResumesList from './pages/Resume/ResumesList'
import PickResume from './pages/Application/PickResume'
import JobInformation from './pages/Application/JobInformation'
import ApplicationList from './pages/Application/ApplicationList'
import RecommendResume from './pages/Resume/RecommendResume'
import RecommendedResumes from './pages/Resume/RecommendedResumes'


axios.defaults.baseURL = 'https://resume-builder-tracker-and-recommender-server.vercel.app/'
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
        <Route path='/create_education' element={<CreateEducation/>} />
        <Route path='/pick_education' element={<PickEducation/>} />
        <Route path='/pick_category' element={<SlectResumeCategory/>} />
        <Route path='/resumes_list' element={<ResumesList/>} />
        <Route path='/job_info' element={<JobInformation/>} />
        <Route path='/pick_resume' element={<PickResume/>} />
        <Route path='/application_list' element={<ApplicationList/>} />
        <Route path='/recommend_resume' element={<RecommendResume/>} />
         <Route path='/recommended_resumes' element={<RecommendedResumes/>} />
        
      </Routes>
    </UserContextProvider>
    
    
  )
}

export default App
