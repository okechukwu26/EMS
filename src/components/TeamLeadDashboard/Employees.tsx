/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";
import dot from "../../assets/images/dot.svg";
import line from "../../assets/images/Line1.svg";
import { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployee } from "../../api/employee";
import AssignTask from "../HRDashboard/AssignTask";
export enum Department {
  Audit = "Audit",
  Tech = "Tech",
  Finance = "Finance",
}
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
  image: string;
}

const Employees = () => {
  const dispatch = useDispatch()
  const [modal, setModal] = useState(false);
  const [modalId, setModalId] = useState("");

  const [selectedDepartment] = useState();

  const userObj = localStorage.getItem("user");

  const employees = useSelector((state: any) => state.employee.employees);
  console.log(employees);

  const employeesList = employees?.filter(
    (data: User) =>
      userObj &&
      data.employee_Department === JSON.parse(userObj).employee_Department
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
              <h3>
                <span style={{ marginRight: "5px" }}>
                  <img src={line} alt="" />
                </span>
                TeamLead's Department
              </h3>
            </Cart>

            <Grid>
              {employeesList.length > 0 ? (
                employeesList?.map((data: any, index: number) => (
                  <Fragment key={index}>
                    <Content>
                      <Bind>
                        <img
                          src={dot}
                          alt=""
                        
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
                  </Fragment>
                ))
              ) : (
                <p>No {selectedDepartment} Employees</p>
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

const Container = styled.div`
  display: grid;
  grid-template-columns: 18rem auto auto auto;
  grid-gap: 10px;
  background-color: #f9fafb;
  z-index: -10;
  @media (max-width: 768px) {
    // display: none;
  }
`;
const Main = styled.div`
  grid-column-end: span 3;
`;

const Container1 = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f9fafb;
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
  color: green;

  @media (max-width: 430px) {
    flex-direction: column;
    margin-left: 10px;
  }

  @media (max-width: 820px) {
    flex-direction: column;
    margin-left: 30px;
  }
`;

const Content = styled.div`
  background-color: white;
  margin-right: 0px;
  justify-content: center;
  padding: 10px 24px;
  align-items: center;
  margin-bottom: 36px;
  height: 250px;
  width: 187px;
  margin-left: 20px;

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
  font-family: Lato;
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

const Avatar = styled.div`
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

  @media screen and (max-width: 600px) {
  }

  @media screen and (max-width: 992px) {
  }
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
