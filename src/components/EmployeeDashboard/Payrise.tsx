/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";
import { createPayRise } from "../../api/payRise";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";

export interface payriseFormData {
  employeeId: string;
  firstName: string;
  lastName: string;
  department: string;
  DateOfHire: Date;
  jobTitle: string;
  currentPay: number;
  proposedPay: number;
  reasons: string;
  attachments: string;
  EmployeeStatus: string;
}
interface User {
  employeeId: string;
  firstName: string;
  lastName: string;
  employee_Department: string;
  jobTitle: string;
  employee_Status: string;
  DateOfEmployment: Date;
}

const Payrise = ({ selectStep }: { selectStep: (step: number) => void }) => {
  //const [step, setStep] = useState(0);
  const [error, setError] = useState({
    department: "",
    DateOfHire: "",
    EmployeeStatus: "",
    jobTitle: "",
    currentPay: "",
    proposedPay: "",
    reasons: "",
    attachments: "",
  });
  const [user, setUser] = useState({} as User);
  const dispatch = useDispatch();
  const handleUploadClick = () => {
    const fileInput = document.querySelector(".fileInput") as HTMLElement;
    fileInput.click();
  };
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user !== null) {
      const {
        employeeId,
        firstName,
        lastName,
        employee_Department,
        JobTitle,
        employee_Status,
        DateOfEmployment,
      } = JSON.parse(user);
      setUser({
        employeeId,
        firstName,
        lastName,
        employee_Department,
        jobTitle: JobTitle,
        employee_Status,
        DateOfEmployment,
      });
      setFormData({
        ...formData,
        firstName,
        department: employee_Department,
        EmployeeStatus: employee_Status,
        DateOfHire: DateOfEmployment,
        jobTitle: JobTitle,
        lastName,
        employeeId,
        attachments: "hello",
      });
    }
  }, []);

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]; // Get the first selected file
    if (selectedFile) {
      // You can do further processing, such as uploading the file or displaying its details.
      //console.log("Selected file:", selectedFile);
    }
  };
  const loadingPayRise = useSelector(
    (state: any) => state.payRise.loadingPayRise
  );

  const [formData, setFormData] = useState<payriseFormData>({
    employeeId: "",
    firstName: "",
    lastName: "",
    department: "",
    DateOfHire: new Date(),
    EmployeeStatus: "",
    jobTitle: "",
    currentPay: 0,
    proposedPay: 0,
    reasons: "",
    attachments: "",
  });



  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (value === "") {
      setError({ ...error, [name]: "This field is required" });
    } else {
      setError({ ...error, [name]: "" });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!formData.department) {
     return setError((prev) => ({ ...prev, department: "Department is required" }));
    }
  
    if (!formData.DateOfHire) {
      return setError((prev) => ({ ...prev, DateOfHire: "Date of hire is required" }));
    }
    if (!formData.EmployeeStatus) {
      return setError((prev) => ({
        ...prev,
        EmployeeStatus: "Employee status is required",
      }));
    }
    if (!formData.jobTitle) {
      return setError((prev) => ({ ...prev, jobTitle: "Job title is required" }));
    }
    if (!formData.currentPay) {
      return setError((prev) => ({ ...prev, currentPay: "currentPay is required" }));
    }
    if (!formData.proposedPay) {
      return setError((prev) => ({ ...prev, proposedPay: "Proposed pay is required" }));
    }
    if (!formData.reasons) {
      return setError((prev) => ({ ...prev, reasons: "Reasons is required" }));
    }
    console.log(formData);

    createPayRise(dispatch)(formData);
  };

  return (
    <>
      <Container>
        <Main>
          <Content>
            <form onSubmit={handleSubmit}>
              <ToastContainer />
              <TopWrap>
                <TopWrap1>
                  <img
                    src="../images/arrow-left.svg"
                    alt=""
                    onClick={() => selectStep(0)}
                  />
                  <img src="../images/Line1.svg" alt="" />
                  <H1>Pay Rise Request's Form</H1>
                </TopWrap1>
                <Button type="submit">
                  {" "}
                  <ClipLoader
                    color="white"
                    loading={loadingPayRise}
                    size={15}
                    aria-label="Loading Spinner"
                    data-testId="loader"
                  />
                  Submit
                </Button>
              </TopWrap>

              <div>
                <H1>Personal Information</H1>
                <InputContainer>
                  <Div>
                    <Label htmlFor="e-id">Employee Id</Label>
                    <Input
                      type="text"
                      id="e-id"
                       value={user.employeeId ?? ""}
                      disabled={true}
                    />
                  </Div>

                  <Div>
                    <Label htmlFor="fname">First Name</Label>
                    <Input
                      type="text"
                      id="fname"
                      name="firstName"
                       value={user.firstName ?? ""}
                      disabled={true}
                    />
                  </Div>

                  <Div>
                    <Label htmlFor="lname">Last Name</Label>
                    <Input
                      type="text"
                      id="lname"
                      name="lastName"
                       value={user.lastName ?? ""}
                      disabled={true}
                    />
                  </Div>
                </InputContainer>
                <Wrap>
                  <H1>Employment Information</H1>
                  <InputContainer>
                    <Div>
                      <Label htmlFor="dept">Department</Label>
                      <Input
                        id="dept"
                         value={user.employee_Department ?? ""}
                        disabled={true}
                      />
                    </Div>

                    <Div>
                      <Label htmlFor="d1">Date of Hire</Label>
                      <Input
                         value={new Date(user.DateOfEmployment).toDateString()}
                        disabled={true}
                        id="d1"
                      />
                    </Div>

                    <Div>
                      <Label htmlFor="e-status">Employment Status</Label>
                      <Input
                        id="dept"
                        disabled={true}
                         value={user.employee_Status}
                      />
                    </Div>
                  
                    <Div>
                      <Label htmlFor="jt">Job Title</Label>
                      <Input
                        id="jt"
                         value={user.jobTitle}
                        disabled={true}
                      />
                    </Div>

                    <Div>
                      <Label htmlFor="salarycom">Salary Compensation</Label>
                      <Input
                        type="number"
                        id="salarycom"
                        name="currentPay"
                        placeholder="NGN"
                        onChange={handleChange}
                      />
                      {error.currentPay && <ErrorText>{error.currentPay}</ErrorText>}
                    </Div>

                    <Div>
                      <Label htmlFor="new-sl">Proposed New Salary</Label>
                      <Input
                        type="number"
                        id="new-sl"
                        name="proposedPay"
                        placeholder="NGN"
                        onChange={handleChange}
                      />
                         {error.proposedPay && <ErrorText>{error.proposedPay}</ErrorText>}
                    </Div>
                  </InputContainer>
                  <InputContainer>
                    <Div>
                      <Labelx htmlFor="Accom">
                        Accomplishments and Contributions
                      </Labelx>
                      <Input1
                        type="text"
                        id="Accom"
                        name="reasons"
                        placeholder="Comments..."
                        onChange={handleChange}
                      />
                        {error.reasons && <ErrorText>{error.reasons}</ErrorText>}
                    </Div>
                  </InputContainer>

                  <div>
                    <Labelx htmlFor="attach">
                      Additional Attachements (if required)
                    </Labelx>

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
            </form>
          </Content>
        </Main>
      </Container>
    </>
  );
};

