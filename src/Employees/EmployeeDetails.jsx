import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useDataResource } from '../hook/UseDataResource.jsx';
import { LayoutMain } from '../components/Layout.jsx';

import { EmployeesHeader } from './components/EmployeesHeader.jsx';
import './Employees.scss';

export const EmployeeDetails = () => {
  const { id } = useParams();
  
  const url = `${window.location.origin}/active-employees.json`;
  const { data: employee, isLoading, getDataById } = useDataResource(url);

  useEffect(() => {
    getDataById(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[id]);

  const [ jobs, setJobs ] = useState([]);

  useEffect(() => {
    if(employee.jobDescriptions === undefined) return;
    const jobList = employee.jobDescriptions.split(';');
    if(jobList.length > 1) {
      setJobs(jobList);
    } else {
      setJobs([employee.jobDescriptions]);
    }
  }, [employee]);

  if(isLoading) return <LayoutMain><div>Loading...</div></LayoutMain>;

  return (
    <LayoutMain>
      <EmployeesHeader />
        <section className="employee-details">
          <h1>{employee.lastName}, {employee.firstName} - {employee.employeeID}</h1>

          <div>
            <h3>Contact Information</h3>
            <div>Phone Number: {employee.phoneNumber}</div>
            <div>Email: {employee.email}</div>
          </div>
          
          <div>
            <h3>Job(s) Availability</h3>
            {jobs.map((job, index) => (
              <div key={index}>{job}</div>
            ))}
          </div>
        </section>
        
    </LayoutMain>
  );
};