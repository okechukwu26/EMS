/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Header,
  Text,
  PayRiseContainer,
  Border,
} from "../HRDashboard/PayIncrease";
import FilterComponent from "../common/FilterComponent";
import styled from "styled-components";
import { IoMdAdd } from "react-icons/io";
import ProjectList from "./ProjectList";
import { projectAction } from "../../Service/project";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getProjects } from "../../api/project";
import { Filter, FilterOngoing, FilterUpcoming } from "../../utils";

const AllProject = () => {
  const [Upcoming, setUpcoming] = useState([]);
  const [Ongoing, setOngoing] = useState([]);
  const [Completed, setCompleted] = useState([]);
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();

  const getProject = async () => {
    const project = await getProjects(dispatch);

    setUpcoming(FilterUpcoming(project));
    setOngoing(FilterOngoing(project));
    setCompleted(Filter("Completed", project));
  };
  useEffect(() => {
    console.log(new Date().getDay());

    getProject();
  }, []);
  console.log(Completed)

  return (
    <>
      <HeaderContainer>
        <Header>
          <PayRiseContainer>
            <Border />
            <Text>Projects</Text>
          </PayRiseContainer>
          <FilterContainer>
            <FilterComponent step={step} setStep={(step) => setStep(step)} handleKey={(key) => console.log(key)}  />
          </FilterContainer>
        </Header>
        <ProjectStatusContainer>
          <Project>
            <ProjectStatus>
              <ProjectText>
                Upcoming <ProjectSpan>(2)</ProjectSpan>
              </ProjectText>
              <ButtonContainer
                onClick={() => dispatch(projectAction.changeStep(2))}
              >
                <Icon />
                <AddText>New Project </AddText>
              </ButtonContainer>
            </ProjectStatus>
            {Upcoming && Upcoming.length === 0 ? (
              <ProjectText>No Upcoming Project</ProjectText>
            ) : (
              Upcoming.map((item: any) => (
                <ProjectList key={item.id} item={item} upcoming={true} />
              ))
            )}
          </Project>

          <Project>
            <ProjectStatus>
              <ProjectText>
                Ongoing <ProjectSpan>(2)</ProjectSpan>
              </ProjectText>
              <ButtonContainer
                onClick={() => dispatch(projectAction.changeStep(2))}
              >
                <Icon />
                <AddText>New Project </AddText>
              </ButtonContainer>
            </ProjectStatus>
            {Ongoing && Ongoing.length === 0 ? (
              <ProjectText>No Ongoing Project yet</ProjectText>
            ) : (
              Ongoing.map((item: any) => (
                <ProjectList
                  key={item.id}
                  item={item}
                  upcoming={false}
                  completed={false}
                  ongoing={true}
                />
              ))
            )}
          </Project>
          <Project>
            <ProjectStatus>
              <ProjectText>
                Completed <ProjectSpan>(2)</ProjectSpan>
              </ProjectText>
              <ButtonContainer
                onClick={() => dispatch(projectAction.changeStep(2))}
              >
                <Icon />
                <AddText>New Project </AddText>
              </ButtonContainer>
            </ProjectStatus>
            {Completed && Completed.length === 0 ? (
              <ProjectText>No completed Project yet</ProjectText>
            ) : (
              Completed.map((item: any) => (
                <ProjectList
                  key={item.id}
                  item={item}
                  upcoming={false}
                  completed={true}
                  ongoing={false}
                />
              ))
            )}
          </Project>
        </ProjectStatusContainer>
      </HeaderContainer>
    </>
  );
};

const FilterContainer = styled.div`
  margin-right: 5.4rem;
`;
const HeaderContainer = styled.div`
  margin: 1rem 5rem 1rem 1rem;
  @media screen and (max-width: 840px) {
    margin-right: 0rem;
 
  
  }
`;
const ProjectStatusContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 10px;
  flex-grow: 1;
  width: 100%;
  @media screen and (max-width: 840px) {
    /* margin-right: 2rem; */
    width: 23rem;
    overflow: auto;
  }
`;
const ProjectStatus = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
const Project = styled.div`
  margin-right: 2rem;
  @media screen and (max-width: 840px) {
    margin: 0;
    display: flex;
    flex-direction: column;
  }
`;
const ProjectText = styled.p`
 font-family: Work Sans;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  @media screen and (max-width: 840px) {
    font-size: 8px;
    padding: 0;
    margin: 0;
  }
`;
export const ProjectSpan = styled.span`
  padding-left: 3px;
  color: #98a2b3;
  font-size: 16px;
  font-family: Work Sans;
  @media screen and (max-width: 840px) {
    font-size: 6px;
    padding: 0;
    margin: 0;
  }
`;
export const ButtonContainer = styled.div`
  background: #ecfdf3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 20px;
  border-radius: 15px;
  padding: 1px 0.8rem;
  &:hover {
    cursor: pointer;
    background:#fdfdfd
  }
`;
export const AddText = styled.p`
  font-size: 0.7rem;
  color: #32d583;
  padding-left: 4px;
  font-family: Work Sans;
  @media screen and (max-width: 840px) {
    font-size: 0.4rem;
  }
`;
export const Icon = styled(IoMdAdd)`
  color: #32d583;
  font-size: 20px;
`;

export default AllProject;