export const Container = styled.div`
  display: grid;
  grid-template-columns: 18rem auto auto auto;
  //grid-gap: 10px;
  background-color: #f9fafb;

  @media screen and (max-width: 820px) {
    overflow-x: hidden;
    width: auto;
  }

  @media screen and (max-width: 430px) {
    overflow-x: hidden;
    width: auto;
  }
`;
export const Content = styled.div`
  width: auto;
  height: 100%;
  padding-top: 24px;
  padding-left: 38px;
  padding-right: 38px;
  gap: 24px;
  padding-bottom: 50px;
  background-color: #f9fafb;

  @media screen and (max-width: 820px) {
    justify-content: center;
    align-item: center;
    display: fit-content;
    width: auto;
  }
  @media screen and (max-width: 430px) {
    //justify-content: center;
    //align-item: center;
    // display: fit-content;
    //width: auto;
  }
`;

export const Input = styled.input`
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
  font-family: Work Sans;
  padding-left: 16px;
  margin-top: 10px;

  @media (max-width: 992px) {
    width: 100%;
  }

  @media screen and (max-width: 820px) {
    width: auto;
  }
  @media screen and (max-width: 430px) {
    width: auto;
  }
`;
export const Input1 = styled.input`
  width: 948px;
  height: 3rem;
  padding: 12px, 16px;
  background-color: #ffffff;
  border: none;
  border-radius: 3px;
  font-size: 16px;
  font-family: Work Sans;
  line-height: 22.4px;
  font-weight: 400;
  color: #000000;
  padding-left: 16px;
  margin-top: 10px;

  @media (max-width: 992px) {
    width: 100%;
  }
  @media screen and (max-width: 820px) {
    width: auto;
  }
  @media screen and (max-width: 430px) {
    width: auto;
  }
`;

