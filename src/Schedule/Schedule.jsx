import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faFloppyDisk, faCalendarPlus, faWandMagicSparkles, faCalendar, faListCheck } from '@fortawesome/free-solid-svg-icons';

import { useDataResource } from '../hook/UseDataResource';

import './Schedule.scss';

//TO DO LIST:
//1. Add animation to above shift form
//2. Schedule dashboard, barchart per job and schedule completion by day
//3. Shift form focus / unfocus actions
//4. Shift form validation
//5. Global Toast for user messaging

export const Schedule = () => {
  const [ data, setData ] = useState([]);
  const [ dates, setDates ] = useState({start: '', end: '', range: []});
  const [ job, setJob ] = useState(''); // for filtering data
  const [ userMessaging, setUserMessaging ] = useState(null);
  const [ showScheduleGrid, setShowScheduleGrid ] = useState(false);
  const [ editMode, setEditMode ] = useState(false);

  const { 
    data: employeeData, 
    isLoading: isEmployeeLoading, 
  } = useDataResource('active-employees.json');

  const {
    data: jobData,
    isLoading: isJobLoading,
  } = useDataResource('restaurant-job.json');

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = (date) => {
    const day = date.getDay();
    return daysOfWeek[day];
  };

  const shiftTemplate = (datesArray) => {
    return datesArray.map((day, i) => {
      return {
        id: i,
        date: new Date(day),
        shifts: []
      };
    });
  };

  const handleCreateClick = () => {
    if(employeeData.length === 0){
      setUserMessaging('No employees found');
      return;
    } 
    if (dates.start === '' || dates.end === '') {
      setUserMessaging('No dates selected');
      return;
    }
    if (job === '') {
      setUserMessaging('No job selected');
      return;
    }
    if(editMode) {
      const confirm = window.confirm('Are you sure you want to create a new schedule?');
      if(!confirm) return;
    } 

    setUserMessaging(null);

    const dateArray = [];
    const currentDate = new Date(dates.start.replace(/-/g, '/'));
    const endDateRange = new Date(dates.end.replace(/-/g, '/'));
    while (currentDate <= endDateRange) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    setDates({...dates, range: dateArray});

    const empList = [...employeeData];
    const filteredList = empList.filter(employee => {
      return employee.jobDescriptions.includes(job);
    });

    const employeeList = filteredList.map(employee => {
      return {
        id: employee.employeeID,
        name: employee.lastName + ", " + employee.firstName,
        jobDescriptions: employee.jobDescriptions,
        days: shiftTemplate(dateArray)
      };
    });
    setData(employeeList);
    setShowScheduleGrid(true);
    setEditMode(true);
  };

  const handleGenerateClick = () => {
    console.log('generate clicked');
  };

  const handleSaveClick = () => {
    console.log('save clicked');
  };

  const handleStartDateChange = (e) => {
    setDates({...dates, start: e.target.value})
  };

  const handleEndDateChange = (e) => {
    setDates({...dates, end: e.target.value})
  };

  const handleJobChange = (e) => {
    setJob(e.target.value);
  };

  const handleShiftAddClick = (empId, empIndex, dayIndex) => {
    return () => {
      const newData = [...data];
      const shiftId = `${empId}-${empIndex}-${dayIndex}-${newData[empIndex].days[dayIndex].shifts.length}`;
      newData[empIndex].days[dayIndex].shifts.push(
        {id:shiftId, shift: '', section: ''}
      );
      setData(newData);
    };
  };

  const handleShiftRemoveClick = (empID, shiftID) => {
    return () => {
      const ids = shiftID.split('-');
      const empIndex = ids[1];
      const dayIndex = ids[2];
      const shiftIndex = ids[3];
      const newData = [...data];
      newData[empIndex].days[dayIndex].shifts.splice(shiftIndex, 1);
      if(newData[empIndex].days[dayIndex].shifts.length > 0){
        newData[empIndex].days[dayIndex].shifts.map((shift, i) => {
          return shift.id = `${empID}-${empIndex}-${dayIndex}-${i}`;
        });
      }
      setData(newData);
    };
  };

  return (
    <main>
      <div className="schedule">
  
        <ScheduleControlPanel 
          job={job}
          jobData={jobData}
          handleJobChange={handleJobChange}
          dates={dates}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
          handleCreateClick={handleCreateClick}
          handleGenerateClick={handleGenerateClick}
          handleSaveClick={handleSaveClick}
        />

        {showScheduleGrid ?
        <div className="schedule__grid">
          <div className="schedule__grid--header">
            <div>Name</div>
            {dates.range.map((date, index) => {
              return (
                <div key={index} >
                  <div>{dayOfWeek(date)}</div>
                  <div>{date.toLocaleDateString()}</div>
                  <div>OPEN / CLOSE</div>
                </div>
              );}
            )}
          </div>

          {data.length > 0 && 
            <div className="schedule__grid--content">
              {data.map((d, i) => {
                return (
                  <div key={i} className="schedule__grid--row">
                    <div className="schedule__grid--cell-name">{d.name}</div>
                    {d.days.map((day, index) => {
                      return (
                        <div className={day.shifts.length > 0 ? "schedule__grid--mulitple-cell" : "schedule__grid--cell"} key={index}>
                          {day.shifts.length <= 1 && 
                            <ShiftAdd id={d.id} handleShiftAddClick={handleShiftAddClick(d.id, i, index)}/>
                          }
                          {day.shifts.length > 0 && 
                            day.shifts.map((s, i) => {
                              return <ShiftForm key={i} handleRemoveClick={handleShiftRemoveClick(day.id, s.id)}/>
                            })
                          }
                        </div>
                      );
                    })}
                  </div>
                )}
              )}
            </div>
          }
        </div>
        :
        <div className="schedule__grid--placeholder">
          <div>
            <h2>Create a schedule</h2>
          </div>
        </div>
        }
      </div>
    </main>
  );
};

