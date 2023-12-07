/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, 
  useEffect, 
  useState , Fragmet} from "react";
import styled from "styled-components";
import {
  Header,
  HeaderLeft,
  ArrowImage,
  Image,
  Span,
  HeaderTitle,
  // Text,
  Button,
} from "./Project";
// import {ImageHeader} from "./ProjectList"
import { ButtonContainer, AddText, Icon } from "./AllProject";
import Avatar from "../../assets/images/avatar.png";
import { Input } from "../NavBar/NavBarStyles";
import Arrow from "../../assets/images/Line1.svg";
import arrowLeft from "../../assets/images/arrow-left.svg";
import { FaMinus } from "react-icons/fa6";
import {createTask} from "../../api/task"
import {
  useDispatch,
   useSelector
} from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { projectAction } from "../../Service/project";
import { getMembers } from "../../api/employee";
import { ClipLoader } from "react-spinners";
import  {getProjects} from "../../api/project"
import Success from "../common/Success";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export interface TASK {
  title: string;
  description: string;
 
  startDate:Date
  endDate:Date




  projectId: string;
}
export interface ErrorTask {
  title: string;
  description: string;
  
    startDate:string
    endDate:string
   
  



  projectId: string;
}

const Task = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState({} as ErrorTask);
  const [inputField, setInputField] = useState([{
    title:"", description:"",  startDate:null, endDate:null
  }] as TASK[]);
  const dispatch = useDispatch();
  const employee = useSelector((state: any) => state.employee);
  const project = useSelector((state:any) => state.project)
  const task = useSelector((state:any) => state.task)


  useEffect(() => {
    getMembers(dispatch);
    getProjects(dispatch)
  }, [task.createTask]);
  const handleChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> ,
    fieldName
  ) => {
    const values = [...inputField];

  
        if(fieldName === "assignedTo"){
          values[index].assignedTo = event
          setInputField(values);
        }else if(fieldName=== "startDate"){
       values[index].startDate = event
       setInputField(values);
       }else if(fieldName=== "endDate"){
        values[index][fieldName] = event;
      return  setInputField(values);
       }else {
        values[index][fieldName] = event.target.value;
      setInputField(values);

       }
  
  };
  const handleSubmit = async(e:any) => {
    e.preventDefault()
   
   await createTask(dispatch)(inputField)
   setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  }
  const handleAdd = () =>{
    setInputField([...inputField, {
      title:"", description:"", startDate:null, endDate:null
    }])
  }
  const handleRemove = (index) =>{
    const values =[...inputField]
    if(values.length > 1 ){
      values.splice(index, 1)
      setInputField(values)

    }

  }


  return (
    <>
      <FormContainer>
        <ToastContainer />
        <Header>
          <HeaderLeft>
            <ArrowImage
              src={arrowLeft}
              alt="arrow"
              onClick={() => dispatch(projectAction.changeStep(0))}
            />
            <Image src={Arrow} alt="Arrow" />
            <Span>Create Task</Span>
          </HeaderLeft>
        </Header>
        {inputField.map((item, index) => {
          return (
            <>
              <HeaderTitle
                name="title"
                value={item.title}
                placeholder="Enter title...."
                onChange={(event) => handleChange(index, event, "title")}
              />
              <Input
                name="description"
                value={item.description}
                placeholder="add description here"
                onChange={(event) => handleChange(index, event, "description")}
              />
              <Text> ASSIGNEE </Text>

              <ImageHeader>
              {employee.loadingMember ? (
                <ClipLoader
                  color="#34a853"
                  loading={employee.loadingMember}
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : employee.members.length === 0 ? (
                <Text>No members in your department</Text>
              ) : (
                employee.members.map((employ, index) =><ImageContainer $zIndex={index+5} $text={true} $current={employ.id} $assign={item.assignedTo}
                //  onClick={() => handleChange(index, employ.id,"assignedTo")}
                 >
                    <Images src={employ.image ? employ.image : Avatar} />
                </ImageContainer>)
              )}
              </ImageHeader>
              <DateContainer>
              
              <StyledDatePicker
              placeholderText="Select Start Date" 
          
                    selected={item.startDate}
              
                    onChange={(date) => handleChange(index,date,"startDate")} 
                  />
                   
              <StyledDatePicker
                    selected={item.endDate}
                    placeholderText="Select End Date" 
              
                    onChange={(date) => handleChange(index,date,"endDate")} 
                  />

              <Select onChange={select =>  handleChange(index, select,"projectId")}>
                <Option value="">Select Project </Option>
                {project.loading ?  <ClipLoader
              color="#fff"
              loading={project.loading}
              // cssOverride={override}
              size={14}
              aria-label="Loading Spinner"
              data-testid="loader"
            />:project.getProject.map(project => <Option value={project.id}>{project.projectTitle}</Option>)
          }
              </Select>
              </DateContainer>
             <DateContainer>
              <TaskButton>
                <ButtonContainer onClick={() => handleAdd()}>
                  <Icon />
                  <AddText>Add another task</AddText>
                </ButtonContainer>
              </TaskButton>
              <TaskButton>
                <ButtonContainer onClick={() => handleRemove(index)}>
                  <MinusIcon />
                  <AddText>Remove Task</AddText>
                </ButtonContainer>
              </TaskButton>
              </DateContainer>
             
              
            </>
          );
        })}
        <SubmitButtonContainer>
          <Button type="submit" onClick={handleSubmit}>
            <ClipLoader
              color="#fff"
              loading={task.loading}
              // cssOverride={override}
              size={14}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            Submit
          </Button>
        </SubmitButtonContainer>
        {success && <Success text="Task created!" success /> }
      </FormContainer>
    </>
  );
};

