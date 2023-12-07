import {useState, useEffect} from 'react'
import {HRSideBar, TeamLeadSideBar, EmployeeSideBar} from '../Sidebar';


interface Props {
  step: number;
  selectStep: (step: number) => void;
}
const Sidebar = ({ step, selectStep }: Props) => {

  const [role, setRole] = useState("");
  const [isTeamLead, setIsTeamLead] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user !== null) {
      
      setRole(JSON.parse(user).role);
      setIsTeamLead(JSON.parse(user).isTeamLead);
    }
  }, []);
  console.log(role);
  return <>
  {role === "HR" && <HRSideBar step={step} selectStep={(index) => selectStep(index)}/>}
  {(role === "EMPLOYEE" && !isTeamLead) && <EmployeeSideBar step={step} selectStep={(index) => selectStep(index)} />}
  {(role === "EMPLOYEE" && isTeamLead) && <TeamLeadSideBar step={step} selectStep={(index) => selectStep(index)}/>}
  </>;

}
export default Sidebar;


