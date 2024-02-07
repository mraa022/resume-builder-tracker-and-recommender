import ProjectTitle from './ProjectTitle'
import ProjectSubtitle from './ProjectSubtitle' 
import ProjectDescription from './ProjectDescription'
import '../../../styles/project_style.css'
export default function Project(props) {
    return (
        <div className='project'>
            <ProjectTitle projectTitle={props.projectTitle}/>
            <ProjectSubtitle projectSubtitle={props.projectSubtitle}/>
            <ProjectDescription projectDescription={props.projectDescription}/>
        </div>
       
    );


}