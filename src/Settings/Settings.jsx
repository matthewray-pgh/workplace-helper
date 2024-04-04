import React from "react";

import './Settings.scss';

export const Settings = () => {

  return (
    <main>
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