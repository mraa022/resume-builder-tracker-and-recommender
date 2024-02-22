import {Link} from 'react-router-dom'
import {useContext} from 'react';
import {UserContext} from '../../context/userContext'

// import '../../../styles/navbar.css'
import '../../styles/navbar.css'
export default function Navbar() {
  const {user} = useContext(UserContext)
  if (user){
    return (
      <nav>
          <Link to ='/'>Home</Link>
          <Link to = '/dashboard'>Dashboard</Link>
          <Link to = '/logout'>Logout</Link>
          <Link to = '/add_job'>AddJob</Link>
          <Link to = '/all_jobs'>AllJobs</Link>
          <Link to = '/add_project'>AddProject</Link>
          <Link to = '/all_projects'>AllProjects</Link>
          <Link to = '/pick_jobs'>AddResume</Link>
          <Link to = '/create_education'>AddEducation</Link>
          <Link to = '/resumes_list'>ResumesList</Link>
          <Link to = '/pick_resume'>ApplyToJob</Link>
      </nav>
    )
  }
  else{
    return (
      <nav>
          <Link to ='/'>Home</Link>
          <Link to = '/register'>Register</Link>
          <Link to = '/login'>Login</Link>
      </nav>
    )
  }
}


