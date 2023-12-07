/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "./Navbar";
import Main from "./Main";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import {Search} from "../../api/payRise"
export interface PAYRISE {
  firstName: string;
  lastName: string;
  image: string;
  id: string;
  department: string;
  currentPay: number;
  proposedPay: number;
  status: string;
}

const DashBoardContainer = () => {
  const [step, setStep] = useState<number>(0);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (!token || !user) {
      navigate("/login");
    }
  });
  return (
    <ParentContainer>
      <Component1>
        <Sidebar step={step} selectStep={(step: number) => setStep(step)} />
      </Component1>
      <Component2>
        <Navbar step={step} selectStep={(step: number) => setStep(step)} />
        <Main step={step} />
      </Component2>
    </ParentContainer>
  );
};
const ParentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  column-gap: 20px;
  background: #f9fafb;

  /* overflow: hidden; */

  @media screen and (min-width: 840px) {
    grid-template-columns: 20% 80%;
  }
`;

const Component1 = styled.div`
  display: none;

  @media screen and (min-width: 840px) {
    display: block;
  }
`;

const Component2 = styled.div`
  width: 100%;
  background: #f9fafb;
  @media screen and (min-width: 840px) {
  }
`;

export default DashBoardContainer;
