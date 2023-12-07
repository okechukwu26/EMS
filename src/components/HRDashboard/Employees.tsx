/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import styled from "styled-components";
import dot from "../../assets/images/dot.svg";
import line from "../../assets/images/Line1.svg";
import { FiAlignJustify } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployee } from "../../api/employee";
import AssignTask from "./AssignTask";

export enum ROLE {
  HR = "HR",
  EMPLOYEE = "EMPLOYEE",
}
export enum JOBTITLE {
  UI_UX = "UI/UX",
  SOFTWARE_ENGINEER = "SOFTWARE_ENGINEER",
  PROJECT_MANAGER = "PROJECT_MANAGER",
  DATA_ANALYTICS = "DATA_ANALYTICS",
}
export enum Department {
  Audit = "Audit",
  Tech = "Tech",
  Finance = "Finance",
}
export enum EmploymentStatus {
  INTERN = "INTERN",
  MEMBER = "MEMBER",
  TEAM_LEAD = "TEAM_LEAD",
}

export interface User {
  id: string;
  firstName: string;
  active: boolean;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: ROLE;
  employee_Department: Department;
  isEmployee: boolean;
  resetPasswordExpiration?: number | null;
  resetPasswordStatus?: boolean;
  resetPasswordCode: string | null;
  loginCount: number | null;
  loginRetrival: number | null;
  createdAt?: Date;
  DateOfBirth: Date | null;
  isTeamLead: boolean;
  employee_Status: EmploymentStatus;
  JobTitle: JOBTITLE;
  nameOfEmergencyContact: string | null;
  relationshipWithEmergencyContact: string | null;
  phoneNumberOfEmergencyContact: string | null;
  employeeId: string;
  preferredName: string;
  DateOfEmployment: Date | null;
  WorkLocation: string | null;
  salary: string | null;
  workSchedule: string | null;
  bankName: string | null;
  accountNumber: string | null;
  accountName: string | null;
}

const Employees = ({
  selectStep,
  selectEmployeeId,
}: {
  selectStep: (step: number) => void;
  selectEmployeeId: (step: string) => void;
}) => {

  const [modal, setModal] = useState(false);
  const [modalId, setModalId] = useState("");

  const dispatch = useDispatch() as unknown as any;

  const [step, setStep] = useState("Audit");

  const [isVisible, setIsVisible] = useState(true);

  const employeeDepartment = [
    {
      department: "Audit",
    },

    {
      department: "Tech",
    },
    {
      department: "Finance",
    },
  ];

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const employees = useSelector((state: any) => state.employee.employees);

  const employeesList = employees?.filter(
    (data: User) => data.employee_Department === step
  );

  useEffect(() => {
    getEmployee(dispatch);
  }, []);

  const openModel = (id: string) => {
    setModal(!modal);
    setModalId(id);
  };

  return (
    <>
      <Container>
        <Main>
          <Container1>
            <Cart>
              <h3 style={{ fontFamily: "Work Sans"}}>
                <span style={{ marginRight: "5px", fontFamily: "Work Sans" }}>
                  <img src={line} alt="" />
                </span>
                Employees
              </h3>
              <Button
                style={{ cursor: "pointer" }}
                onClick={() => selectStep(2)}
              >
                Add Employee
              </Button>
            </Cart>
            <MobileToggleIcon
              onClick={toggleVisibility}
              style={{ marginLeft: "50px" }}
            >
              <FiAlignJustify />
            </MobileToggleIcon>
            {isVisible && (
              <Panel>
                {employeeDepartment.map((data, index) => (
                  <Btn
                    className="active"
                    key={index}
                    $selectDept={step}
                    $selected={data.department}
                    onClick={() => setStep(data.department)}
                  >
                    {data.department}
                  </Btn>
                ))}
              </Panel>
            )}
            <Grid>
              {employeesList.length > 0 ? (
                employeesList?.map((data: any, index: number) => (
                  <React.Fragment key={index}>
                    {
                      <Content $id={data.id} $selectedId={modalId}>
                        <Bind>
                          <img
                            src={dot}
                            alt=""
                            onClick={() => {
                              selectStep(1);
                              selectEmployeeId(data.id);
                            }}
                          />
                        </Bind>
                        <Avatar>
                          <img
                            src={data.image || data.avatarI}
                            alt="avatar"
                            style={{
                              borderRadius: "50%",
                              width: "60px",
                              height: "60px",
                              border: "4px solid #D1FADF",
                              objectFit:"cover"
                            }}
                          />
                        </Avatar>
                        <div>
                          <Txt>{data.firstName + " " + data.lastName}</Txt>
                          <Para>{data.JobTitle}</Para>
                          <NewDiv>
                            <Para1>5 Tasks</Para1>
                            <Para2>20%</Para2>
                          </NewDiv>
                          <ButtonDiv>
                            <Button2 onClick={() => openModel(data.id)}>
                              Assign task
                            </Button2>
                          </ButtonDiv>
                          {modal && modalId === data.id && (
                            <AssignContainer $selectedId={modalId}>
                              <AssignTask id={data.id} />
                            </AssignContainer>
                          )}
                        </div>
                      </Content>
                    }
                  </React.Fragment>
                ))
              ) : (
                <p>No {step} Employees</p>
              )}
            </Grid>
          </Container1>
        </Main>
      </Container>
    </>
  );
};