const Option=styled.option`
background:#fff;
width:5rem;
font-size:1.2rem;
&:hover{
  background:grey
}
`;
const ImageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  /* margin-top: 4px; */
`;
const Text = styled.p`
   font-family: Work Sans;
  font-weight: 400;
  size: 14px;
  line-height: 16.8px;
  margin-bottom:4px;
  @media screen and (max-width:840px){
    /* text-align:center */
  }
  /* margin-top:2rem; */
`;

const Select = styled.select`
  padding: 0.5rem;
  /* margin: 2rem 0 0 0; */
  background: #fff;
  width:15rem;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  transition: border-color 0.2s ease-in-out, box-shadow 0.1s ease-in-out;
  &:focus {
    outline: none;
    border-color: transparent;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }
`;

const FormContainer = styled.div`
  margin: 2rem 2rem;
  position:relative
`;
const ImageContainer = styled.div<{
  $zIndex: number;
  $text?: boolean;
  $current: string;
  $assign: string;
}>`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin-top:1em;
  margin-bottom:1rem;

  
  z-index: ${(props) => props.$zIndex};
  margin-left: ${(props) => props.$zIndex > 5 && "-10px"};
  /* margin-right: ${(props) => props.$text && "1rem"}; */
  border: ${({ $current, $assign }) =>
    $current === $assign && " 1px solid #2E90FA"};
`;
export const Images = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 15px;
`;
const TaskButton = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-right: 2rem;
  margin-top: 2rem;
  @media screen and (max-width: 840px) {
    margin-right: 0;
    margin-top: 0.5rem;
  };
 
`;
const SubmitButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const DateContainer=styled.div`
display:flex;
align-items:center;
justify-content:flex-start;
/* margin-left:2rem; */
@media screen and  (max-width:840px){
  display:block;
  margin:0
}
`
const StyledDatePicker = styled(DatePicker)`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  font-size: 16px;
  margin-right:1rem;
  &:focus,
  &:active {
    outline: none; /* Remove the default focus outline */
    border: none; /* Remove the border */
    box-shadow: none; /* Remove any box shadow */
  };
  @media screen and  (max-width:840px){
    padding:3px;
    margin:.4rem;
    font-size:8px
  }
  `; 
   const MinusIcon = styled(FaMinus)`
  color: #32d583;
  font-size: 15px;
`;


export default Task;
