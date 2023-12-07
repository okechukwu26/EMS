/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState, useEffect } from "react";
import salary from "../../assets/images/salary.svg";
import project from "../../assets/images/project.svg";
import { LuArrowDownUp } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import {TASK,PROJECT, Progress} from "../EmployeeDashboard/EmployeeMetric"
import { StyledTh } from "../HRDashboard/LeaveApproval";

import styled from "styled-components";
import {
  Border,
  Text,
  Header,
  PayRiseContainer,
} from "../HRDashboard/PayIncrease";
import FilterComponent from "../common/FilterComponent";
import { getProjects } from "../../api/project";


const Homepage = ({ selectStep }: { selectStep: (step: number) => void }) => {
  // const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();
  const Project = useSelector((state: any) => state.project);
  const [Salary, setSalary] = useState("")

  useEffect(() => {
    getProjects(dispatch);
  }, []);
  useEffect(() =>{
    const user = localStorage.getItem("user")
    if(user !== null){
      const  {salary} = JSON.parse(user)
      setSalary(salary)

    }

  }, [])

  const handleKey = (key: ChangeEvent<HTMLInputElement>) => {
    console.log(key);
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

  return (
    <>
  
<GeneralWrap>
       <WrapSelect>
       <PayRiseContainer>
          <Border />

          <Text>Employee Metrics</Text>
        </PayRiseContainer>

          <WrapSelect1
        
          >
            <Option1>
              <select onChange={handleOptionChange} defaultValue="this_month">
                <option value="this_year">This year</option>
                <option value="6_months">6 months</option>
                <option value="3_months">3 months</option>
                <option value="this_month">This month</option>
                <option value="this_week">This week</option>
                {/* Add more options as needed */}
              </select>
            </Option1>

            <Option >
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
              <p>&#x20A6;{Salary}</p>
              <p>Salary</p>
            </div>
          </Panel>
         
          <Panel>
            <img src={project} alt="" />
            <div>
              <p>{Project.getProject.length}</p>
              <p>Total Project</p>
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
        {Project.getProject.length === 0 ? (
          <Text>No project has been created yet</Text>
        ) : (
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
                
                  <StyledTh>Progress</StyledTh>
                </StyledTr>
              </thead>
              <tbody>
                {Project.getProject.map((project:PROJECT) => {
                  return project.task.map((task:TASK) => (
                    <tr key={task.id}>
                      <td>{project.projectTitle}</td>
                      <td>{project.priority}</td>
                  <td>{new Date(project.startDate).toLocaleDateString('en-US')}</td>
                  <td>{new Date(project.endDate).toLocaleDateString('en-US')}</td>
                  <td>{task.title}</td>
                  <td><Progress $priority={project.priority} $status={task.status} /></td>
                    </tr>
                  ));
                })}

                {/* <tr>
                <td>Eko Hotels and Suites</td>
                <td>
                  <button type="button" style={{ color: buttonColor(45) }}>
                    HIGH
                  </button>
                </td>
                <td>01/01/2021</td>
                <td>01/01/2021</td>
                <td>Develop deck for IBM pitch</td>
                <td>5</td>
                <td>
                  {" "}
                  <ProgressBar
             
                    value="45"
                    max="100"
                    color={progressBarColor(45)}
                  >
                    20%
                  </ProgressBar>
                </td>
              </tr>
              <tr>
                <td>Eko Hotels and Suites</td>
                <td>
                  <button type="button" style={{ color: buttonColor(20) }}>
                    LOW
                  </button>
                </td>
                <td>01/01/2021</td>
                <td>01/01/2021</td>
                <td>Build wireframe for atlantic corps</td>
                <td>5</td>
                <td>
                  {" "}
                  <ProgressBar
           
                    value="20"
                    max="100"
                    color={progressBarColor(20)}
                  >
                    20%
                  </ProgressBar>
                </td>
              </tr>
              <tr>
                <td>Eko Hotels and Suites</td>
                <td>
                  <button type="button" style={{ color: buttonColor(80) }}>
                    MID
                  </button>
                </td>
                <td>01/01/2021</td>
                <td>01/01/2021</td>
                <td>Domain and Hosting</td>
                <td>5</td>
                <td>
                  {" "}
                  <ProgressBar
                
                    value="80"
                    max="100"
                    color={progressBarColor(80)}
                  >
                    20%
                  </ProgressBar>
                </td>
              </tr> */}
              </tbody>
            </Table>
          </Container>
        )}
      </GeneralWrap>
    </>
  );
};

export default Homepage;

export const GeneralWrap = styled.div`
  padding: 30px;


  /* @media screen and (max-width: 960px){
     overflow: auto;
     width:20rem
   } */
`;
const Container = styled.div`
  @media screen and (max-width: 840px) {
    width: 20rem;
    overflow: auto;
  }
`;

export const WrapSelect = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top:1.5rem;
  @media screen and (max-width: 992px) {
    flex-direction: column;
  }
`;

export const WrapSelect1 = styled.div`
  display: flex;
  flex-direction: flex-end;
  //gap: 8px;
`;
export const Option = styled.div`
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

export const Option1 = styled.div`
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
    font-weight: 600;
    color: #000000;
    cursor: pointer;
  }
`;

export const Panels = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;

  @media screen and (max-width: 840px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 12px;
  }
`;

export const Panel = styled.div`
  background-color: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  margin-top: 30px;
  display: flex;
  //justify-content: space-between;
  /* align-items: ; */
  width: 13rem;
  height: 60px;
  padding: 16px 16px;
  border-radius: 12px;
  border: 1px solid #eaecf0;
  gap: 10px;
  img {
    width: 32px;
    height: 32px;
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
    width: auto;
    p {
      padding: 0;
      margin: 0;
    }
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  margin-top: 30px;
  margin-bottom: 30px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #eaecf0;
  tr {
    border-bottom: 1px solid #eaecf0;
  }
  td,
  th {
    padding: 16px;
    text-align: left;
    font-size: 14px;
    font-weight: 500;
    color: #000000;
  }
  th {
    background-color: #f9fafb;
  }
  td {
    button {
      border: 4px solid white;
      background-color: #ffffff;
      border-radius: 5px;
      box-shadow: 0px 4px 10px 5px rgba(0, 0, 0, 0.05);
      color: {buttonColor(button.value)};
      font-size: 12px;
      font-weight: 500;
      padding: 4px 8px;
      border-radius: 5px;
      cursor: pointer;
    }
  }
`;

 const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 840px) {
    display: block;
  }
`;
 const SectionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 840px) {
    display: block;
  }
`;
