import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LayoutMain } from "./components/Layout";
import { Shifts } from "./Shifts/Shifts.jsx";
import { Dashboard } from "./Dashboard/Dashboard.jsx";
import { Employees } from "./Employees/Employees.jsx";
import { EmployeeDetails } from "./Employees/EmployeeDetails.jsx";
import { Schedule } from "./Schedule/Schedule.jsx";
import { Settings } from "./Settings/Settings.jsx";
import { Admin } from "./Admin/Admin.jsx";

import "./assets/styles/App.scss";

function App() {
  return (
    <BrowserRouter>
      <LayoutMain>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/employees/:id" element={<EmployeeDetails />} />
          <Route path="/shifts" element={<Shifts />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </LayoutMain>
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