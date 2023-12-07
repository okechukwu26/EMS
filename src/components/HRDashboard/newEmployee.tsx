/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, ChangeEvent } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import arrowLeft from "../../assets/images/arrow-left.svg";
import avatar from "../../assets/images/avatar.png";
import styled from "styled-components";
import { ClipLoader } from "react-spinners";

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
import { createImage, createEmployee } from "../../api/employee";
import { Avatar } from "./Employees";
//import user from "../../Service/user";

export interface employeeFormData {
  firstName: string;
  lastName: string;
  employee_Department: string;
  image: string;
  email: string;
  DateOfBirth: Date;
  preferredName: string;
  DateOfEmployment: Date;
  WorkLocation: string;
  JobTitle: string;
  employee_Status: string;
  workSchedule: string;
  salary: string;
  nameOfEmergencyContact: string;
  relationshipWithEmergencyContact: string;
  phoneNumberOfEmergencyContact: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  endTime: Date;
  startTime: Date;
}
export interface employeeError {
  firstName: string;
  lastName: string;
  employee_Department: string;

  email: string;
  DateOfBirth: string;
  preferredName: string;
  DateOfEmployment: string;
  WorkLocation: string;
  JobTitle: string;
  employee_Status: string;
  workSchedule: string;
  salary: string;
  nameOfEmergencyContact: string;
  relationshipWithEmergencyContact: string;
  phoneNumberOfEmergencyContact: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
}
// interface User {
//   firstName: string;
//   lastName: string;
//   DateOfBirth: string;
//   preferredName: string;
//   email: string;
//   employee_Department: string;
//   DateOfEmployment: Date;
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
// }

