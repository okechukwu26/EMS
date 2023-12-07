import Dashboard from "./Dashboard";
import SettingsTab from "./SettingsComponents/SettingsTab";
const EmployeeDashboard = ({ step }: { step: number }) => {
  return (
    <>
      {step === 0 && <Dashboard />}
      {step === 1 && <SettingsTab />}
    </>
  );
};

export default EmployeeDashboard;
