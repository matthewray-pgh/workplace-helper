import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home.jsx";
import { Employees } from "./Employees/Employees.jsx";
import { EmployeeDetails } from "./Employees/EmployeeDetails.jsx";
import { Schedule } from "./pages/Schedule.jsx";

import "./assets/styles/App.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/:id" element={<EmployeeDetails />} />
        <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


// TO DO LIST
// 1. Finish the EmployeeDetails page
// 2. Add availability to the EmployeeDetails page
// 4. side nav menu expand on hover
// 5. Loading indicator
// 6. Mobile menu
// 7. Responsive employee list (employee cards)