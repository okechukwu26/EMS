/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoMdMore } from "react-icons/io";
import styled from "styled-components";
import { BiTask } from "react-icons/bi";
import { ProjectSpan } from "./AllProject";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../assets/images/avatar.png";
import { projectAction } from "../../Service/project";
import { ClipLoader } from "react-spinners";
import { getMembers } from "../../api/employee";
import { getProject } from "../../api/project";
import { useEffect } from "react";
interface RootState {
  // Define properties for different slices of your Redux store
  employee: EmployeeState;
  // Other slices if available...
}

// Define a type for the employee slice state
interface EmployeeState {
  loadingMember: boolean;
  members: Member[];
  // Other properties specific to the employee slice...
}

// Define a type for a single member
interface Member {
  image: string;
  id: string;
  // Other properties of a member...
}
export interface Project {
  startDate: Date;
  endDate: Date;
  projectTitle: string;
  description: string;
  priority: "HIGH" | "LOW" | "MED";
  OwnerId: string;
  id: string;
  projectStatus: "Upcoming" | "Ongoing" | "Completed";
  task: [];
  updatedAt: Date;
  //   Task: string[];
}
//mid{high #FEC84B, low #FEF0C7}

//low{high #2E90FA, low #D1E9FF}
const ProjectList = ({
  item,
  upcoming,
  completed,
  ongoing,
}: {
  item: Project;
  upcoming?: boolean;
  completed?: boolean;
  ongoing?: boolean;
}) => {
  const dispatch = useDispatch();
  const employee = useSelector((state: RootState) => state.employee);
  useEffect(() => {
    getMembers(dispatch);
  }, []);
  const currentDate = new Date();
  const startDate = new Date(item.startDate);
  const differenceInMs = startDate.getTime() - currentDate.getTime();
  const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
  const Due = Math.ceil(
    (new Date(item.endDate).getTime() - new Date(item.startDate).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const time = new Date(item.updatedAt);
  const date = time.getMonth() + 1;
  const day = time.getDate();
  const formattedDate = `${date.toString().padStart(2, "0")}/${day
    .toString()
    .padStart(2, "0")}`;

  const count = item.task.filter(
    (task: any) => task.status === "progress" || task.status === "completed"
  );

  return (
    <ProjectListContainer
      onClick={async () => {
        const project = await getProject(dispatch)(item.id);
        if (project) {
          setTimeout(() => dispatch(projectAction.changeStep(1)), 1000);
        }
      }}
    >
      <ProjectListContent>
        <ProjectListTitle>{item.projectTitle}</ProjectListTitle>
        <Icon />
      </ProjectListContent>
      <ProjectListContent>
        <StatusContainer>
          <Status>
            <StatusText $priority={item.priority}>{item.priority} </StatusText>
          </Status>
          {upcoming && (
            <ProjectSpan>
              Starts in {differenceInDays} day
              {differenceInDays === 1 ? "" : "s"}
            </ProjectSpan>
          )}
          {ongoing && (
            <ProjectSpan>
              Due in {Due} day
              {Due === 1 ? "" : "s"}
            </ProjectSpan>
          )}
          {completed && <ProjectSpan>completed in {formattedDate}</ProjectSpan>}
        </StatusContainer>
        <TaskContainer>
          <TaskIcon $completed={completed} />
          {completed && (
            <TaskText $completed={completed}>
              {item.task.length}/{item.task.length}
            </TaskText>
          )}
          {ongoing && (
            <TaskText>
              {count.length}/{item.task.length}
            </TaskText>
          )}
          {upcoming && <TaskText>{item.task.length}</TaskText>}
        </TaskContainer>
      </ProjectListContent>
      {!upcoming && (
        <>
          {ongoing && (
            <Progress
              $priority={item.priority}
              $total={item.task.length}
              $done={count.length}
            />
          )}
          {completed && <ProgressCompleted />}
          <ProgressDisplay>
            <ProjectSpan>Progress</ProjectSpan>
            {completed && <ProjectSpan>100%</ProjectSpan>}
            {ongoing && (
              <ProjectSpan>
              {item.task.length === 0 ? "0" : Math.ceil((count.length / item.task.length) * 100)}% 
              </ProjectSpan>
            )}
          </ProgressDisplay>
        </>
      )}
      <Divider />
      <ImageHeader>
        {employee.loadingMember ? (
          <ClipLoader
            color="#34a853"
            loading={employee.loadingMember}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <>
            {employee.members.map((member, index: number) => {
              return (
                <ImageContainer key={member.id} $zIndex={index + 5}>
                  <Image
                    src={member.image ? member.image : Avatar}
                    alt="member"
                  />
                </ImageContainer>
              );
            })}{" "}
          </>
        )}
      </ImageHeader>
    </ProjectListContainer>
  );
};
const ProjectListContainer = styled.div`
  flex: 1;
  padding: 1.5rem;
  margin-bottom: 1rem;
  background: #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin-top: 0;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }
  @media screen and (max-width: 840px) {
    padding: 0.4rem;
    max-height: 8rem;
  }
`;
const ProjectListTitle = styled.p`
  font-size: 16px;
  font-family: Work Sans;
  font-weight: 400;
  font-weight: 600;
  color: #000;
  line-height: 19px;
  @media screen and (max-width: 840px) {
    font-size: 10px;
  }
`;
const ProjectListContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Icon = styled(IoMdMore)`
  padding-right: 2rem;
  font-size: 13px;
  @media screen and (max-width: 840px) {
    padding-right: 0px;
  }
`;
const Status = styled.div`
  width: 3rem;
  height: 1.5rem;
  background: #fff;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  @media screen and (max-width: 840px) {
    width: 2rem;
    height: 0.8rem;
    border-radius: 3px;
    margin-right: 5px;
  }
`;
const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StatusText = styled.p<{ $priority: string }>`
  color: ${(props) =>
    props.$priority === "HIGH"
      ? "#f04438"
      : props.$priority === "MED"
      ? "#FEC84B"
      : "#2E90FA"};
  font-weight: 600;
  font-size: 12px;
  text-align: Center;
  margin-top: 6px;
  @media screen and (max-width: 840px) {
    font-size: 8px;
    margin-top: 3px;
  }
`;
const TaskIcon = styled(BiTask)<{ $completed: boolean }>`
  color: ${(props) => (props.$completed ? "#34a853" : "#d0d5dd")};
  @media screen and (max-width: 840px) {
    font-size: 12px;
  }
`;
const TaskText = styled.p<{ $completed?: boolean }>`
  color: ${(props) => (props?.$completed ? "#34a853" : "#000")};
  font-family: Work Sans;
  font-weight: 400;
  font-size: 12px;
  line-height: 14.4px;
  padding-left: 3px;
  @media screen and (max-width: 840px) {
    font-size: 8px;
  }
`;
const TaskContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProgressDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const Progress = styled.div<{
  $priority: string;
  $total: number;
  $done: number;
}>`
  width: 100%;
  height: 0.2rem;
  background: ${(props) =>
    props.$priority === "HIGH"
      ? "#fecdca"
      : props.$priority === "MED"
      ? "#FEF0C7"
      : "#D1E9FF"};
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: ${(props) =>
      props.$total && `${(props.$done / props.$total) * 100}%`};
    height: 100%;
    background: ${(props) =>
      props.$priority === "HIGH"
        ? "red"
        : props.$priority === "MED"
        ? "#FEC84B"
        : "#2E90FA"};
    animation: animate 5s linear infinite;
  }
`;

export  const ProgressCompleted = styled.div`
  width: 100%;
  height: 0.2rem;
  background: #34a853;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #34a853;
    animation: animate 2s linear infinite;
  }
`;

const Divider = styled.div`
  //line divider
  width: 100%;
  height: 0.1px;
  background: #d0d5dd;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin-top: 2rem;
  @media screen and (max-width: 840px) {
    margin-top: 0.5rem;
  }
`;
export const ImageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  margin-top: 4px;
`;
const ImageContainer = styled.div<{ $zIndex: number }>`
  width: 25px;
  height: 25px;
  border-radius: 13px;
  margin-top: 5px;
  z-index: ${(props) => props.$zIndex};
  margin-left: ${(props) => props.$zIndex > 5 && "-10px"};
`;
export const Image = styled.img`
  width: 25px;
  height: 25px;
  object-fit: cover;
  border-radius: 14px;
`;

export default ProjectList;
