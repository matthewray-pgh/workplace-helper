import React from 'react';

import './Dashboard.scss';

export const Dashboard = ({user}) => {

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Welcome {user.signInDetails.loginId}!</p>
    </main>
  );
};