import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../assets/styles/Employees.scss';

const JobDescriptions = ['Chef', 'Cook', 'Runner', 'Bartender', 'Barback', 'Server', 'Busser', 'Take Out', 'Host', 'Shift Manager / Assistant Manager', 'General Manager', 'Owner', 'Driver', 'Delivery Service Driver', 'Training', 'Expo'];

export const Employees = () => {
  const [ data, setData ] = useState([]);
  const [ initialData, setInitialData ] = useState([]); // for resetting data to initial state
  const [ selectedJobDescription, setSelectedJobDescription ] = useState(''); // for filtering data
  const [ isLoading, setIsLoading ] = useState(true);
  const [ filteredJobDescriptions, setFilteredJobDescriptions ] = useState([]);

  const getData=()=>{
    setIsLoading(true);
    fetch('active-employees.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(jsonResult) {
        const formatted = jsonResult.map(el => 
          Object.fromEntries(Object.entries(el).map(([key, value]) => ([
            key.replace(/\s+/g, ""),
            value
          ])))
        );
        setData(formatted);
        setInitialData(formatted);
        setIsLoading(false);
      });
  }

  useEffect(()=>{
    getData();
  },[]);

  const handleFilterChange = (e) => {
    const filters = [...filteredJobDescriptions];
    if(e.target.value === '') {
      setFilteredJobDescriptions([]);
      return;
    }
    if(!filters.includes(e.target.value)) {
      filters.push(e.target.value);
      setFilteredJobDescriptions(filters);
    }
    setSelectedJobDescription(e.target.value);
  };

  const handleRemoveFilter = (e) => {
    const filters = [...filteredJobDescriptions];
    const index = filters.indexOf(e.target.parentNode.innerText.split(' ')[0]);
    filters.splice(index, 1);
    setFilteredJobDescriptions(filters);
    if (filters.length === 0) {
      setSelectedJobDescription('');
    }
  };

  const filteredListStyle = {
    display: 'inline-grid',
    gridTemplateColumns: `repeat(${filteredJobDescriptions.length}, auto)`,
  };

  useEffect(() => {
    if(filteredJobDescriptions.length === 0) return getData();
    const employeeList = [...initialData];
    const filteredList = employeeList.filter(employee => {
      return filteredJobDescriptions.some((filterItem) => employee.JobDescriptions.includes(filterItem));
    });
    setData(filteredList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredJobDescriptions]);

  return (
    <div className="employees">
      <h1>Employees</h1>
      <Link to="/">Home</Link>

      <section>
        <div>
          <label htmlFor="employees__filter--dropdown" className="employees__filter--dropdown-label">Filter by Job Description</label>
          <select 
            className="employees__filter--dropdown" 
            onChange={(e) => handleFilterChange(e)} 
            value={selectedJobDescription}
          >
            <option value="">All</option>
            {JobDescriptions.map((jobDescription, i) => {
              return (
                <option key={i} value={jobDescription}>{jobDescription}</option>
              )}
            )}
          </select>
        </div>
        
        <div className="employees__filter--selections-list" style={filteredListStyle}>{filteredJobDescriptions.map((filters, index) => {
            return <div key={index} className="employees__filter--selections">
              {filters} <input type="button" value="X" onClick={(e) => handleRemoveFilter(e)}></input></div>
          })}
        </div>
      </section>

      <section>
        {isLoading ? <p>Loading...</p> : 
          <>
          <div className="employees__list--header">
            <div>#</div>
            <div>Name</div>
            <div>Job Description</div>
          </div>
          <div className="employees__list">{data.map((d, i) => {
            return (
              <div key={i} className="employees__list--row">
                <div>{i + 1}</div>
                <div>{d.LastName}, {d.FirstName}</div>
                <div>{d.JobDescriptions}</div>
              </div>
            )}
          )}</div>
          </>
        }
      </section>
    </div>
  );
};