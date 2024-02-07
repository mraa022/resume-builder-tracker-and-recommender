
export default function JobDate(props) {
    const type = props.type 
    return <div className='date'>
        <h3>{type}: {props.date}</h3>
    </div>
}