const NewEmployee = ({
  selectStep,
}: {
  selectStep: (step: number) => void;
}) => {
  const dispatch = useDispatch();
  // const [accountNumber, setAccountNumber] = useState("");
  const [error, setError] = useState({} as employeeError);
  const [isChecked, setIsChecked] = useState(false);
  const [showOtherBankInput, setShowOtherBankInput] = useState(false);

  const [formData, setFormData] = useState<employeeFormData>({
    firstName: "",
    lastName: "",
    employee_Department: "",
    image: "",
    email: "",
    DateOfBirth: new Date(),
    preferredName: "",
    DateOfEmployment: new Date(),
    WorkLocation: "",
    JobTitle: "",
    employee_Status: "",
    workSchedule: "",
    salary: "",
    nameOfEmergencyContact: "",
    relationshipWithEmergencyContact: "",
    phoneNumberOfEmergencyContact: "",
    bankName: "",
    accountNumber: "",
    accountName: "",
    endTime: new Date(),
    startTime: new Date(),
  });

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const image = useSelector((state: any) => state.employee);
  console.log(image);
  useEffect(() => {}, [image.image]);

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
    //setFormData({ ...formData, [name]: value });
  };
  const handleImage = async (e: any) => {
    const file = e.target.files[0];

    const images = {
      image: file,
    };
    const data = await createImage(dispatch)(images);
    setFormData((prev) => ({ ...prev, image: data }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!formData.email) {
      return setError((prev) => {
        return { ...prev, email: "email is required" };
      });
    }
    if (!formData.firstName) {
      return setError((prev) => {
        return { ...prev, firstName: "firstName is required" };
      });
    }
    if (!formData.lastName) {
      return setError((prev) => {
        return { ...prev, lastName: "lastName is required" };
      });
    }
    if (!formData.employee_Department) {
      return setError((prev) => {
        return {
          ...prev,
          employee_Department: "employee_Department is required",
        };
      });
    }
    if (!formData.DateOfBirth) {
      return setError((prev) => {
        return { ...prev, DateOfBirth: "DateOfBirth is required" };
      });
    }
    if (!formData.preferredName) {
      return setError((prev) => {
        return { ...prev, preferredName: "preferredName is required" };
      });
    }
    if (!formData.DateOfEmployment) {
      return setError((prev) => {
        return { ...prev, DateOfEmployment: "DateOfEmployment is required" };
      });
    }
    if (!formData.WorkLocation) {
      return setError((prev) => {
        return { ...prev, WorkLocation: "WorkLocation is required" };
      });
    }
    if (!formData.email) {
      return setError((prev) => {
        return { ...prev, email: "email is required" };
      });
    }

    if (!formData.JobTitle) {
      return setError((prev) => {
        return { ...prev, JobTitle: "JobTitle is required" };
      });
    }

    if (!formData.employee_Status) {
      return setError((prev) => {
        return { ...prev, employee_Status: "employee_Status is required" };
      });
    }

    if (!formData.workSchedule) {
      return setError((prev) => {
        return { ...prev, workSchedule: "workSchedule is required" };
      });
    }

    if (!formData.salary) {
      return setError((prev) => {
        return { ...prev, salary: "salary is required" };
      });
    }

    if (!formData.nameOfEmergencyContact) {
      return setError((prev) => {
        return {
          ...prev,
          nameOfEmergencyContact: "nameOfEmergencyContact is required",
        };
      });
    }
    if (!formData.relationshipWithEmergencyContact) {
      return setError((prev) => {
        return {
          ...prev,
          relationshipWithEmergencyContact:
            "relationshipWithEmergencyContact is required",
        };
      });
    }
    if (!formData.phoneNumberOfEmergencyContact) {
      return setError((prev) => {
        return {
          ...prev,
          phoneNumberOfEmergencyContact:
            "phoneNumberOfEmergencyContact is required",
        };
      });
    }
    if (!formData.bankName) {
      return setError((prev) => {
        return { ...prev, bankName: "bankName is required" };
      });
    }
    if (!formData.accountName) {
      return setError((prev) => {
        return { ...prev, accountName: "accountName is required" };
      });
    }
    if (!formData.accountNumber) {
      return setError((prev) => {
        return { ...prev, accountNumber: "accountNumber is required" };
      });
    }
    if (!formData.endTime) {
      return setError((prev) => {
        return { ...prev, endTime: "endTime is required" };
      });
    }
    if (!formData.startTime) {
      return setError((prev) => {
        return { ...prev, startTime: "startTime is required" };
      });
    }

    if (
      Object.values(error).every((item) => !item) &&
      Object.values(formData).length === 21
    ) {
      createEmployee(dispatch)(formData);
    } else {
      console.log("hi");
    }

    // function updateImageDisplay() {
    //   while (preview.firstChild) {
    //     preview.removeChild(preview.firstChild);
    //   }
    // input.style.opacity = hidden;
    //input.addEventListener("change", updateImageDisplay);
  };

  return (
    <>
      <Container>
        <Main>
          <ToastContainer />
          <form onSubmit={handleSubmit}>
            <Content>
              <TopWrap>
                <TopWrap1>
                  {/* <img src="../images/arrow-left.svg" alt="" />*/}
                  <img src={arrowLeft} alt="" onClick={() => selectStep(0)} />
                  <img src="../images/Line1.svg" alt="" />
                  <H1>New Employee Form</H1>
                </TopWrap1>

                <TopWrap1>
                  <Button onClick={handleSubmit}>
                    <ClipLoader
                      color="#fff"
                      loading={image.loading}
                    
                      size={10}
                      aria-label="Loading Spinner"
                      data-testId="loader"
                    />
                   <Span> Submit</Span>
                  </Button>
                </TopWrap1>
              </TopWrap>

              <div>
                <H1>Personal Information</H1>
                <div style={{ display: "flex", gap: "10%" }}>
                  <Avatar>

                  <img
                    src={image.image ? image.image : avatar}
                    alt=""
                    style={{
                      borderRadius: "50%",
                      width: "60px",
                      height: "60px",
                      border: "4px solid #D1FADF",
                      objectFit:"cover"
                    }}
                    />
                    </Avatar>
                  <TopWrap1>
                    <UplaodInput type="file" onChange={handleImage} />
                    <ClipLoader
                      color="green"
                      loading={image.loadingImage}
                      size={20}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />

                    {/* <label htmlFor="file-upload">Choose a file:</label>
                    <StyledInput id="file-upload" /> */}
                  </TopWrap1>
                </div>

                <InputContainer>
                  <Div>
                    <Label htmlFor="fname">First Name</Label>
                    <Input
                      type="text"
                      id="fname"
                      name="firstName"
                      placeholder="Bimpe"
                      onChange={handleChange}
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
                      placeholder="Olutomiwa"
                      onChange={handleChange}
                    />
                    {error.lastName && (
                      <p style={{ color: "red" }}>{error.lastName}</p>
                    )}
                  </Div>

                  <Div>
                    <Label htmlFor="d2">Date Of Birth</Label>
                    <Input
                      type="date"
                      id="d2"
                      name="date"
                      placeholder="18 Apr 2023"
                    />
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
                      placeholder="Bimpeolutomiwa@decagon"
                      onChange={handleChange}
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
                      <Label htmlFor="dept">employee_Department</Label>
                      <Select
                        id="dept"
                        name="employee_Department"
                        onChange={handleChange}
                      >
                        <option value="">Select Dept.</option>
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
                        placeholder="18 Apr 2023"
                        onChange={handleChange}
                      />
                      {error.DateOfEmployment && (
                        <p style={{ color: "red" }}>{error.DateOfEmployment}</p>
                      )}
                    </Div>

                    <Div>
                      <Label htmlFor="text">Work Location</Label>
                      <Input
                        type="text"
                        id="location"
                        name="WorkLocation"
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
                        name="workSchedule"
                        onChange={handleChange}
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
                      <WorkWrap>
                        <label htmlFor="startTime">Start Time:</label>
                        <Input
                          type="time"
                          id="startTime"
                          name="startTime"
                          onChange={handleChange}
                        />
                      </WorkWrap>
                    </Div>
                    <Div>
                      <WorkWrap>
                        <label htmlFor="endTime"> Ending Time:</label>
                        <Input
                          type="time"
                          id="endTime"
                          name="endTime"
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
                        name="JobTitle"
                        onChange={handleChange}
                      >
                        <option value="" disabled selected>
                          Select JobTitle
                        </option>
                        <option value="SOFTWARE_ENGINEER">
                          Software Engineer
                        </option>
                        <option value="UI/UX">UI/UX Designer</option>
                        <option value="PROJECT_MANAGER">Project Manager</option>
                        <option value="DATA_ANALYTICS">Data Analytics</option>
                      </Select>

                      {error.JobTitle && (
                        <p style={{ color: "red" }}>{error.JobTitle}</p>
                      )}
                    </Div>

                    <Div>
                      <Label htmlFor="e-status">Employment Status</Label>
                      <Select
                        id="dept"
                        name="employee_Status"
                        onChange={handleChange}
                      >
                        <option value="" disabled selected>
                          Select Employment Status
                        </option>
                        <option value="INTERN">Intern</option>
                        <option value="MEMBER">Member</option>
                        <option value="TEAM_LEAD">TEAM_LEAD</option>
                      </Select>

                      {error.employee_Status && (
                        <p style={{ color: "red" }}>{error.employee_Status}</p>
                      )}
                    </Div>
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
                        name="relationshipWithEmergencyContact"
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
                        type="number"
                        id="accountNumber"
                        name="accountNumber"
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

// const DelBtn = styled.button`
//   color: red;
//   border: none;
//   border-radius: 10px;
//   background-color: transparent;
// `;

export const UplaodInput = styled.input`
  color: transparent;
  border-radius: 12px;
  height: 20px;
  width: 80px;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Lato", sans-serif;
  padding: 0 8px;
  text-align: center;
  font-size: 13px;
  line-height: 19.6px;
  font-weight: 600;
  cursor: pointer;

  // background-color: green;

  // &:hover {
  //   background-color: red;
  // }
`;
const Span=styled.span`
margin-left:4px;
font-family: 'Roboto Mono', monospace;
`

const ImageContainer=styled.div`
  
`

export default NewEmployee;
