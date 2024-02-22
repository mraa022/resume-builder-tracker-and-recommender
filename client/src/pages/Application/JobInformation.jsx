import React, { useContext, useState } from 'react';
import {UserContext} from '../../../context/userContext'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

const JobInformation = () => {

  const { user } = useContext(UserContext);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/application/create_application', {
      jobTitle,
      jobDescription,
    })
    navigate('/')
  };

  return (
    <div>
      <h2>Job Information</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="jobTitle">Job Title:</label>
        <input
          type="text"
          id="jobTitle"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
        />

        <label htmlFor="jobDescription">Job Description:</label>
        <textarea
          id="jobDescription"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        ></textarea>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default JobInformation;
