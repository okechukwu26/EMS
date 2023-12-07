/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";
import { ClipLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Arrow from "../../assets/images/Line1.svg";
import arrowLeft from "../../assets/images/arrow-left.svg";
import Members,{Image as Images} from "./Members";
import { Input } from "../NavBar/NavBarStyles";
import { useEffect, useState } from "react";
import { createProject } from "../../api/project";
import { useDispatch, useSelector } from "react-redux";
import Success from "../common/Success";

import { projectAction } from '../../Service/project';
import TimeLine from "./TimeLine";


export interface IProject {
  projectTitle: string;
  description: string;
  priority: string;
  OwnerId: string;
  startDate: Date;
  endDate: Date;
}
export interface ErrorProject {
  projectTitle: string;
  description: string;
  priority: string;

  startDate: string;
  endDate: string;
}
interface IUser {
  image:string;
  firstName:string;
  lastName:string
}

const Project = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({} as IProject);
  const [error, setError] = useState({} as ErrorProject);
  const [User, setUser] = useState({} as IUser)
  const [success, setSuccess] = useState(false);
  const project = useSelector((state: any) => state.project);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (value === "") {
      setError((prev) => ({ ...prev, [name]: "This field is required" }));
    } else {
      setError((prev) => ({ ...prev, [name]: null }));
    }
  };
  const handleSubmit = async () => {
    if (!form.projectTitle) {
      return setError((prev) => ({
        ...prev,
        projectTitle: "project title is required",
      }));
    }
    if (!form.description) {
      return setError((prev) => ({
        ...prev,
        description: "Description is required",
      }));
    }
 
    if (!form.startDate) {
      return setError((prev) => ({
        ...prev,
        startDate: "start date is required",
      }));
    } else {
      setError((prev) => ({ ...prev, startDate: "" }));
    }
    if (!form.endDate) {
      return setError((prev) => ({ ...prev, endDate: "end date is required" }));
    } else {
      setError((prev) => ({ ...prev, endDate: "" }));
    }

    if (!form.priority) {
      return setError((prev) => ({
        ...prev,
        priority: "priority is required",
      }));
    }
    console.log(form)
    await createProject(dispatch)(form);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };
  useEffect(() => {
    const user = localStorage.getItem("user")
    if(user !== null){
    const {image, firstName, lastName} = JSON.parse(user)
    setUser({image, firstName, lastName})

    }
  }, [project.createProject]);
  console.log(error);

  return (
    <>
      <ProjectContainer>
        <ToastContainer />
        <Header>
          <HeaderLeft>
            <ArrowImage src={arrowLeft} alt="arrow" onClick={() => dispatch(projectAction.changeStep(0)) } />
            <Image src={Arrow} alt="Arrow" />
            <Span>New Project's Form</Span>
          </HeaderLeft>
          <ButtonContainer>
            <Button onClick={handleSubmit}>
              <ClipLoader
                color="#fff"
                loading={project.loading}
                // cssOverride={override}
                size={14}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              Submit
            </Button>
          
          </ButtonContainer>
        </Header>
        <HeaderTitle
          placeholder="Enter Title...."
          name="projectTitle"
          onChange={handleChange}
        />
        {error.projectTitle && <ErrorText>{error.projectTitle}</ErrorText>}
        <Input
          placeholder="Add description here...."
          name="description"
          onChange={handleChange}
        />
        {error.description && <ErrorText>{error.description}</ErrorText>}
        <Text>Project Owner</Text>
       <OwnerContainer>
        <Images src={User.image} alt="o" />
        <OwnerText>{User.firstName}  {User.lastName}</OwnerText>
       </OwnerContainer>
        <Members  />
        <TimeLine setForm={setForm} error={error}  />
        <Select name="priority" onChange={handleChange}>
          <option value="">Select priority</option>
          <option value="HIGH">High</option>
          <option value="LOW">Low</option>
          <option value="MED">Med</option>
        </Select>
        {error.priority && <ErrorText>{error.priority}</ErrorText>}

        {Object.keys(project.createProject).length > 0 && success && (
          <Success success text="Saved!" />
        )}
      </ProjectContainer>
    </>
  );
};

const OwnerContainer=styled.div`

display:flex;
align-items:center;
justify-content: start;

`
const OwnerText=styled.p`
 font-family: Work Sans;
font-weight:400;
font-size:16px;
padding-left:5px;
line-height:19.2px
`

export const ButtonContainer =styled.div`
display:flex;
align-items:center;
justify-content: center;
`
export const ErrorText = styled.p`
  color: red;
  font-weight: 100;
  font-size: 1rem;
  margin-top: 10px;
`;
export const Select = styled.select`
  padding: 0.5rem;
  margin: 2rem 0 0 0;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  transition: border-color 0.2s ease-in-out, box-shadow 0.1s ease-in-out;
  &:focus {
    outline: none;
    border-color: transparent;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }
`;
export const HeaderTitle = styled.input`
  border: none;
  margin: 1.5rem 0;
  padding: 5px 0px;
  font-family: Lato;
  font-weight: 400;
  font-size: 1rem;
  width: 60%;
  color: #000;
  background: #f9fafb;
  &:focus {
    outline: none;
    border-color: transparent;
  }
  /* &:placeholder {
    font-size: 2rem;
    font-weight: 600;
    color: #000000;
  } */
`;
export const ProjectContainer = styled.div`
  margin: 3rem 2rem;
  position: relative;
  @media screen and (max-width: 840px) {
    display: block;
    justify-content: center;
    align-items: center;
  }
`;
export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width:840px){
    display:block;
    width:15rem
  }
`;
export const HeaderLeft = styled.div`
  margin-left: 0.2rem;

`;
export const Image = styled.img`
  padding-left: 0.7rem;
  @media screen and (max-width: 840px) {
    height: 18px;
  }
`;
export const ArrowImage = styled.img`
  @media screen and (max-width: 840px) {
    width: 18px;
  }
`;
export const Span = styled.span`
  color: #000000;
  font-weight: 400;
  font-size: 22px;
  line-height: 33.6px;
  padding-left: 5px;
  //media query for 840px screen
  @media (max-width: 840px) {
    font-size: 16px;
  }
`;
export const Button = styled.button`
  border: none;
  background-color: #34a853;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  margin-right: 2rem;
  display: flex;
  align-items: center;
  justify-content: Center;
  padding: 10px;
  border-radius: 10px;
  gap: 8px;
`;

export const Text = styled.p`
  font-family: Lato;
  font-weight: 400;
  size: 14px;
  line-height: 16.8px;
  margin-top: 2rem;
`;

export default Project;
