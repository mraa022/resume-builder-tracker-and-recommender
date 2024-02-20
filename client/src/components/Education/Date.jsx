import React from 'react'

export default function Date(props) {
    if (props.type=='start'){
        return (
            <div>
              <p>Start date: {props.date}</p>
            </div>
          )
    }
    else{
        return (
            <div>
              <p>End date: {props.date}</p>
            </div>
          )
    }
  
}
