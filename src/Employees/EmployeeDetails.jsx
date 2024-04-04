import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faSquarePlus, faSquareMinus } from '@fortawesome/free-regular-svg-icons';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';

import { useDataResource } from '../hook/UseDataResource.jsx';
import { EmployeesHeader } from './components/EmployeesHeader.jsx';
import './EmployeeDetails.scss';

export const EmployeeDetails = () => {
  const [ employeeData, setEmployeeData ] = useState({});
  const { id } = useParams();
  
  const url = `${window.location.origin}/active-employees.json`;
  const { data: employees, isLoading } = useDataResource(url);

  const [availability, setAvailability] = useState([]); // [true, false, true, true, true, true, true
  const { data: availabilityData } = useDataResource(`${window.location.origin}/employee-availability.json`);
  useEffect(() => {
    const empAvailability = availabilityData.filter((avail) => avail.employeeID === id);
    
    const orderedAvailability = empAvailability.sort((a, b) => {
      // Compare by jobGUID first
      if (a.jobGUID < b.jobGUID) return -1;
      if (a.jobGUID > b.jobGUID) return 1;

      // If jobGUID is the same, compare by shiftGUID
      if (a.shiftGUID < b.shiftGUID) return -1;
      if (a.shiftGUID > b.shiftGUID) return 1;

      // If both jobGUID and shiftGUID are the same, compare by day
      return a.day - b.day;
    });

    const groupedByJobAndShift = orderedAvailability.reduce((acc, obj) => {
      const jobKey = obj.jobGUID;
      const shiftKey = obj.shiftGUID;

      if (!acc[jobKey]) {
        acc[jobKey] = {};
      }

      if (!acc[jobKey][shiftKey]) {
        acc[jobKey][shiftKey] = [];
      }

      acc[jobKey][shiftKey].push(obj);
      return acc;
    }, {});

    setAvailability(groupedByJobAndShift);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availabilityData]);

  const generateAvailability = (employees) => {
    const availabilityDefault = [true, false, true, true, true, true, true];
    const shiftsGUIDs = ['OPEN', 'CLOSE'];
    
    const details = employees.flatMap((employee) => {
      const jobGUIDs = employee.jobGUIDs.split(';');
      return jobGUIDs.flatMap((jobGUID) => {
        return shiftsGUIDs.flatMap((shiftGUID) => {
          return availabilityDefault.map((available, index) => {
            return {
              "employeeID": employee.employeeID,
              "jobGUID": jobGUID.trim(),
              "shiftGUID": shiftGUID.trim(),
              "day": index,
              "available": available,
            };
          });
        });
      });
    });
    console.log('details', details);
  };

  useEffect(() => {
    if(employees === null || employees.length <= 0) return;
    const employee = employees.find(emp => emp.employeeID === id);

    //availability
    const defaultAvailability = [
      { day: 0, shifts: [{ shift: 'OPEN', available: true }, { shift: 'CLOSE', available: true }] },
      { day: 1, shifts: [{ shift: 'OPEN', available: false }, { shift: 'CLOSE', available: false }] },
      { day: 2, shifts: [{ shift: 'OPEN', available: true }, { shift: 'CLOSE', available: true }] },
      { day: 3, shifts: [{ shift: 'OPEN', available: true }, { shift: 'CLOSE', available: true }] },
      { day: 4, shifts: [{ shift: 'OPEN', available: true }, { shift: 'CLOSE', available: true }] },
      { day: 5, shifts: [{ shift: 'OPEN', available: true }, { shift: 'CLOSE', available: true }] },
      { day: 6, shifts: [{ shift: 'OPEN', available: true }, { shift: 'CLOSE', available: true }] },
    ];

    const jobGUIDs = employee.jobGUIDs.split(';');
    const jobs = employee.jobDescriptions.split(';');
    const jobDetails = jobs.map((jobDescription, index) => {
      return {
        JobGUID: jobGUIDs[index],
        jobDescription: jobDescription.trim(),
        availability: defaultAvailability,
      };
    });

    const empDetails = {
      firstName: employee.firstName,
      lastName: employee.lastName,
      employeeID: employee.employeeID,
      phoneNumber: employee.phoneNumber,
      email: employee.email,
      availability: defaultAvailability, //
      jobs: jobDetails,
    };

    setEmployeeData(empDetails);
  }, [employees, id]);

  const handleAvailableClick = (e) => {
    
  };

  // loading screen
  if(isLoading) return <div>Loading...</div>;

  return (
    <main>
      <section className="employee-details">
        <h1 className="employee-details__title">{employeeData.lastName}, {employeeData.firstName} - {employeeData.employeeID}</h1>

        <section className="employee-details__section">
          <h2>Contact Information</h2>
          <div>Phone Number: {employeeData.phoneNumber}</div>
          <div>Email: {employeeData.email}</div>
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

              {employeeData.availability && employeeData.availability.map((day, dayIndex) => (
                <div key={dayIndex} className="employee-details__availability--day">
                  {day.shifts.map((shift, shiftIndex) => (
                    <div key={shiftIndex} 
                      className="employee-details__availability--shift" 
                      onClick={(e) => handleAvailableClick(e)}>
                      <FontAwesomeIcon className="employee-details__availability--icon"
                        icon={shift.available ? faSquareCheck : faSquare} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* TODO: add job level availability */}
          {employeeData.jobs && employeeData.jobs.map((job, index) => (
            <h3 key={index}>
              <FontAwesomeIcon icon={faSquarePlus} />
              <span style={{paddingLeft: '10px'}}>{job.jobDescription}</span>
            </h3>
          ))}
        </section>
      </section>
    </main>
  );
};