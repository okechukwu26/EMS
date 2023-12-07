/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, ChangeEvent } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createLeave } from "../../api/leave";
import arrowLeft from "../../assets/images/arrow-left.svg";
import {
  Button,
  Content,
  Div,
  Filelist,
  H1,
  Input,
  Input1,
  InputContainer,
  Label,
  Labelx,
  Select,
  TopWrap,
  TopWrap1,
  Wrap,
} from "./Payrise";
import { ClipLoader } from "react-spinners";
export interface leaveFormData {
  employeeId: string;
  firstName: string;
  lastName: string;
  department: string;
  phone: string;
  email: string;
  startDate: number;
  endDate: number;
  reason: string;
  supervisorName: string;
  employmentStatus: string;
  comment?: string;
  totalLeaveDaysRequested?: number;
  attachment: string;
}
interface User {
  employeeId: string;
  firstName: string;
  lastName: string;
  employee_Department: string;
  phone: string;
  email: string;
}

const Leave = ({ selectStep }: { selectStep: (step: number) => void }) => {
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
        phone,
        email,
      } = JSON.parse(user);
      setUser({
        employeeId,
        firstName,
        lastName,
        employee_Department,
        phone,
        email,
      });
      setFormData({
        ...formData,
        firstName,
        lastName,
        employeeId: employeeId,
        attachment: "hello",
        email,
        department: employee_Department,
      });
    }
  }, []);
  const leave = useSelector((state: any) => state.leave);

  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]; // Get the first selected file
    if (selectedFile) {
      // You can do further processing, such as uploading the file or displaying its details.
      console.log("Selected file:", selectedFile);
    }
  };

  const [formData, setFormData] = useState<leaveFormData>({
    employeeId: "",
    firstName: "",
    lastName: "",
    department: "",
    phone: "",
    email: "",
    startDate: 0,
    endDate: 0,
    reason: "",
    supervisorName: "",
    employmentStatus: "",
    comment: "",
    totalLeaveDaysRequested: 0,
    attachment: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(formData);

    createLeave(dispatch)(formData);
  };

  return (
    <>
    
      <Content>
        <ToastContainer />
        <TopWrap>
          <TopWrap1>
            <img src={arrowLeft} alt="" onClick={() => selectStep(0)} />
            <img src="../images/Line1.svg" alt="" />

            <H1>Leave Request Form</H1>
          </TopWrap1>
          <Button onClick={handleSubmit}>
            {" "}
            <ClipLoader
              color="white"
              loading={leave.loadingLeave}
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

            <Div>
              <Label htmlFor="dept">Department</Label>
              <Select
                id="dept"
                name="department"
                value={user.employee_Department ?? ""}
                disabled={true}
              >
                <option value="Tech">Tech</option>
                <option value="HR">HR</option>
                <option value="Audit">Audit</option>
                <option value="Finance">Finance</option>
              </Select>
            </Div>

            <Div>
              <Label htmlFor="d1">Phone Number</Label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                onChange={handleChange}
              />
            </Div>

            <Div>
              <Label htmlFor="e-status">Email</Label>
              <Input
                type="text"
                id="email"
                name="email"
                value={user.email ?? ""}
                disabled={true}
              />
            </Div>
          </InputContainer>
          <Wrap>
            <H1>Leave Information</H1>
            <InputContainer>
              <Div>
                <Label htmlFor="d2">Start Date of the Leave</Label>
                <Input
                  type="date"
                  id="d2"
                  name="startDate"
                  placeholder="18 Apr 2023"
                  onChange={handleChange}
                />
              </Div>

              <Div>
                <Label htmlFor="d2">End Date of the Leave</Label>
                <Input
                  type="date"
                  id="d2"
                  name="endDate"
                  placeholder="18 Apr 2023"
                  onChange={handleChange}
                />
              </Div>
              <Div>
                <Label htmlFor="new-sl">Manager or Supervisor's Name</Label>
                <Input
                  type="text"
                  id="ManagerName"
                  name="supervisorName"
                  placeholder="Olaide Deborah"
                  onChange={handleChange}
                />
              </Div>

              <Div>
                <Label htmlFor="jt">Total Number of Leave Days Requested</Label>
                <Input
                  type="text"
                  id="leaveDays"
                  name="totalLeaveDaysRequested"
                  placeholder="10"
                  onChange={handleChange}
                />
              </Div>

              <Div>
                <Label htmlFor="jt">Reason for the Leave</Label>
                <Select id="reason" name="reason" onChange={handleChange}>
                  <option value="">Select reason.</option>
                  <option value="Managed_Project">Managed Project</option>
                  <option value="Vacation_Leave">Vacation Leave</option>
                  <option value="Sick_Leave">Sick Leave</option>
                  <option value="Personal_Leave">Personal Leave</option>
                  <option value="Marternity_Leave">Marternity Leave</option>
                  <option value="Others">Others</option>
                </Select>
              </Div>

              <Div>
                <Label htmlFor="e-status">Employment Status</Label>
                <Select
                  id="dept"
                  name="employmentStatus"
                  onChange={handleChange}
                >
                  <option value="">Select Employment Status.</option>
                  <option value="Intern">Intern</option>
                  <option value="Junior">Junior</option>
                  <option value="Assistant Manager">Assistant Manager</option>
                  <option value="Manager">Manager</option>
                </Select>
              </Div>
            </InputContainer>
            <InputContainer>
              <Div>
                <Labelx htmlFor="Accom">Any Specific Comments or Notes</Labelx>
                <Input1
                  type="text"
                  id="Comm"
                  name="comment"
                  placeholder="Comments..."
                  onChange={handleChange}
                />
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
      </Content>
      {/* </Main> */}
      {/* </Container> */}
    </>
  );
};

export default Leave;
