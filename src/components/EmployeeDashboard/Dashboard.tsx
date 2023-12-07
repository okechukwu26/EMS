import { useState } from "react";
import EmployeeMetric from "./EmployeeMetric";
import Leave from "./Leave";
import Payrise from "./Payrise";

const Dashboard = () => {
  
  const [step, setStep] = useState(0);
  return (
    <>
      {step === 0 && <EmployeeMetric selectStep={(step) => setStep(step)} />}
      {step === 1 && <Leave selectStep={setStep} />}
      {step === 2 && <Payrise selectStep={setStep} />}
    </>
  );
};

export default Dashboard;
