/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import {
  ProjectContainer,
  Header,
  HeaderLeft,
  ArrowImage,
  Image,
  Span,
} from "./Project";
import { ButtonContainer, AddText, Icon } from "./AllProject";
import dayjs from "dayjs";
import Arrow from "../../assets/images/Line1.svg";
import arrowLeft from "../../assets/images/arrow-left.svg";

import { useDispatch } from "react-redux";

import Members from "./Members";
import FilterComponent from "../common/FilterComponent";
import TaskTable from "./TaskTable";
import { projectAction } from '../../Service/project';

interface PROJECT {
  projectTitle: string;
  endDate: Date;
  startDate: Date;
  task: TASK[];
  projectStatus: string;
  priority: string;
  owner: Owner;
  description: string;
}
export interface TASK {
  title: string;
  description: string;
  endDate: Date;
  startDate: Date;
  assignedTo: string;
  status: string;
  id: string;
  projectId:string;
 
}
interface Owner {
  firstName: string;
  lastName: string;
  image: string;
}
export const formatDate = (dateString: Date) => {
  return dayjs(dateString).format("DD MMM YYYY");
};

const ProjectDetail = () => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(0);

  const details = useSelector((state: any) => state.project.detail as PROJECT);
  useEffect(() => {}, [details]);

  return (
    <>
      {Object.values(details).length > 0 && (
        <ProjectContainer>
          <Header>
            <HeaderLeft>
              <ArrowImage
                src={arrowLeft}
                alt="arrow"
                onClick={() => dispatch(projectAction.changeStep(0))}
              />
              <Image src={Arrow} alt="Arrow" />
              <Span>Edo pack</Span>
            </HeaderLeft>
          </Header>
          <Header>
            <HeaderLeft>
              <Project>
                <Text>{details.projectTitle}</Text>
                <OwnerText>
                  Owned by {details.owner.firstName} {details.owner.lastName}{" "}
                  {formatDate(details.startDate)}
                </OwnerText>
                <Due>DUE DATE</Due>
                <OwnerText>{formatDate(details.endDate)}</OwnerText>
              </Project>
            </HeaderLeft>
            <MemberComponent>
              <Members text={true} />
              <FilterComponent
                show={true}
                step={step}
                setStep={(step) => setStep(step)}
                handleKey={(key) => console.log(key)}
              />
            </MemberComponent>
          </Header>
          <TaskButton onClick={() => dispatch(projectAction.changeStep(3))}>
            <ButtonContainer >
              <Icon />
              <AddText>add task</AddText>
            </ButtonContainer>
          </TaskButton>
          <DescriptionContainer>
            <OwnerText>Description</OwnerText>
            <Due>{details.description}</Due>
          </DescriptionContainer>

         {details.task.length === 0 ? <Non>No Task created yet</Non>: <TaskTable tasks={details.task} />}
        </ProjectContainer>
      )}
    </>
  );
};
const Non=styled.p`
font-family: Work Sans;
font-size:1.2rem;
font-weight:300;
text-align:center;
`

const MemberComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10rem;
  @media screen and (max-width: 840px) {
    margin: 0;
  }
`;
const DescriptionContainer = styled.div`
  max-width: 70%;
`;

const Project = styled.div`
  display: block;
  margin: 1rem 2.5rem;
  @media screen and (max-width: 840px) {
    margin: 1rem 1.5rem;
  }
`;
export const TaskButton = styled.div`
  display: flex;
  justify-content:flex-end;
  margin-right:10rem;
    @media screen and (max-width: 840px) {
    margin-right: 0;
    justify-content:flex-start;
  }
`;
const Text = styled.p`
  font-family: Work Sans;
  font-weight: 400;
  font-size: 20px;
  line-height: 16.8px;
  margin-bottom: 10px;
  @media screen and (max-width: 840px) {
    margin-bottom: 4px;
    font-size: 15px;
  }
`;
const OwnerText = styled.p`
  font-family: Work Sans;
  font-weight: 400;
  font-size: 17px;
  line-height: 16.8px;
  margin-top: 4px;
  margin-bottom: 10px;
  @media screen and (max-width: 840px) {
    margin-bottom: 4px;
    font-size: 13px;
  }
`;
const Due = styled.p`
  color: #828282;
  font-family: Work Sans;
  font-weight: 400;
  font-size: 14px;
  line-height: 16.8px;
  margin-top: 4px;
  margin-bottom: 10px;
  @media screen and (max-width: 840px) {
    margin-bottom: 4px;
    font-size: 13px;
  }
`;

export default ProjectDetail;
