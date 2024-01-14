import React from 'react';
import { useNavigate } from 'react-router-dom';

export const EmployeesHeader = () => {
  const navigate = useNavigate();
  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
    <div className="employees__header">
      <div className="employees__header--menu">
        <div className="employees__header--menu-item" 
          onClick={() => handleMenuClick('/employees')}>Main List</div>
        <div className="employees__header--menu-item" 
          onClick={() => handleMenuClick('/employees/availability')}>Availability</div>
      </div>
    </div>
  );
};