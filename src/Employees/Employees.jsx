import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { LayoutMain } from '../components/Layout.jsx';

import { EmployeesHeader } from './components/EmployeesHeader.jsx';
import { useDataResource } from '../hook/UseDataResource.jsx';

import './Employees.scss';

const JobDescriptions = ['Chef', 'Cook', 'Runner', 'Bartender', 'Barback', 'Server', 'Busser', 'Take Out', 'Host', 'Shift Manager / Assistant Manager', 'General Manager', 'Owner', 'Driver', 'Delivery Service Driver', 'Training', 'Expo'];

export const Employees = () => {
  const [ data, setData ] = useState([]);
  const [ selectedJobDescription, setSelectedJobDescription ] = useState(''); // for filtering data
  const [ filteredJobDescriptions, setFilteredJobDescriptions ] = useState([]);

  const { data: initialData, isLoading, getAllData } = useDataResource('active-employees.json');

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

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
    setSelectedJobDescription('');
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

  useEffect(() => {
    if(filteredJobDescriptions.length === 0) return getAllData();
    const employeeList = [...initialData];
    const filteredList = employeeList.filter(employee => {
      return filteredJobDescriptions.some((filterItem) => employee.jobDescriptions.includes(filterItem));
    });
    setData(filteredList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredJobDescriptions]);

  return (
    <LayoutMain>
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
                <option value="">--</option>
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
    </LayoutMain>
  );
};

const ListContent = ({ data, isLoading }) => {
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const handleEmployeeClick = (id) => {
    navigate(`${path}/${id}`);
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
              <div onClick={() => handleEmployeeClick(d.employeeID)} style={{cursor: 'pointer'}}>
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