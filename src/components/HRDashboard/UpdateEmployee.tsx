import arrowLeft from "../../assets/images/arrow-left.svg";
import avatar from "../../assets/images/avatar.png";
import styled from "styled-components";
import { useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../api/user";

import {
  Container,
  Main,
  Content,
  TopWrap1,
  H1,
  InputContainer,
  Div,
  Label,
  Input,
  Select,
  Wrap,
  Button,
} from "../EmployeeDashboard/Payrise";

export interface employeeFormData {
  employeeId?: string;
  firstName: string;
  lastName: string;
  employee_Department: string;
  phone: string;
  email: string;
  DateOfBirth: string;
  preferredName: string;
  DateOfEmployment: Date;
  WorkLocation: string;
  JobTitle: string;
  EmploymentStatus: string;
  workSchedule: string;
  salary: string;
  isTeamLead: boolean;
  nameOfEmergencyContact: string;
  relationshipWithEmergencyContact: string;
  phoneNumberOfEmergencyContact: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  endTime: string;
  startTime: string;
  image: string;
}

interface User {
  // employeeId: string;
  firstName: string;
  lastName: string;
  DateOfBirth: string;
  email: string;
  //   department: string;
  DateOfEmployment: Date;
  //   WorkLocation: string;
  //   JobTitle: string;
  //   employee_Status: string;
  //   workSchedule: string;
  //   salary: string;
  //   nameOfEmergencyContact: string;
  //   relationshipWithEmergencyContact: string;
  //   phoneNumberOfEmergencyContact: string;
  //   bankName: string;
  //   accountNumber: string;
  //   accountName: string;
  //   endTime: string;
  //   startTime: string;
}
const UpdateEmployee = () => {
  const [formData, setFormData] = useState<employeeFormData>({
    firstName: "",
    lastName: "",
    employee_Department: "",
    phone: "",
    email: "",
    isTeamLead: false,
    DateOfBirth: "",
    preferredName: "",
    DateOfEmployment: new Date(),
    WorkLocation: "",
    JobTitle: "",
    EmploymentStatus: "",
    workSchedule: "",
    salary: "",
    nameOfEmergencyContact: "",
    relationshipWithEmergencyContact: "",
    phoneNumberOfEmergencyContact: "",
    bankName: "",
    accountNumber: "",
    accountName: "",
    endTime: "",
    startTime: "",
  });
  const dispatch = useDispatch();
  const [error, setError] = useState({} as employeeFormData);
  const [isChecked, setIsChecked] = useState(false);
  const [showOtherBankInput, setShowOtherBankInput] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    console.log(value, name);

    if (name === "bankName" && value === "other") {
      console.log("other bank selected");
      setShowOtherBankInput(true);
    }
    setFormData({ ...formData, [name]: value });
    if (value === "") {
      setError({ ...error, [name]: "This field is required" });
    } else {
      setError({ ...error, [name]: "" });
    }
    // const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    e.preventDefault();
    console.log(formData);

    registerUser(dispatch)(formData);
  };
  console.log(formData);

  return (
    <>
      <Container>
        <Main>
          <form onSubmit={handleSubmit}>
            <Content>
              <TopWrap>
                <TopWrap1>
                  {/* <img src="../images/arrow-left.svg" alt="" />*/}
                  <img src={arrowLeft} alt="" />
                  <img src="../images/Line1.svg" alt="" />
                  <H1>Update Employee Form</H1>
                </TopWrap1>

                <TopWrap1>
                  <Button onClick={handleSubmit}>Submit</Button>
                </TopWrap1>
              </TopWrap>

              <div>
                <H1>Personal Information</H1>
                <div style={{ display: "flex", gap: "10%" }}>
                  <img
                    src={avatar}
                    alt=""
                    style={{ height: "100px", paddingBottom: "50px" }}
                  />
                  <TopWrap1>
                    <UplaodInput type="file" />
                    {/* <label htmlFor="file-upload">Choose a file:</label>
                    <StyledInput id="file-upload" /> */}

                    <DelBtn onClick={handleSubmit}>Delete</DelBtn>
                  </TopWrap1>
                </div>

                <InputContainer>
                  <Div>
                    <Label htmlFor="e-id">Employee Id</Label>
                    <Input
                      type="text"
                      id="e-id"
                      value={formData.employeeId ?? ""}
                      disabled={true}
                    />
                  </Div>

                  <Div>
                    <Label htmlFor="fname">First Name</Label>
                    <Input
                      type="text"
                      id="fname"
                      name="firstName"
                      //   ormDavalue={f.firstName ?? ""}
                      disabled={true}
                    />
                    {error.firstName && (
                      <p style={{ color: "red" }}>{error.firstName}</p>
                    )}
                  </Div>

                  <Div>
                    <Label htmlFor="lname">Last Name</Label>
                    <Input
                      type="text"
                      id="lname"
                      name="lastName"
                      disabled={true}
                    />
                    {error.lastName && (
                      <p style={{ color: "red" }}>{error.lastName}</p>
                    )}
                  </Div>

                  <Div>
                    <Label htmlFor="d2">Date Of Birth</Label>
                    <Input type="date" id="d2" name="date" disabled={true} />
                    {error.DateOfBirth && (
                      <p style={{ color: "red" }}>{error.DateOfBirth}</p>
                    )}
                  </Div>

                  <Div>
                    <Label htmlFor="lname">Preferred Name</Label>
                    <Input
                      type="text"
                      id="preferredName"
                      name="preferredName"
                      placeholder=""
                      onChange={handleChange}
                    />
                    {error.preferredName && (
                      <p style={{ color: "red" }}>{error.preferredName}</p>
                    )}
                  </Div>

                  <Div>
                    <Label htmlFor="e-status">Email</Label>
                    <Input
                      type="text"
                      id="email"
                      name="email"
                      disabled={true}
                    />
                    {error.email && (
                      <p style={{ color: "red" }}>{error.email}</p>
                    )}
                  </Div>
                </InputContainer>

                {/* EMPLOYMENT INFORMATION SECTION */}
                <Wrap>
                  <H1>Employment Information</H1>
                  <InputContainer>
                    <Div>
                      <Label htmlFor="dept">Department</Label>
                      <Select
                        id="dept"
                        name="department"
                        onChange={handleChange}
                      >
                        <option value="Tech">Tech</option>
                        <option value="HR">HR</option>
                        <option value="Audit">Audit</option>
                        <option value="Finance">Finance</option>
                      </Select>
                      {error.employee_Department && (
                        <p style={{ color: "red" }}>
                          {error.employee_Department}
                        </p>
                      )}
                    </Div>
                    <Div>
                      <Label htmlFor="d2">Date of Hire</Label>
                      <Input
                        type="date"
                        id="d2"
                        name="DateOfEmployment"
                        disabled={true}
                      />
                      {/* {error.DateOfEmployment && (
                        <p style={{ color: "red" }}>{error.DateOfEmployment}</p>
                      )} */}
                    </Div>

                    <Div>
                      <Label htmlFor="text">Work Location</Label>
                      <Input
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Enter Location"
                        onChange={handleChange}
                      />
                      {error.WorkLocation && (
                        <p style={{ color: "red" }}>{error.WorkLocation}</p>
                      )}
                    </Div>

                    <Div>
                      <label htmlFor="day">Work Schedule</label>
                      <Select
                        id="day"
                        name="day"
                        onChange={handleChange}
                        value={formData.workSchedule}
                      >
                        <option value="" disabled selected>
                          Select Day
                        </option>
                        <option value="Monday - Friday">Monday - Friday</option>
                        <option value="Tuesday - Friday">
                          Tuesday - Friday
                        </option>
                        <option value="Wednesday - Friday">
                          Wednesday - Friday
                        </option>
                        <option value="Thursday - Friday">
                          Thursday - Friday
                        </option>
                        <option value="Friday - Friday">Friday - Friday</option>
                      </Select>
                      {error.workSchedule && (
                        <p style={{ color: "red" }}>{error.workSchedule}</p>
                      )}
                    </Div>

                    <Div>
                      {/* <label htmlFor="startTime">Select Starting Time:</label> */}
                      <WorkWrap>
                        <Input
                          type="time"
                          id="startTime"
                          name="startTime"
                          value={formData.startTime}
                          onChange={handleChange}
                        />

                        {/* <label htmlFor="endTime">Select Ending Time:</label> */}
                        <Input
                          type="time"
                          id="endTime"
                          name="endTime"
                          value={formData.endTime}
                          onChange={handleChange}
                        />
                      </WorkWrap>
                    </Div>

                    <Div>
                      <Label htmlFor="e-status">Salary/Compensation</Label>
                      <Input
                        type="text"
                        id="salary"
                        name="salary"
                        placeholder="Enter Salary"
                        onChange={handleChange}
                      ></Input>

                      {error.salary && (
                        <p style={{ color: "red" }}>{error.salary}</p>
                      )}
                    </Div>

                    <Div>
                      <Label htmlFor="title">Job Title</Label>
                      <Select
                        id="jobtitle"
                        name="jobtitle"
                        onChange={handleChange}
                      >
                        <option value="" disabled selected>
                          Select JobTitle
                        </option>
                        <option value="SOFTWARE_ENGINEER">
                          SOFTWARE_ENGINEER
                        </option>
                        <option value="UI/UX Designer">UI/UX </option>
                        <option value="PROJECT_MANAGER">PROJECT_MANAGER</option>
                        <option value="Data Analytics">DATA_ANALYTICS</option>
                      </Select>

                      {error.JobTitle && (
                        <p style={{ color: "red" }}>{error.JobTitle}</p>
                      )}
                    </Div>

                    <Div>
                      <Label htmlFor="e-status">Employment Status</Label>
                      <Select
                        id="dept"
                        name="employmentStatus"
                        onChange={handleChange}
                      >
                        <option value="" disabled selected>
                          Select Employment Status
                        </option>
                        <option value="Intern">Intern</option>
                        <option value="Junior">Junior</option>
                        <option value="Assistant Manager">
                          Assistant Manager
                        </option>
                        <option value="Manager">Manager</option>
                      </Select>

                      {error.EmploymentStatus && (
                        <p style={{ color: "red" }}>{error.EmploymentStatus}</p>
                      )}
                    </Div>
                    <TeamWrap>
                      <label>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={toggleCheckbox}
                        />
                        Team Lead
                      </label>
                    </TeamWrap>
                  </InputContainer>

                  {/* EMERGENCY CONTACT SECTION */}
                  <H1>Emergency Contact Information</H1>
                  <InputContainer>
                    <Div>
                      <Label htmlFor="name">Name of Emergency Contact</Label>
                      <Input
                        type="text"
                        id="nameOfEmergencyContact"
                        name="nameOfEmergencyContact"
                        placeholder="Emergency Contact Name"
                        onChange={handleChange}
                      />

                      {error.nameOfEmergencyContact && (
                        <p style={{ color: "red" }}>
                          {error.nameOfEmergencyContact}
                        </p>
                      )}
                    </Div>

                    <Div>
                      <Label htmlFor="rel">Relationship to Employee</Label>
                      <Select
                        id="relationship"
                        name="relationship"
                        onChange={handleChange}
                      >
                        <option value="" disabled selected>
                          Select Relationship
                        </option>
                        <option value="Spouse">Spouse</option>
                        <option value="Child">Child</option>
                        <option value="Friend">Friend</option>
                        <option value="Colleague">Colleague</option>
                        <option value="Cousin">Cousin</option>
                        <option value="Grandparent">Grandparent</option>
                        <option value="Brother">Brother</option>
                        <option value="Sister">Sister</option>
                        <option value="Nephew">Nephew</option>
                        <option value="Aunt">Aunt</option>
                        <option value="Uncle">Uncle</option>
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Niece">Niece</option>
                      </Select>

                      {error.relationshipWithEmergencyContact && (
                        <p style={{ color: "red" }}>
                          {error.relationshipWithEmergencyContact}
                        </p>
                      )}
                    </Div>

                    <Div>
                      <Label htmlFor="tel">
                        Emergency Contact Phone Number
                      </Label>
                      <Input
                        type="number"
                        id="tel"
                        name="phoneNumberOfEmergencyContact"
                        placeholder="Emergency Contact Phone Number"
                        pattern="[0-9]{10}"
                        onChange={handleChange}
                      />

                      {error.phoneNumberOfEmergencyContact && (
                        <p style={{ color: "red" }}>
                          {error.phoneNumberOfEmergencyContact}
                        </p>
                      )}
                    </Div>
                  </InputContainer>
                  {/* BANK ACCOUNT SECTION */}
                  <H1>Bank Account Details for Payroll</H1>
                  <InputContainer>
                    <Div>
                      <Label htmlFor="bank">Bank Name</Label>
                      <Select
                        id="bank"
                        name="bankName"
                        onChange={handleChange}
                        value={formData.bankName}
                      >
                        <option value="" disabled>
                          Select a Bank
                        </option>
                        <option value="Zenith Bank">Zenith Bank</option>
                        <option value="Guaranty Trust Bank (GTB)">
                          Guaranty Trust Bank (GTB)
                        </option>
                        <option value="First Bank of Nigeria">
                          First Bank of Nigeria
                        </option>
                        <option value="Access Bank">Access Bank</option>
                        <option value="United Bank of Africa">
                          United Bank of Africa (UBA)
                        </option>
                        <option value="Union Bank">Union Bank</option>
                        <option value="other">Other</option>
                      </Select>

                      {error.bankName && (
                        <p style={{ color: "red" }}>{error.bankName}</p>
                      )}
                      {showOtherBankInput && (
                        <Input
                          type="text"
                          id="otherBank"
                          name="otherBank"
                          placeholder="Enter other bank name"
                          //   value={otherBankName}
                          onChange={handleChange}
                        />
                      )}
                    </Div>
                    <Div>
                      <Label htmlFor="accountName">Account Holder Name</Label>
                      <Input
                        type="text"
                        id="accountName"
                        name="accountName"
                        placeholder="Enter your account name"
                        onChange={handleChange}
                      />

                      {error.accountName && (
                        <p style={{ color: "red" }}>{error.accountName}</p>
                      )}
                    </Div>
                    <Div>
                      <Label htmlFor="accountNumber">Account Number</Label>
                      <Input
                        type=""
                        id="accountNumber"
                        name="accountNumber"
                        value={formData.accountNumber}
                        placeholder="Enter your account number"
                        onChange={handleChange}
                      />

                      {error.accountNumber && (
                        <p style={{ color: "red" }}>{error.accountNumber}</p>
                      )}
                    </Div>
                  </InputContainer>
                  <Lastpara>
                    <label>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                      New employees are expected to receive emails from the HR
                      department containing links to join their respective
                      departments
                    </label>
                  </Lastpara>
                </Wrap>
              </div>
            </Content>
          </form>
        </Main>
      </Container>
    </>
  );
};

