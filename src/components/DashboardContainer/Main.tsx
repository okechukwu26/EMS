import React, { useEffect, useState } from "react";

import HRDashboard from "../HRDashboard";
import EmployeeDashboard from "../EmployeeDashboard";
import TeamLeadDashboard from "../TeamLeadDashboard";

interface User {
  role: string;
  isTeamLead: boolean;
}

const MainComponent = ({ step }: { step: number }) => {
  const [user, setUser] = useState({} as User);








  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user !== null) {
      const { role, isTeamLead } = JSON.parse(user);
      setUser({ role, isTeamLead });
    }
  }, []);

  return (
    <>
      {user.role === "HR" && <HRDashboard step={step} />}
      {user.role === "EMPLOYEE" && !user.isTeamLead && <EmployeeDashboard step={step} />}
      {user.role === "EMPLOYEE" && user.isTeamLead && <TeamLeadDashboard step={step} />}
    </>
  );
};

export default MainComponent;
