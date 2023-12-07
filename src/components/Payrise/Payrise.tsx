import styled from "styled-components";
const Rise = () => {
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
      <Content>
        <TopWrap>
          <TopWrap1>
            {/* <img src="../images/arrow-left.svg" alt="" />*/}
            <img src="../images/Line1.svg" alt="" />
            <H1>Pay Rise Request's Form</H1>
          </TopWrap1>
          <Button>Submit</Button>
        </TopWrap>
        <div>
          <H1>Personal Information</H1>
          <InputContainer>
            <Div>
              <Label htmlFor="e-id">Employee Id</Label>
              <Input
                type="text"
                id="e-id"
                name="Employee-id"
                placeholder="DS287642"
              />
            </Div>

            <Div>
              <Label htmlFor="fname">First Name</Label>
              <Input
                type="text"
                id="fname"
                name="First Name"
                placeholder="Bimpe"
              />
            </Div>

            <Div>
              <Label htmlFor="lname">Last Name</Label>
              <Input
                type="text"
                id="lname"
                name="Last Name"
                placeholder="Olutomlwa"
              />
            </Div>
          </InputContainer>
          <Wrap>
            <H1>Employment Information</H1>
            <InputContainer>
              <Div>
                <Label htmlFor="dept">Department</Label>
                <Select id="dept" name="dept">
                  <option value="tech">Tech</option>
                  <option value="finance">Finance</option>
                  <option value="Audit">Audit</option>
                  <option value="hr">HR</option>
                </Select>
              </Div>

              <Div>
                <Label htmlFor="d1">Date of Hire</Label>
                <Input
                  type="date"
                  id="d1"
                  name="date"
                  placeholder="18 Apr 2023"
                />
              </Div>

              <Div>
                <Label htmlFor="e-status">Employment Status</Label>
                <Select id="dept" name="dept">
                  <option value="tech">Intern</option>
                  <option value="finance">Junior</option>
                  <option value="Audit">Assistant Manager</option>
                  <option value="hr">Manager</option>
                </Select>
              </Div>
              {/* </InputContainer>
                <InputContainer> */}
              <Div>
                <Label htmlFor="jt">Job Title</Label>
                <Select id="jt" name="job title">
                  <option value="tech">UX/UI Designer</option>
                  <option value="finance">Software Engineer</option>
                  <option value="Audit">Data Analyst</option>
                  <option value="hr">Project Manager</option>
                </Select>
              </Div>

              <Div>
                <Label htmlFor="salarycom">Salary Compensation</Label>
                <Input
                  type="number"
                  id="salarycom"
                  name="salary"
                  placeholder="NGN"
                />
              </Div>

              <Div>
                <Label htmlFor="new-sl">Proposed New Salary</Label>
                <Input
                  type="number"
                  id="new-sl"
                  name="new salary"
                  placeholder="NGN"
                />
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
                  name="Accomplishment Contributions"
                  placeholder="Comments..."
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
    </>
  );
};

export const Container = styled.div`
  display: grid;
  grid-template-columns: 18rem auto auto auto;
  grid-gap: 10px;
  background-color: #f9fafb;

  @media screen and (max-width: 820px) {
    overflow-x: hidden;
    width: 100%;
  }

  @media screen and (max-width: 430px) {
    overflow-x: hidden;
    width: auto%;
  }
`;
const Content = styled.div`
  width: 100%;
  height: fit-content;
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
  padding-left: 16px;
  margin-top: 10px;

  @media screen and (max-width: 820px) {
    width: auto;
  }
  @media screen and (max-width: 430px) {
    width: auto;
  }
`;
export const Input1 = styled.input`
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

  @media screen and (max-width: 820px) {
    width: auto;
  }
  @media screen and (max-width: 430px) {
    width: auto;
  }
`;

const Div = styled.div`
  display: flex;
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
  line-height: 22.4px;
  font-weight: 400;
  color: #000000;
  padding-left: 16px;
  margin-top: 10px;

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
`;
export const TopWrap = styled.div`
  width: 1000px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 12px, 24px, 12px, 16px;
  gap: 24px;
  margin-bottom: 30px;

  @media screen and (max-width: 600px) {
    display: block;
    width: 100%;
  }

  @media screen and (max-width: 820px) {
    display: flex;
    width: 100%;
  }
`;
const H1 = styled.h1`
  padding-top: 0;
  margin-top: 0;
  font-size: 24px;
  line-heigth: 33.6px;
  @media screen and (max-width: 400px) {
    font-size: 16px;
  }
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
// const Images = styled.img``;
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

const Labelx = styled.label`
  font-style: Regular Body Bio;
  font-family: Lato;
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
  //display: flex;
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
  // @media (max-width: 992px) {
  //   width: 100%;
  // }
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
    font-family: Inter;
    font-family: Inter;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #9ca3af;

    span {
      font-family: Inter;
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
  background-color: #27ae60;
  font-family: "Lato", sans-serif;
  border-radius: 12px;
  border: none;
  color: white;
  padding: 8px 16px;
  text-align: center;
  font-size: 14px;
  line-height: 19.6px;
  font-weight: 600;
  wdith: 105px;
  heigth: 36px;
  cursor: pointer;

  &:hover {
    background-color: #219653;
  }
`;

export default Rise;
