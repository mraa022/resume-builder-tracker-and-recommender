import React from 'react'
import '../../../styles/resume_style.css'
export default function Resume(props) {
  return (
    <div className='resume'>
        {props.job_names.map((jobname, index) => (
            <p key={index}>{jobname}</p>
        ))}
    </div>
        )
}