export const Div = styled.div`
  display: flex;
  padding-top: 5px;
  flex-direction: column;
`;
export const Select = styled.select`
  width: 300px;
  height: 46px;
  padding: 12px, 16px;
  background-color: #ffffff;
  border: none;
  border-radius: 3px;
  font-size: 16px;
  font-family: Work Sans;
  line-height: 22.4px;
  font-weight: 400;
  color: #000000;
  padding-left: 16px;
  margin-top: 10px;

  @media (max-width: 992px) {
    width: 100%;
  }

  @media screen and (max-width: 820px) {
    width: auto;
  }
  @media screen and (max-width: 430px) {
    width: auto;
  }
`;

export const Main = styled.div`
  grid-column-end: span 3;
`;
export const BodyContainer = styled.div`
  margin: 4rem 2rem;
  font-family: "Open Sans", sans-serif;
`;
export const TopWrap = styled.div`
  width: 900px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 12px, 24px, 12px, 16px;
  gap: 24px;
  margin-bottom: 30px;

  @media screen and (max-width: 820px) {
    width: 100%;
    height: auto;
  }
  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
  }
`;
export const H1 = styled.h1`
  padding-top: 0;
  margin-top: 0;
  font-size: 24px;
  line-height: 33.6px;
  font-family: "Open Sans", sans-serif;
  @media screen and (max-width: 430px) {
    font-size: 16px;
  }
`;
export const TopWrap1 = styled.div`
  display: flex;
  align-items:center;
  justify-content:center;
  height: 34px;
  margin-top: 20px;
  gap: 16px;
`;
export const Wrap = styled.div`
  margin-top: 15px;
`;
// const Images = styled.img``;
export const Label = styled.label`
  font-style: Regular Body Bio;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;
  letter-spacing: 0.15px;
  text-align: left;
  color: #98a2b3;
`;

export const Labelx = styled.label`
  font-style: Regular Body Bio;
  font-family: Work Sans;
  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;
  letter-spacing: 0.15px;
  text-align: left;
  color: #98a2b3;
  @media screen and (max-width: 600px) {
    font-size: 12px;
  }
`;

export const InputContainer = styled.div`
  gap: 24px;
  width: 948px;
  margin-bottom: 24px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 992px) {
    width: 100%;
    display: block;
  }

  @media (max-width: 600px) {
    display: block;
    width: 100%;
  }
`;

export const Filelist = styled.div`
  margin-top: 10px;
  text-align: center;
  text-decoration: none;
  align-items: center;
  width: 899px;
  height: 90px;
  padding: 40px; /* Added semicolon */
  border-radius: 8px; /* Added semicolon */
  background-color: white;
  letter-spacing: 0.005em;
  border: 1px dashed #e5e7eb;
  @media (max-width: 992px) {
    width: auto;
    padding: 20px;
  }
  @media screen and (max-width: 820px) {
    width: auto;
    padding: 20px;
  }
  @media screen and (max-width: 430px) {
    width: auto;
  }

  p {
    margin: auto;
    stylename: SM/Medium;
    font-family: Work Sans;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #9ca3af;

    span {
      font-family: Work Sans;
      font-size: 16px;
      stylename: Base/Medium;
      font-weight: 500;
      line-height: 22.4px;
      letter-spacing: 0.15px;
      color: #1f2937;

      a {
        color: #3b82f6;
        text-decoration: none;
      }
    }
  }
`;

export const Button = styled.button`
display:flex;
align-items:center;
justify-content:center;
  background-color: #27ae60;
  font-family: Work Sans;
  border-radius: 12px;
  border: none;
  color: white;
  padding: 0 16px;
  text-align: center;
  font-size: 14px;
  line-height: 19.6px;
  font-weight: 600;
  width: 105px;
  height: 36px;
  cursor: pointer;

  &:hover {
    background-color: #219653;
  }
`;
const ErrorText =styled.p`
color:red;
text-align:center
`

export default Payrise;
