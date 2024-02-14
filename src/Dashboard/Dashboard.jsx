import React from 'react';
import { get } from 'aws-amplify/api';

import './Dashboard.scss';

export const Dashboard = ({user}) => {

  // eslint-disable-next-line no-restricted-globals
  let uuid = self.crypto.randomUUID();
  console.log(uuid);

  return (
    <main>
      <h1>Dashboard</h1>
      {/* <p>Welcome {user.signInDetails.loginId}!</p> */}
    </main>
  );
};