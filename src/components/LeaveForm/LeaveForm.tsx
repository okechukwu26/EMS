//import React from "react";
import { useState } from "react";
import Sidebar from "../DashboardContainer/Sidebar";
//import Navbar from "../DashboardContainer/Navbar";
import styled from "styled-components";
// import { AiOutlineArrowLeft } from "react-icons/ai";
import { Button, Container, Filelist } from "../EmployeeDashboard/Payrise";
import arrowLeft from "../../assets/images/arrow-left.svg";
import line from "../../assets/images/Line1.svg";

const LeaveForm = () => {
  const [step, setStep] = useState(0);
  const handleUploadClick = () => {
    const fileInput = document.querySelector(".fileInput") as HTMLElement;
    fileInput.click();
  };

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]; // Get the first selected file
    if (selectedFile) {
      // You can do further processing, such as uploading the file or displaying its details.
      console.log("Selected file:", selectedFile);
    }
  };
  return (
    <>
      <Container>
        <Sidebar step={step} selectStep={(step) => setStep(step)} />
        <Main>
          {/* <Navbar /> */}

          <Content>
            <TopWrap>
              <TopWrap1>
                <img src={arrowLeft} alt="" />
                <img src={line} alt="" />
                <H1>Leave Request's Form</H1>
              </TopWrap1>
              <Button>Submit</Button>
            </TopWrap>
            <div>
              <H1>Personal Information</H1>
              <InputContainer>
                <div>
                  <Label htmlFor="e-id">Employee Id</Label>
                  <Input
                    type="text"
                    id="e-id"
                    name="Employee-id"
                    placeholder="DS287642"
                  />
                </div>

                <div>
                  <Label htmlFor="fname">First Name</Label>
                  <Input
                    type="text"
                    id="fname"
                    name="First Name"
                    placeholder="Bimpe"
                  />
                </div>

                <div>
                  <Label htmlFor="lname">Last Name</Label>
                  <Input
                    type="text"
                    id="lname"
                    name="Last Name"
                    placeholder="Olutomiwa"
                  />
                </div>
              </InputContainer>
              <InputContainer>
                <div>
                  <Label htmlFor="dept">Department</Label>
                  <Select id="dept" name="dept">
                    <option value="tech">Tech</option>
                    <option value="finance">Finance</option>
                    <option value="Audit">Audit</option>
                    <option value="hr">HR</option>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="fname">Phone Number</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="Phone Number"
                    placeholder="07025637112"
                  />
                </div>

                <div>
                  <Label htmlFor="lname">Email</Label>
                  <Input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Bimpeolutomlwa@decagon"
                  />
                </div>
              </InputContainer>
              <Wrap>
                <H1>Leave Information</H1>
                <InputContainer>
                  <div>
                    <Label htmlFor="d2">Start Date of the Leave</Label>
                    <Input
                      type="date"
                      id="d2"
                      name="date"
                      placeholder="18 Apr 2023"
                    />
                  </div>

                  <div>
                    <Label htmlFor="d2">End Date of the Leave</Label>
                    <Input
                      type="date"
                      id="d2"
                      name="date"
                      placeholder="18 Apr 2023"
                    />
                  </div>

                  <div>
                    <Label htmlFor="new-sl">Manager or Supervisor's Name</Label>
                    <Input
                      type="text"
                      id="ManagerName"
                      name="ManagerName"
                      placeholder="Olaide Deborah"
                    />
                  </div>
                </InputContainer>
                <InputContainer>
                  <div>
                    <Label htmlFor="jt">
                      Total Number of Leave Days Requested
                    </Label>
                    <Input
                      type="number"
                      id="leaveDays"
                      name="leaveDays"
                      placeholder="10"
                    />
                  </div>

                  <div>
                    <Label htmlFor="salarycom">Reason for the Leave</Label>
                    <Input
                      type="text"
                      id="leave-Reason"
                      name="leave-Reason"
                      placeholder="Managed Projects"
                    />
                  </div>

                  <div>
                    <Label htmlFor="e-status">Employment Status</Label>
                    <Select id="dept" name="dept">
                      <option value="tech">Intern</option>
                      <option value="finance">Junior</option>
                      <option value="Audit">Assistant Manager</option>
                      <option value="hr">Manager</option>
                    </Select>
                  </div>
                </InputContainer>
                <InputContainer>
                  <div>
                    <Label htmlFor="Accom">
                      Any Specific Comments or Notes
                    </Label>
                    <Input1
                      type="text"
                      id="Accom"
                      name="Accomplishment Contributions"
                      placeholder="Comments..."
                    />
                  </div>
                </InputContainer>

                <div>
                  <Label htmlFor="attach">
                    Additional Attachements (if required)
                  </Label>

                  <Filelist>
                    <Input
                      type="file"
                      id="fileInput"
                      className="fileInput"
                      style={{ display: "none" }}
                    />

                    <Input
                      type="file"
                      id="fileInput"
                      style={{ display: "none" }}
                      onChange={handleFileSelection}
                    />

                    <p>
                      <span className="upload-text">
                        {" "}
                        Drop your files here or{" "}
                        <a
                          href="#"
                          className="uplaodButton"
                          onClick={handleUploadClick}
                        >
                          {" "}
                          browse
                        </a>
                      </span>
                      <br /> Maximum file: 50MB
                    </p>
                  </Filelist>
                </div>
              </Wrap>
            </div>
          </Content>
        </Main>
      </Container>
    </>
  );
};

const Content = styled.div`
  width: auto;
  height: 783px;
  margin-top: 24px;
  margin-left: 38px;
  gap: 24px;
  margin-bottom: 50px;
`;

const Input = styled.input`
  width: 300px;
  height: 46px;
  padding: 12px, 16px;
  background-color: #ffffff;
  border: none;
  border-radius: 3px;
  font-size: 16px;
  line-height: 22.4px;
  font-weight: 400;
  color: #000000;
  padding-left: 16px;
  margin-top: 10px;
`;
const Input1 = styled.input`
  width: 948px;
  height: 46px;
  padding: 12px, 16px;
  background-color: #ffffff;
  border: none;
  border-radius: 3px;
  font-size: 16px;
  line-height: 22.4px;
  font-weight: 400;
  color: #000000;
  padding-left: 16px;
  margin-top: 10px;
`;
const Select = styled.select`
  width: 300px;
  height: 46px;
  padding: 12px, 16px;
  background-color: #ffffff;
  border: none;
  border-radius: 3px;
  font-size: 16px;
  line-height: 22.4px;
  font-weight: 400;
  color: #000000;
  padding-left: 16px;
  margin-top: 10px;
`;

export const Main = styled.div`
  grid-column-end: span 3;
`;
export const BodyContainer = styled.div`
  margin: 4rem 2rem;
`;
const TopWrap = styled.div`
  width: 1000px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 12px, 24px, 12px, 16px;
  gap: 24px;
  margin-bottom: 30px;
`;
const H1 = styled.h1`
  padding-top: 0;
  margin-top: 0;
  font-size: 24px;
  line-heigth: 33.6px;
`;
const TopWrap1 = styled.div`
  display: flex;
  height: 34px;
  margin-top: 20px;
  gap: 16px;
`;
const Wrap = styled.div`
  margin-top: 15px;
`;
const Label = styled.label`
  font-style: Regular Body Bio;
  font-family: Lato;
  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;
  letter-spacing: 0.15px;
  text-align: left;
  color: #98a2b3;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 24px;
  width: 948px;
  margin-bottom: 24px;
`;

export default LeaveForm;
