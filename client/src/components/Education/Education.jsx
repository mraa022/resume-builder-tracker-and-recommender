import React from 'react'
import DegreeType from './/DegreeType'
import City from './/City'
import Country from './/Country'
import Date from './/Date'
import SchoolName from './/SchoolName'
import '../../../styles/education_style.css'
export default function Education(props) {
  return (
    <div className='education'>
        <DegreeType degreeType={props.degreeType}></DegreeType>
        <SchoolName schoolName={props.schoolName}></SchoolName>
        <City cityName={props.cityName}></City>
        <Country countryName = {props.countryName}></Country>
        <Date type='start' date={props.startDate}></Date>
        <Date type='end' date={props.endDate}></Date>
    </div>
  )
}
