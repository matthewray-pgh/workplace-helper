import React, { useState, useEffect } from "react";

import { useDataResource } from '../hook/UseDataResource.jsx';

export const JobFilter = ({ funcChangeAction, funcRemoveFilter }) => {
  const [ jobs, setJobs ] = useState([]);
  const [ selectedJobDescription, setSelectedJobDescription ] = useState(''); // for filtering data
  const [ filteredJobDescriptions, setFilteredJobDescriptions ] = useState([]);

  const { data: jobData } = useDataResource(`${window.location.origin}/restaurant-job.json`);
  useEffect(() => {
    if(jobData) {
      const jobDescriptions = jobData.map(job => job.jobTitle);
      setJobs(jobDescriptions);
    }
    //eslint-disable-next-line
  },[jobData]);

  const handleFilterChange = (e) => {
    const filters = [...filteredJobDescriptions];
    if(e.target.value === '') {
      setFilteredJobDescriptions([]);
      return;
    }
    if(!filters.includes(e.target.value)) {
      filters.push(e.target.value);
      setFilteredJobDescriptions(filters);
      funcChangeAction(filters);
    }
    setSelectedJobDescription('');
  };

  const handleRemoveFilter = (e) => {
    const filters = [...filteredJobDescriptions];
    const index = filters.indexOf(e.target.parentNode.innerText.split(' ')[0]);
    filters.splice(index, 1);
    setFilteredJobDescriptions(filters);
    funcChangeAction(filters);
    if (filters.length === 0) {
      setSelectedJobDescription('');
    }
    funcRemoveFilter();
  };

  return (
    <section>
      <div>
        <label htmlFor="employees__filter--dropdown" className="employees__filter--dropdown-label">Filter by Job Description</label>
        <select 
          className="employees__filter--dropdown" 
          onChange={(e) => handleFilterChange(e)} 
          value={selectedJobDescription}
        >
          <option value="">--</option>
          {jobs.map((jobDescription, i) => {
            return (
              <option key={i} value={jobDescription}>{jobDescription}</option>
            )}
          )}
        </select>
      </div>
      <div className="employees__filter--selections-list">{filteredJobDescriptions.map((filters, index) => {
          return <span key={index} 
            className="employees__filter--selections" 
            onClick={(e) => handleRemoveFilter(e)}>
              {`${filters} X`}
            </span>
        })}
      </div>
    </section>
  );
}