import React from 'react'
import '../../../styles/resume_style.css'
export default function Resume(props) {
    console.log(props)
  return (
    <div className='hi' dangerouslySetInnerHTML={{ __html: props.resume }}></div>
        )
}


