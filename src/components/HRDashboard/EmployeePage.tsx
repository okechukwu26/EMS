import { useState } from "react";

import Employees from "./Employees";
import Employee from "./Employee";
import NewEmployee from "./newEmployee";
import UpdateEmployee from "./UpdateEmployee";



const EmployeePage = () => {
  
  const [step, setStep] = useState(0);
  const [employeeId, setEmployeeId] = useState("");
  return<>
    {step === 0 && <Employees selectStep={(step) => setStep(step)} selectEmployeeId={(step: string) => setEmployeeId(step)} />}
    {step === 1 && <Employee selectStep={setStep} employeeId={employeeId}  />}
    {step === 2 && <NewEmployee selectStep={ setStep} />}
    {/* {step === 3 && <UpdateEmployee selectStep={ setStep} />} */}
  </>
  
};

export default EmployeePage;
