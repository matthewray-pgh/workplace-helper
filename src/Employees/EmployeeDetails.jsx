import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faSquarePlus, faSquareMinus } from '@fortawesome/free-regular-svg-icons';
import { faSquareCheck, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import { useDataResource } from '../hook/UseDataResource.jsx';
import { LayoutMain } from '../components/Layout.jsx';
import { EmployeesHeader } from './components/EmployeesHeader.jsx';
import './EmployeeDetails.scss';

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

  //availability
  const initialAvailability = [
    {id: 0, day: 'SUN', shifts: [{ shift: 'AM', available: false }, { shift: 'PM', available: false },]},
    {id: 1, day: 'MON', shifts: [{ shift: 'AM', available: false }, { shift: 'PM', available: false },]},
    {id: 2, day: 'TUE', shifts: [{ shift: 'AM', available: false }, { shift: 'PM', available: false },]},
    {id: 3, day: 'WED', shifts: [{ shift: 'AM', available: false }, { shift: 'PM', available: false },]},
    {id: 4, day: 'THU', shifts: [{ shift: 'AM', available: false }, { shift: 'PM', available: false },]},
    {id: 5, day: 'FRI', shifts: [{ shift: 'AM', available: false }, { shift: 'PM', available: false },]},
    {id: 6, day: 'SAT', shifts: [{ shift: 'AM', available: false }, { shift: 'PM', available: false },]},
  ];
  const [ available, setAvailable ] = useState(initialAvailability);

  const handleAvailClick = (dayIndex, shiftIndex) => {
    const newAvailable = [...available];
    newAvailable[dayIndex].shifts[shiftIndex].available = !newAvailable[dayIndex].shifts[shiftIndex].available;
    setAvailable(newAvailable);
  };

  useEffect(() => {
    console.log('available', available);
  }, [available]);

  // loading screen
  if(isLoading) return <LayoutMain><div>Loading...</div></LayoutMain>;

  return (
    <LayoutMain>
      <EmployeesHeader />
        <section className="employee-details">
          <h1 className="employee-details__title">{employee.lastName}, {employee.firstName} - {employee.employeeID}</h1>

          <section className="employee-details__section">
            <h2>Contact Information</h2>
            <div>Phone Number: {employee.phoneNumber}</div>
            <div>Email: {employee.email}</div>
          </section>
          
          <section className="employee-details__section">
            <h2>Job(s) Availability</h2>

            <div>
              <h3>
                <FontAwesomeIcon icon={faSquareMinus} />
                <span style={{paddingLeft: '10px'}}>All</span>
              </h3>
              <div className="employee-details__availability">
                <div>SUN</div>
                <div>MON</div>
                <div>TUE</div>
                <div>WED</div>
                <div>THU</div>
                <div>FRI</div>
                <div>SAT</div>

                {available.map((day, dayIndex) => (
                  <div key={dayIndex} className="employee-details__availability--day">
                    {day.shifts.map((shift, shiftIndex) => (
                      <div key={shiftIndex} className="employee-details__availability--shift" onClick={() => handleAvailClick(dayIndex, shiftIndex)}>
                        <FontAwesomeIcon icon={shift.available ? faSquareCheck : faSquare} />
                      </div>
                    ))}
                  </div>
                )
                )}
              </div>
            </div>

            {jobs.map((job, index) => (
              <h3 key={index}>
                <FontAwesomeIcon icon={faSquarePlus} />
                <span style={{paddingLeft: '10px'}}>{job}</span>
              </h3>
            ))}
          </section>
        </section>
        
    </LayoutMain>
  );
};