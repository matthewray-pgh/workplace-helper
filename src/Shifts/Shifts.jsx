import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faSquarePlus, faSquareMinus } from '@fortawesome/free-regular-svg-icons';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';

import { JobFilter } from '../components/JobFilter.jsx';
import { useDataResource } from '../hook/UseDataResource.jsx';

import './Shifts.scss';

export const Shifts = () => {
  const [selectedJobs, setSelectedJobs] = useState(null);
  const [shifts, setShifts] = useState([]);

  const { data: initialShifts, isLoading } = useDataResource('employee-availability.json');
  const { data: jobDetails, isLoading: loadingJobDetails } = useDataResource('restaurant-job.json');
  const { data: employees, isLoading: loadingEmployees } = useDataResource('active-employees.json');
  
  const handleShiftJobChange = (filteredJobs) => {
    if (filteredJobs.length === 0) return;
    if (jobDetails) {
      const jobDescriptions = jobDetails.filter(job => filteredJobs.includes(job.jobTitle));
      setSelectedJobs(jobDescriptions);
      const selectedJobIds = jobDescriptions.map(job => job.jobId);
      const filteredShifts = initialShifts.filter(shift => selectedJobIds.includes(shift.jobGUID));
      
      const groupedByEmployeeID = filteredShifts.reduce((acc, obj) => {
        const { employeeID, ...rest } = obj;
        if (!acc[employeeID]) {
            acc[employeeID] = [];
        }
        acc[employeeID].push(rest);
        return acc;
      }, {});

      // Creating an array of objects from the grouped data
      const groupedArray = Object.keys(groupedByEmployeeID).map(employeeID => {
        const employee = employees.find(employee => employee.employeeID === employeeID);
        const sortedValues = groupedByEmployeeID[employeeID]
          .sort((a, b) => {
            if (a.day !== b.day) {
              return a.day - b.day;
            } else {
              return a.shiftGUID.localeCompare(b.shiftGUID);
            }
          })
          .reduce((acc, obj) => {
            const { day, ...rest } = obj;
            if (!acc[day]) {
              acc[day] = [];
            }
            acc[day].push(rest);
            return acc;
          }, {});
        return {
          id: employeeID,
          name: `${employee.lastName}, ${employee.firstName}`,
          values: sortedValues
        }
      }).sort((a, b) => a.name.localeCompare(b.name));
      
      setShifts(groupedArray);
    }
  }

  useEffect(() => {
    console.log('shifts', shifts);
  }, [shifts]);

  const handleShiftChange = (shiftGUID, day, employeeID, checked) => {
    console.log('shiftGUID', shiftGUID, 'day', day, 'employeeID', employeeID, 'checked', checked);
    setShifts(prevShifts => {
      return prevShifts.map(employee => {
        if (employee.id === employeeID) {
          return {
            ...employee,
            values: {
              ...employee.values,
              [day]: employee.values[day].map(shift => {
                if (shift.shiftGUID === shiftGUID) {
                  return { ...shift, available: checked };
                } else {
                  return shift;
                }
              })
            }
          };
        } else {
          return employee;
        }
      });
    })
  };

  return (
    <main>
      <JobFilter 
        funcChangeAction={handleShiftJobChange} 
        funcRemoveFilter={() => {return null;}} 
      />
      {selectedJobs ? 
      <section className="shift__section">  
        {shifts.map((shiftData, index) => {
          return (
            <div 
              key={`${shiftData.id}-${shiftData.name}-${index}`}
              className="shift__employee"
            >
              <div>{shiftData.name}</div>
              <ShiftOptions shifts={shiftData.values[0]} day={0} employeeID={shiftData.id} updateShift={handleShiftChange} />
              <ShiftOptions shifts={shiftData.values[1]} day={1} employeeID={shiftData.id} updateShift={handleShiftChange} />
              <ShiftOptions shifts={shiftData.values[2]} day={2} employeeID={shiftData.id} updateShift={handleShiftChange} />
              <ShiftOptions shifts={shiftData.values[3]} day={3} employeeID={shiftData.id} updateShift={handleShiftChange} />
              <ShiftOptions shifts={shiftData.values[4]} day={4} employeeID={shiftData.id} updateShift={handleShiftChange} />
              <ShiftOptions shifts={shiftData.values[5]} day={5} employeeID={shiftData.id} updateShift={handleShiftChange} />
              <ShiftOptions shifts={shiftData.values[6]} day={6} employeeID={shiftData.id} updateShift={handleShiftChange} />
            </div>
          )
        })}
      </section>
      :
      <section className="shift__no-position">
        <h2>Select a position to view shift availability</h2>
      </section>
      }
    </main>
  );
}

const ShiftOptions = ({shifts, day, employeeID, updateShift}) => {
  const initialAllState = shifts.every(shift => shift.available);
  const [all, setAll] = useState(initialAllState);
  
  const toggleAll = () => {
    shifts.map(shift => {
      return updateShift(shift.shiftGUID, day, employeeID, !all);
    });
    setAll(!all);
  };

  const handleShiftChange = (shiftGUID, checked) => {
    updateShift(shiftGUID, day, employeeID, checked);
    const allAvailable = shifts.every(shift => shift.available);
    setAll(!allAvailable);
  };

  return (
    <div className="shift__cell">
      <FontAwesomeIcon className="shift__icon"
        onClick={() => toggleAll()}
        icon={all ? faSquareMinus : faSquarePlus} />

      {shifts.map((shift, index) => {
        return (
          <FontAwesomeIcon 
            className="shift__icon" 
            key={`${shift.shiftGUID}-${index}`}
            icon={shift.available ? faSquareCheck : faSquare}
            onClick={() => handleShiftChange(shift.shiftGUID, !shift.available)}
          />
        )
      })}
    </div>
  );
}