import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const EmployeesHeader = () => {
  const navigate = useNavigate();
  const handleMenuClick = (path) => {
    navigate(path);
  };

  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  console.log('pathSegments', pathSegments)

  return (
    <div className="employees__header">
      <div className="employees__header--title">Employees</div>
      <div className="employees__header--menu">
        <div className="employees__header--menu-item" onClick={() => handleMenuClick('/employees')}>List</div>
        <div className="employees__header--menu-item" onClick={() => handleMenuClick('/employees/add')}>Add</div>
        {pathSegments[2] === 'add' ? null : <div className="employees__header--menu-item" onClick={() => handleMenuClick('/employees/edit')}>Edit</div>}
      </div>
    </div>
  );
};