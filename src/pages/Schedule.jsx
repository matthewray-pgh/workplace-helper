import React from 'react';
import { LayoutMain } from '../components/Layout';

export const Schedule = () => {
  return (
    <LayoutMain contentComponent={ScheduleContent}/>
  );
};

export const ScheduleContent = () => {
  return (
    <>
      <h1>Schedule</h1>
    </>
  );
};