/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useEffect, useState } from "react";
import { TopWrap1 } from "../EmployeeDashboard/Payrise";

import salary from "../../assets/images/salary.svg";
import task from "../../assets/images/task.svg";
import project from "../../assets/images/project.svg";
import { LuArrowDownUp } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { StyledTh } from "../HRDashboard/LeaveApproval";

export interface TASK {
  id: string;
  status: string;
  startDate: Date;
  endDate: Date;
  project: PROJECT;
  title: string;
  description: string;
}
export interface PROJECT {
  id: string;
  projectTitle: string;
  priority: string;
  startDate: Date;
  endDate: Date;
  task:TASK[]
}

import styled from "styled-components";
import {
  Border,
  Text,
  Header,
  PayRiseContainer,
} from "../HRDashboard/PayIncrease";
import FilterComponent from "../common/FilterComponent";
import {
  GeneralWrap,
  Option,
  Option1,
  Panel,
  Panels,
  Table,

} from "../TeamLeadDashboard/Homepage";
import { MyTask, updateTask } from "../../api/task";
import { ClipLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";

const Homepage = ({ selectStep }: { selectStep: (step: number) => void }) => {
  const [step, setStep] = useState(0);
  const [id, setId] = useState("");

  const handleKey = (key: ChangeEvent<HTMLInputElement>) => {
    console.log(key);
  };
  const dispatch = useDispatch();
  const mytask = useSelector((state: any) => state.task.myTask);
  const loading = useSelector((state: any) => state.task.loading);
  const update = useSelector((state: any) => state.task.update);

  const [User, setUser] = useState("");
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user !== null) {
      const { salary } = JSON.parse(user);
      setUser(salary);
    }
  }, []);
  useEffect(() => {
    MyTask(dispatch);
  }, [update]);

  const Project = mytask.map((item: any) => item.project);
  Project.sort((a: any, b: any) => (a.id === b.id ? 0 : a.id > b.id ? 1 : -1));

  const handleChangeStatus = ({
    id,
    projectId,
    status,
  }: {
    id: string;
    projectId: string;
    status: string;
  }) => {
    const info = {
      id,
      projectId,
      status,
    };
    setId(id);
    updateTask(dispatch)(info);
  };

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

 

  const StyledTr = styled.tr`
    th,
    td {
      padding: 10px;
    }
  `;





  const buttonColors = {
    low: "red",
    mid: "yellow",
    high: "green",
  };

  const buttonColor = (value: number) => {
    if (value <= 20) {
      return buttonColors.low;
    } else if (value <= 50) {
      return buttonColors.mid;
    } else {
      return buttonColors.high;
    }
  };

  return (
    <>
      <GeneralWrap>
        <ToastContainer />
        <HeaderContainer>
          <TopWrap1 style={{ display: "inline" }}>
            <Text style={{ display: "inline", paddingLeft: "10px" }}>
              Employee's Metric
            </Text>
          </TopWrap1>

          <SectionContainer>
            <Option1>
              <select onChange={handleOptionChange} defaultValue="this_month">
                <option value="this_year">This year</option>
                <option value="6_months">6 months</option>
                <option value="3_months">3 months</option>
                <option value="this_month">This month</option>
                <option value="this_week">This week</option>
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
          </SectionContainer>
        </HeaderContainer>
        <Panels>
          <Panel>
            <img src={salary} alt="" />
            <div>
              <p> &#x20A6;{User}</p>
              <p>Salary</p>
            </div>
          </Panel>
          <Panel>
            <img src={task} alt="" />
            <div>
              <p>{mytask.length}</p>
              <p>Assigned Task</p>
            </div>
          </Panel>
          <Panel>
            <img src={project} alt="" />
            <div>
              <p>{Project.length}</p>
              <p>Assigned Project</p>
            </div>
          </Panel>
        </Panels>

        <Header>
          <PayRiseContainer>
            <Border />
            <Text>Ongoing Tasks</Text>
          </PayRiseContainer>
          <FilterComponent
            handleKey={handleKey}
            step={step}
            setStep={(step) => setStep(step)}
          />
        </Header>
        <Container>
          <Table>
            <thead>
              <StyledTr>
                <StyledTh>Project Name</StyledTh>
                <StyledTh>
                  Status
                  <LuArrowDownUp
                    style={{ color: "black", paddingLeft: "10px" }}
                  />
                </StyledTh>
                <StyledTh>Start date</StyledTh>
                <StyledTh>Due date</StyledTh>
                <StyledTh>Tasks</StyledTh>
                <StyledTh>Description</StyledTh>
                <StyledTh>Status</StyledTh>
                <StyledTh>Progress</StyledTh>
                <StyledTh>ChangeStatus</StyledTh>
              </StyledTr>
            </thead>
            <tbody>
              {mytask.map((item: TASK) => (
                <tr key={item.id}>
                  <td>{item.project.projectTitle}</td>
                  <td>
                    <button type="button" style={{ color: buttonColor(45) }}>
                      {item.project.priority}
                    </button>
                  </td>
                  <td>{dayjs(item.project.startDate).format("DD/MM/YYYY")}</td>
                  <td>{dayjs(item.project.endDate).format("DD/MM/YYYY")}</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.status}</td>
                  <td>
                    <Progress
                      $status={item.status}
                      $priority={item.project.priority}
                    />
                  </td>
                  <td>
                    <button
                      disabled={item.status === "completed"}
                      onClick={() =>
                        handleChangeStatus({
                          id: item.id,
                          projectId: item.project.id,
                          status:
                            item.status === "pending"
                              ? "progress"
                              : "completed",
                        })
                      }
                    >
                      <Loading>
                        <ClipLoader
                          color="green"
                          loading={loading && item.id === id}
                          size={10}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      </Loading>
                      {item.status === "pending" ? "progress" : "completed"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </GeneralWrap>
    </>
  );
};
export const Progress = styled.div<{
  $priority: string;

  $status: string;
}>`
  width: 100%;
  height: 0.2rem;
  background: ${(props) =>
    props.$priority === "HIGH"
      ? "#fecdca"
      : props.$priority === "MED"
      ? "#FEF0C7"
      : "#D1E9FF"};
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: ${({ $status }) =>
      $status === "pending" ? "0%" : $status === "progress" ? "50%" : "100%"};
    height: 100%;
    background: ${(props) =>
      props.$priority === "HIGH"
        ? "red"
        : props.$priority === "MED"
        ? "#FEC84B"
        : "#2E90FA"};
    animation: animate 5s linear infinite;
  }
`;

export const ProgressCompleted = styled.div`
  width: 100%;
  height: 0.2rem;
  background: #34a853;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #34a853;
    animation: animate 2s linear infinite;
  }
`;
const Loading = styled.span`
  margin-top: 5px;
  padding: 5px;
`;

const Container = styled.div`
  @media screen and (max-width:840px) {
    width: 20rem;
    overflow: auto;
  }
`;
export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 840px) {
    display: block;
  }
`;
export const SectionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 840px) {
    display: block;
  }
`;

export default Homepage;
