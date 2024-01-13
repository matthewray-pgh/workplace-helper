import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faHouse, faUsers } from '@fortawesome/free-solid-svg-icons';


import '../assets/styles/Layout.scss';

export const LayoutMain = ({ contentComponent: ContentComponent }) => {
  return (
    <div className="layout-main">
      <Sidebar />
      <section className="layout-main__content">
        <ContentComponent />
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
  return (
    <section className="layout-main__sidebar--menu">
      <div className="layout-main__sidebar--link">
        <Link to="/">
          <FontAwesomeIcon icon={faHouse} className="layout-main__sidebar--link-icon" />
          <span>Home</span>
        </Link> 
      </div>
      <div className="layout-main__sidebar--link">
        <Link to="/employees">
          <FontAwesomeIcon icon={faUsers} className="layout-main__sidebar--link-icon" />
          <span>Employees</span>
        </Link>
      </div>
      <div className="layout-main__sidebar--link">
        <Link to="/about">
          <FontAwesomeIcon icon={faCalendar} className="layout-main__sidebar--link-icon" /> 
          <span>Schedule</span> 
        </Link>
      </div>
    </section>
  )
};