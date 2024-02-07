import JobTitle from './JobTitle'
import JobDescription from './JobDescription'
import CompanyTitle from './CompanyTitle'
import JobDate from './JobDate'
import '../../../styles/job_style.css'
export default function Job(props) {
    return (
        <div className='job'>
            <JobTitle jobTitle={props.jobTitle}/>
            <CompanyTitle companyTitle={props.companyTitle}/>
            <JobDate type='start date' date={props.startDate}/>
            <JobDate type='end date' date={props.endDate}/>
            <JobDescription responsibilities={props.responsibilities}/>
        </div>
       
    );


}