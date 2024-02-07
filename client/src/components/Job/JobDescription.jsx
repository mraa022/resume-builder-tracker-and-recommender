import BulletPoint from "./BulletPoint"
import React from 'react'
var id = 0
function createJobDescription(bullet_point){
    const key = id;
    id++; 
    return <BulletPoint key = {key} point={bullet_point}/>
}

export default function JobDescription(props) {
    return(

        <div className='jobDescription'>
            
            <ul>
            {props.responsibilities.map(createJobDescription)}
            </ul>
            
        </div>
    )
}