import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faGears, faGaugeHigh, faUsers, faClockFour } from '@fortawesome/free-solid-svg-icons';

import '../assets/styles/Layout.scss';

export const LayoutMain = ({children}) => {
  const {pathname} = useLocation();
  return (
    <div className="layout-main">
      <Sidebar/>
      <section className="layout-main__content">
        <h1>{pathname}</h1>
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
      <SideBarMenu/>
    </section>
  );
}

const SideBarMenu = () => {
  const navigate = useNavigate();
  return (
    <section className="layout-main__sidebar--menu">
      <div className="layout-main__sidebar--link" onClick={() => navigate('/')}>
        <FontAwesomeIcon icon={faGaugeHigh} className="layout-main__sidebar--link-icon" />
        <div className="layout-main__sidebar--link-text">Dashboard</div>
      </div>
      <div className="layout-main__sidebar--link" onClick={() => navigate('/employees')}>
        <FontAwesomeIcon icon={faUsers} className="layout-main__sidebar--link-icon" />
        <div className="layout-main__sidebar--link-text">People</div>
      </div>
      <div className="layout-main__sidebar--link" onClick={() => navigate('/schedule')}>
        <FontAwesomeIcon icon={faCalendar} className="layout-main__sidebar--link-icon" /> 
        <div className="layout-main__sidebar--link-text">Schedule</div> 
      </div>
      <div className="layout-main__sidebar--link" onClick={() => navigate('/shifts')}>
        <FontAwesomeIcon icon={faClockFour} className="layout-main__sidebar--link-icon" /> 
        <div className="layout-main__sidebar--link-text">Shifts</div> 
      </div>
      <div className="layout-main__sidebar--link" onClick={() => navigate('/settings')}>
        <FontAwesomeIcon icon={faGears} className="layout-main__sidebar--link-icon" /> 
        <div className="layout-main__sidebar--link-text">Settings</div> 
      </div>
    </section>
  )
};