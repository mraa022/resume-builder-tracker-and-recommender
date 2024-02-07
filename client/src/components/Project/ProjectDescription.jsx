import BulletPoint from "./BulletPoint"
import React from 'react'
var id = 0
function createProjectDescription(bullet_point){
    const key = id;
    id++; 
    return <BulletPoint key = {key} point={bullet_point}/>
}

export default function ProjectDescription(props) {
    return(

        <div className='projectDescription'>
            
            <ul>
            {props.projectDescription.map(createProjectDescription)}
            </ul>
            
        </div>
    )
}