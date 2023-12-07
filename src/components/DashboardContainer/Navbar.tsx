/* eslint-disable @typescript-eslint/no-explicit-any */

import {  useEffect, useState } from "react";
import { HRNavBar, EmployeeNavBar, TeamLeadNavBar } from "../NavBar";
import { useSelector, useDispatch } from "react-redux";
import { Search } from "../../api/payRise";

export interface PAYRISE {
  firstName: string;
  lastName: string;
  image: string;
  id: string;
  department: string;
  currentPay: number;
  proposedPay: number;
  status: string;
user:{
  image:string
}
}
interface Props {
  step: number;

  selectStep: (bar: number) => void;
}
export interface User {
  firstName: string;
  lastName: string;
  role: string;
  isTeamLead: boolean;
}
const Navbar = ({ step, selectStep }: Props) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [user, setUser] = useState({} as User);
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user !== null) {
      const { role, firstName, lastName, isTeamLead } = JSON.parse(user);
      setUser({ role, firstName, lastName, isTeamLead });
    }
  }, []);
  const payRise = useSelector((state: any) => state.payRise.payRise);
  const handleSearch = (search: string) => {
    const result = payRise.filter(
      (item: PAYRISE) =>
        item.firstName.toLowerCase().includes(search.toLowerCase()) ||
        item.lastName.toLowerCase().includes(search.toLowerCase())
    );


    const data = {
      result,
      search,
    };
    Search(dispatch)(data);
  };

  return (
    <>
      {user.role === "HR" && (
        <HRNavBar
          sidebar={sidebar}
          selectStep={(index) => selectStep(index)}
          step={step}
          onChange={handleSearch}
          changeSearch={() => setSearch(search)}
          selectSidebar={() => setSidebar(!sidebar)}
          user={user}
        />
      )}
      {user.role === "EMPLOYEE" && !user.isTeamLead && (
        <EmployeeNavBar
          sidebar={sidebar}
          selectStep={(index) => selectStep(index)}
          step={step}
          selectSidebar={() => setSidebar(!sidebar)}
        
        />
      )}
      {user.role === "EMPLOYEE" && user.isTeamLead && (
        <TeamLeadNavBar
        sidebar={sidebar}
        selectStep={(index) => selectStep(index)}
        step={step}
        selectSidebar={() => setSidebar(!sidebar)}
        />
      )}
    </>
  );
};

export default Navbar;