const WorkWrap = styled.div`
  display: flex;
  gap: 5%;
  width: 300px;
  height: 38px;
  font-size: 16px;
  line-height: 22.4px;
  font-weight: 400;
  margin-top: 20px;

  @media screen and (max-width: 430px) {
    margin-bottom: 30px;
    width: 100%;
  }

  @media screen and (max-width: 820px) {
    margin-bottom: 30px;
    width: 100%;
  }
`;

const Lastpara = styled.p`
  color: #212121;
  font-family: Work Sans;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const TopWrap = styled.div`
  width: 1000px;
  height: 60px;
  display: flex;
  padding: 12px, 24px, 12px, 16px;
  gap: 24px;
  margin-bottom: 30px;
  justify-content: space-between;
  @media screen and (max-width: 600px) {
    display: block;
    width: 100%;
  }

  @media screen and (max-width: 820px) {
    display: flex;
    width: 100%;
  }
`;

const DelBtn = styled.button`
  color: red;
  border: none;
  border-radius: 10px;
  background-color: transparent;
`;

const TeamWrap = styled.div`
  padding: 50px 0;
  label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
  }
  input {
    width: 15px;
    height: 20px;
  }
`;

const UplaodInput = styled.input`
  background-color: transparent;
    color: transparent;
     border-radius: 12px;
     height: 20px;
       width: 80px;
     padding: 10px 20px;
    display" flex;
    justify-content: center;
  align-items: center;
  font-family: "Lato", sans-serif;

  padding: 0 8px;
  text-align: center;
  font-size: 13px;
  line-height: 19.6px;
  font-weight: 600;

  h
  cursor: pointer;
  
  background-color: #27ae60;

  // &:hover {
  //   background-color: #219653;
  // }
`;

export default UpdateEmployee;
