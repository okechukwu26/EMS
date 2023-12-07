import { Routes, Route } from "react-router-dom";
import { Login, Home, Forgot, Reset, Register, Verify } from "./pages";
// import Tabs from "./components/HRDashboard/Tabs";
// import UpdateEmployee from "./components/HRDashboard/UpdateEmployee";
// import TaskTable from "./components/EmployeeDashboard/TaskTable";
//import Tabs from "./components/Settings/Tabs";
import Tabs from "./components/HRDashboard/Tabs";
import UpdateEmployee from "./components/HRDashboard/UpdateEmployee";
import Employees from "./components/employees";
import FormSlab from "./components/HRDashboard/SettingsComponents/formSlab";

function App() {
  return (
    <>
      <Routes>
        <Route path="/dashboard/*" element={<Home />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/reset-password" element={<Reset />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        {/* <Route path="/task-table" element={<TaskTable />} /> */}
        <Route path="/settings" element={<Tabs />} />
        <Route path="/update-Emp" element={<UpdateEmployee />} />
        <Route path="/employees" element={<Employees step={0} />} />
        <Route path="/form" element={<FormSlab />} />
      </Routes>
    </>
  );
}

export default App;
