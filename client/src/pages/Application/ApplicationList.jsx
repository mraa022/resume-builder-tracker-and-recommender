import React, { useState,useEffect } from 'react'
import {useLocation} from 'react-router-dom';
import Application from '../../components/Application/Application';
import {UserContext} from '../../../context/userContext'
import {useContext} from 'react';
import axios from 'axios'

import '../../../styles/application_style.css'
import '../../../styles/applications_style.css'

const createApplication = (application) => {
    return (
        <div>
            <Application key = {application._id} jobTitle={application.jobTitle} jobDescription={application.jobDescription}/>
        </div>
    )

}
export default function ApplicationList() {
    const [applications, setApplications] = useState(null);
    const { user } = useContext(UserContext);
    const location = useLocation();
    const resumeID = location.state.resumeID;
    useEffect(() => {
        if (user){
            axios.get(`/application/get_applications/${resumeID}`).then(({data})=>{
                console.log(data)
                setApplications(data)
            });
        }
    }, [user]);



    if(applications && applications.length>0){
        
        return (
            <div>
                <h1>Jobs applied to using this resume</h1>
                <div className='applications'>
                {applications.map(createApplication)}
            </div>
            </div>
            
        )
    }
    else{
        return (
            <div>
                <h1>Resume not used yet</h1>
            </div>
        )
    }
        
    
  
}
