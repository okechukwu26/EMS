import ProjectContainer from "./ProjectContainer";
import Employees from "./Employees";
import { useState } from "react";
import SettingsTab from "../HRDashboard/SettingsComponents/SettingsTab";
import Homepage from "./Homepage";
import Leave from "../HRDashboard/LeaveApproval";
import PayRise from "../HRDashboard/PayRise";
import { TopWrap1 } from "../EmployeeDashboard/Payrise";
import arrowLeft from "../../assets/images/arrow-left.svg";

const TeamLeadDashboard = ({ step }: { step: number }) => {
  const [index, setIndex] = useState(0)
  return (
    <>
      {step === 2 && <ProjectContainer />}
      {step === 1 && <Employees />}
      {step === 0 && index === 0 && <Homepage selectStep={(index) => setIndex(index)}/>}
      {index === 1 && (
      <>   
        <TopWrap1 >
              <img src={arrowLeft} alt=""  onClick={() => setIndex(0)} style={{cursor: "pointer"}}/> 
        </TopWrap1> 
        <Leave />
      </> 
      )}
      {index === 2 && (
      <>   
        <TopWrap1>
              <img src={arrowLeft} alt=""  onClick={() => setIndex(0)} style={{cursor: "pointer"}}/> 
        </TopWrap1> 
        <PayRise />
      </> 
      )}
      {/* {step === 3 && <Tabs />} */}
      {step === 3 && <SettingsTab />}
    </>
  );
};

export default TeamLeadDashboard;
