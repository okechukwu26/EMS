//import EmployeePage from "./EmployeePage";
import PayRise from "./PayRise";
// import Tabs from "./Tabs";
//import NewEmployee from "./newEmployee";
// import Tabs from "./Tabs";
// import NewEmployee from "./newEmployee";
import SettingsTab from "./SettingsComponents/SettingsTab";
import EmployeePage from "./EmployeePage";

const Dashboard = ({ step }: { step: number }) => {
  return (
    <>
      {step === 0 && <PayRise />}
      {step === 1 && <EmployeePage />}
      {step === 2 && <SettingsTab />}
    </>
  );
};

export default Dashboard;
