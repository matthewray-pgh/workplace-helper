import React from "react";

import { Amplify } from "aws-amplify";

import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import config from "./amplifyconfiguration.json";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LayoutMain } from "./components/Layout";
import { Dashboard } from "./Dashboard/Dashboard.jsx";
import { Employees } from "./Employees/Employees.jsx";
import { EmployeeDetails } from "./Employees/EmployeeDetails.jsx";
import { Schedule } from "./Schedule/Schedule.jsx";
import { Settings } from "./Settings/Settings.jsx";

import "./assets/styles/App.scss";

Amplify.configure(config);

function App() {
  return (
    <BrowserRouter>
      <Authenticator hideSignUp={true}>
        {({ signOut, user }) => (
          <LayoutMain signOut={signOut} user={user}>
            <Routes>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/employees/:id" element={<EmployeeDetails />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </LayoutMain>
        )}
      </Authenticator>
    </BrowserRouter>
  );
}

export default App;


// TO DO LIST
// 1. Add AWS API to access Dynamo DB
// 2. IMport employee data from Dynamo DB
// 3. Add admin functions to update employee data from json import file
// 4. side nav menu expand on hover
// 5. Loading indicator
// 6. Mobile menu
// 7. Responsive employee list (employee cards)