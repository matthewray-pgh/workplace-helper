import React, { useEffect, useState } from 'react';

import { LayoutMain } from '../components/Layout';

import '../assets/styles/Employees.scss';

const JobDescriptions = ['Chef', 'Cook', 'Runner', 'Bartender', 'Barback', 'Server', 'Busser', 'Take Out', 'Host', 'Shift Manager / Assistant Manager', 'General Manager', 'Owner', 'Driver', 'Delivery Service Driver', 'Training', 'Expo'];

export const Employees = () => {
  return (
    <LayoutMain contentComponent={EmployeesContent}/>
  );
}

export const EmployeesContent = () => {
  const [ data, setData ] = useState([]);
  const [ initialData, setInitialData ] = useState([]); // for resetting data to initial state
  const [ selectedJobDescription, setSelectedJobDescription ] = useState(''); // for filtering data
  const [ isLoading, setIsLoading ] = useState(true);
  const [ filteredJobDescriptions, setFilteredJobDescriptions ] = useState([]);

  const getData=()=>{
    setIsLoading(true);
    fetch('active-employees.json',{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(function(response){
        return response.json();
      })
      .then(function(jsonResult) {
        const formatted = jsonResult.map(el => 
          Object.fromEntries(Object.entries(el).map(([key, value]) => ([
            key.replace(/\s+/g, "")
              .replace(/_(\w)/g, (_, c) => c.toUpperCase()) // Convert underscore case to camelCase
              .replace(/^([A-Z])/, (match, c) => c.toLowerCase()), // Convert leading uppercase to lowercase
            value
          ])))
        ).filter(el => el.employeeID !== "''" && el.employeeID !== '');
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
      return filteredJobDescriptions.some((filterItem) => employee.jobDescriptions.includes(filterItem));
    });
    setData(filteredList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredJobDescriptions]);

  return (
    <div className="employees">
      <EmployeesHeader />

      <div className="employees__main-list-view">
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
          
          <div className="employees__filter--selections-list">{filteredJobDescriptions.map((filters, index) => {
              return <span key={index} 
                className="employees__filter--selections" 
                onClick={(e) => handleRemoveFilter(e)}>
                  {`${filters} X`}
                </span>
            })}
          </div>
        </section>

        <ListContent data={data} isLoading={isLoading} />
      </div>
    </div>
  );
};

const EmployeesHeader = () => {
  return (
    <div className="employees__header">
      <div className="employees__header--menu">
      </div>
    </div>
  );
}

const ListContent = ({ data, isLoading }) => {
  const handleEmployeeClick = (id) => {
    console.log('id', id);
  };

  if(isLoading) return (<p>Loading...</p>);
  
  const showingResults = data.length > 0 ? `Showing ${data.length} results`: null;

  return (
    <section>
      <div className="employees__list--result-count">{showingResults}</div>
      <div className="employees__list--header">
        <div>#</div>
        <div>Name</div>
        <div>Job(s)</div>
        <div>Phone</div>
        <div>Email</div>
      </div>
      <div className="employees__list">
        {data.map((d, i) => {
          return (
            <div key={`${i}-${d.employeeID}`} className="employees__list--row">
              <div>{i + 1}</div>
              <div onClick={() => handleEmployeeClick(d.employeeID)}>
                {d.lastName}, {d.firstName}
              </div>
              <div>{d.jobDescriptions}</div>
              <div>{d.phoneNumber && d.phoneNumber.toString().length === 10 ? 
                `(${d.phoneNumber.toString().slice(0, 3)}) ${d.phoneNumber.toString().slice(3, 6)}-${d.phoneNumber.toString().slice(6)}` : 
                null}</div>
              <div>{d.email.includes('@example.com') ? null : d.email}</div>
            </div>
          )}
        )}
      </div>
    </section>
  );
}