const ScheduleControlPanel = ({
  job,
  jobData,
  handleJobChange,
  dates,
  handleStartDateChange,
  handleEndDateChange,
  handleCreateClick, 
  handleGenerateClick, 
  handleSaveClick, 
}) => {
    
  return (
    <div className="schedule__control-panel"> 
      <div className="schedule__control-panel--control">
        <FontAwesomeIcon icon={faCalendar} className="schedule__control-panel--icon"/>
        <div>
          <div className="schedule__control-panel--label">Date Selection</div>
          <div className="schedule__control-panel--date-layout">
            <input 
              type="date" 
              className="schedule__control-panel--date-field" 
              value={dates.start}
              onChange={(e) => handleStartDateChange(e)}
            /> 
            <span className="schedule__control-panel--to" >-</span>
            <input 
              type="date" 
              className="schedule__control-panel--date-field"
              value={dates.end}
              onChange={(e) => handleEndDateChange(e)}
            />
          </div>
        </div>
      </div> 

      <div className="schedule__control-panel--control">
        <FontAwesomeIcon icon={faListCheck} className="schedule__control-panel--icon"/>
        <div>
          <div className="schedule__control-panel--label">Job Type</div>
          <select 
            className="schedule__control-panel--dropdown"
            onChange={(e) => handleJobChange(e)}
            value={job} >
            <option value="">--</option>
            {jobData.length > 0 && jobData.map((job, i) => {
              return (
                <option key={i} value={job.jobTitle}>{job.jobTitle}</option>
              )}
            )}
          </select>
        </div>
      </div>

      <button className="schedule__control-panel--button" onClick={() => handleCreateClick()}>
        <FontAwesomeIcon icon={faCalendarPlus} />
        <label className="schedule__control-panel--button-text">Create</label>
      </button>
      <button className="schedule__control-panel--button" onClick={() => handleGenerateClick()}>
        <FontAwesomeIcon icon={faWandMagicSparkles} />
        <label className="schedule__control-panel--button-text">Generate</label>
      </button>
      <button className="schedule__control-panel--button" onClick={() => handleSaveClick()}>
        <FontAwesomeIcon icon={faFloppyDisk} />
        <label className="schedule__control-panel--button-text">Save</label>
      </button>
    </div> 
  );
};

const ShiftAdd = ({handleShiftAddClick}) => {
  return (
    <div key={'something'}
      className="shift__button-add"
      onClick={() => handleShiftAddClick()}>
      <FontAwesomeIcon icon={faPlus} />
    </div>
  );
};

const ShiftForm = ({handleRemoveClick, shiftTime='', section=''}) => {
  const [time, setTime] = useState(shiftTime); 
  const [timeDetail, setTimeDetail] = useState(section);

  const handleDropdownChange = (e) => {
    setTimeDetail(e.target.value);
  };

  const handleTimeChange = (e) => {
    const timeValue = e.target.value;
    setTime(timeValue);
    if(timeValue === '') {
      setTimeDetail('');
    } else if(timeValue > 7 && timeValue < 12) {
      setTimeDetail('OPEN');
    } else {
      setTimeDetail('CLOSE');
    }
  };

  return (
    <div className="shift__form">
      <div>
        <div className="shift__form--fields">
          <input className="shift__form--text-time" type="text" value={time} onChange={(e) => {handleTimeChange(e)}} />
          <input  className="shift__form--text-section" type="text" />
        </div>
        <select className="shift__form--dropdown" value={timeDetail} onChange={(e) => handleDropdownChange(e)}>
          <option value="">--</option>
          <option value="OPEN">OPEN</option>
          <option value="CLOSE">CLOSE</option>
        </select>
      </div>
      <button className="shift__form--remove-button" type="button" onClick={() => handleRemoveClick()}>
        <FontAwesomeIcon icon={faMinus} />
      </button>
    </div>
  )
};