const AssignContainer = styled.div<{ $selectedId:string }>`
  z-index: ${({ $selectedId }) => ($selectedId === null ? "-1" : "1500")};
  position: relative;
`;

const MobileToggleIcon = styled.div`
  display: none;
  cursor: pointer;
  margin-left: 30px;
  font-size: 20px;

  @media (max-width: 430px) {
    display: block;
  }

  @media (max-width: 820px) {
    display: block;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 18rem auto auto auto;
  grid-gap: 10px;
  background-color: #f9fafb;
  z-index: -10;
  z-index: 0;
  position: relative;
  @media (max-width: 768px) {
    // display: none;
  }
`;
const Main = styled.div`
  grid-column-end: span 3;
  z-index: 1;
`;

const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
  z-index: 1;
  // align-items:center;
  width: 90%;
  height: 90%;
`;
const Cart = styled.div`
  display: flex;
  padding: 0px 30px;
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 30px;

  @media (max-width: 430px) {
    flex-direction: column;
    margin-left: 10px;
  }

  @media (max-width: 820px) {
    flex-direction: column;
    margin-left: 30px;
  }
`;

const Panel = styled.div`
display:flex;
align-items:center;
padding:0px 2px;
justify-content:space-between;
margin-bottom:10px;
margin-left:30px;

  /* display: flex;
  align-items: center;
  padding: 0px 2px;
  justify-content: space-between;
  margin-left: 30px;

  @media screen and (max-width: 840px) {
    flex-direction: row;
    align-items: flex-start;
    margin-left: 100px;
  }

  @media (max-width: 820px) {
    flex-direction: column;
    align-items: flex-start;
    margin-left: 10px;
  }

  .active {
    // background: white;
    height: 100%;
    border-radius: 10px;
  } */
`;

const Content = styled.div<{ $id: string; $selectedId: string }>`
  background-color: white;
  margin-right: 0px;
  justify-content: center;
  padding: 10px 24px;
  border: 1px solid #dcdfe5;
  border-radius:10px;
margin-top:4px;
  align-items: center;
  margin-bottom: 36px;
  height: 250px;
  width: 187px;
  margin-left: 20px;
  position: relative;
  z-index: ${({ $id, $selectedId }) => ($id === $selectedId ? "1000" : "300")};

  @media screen and (max-width: 820px) {
    margin-left: 30px;
  }
`;

const NewDiv = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0px, 35px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  // flex-wrap: wrap;
  justify-content: space-between;
  margin-left: 30px;
  z-index: 0;
  @media screen and (max-width: 430px) {
    grid-template-columns: repeat(1, 1fr);
    margin-left: 30px;
    width: fit-content;
  }

  @media screen and (max-width: 820px) {
    grid-template-columns: repeat(1, 1fr);
    margin-left: 30px;
    width: fit-content;
  }
`;

const Para = styled.p`
  color: var(--Gray-4, #bdbdbd);
  font-family: Work Sans;
  font-size: 12px;
  font-weight: 300;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: center;
  margin-top: -10px;
`;

const Txt = styled.h4`
   font-family: Work Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  
`;

export const Avatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Bind = styled.div`
  position: relative;
  left: 160px;
`;
const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button2 = styled.button`
  cursor: pointer;
  border: 1px solid #dcdfe5;
  padding:6px 25px;
  border-radius:5px;
  background:#fff;

  @media screen and (max-width: 600px) {
  }

  @media screen and (max-width: 992px) {
  }
`;
const Btn = styled.button<{$selected:string, $selectDept:string}>`
  color: ${({$selected, $selectDept}) => $selected === $selectDept ? "#fff":"#0000008a"} ;
  font-family: Work Sans;
  padding: 12px 24px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius:15px;
  height: 48px;
  width: 122x;
  margin-left: 20px;
  background:${({$selected, $selectDept}) => $selected === $selectDept && "green"}

`;

const Button = styled.button`
  width: 123px;
  height: 36px;
  padding: 8px 16px 8px 16px;
  border-radius: 12px;
  font-family: Work Sans;
  gap: 10px;
  background: #27ae60;
  border: none;
  color: white;
`;
const Para1 = styled.p`
  font-family: Work Sans;
  font-size: 14px;
  font-weight: 400;
  line-height: 17px;
  letter-spacing: 0em;
  color: #d0d5dd;
`;

const Para2 = styled.p`
  font-family: Work Sans;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 0em;
  text-align: left;
  color: #101828;
`;
export default Employees;
