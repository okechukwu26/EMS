/* eslint-disable @typescript-eslint/no-explicit-any */
//import React, { ChangeEvent, useState } from "react";
//import { useDispatch } from "react-redux";
import { H1, TopWrap1 } from "./Payrise";
import line from "../../assets/images/Line 1.svg";
import attend from "../../assets/images/attendance.svg";
import leave from "../../assets/images/leave.svg";
import salary from "../../assets/images/salary.svg";
import task from "../../assets/images/task.svg";
import project from "../../assets/images/project.svg";
//import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  salary: number;
  department: string;
}

const EmployeePanel = () => {
  // const navigate = useNavigate();
  const [step, selectStep] = useState(0);
  const [user, setUser] = useState({} as User);
  // const [filter, setFilter] = useState<string>("");
  // const dispatch = useDispatch();

  const handleOptionChange = (event: any) => {
    const selectedValue = event.target.value;
    console.log(selectedValue);

    switch (selectedValue) {
      case "leaveRequest":
        selectStep(1); // Navigate to the Leave Request page
        break;
      case "payrise Request":
        selectStep(2); // Navigate to the Payrise Request page
        break;
      // Add more cases for other options as needed
      default:
        break;
    }
  };
  const menuItem = [
    { name: "Leave Request", value: "leaveRequest" },
    { name: "payrise Request ", value: "payrise Request" },
  ];

  return (
    <>
      <GeneralWrap>
        <WrapSelect>
          <TopWrap1>
            <img src={line} alt="" />
            <H1>Employee's Metric</H1>
          </TopWrap1>
          {/* Your other code */}
          <WrapSelect1>
            <Option1>
              <select onChange={handleOptionChange}>
                <option value="this_year">This year</option>
                <option value="6_months">6 months</option>
                <option value="3_months">3 months</option>
                <option value="this_month">This month</option>
                <option value="this_week">This week</option>
                {/* Add more options as needed */}
              </select>
            </Option1>

            <Option>
              <select onChange={handleOptionChange}>
                <option value="">Request Form</option>
                {menuItem.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
            </Option>
          </WrapSelect1>
          {/* <Button>Request Form</Button> */}
        </WrapSelect>
        <Panels>
          <Panel>
            <img src={salary} alt="" />
            <div>
              <p>125</p>
              <p>Total Attendance</p>
            </div>
          </Panel>
          <Panel>
            <img src={attend} alt="" />
            <div>
              <p>{user.salary ?? ""}</p>
              <p>Salary</p>
            </div>
          </Panel>
          <Panel>
            <img src={task} alt="" />
            <div>
              <p>51</p>
              <p>Assigned Task</p>
            </div>
          </Panel>
          <Panel>
            <img src={project} alt="" />
            <div>
              <p>25</p>
              <p>Assigned Project</p>
            </div>
          </Panel>
          <Panel>
            <img src={leave} alt="" />
            <div>
              <p>12</p>
              <p>Leave Days Remaining</p>
            </div>
          </Panel>
        </Panels>
      </GeneralWrap>
    </>
  );
};

export default EmployeePanel;

const GeneralWrap = styled.div`
  padding: 20px;
  width: 70%;
`;

const WrapSelect = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 992px) {
    flex-direction: column;
  }
`;

const WrapSelect1 = styled.div`
  display: flex;
  flex-direction: flex-end;
  //gap: 8px;
`;
const Option = styled.div`
  width: 10.5em;
  height: 3.25em;
  display: flex;
  justify-content: center;
  background-color: #f9fafb;
  color: #000000;
  select {
    border-radius: 12px;
    background-color: #27ae60;
    border: none;
    padding: 4px 8px;
    font-size: 14px;
    font-weight: 600;
    color: #ffffff;
    cursor: pointer;
  }
`;

const Option1 = styled.div`
  width: 8.5em;
  height: 3.25em;
  display: flex;
  justify-content: center;
  color: #000000;
  select {
    border-radius: 24px;
    background-color: #f2f4f7;
    border: none;
    padding: 4px 8px;
    font-size: 14px;
    font-family: Work Sans;
    font-weight: 600;
    color: #000000;
    cursor: pointer;
  }
`;

const Panels = styled.div`
  display: flex;
  // flex-wrap: wrap;
  gap: 8px;
  //   diplay: grid;
  //   grid-template-columns: repeat(3, 1fr);
  //   justify-content: space-around;

  @media screen and (max-width: 992px) {
    diplay: flex;
    flex-direction: column;
    width: 90%;
  }
  @media screen and (max-width: 500px) {
    display: grip;
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Panel = styled.div`
  width: auto;
  height: 70px;
  box-sizing: border-box;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  margin-top: 30px;
  display: flex;
  padding: 15px 7px;
  border-radius: 12px;
  border: 1px solid #eaecf0;
  gap: 8px;

  img {
    width: 32px;
    height: 32px;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: auto;
    p {
      padding: 0;
      margin: 0;
      font-size: 14px;
      font-family: Work Sans;
    }
  }
`;
