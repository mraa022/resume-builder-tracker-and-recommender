import React from 'react'

export default function Application(props) {
  return (
    <div className='application'>
      <p>job title: {props.jobTitle}</p>
      <p>job description: {props.jobDescription}</p>
    </div>
  )
}
