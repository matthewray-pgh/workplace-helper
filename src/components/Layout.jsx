import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faGears, faGaugeHigh, faUsers, faClockFour, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

import '../assets/styles/Layout.scss';

export const LayoutMain = ({children}) => {
  return (
    <div className="layout-main">
      <MobileHeaderBar />
      <Sidebar/>
      <section className="layout-main__content">
        {children}
      </section>
    </div>
  );
};

const MobileHeaderBar = () => {
  const [ showMenu, setShowMenu ] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
    <section className="layout-main__mobile-header">
      <div className="layout-main__mobile-header--header">
        App Name
      </div>
      <div>
        <FontAwesomeIcon icon={showMenu ? faTimes: faBars} 
          className="layout-main__mobile-header--link-icon" 
          onClick={() => handleMenuToggle()}/>
      </div>
    </section>

    <section className={`layout-main__mobile-nav-menu ${showMenu ? 
      "layout-main__mobile-nav-menu--show" : 
      "layout-main__mobile-nav-menu--hide"}`}>
      {showMenu && <MobileNavMenu menuToggleFunc={handleMenuToggle}/>}
    </section>
    </>
  )
}

const MobileNavMenu = ({menuToggleFunc}) => {

  const navigate = useNavigate();

  const handleMenuItemClick =(path) => {
    navigate(path);
    menuToggleFunc();
  }

  return (
    <section className="layout-main__mobile-nav">
      <div className="layout-main__mobile-nav--link" onClick={() => handleMenuItemClick('/')}>
        <FontAwesomeIcon icon={faGaugeHigh} className="layout-main__mobile-nav--link-icon" />
        <div className="layout-main__mobile-nav--link-text">Dashboard</div>
      </div>
      <div className="layout-main__mobile-nav--link" onClick={() => handleMenuItemClick('/employees')}>
        <FontAwesomeIcon icon={faUsers} className="layout-main__mobile-nav--link-icon" />
        <div className="layout-main__mobile-nav--link-text">People</div>
      </div>
      <div className="layout-main__mobile-nav--link" onClick={() => handleMenuItemClick('/schedule')}>
        <FontAwesomeIcon icon={faCalendar} className="layout-main__mobile-nav--link-icon" /> 
        <div className="layout-main__mobile-nav--link-text">Schedule</div> 
      </div>
      <div className="layout-main__mobile-nav--link" onClick={() => handleMenuItemClick('/shifts')}>
        <FontAwesomeIcon icon={faClockFour} className="layout-main__mobile-nav--link-icon" /> 
        <div className="layout-main__mobile-nav--link-text">Shifts</div> 
      </div>
      <div className="layout-main__mobile-nav--link" onClick={() => handleMenuItemClick('/settings')}>
        <FontAwesomeIcon icon={faGears} className="layout-main__mobile-nav--link-icon" /> 
        <div className="layout-main__mobile-nav--link-text">Settings</div> 
      </div>
    </section>
  )
}

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