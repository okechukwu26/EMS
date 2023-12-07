/* eslint-disable @typescript-eslint/no-explicit-any */

// import userReducer, { initialState } from "../Service/reducer/userReducer";
// import { useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import DashboardContainer from "../components/DashboardContainer";
import EmployeeDashboard from "../components/EmployeeDashboard";
// import Employee from "../components/TeamLeadDashboard/Employee";

export const Home = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<DashboardContainer />} />
        {/* <Route path="/employee/:id" element={<Employee />} /> */}
      </Routes>
    </>
  );
};

export default Home;
