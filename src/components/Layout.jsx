import React from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faHouse, faUsers } from '@fortawesome/free-solid-svg-icons';


import '../assets/styles/Layout.scss';

export const LayoutMain = ({children}) => {
  return (
    <div className="layout-main">
      <Sidebar />
      <section className="layout-main__content">
        {children}
      </section>
    </div>
  );
};

const Sidebar = () => {
  return (
    <section className="layout-main__sidebar">
      <div className="layout-main__sidebar--header">
        App Name
      </div>
      <SideBarMenu />
    </section>
  );
}

const SideBarMenu = () => {
  const navigate = useNavigate();
  return (
    <section className="layout-main__sidebar--menu">
      <div className="layout-main__sidebar--link" onClick={() => navigate('/')}>
        <FontAwesomeIcon icon={faHouse} className="layout-main__sidebar--link-icon" />
        <div className="layout-main__sidebar--link-text">Home</div>
      </div>
      <div className="layout-main__sidebar--link" onClick={() => navigate('/employees')}>
        <FontAwesomeIcon icon={faUsers} className="layout-main__sidebar--link-icon" />
        <div className="layout-main__sidebar--link-text">Employees</div>
      </div>
      <div className="layout-main__sidebar--link" onClick={() => navigate('/schedule')}>
        <FontAwesomeIcon icon={faCalendar} className="layout-main__sidebar--link-icon" /> 
        <div className="layout-main__sidebar--link-text">Schedule</div> 
      </div>
    </section>
  )
};