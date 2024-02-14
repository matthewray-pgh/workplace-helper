import React from "react";

import './Settings.scss';

export const Settings = () => {

  return (
    <main>
      <h1>Settings</h1>
      <div className="settings">
        <div className="settings__item">
          Shifts
        </div>
        <div className="settings__item">
          Employees
        </div>
        <div className="settings__item">
          Administrative
        </div>
      </div>
    </main>
  );
}