import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { GetAllProject } from "../../api/project";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { AssignedTask } from "../../api/task";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AssignTask = ({ id }: { id: string }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [projectId, setProjectId] = useState([] as string[]);
  const [taskId, setTaskId] = useState("")
  const project = useSelector((state: any) => state.project);
  const tasks = useSelector((state: any) => state.task);
  useEffect(() => {
    GetAllProject(dispatch);
  }, [tasks.assignMessage]);
  const handleModal = (id: string) => {
    if (!projectId.includes(id)) {
      setProjectId((prev) => [...prev, id]);
      setOpen(true);
    } else if (projectId.includes(id)) {
      const index = projectId.indexOf(id);
      projectId.splice(index, 1);
      setProjectId([...projectId]);
    }
  };
  const handleAssign = (taskId: string) => {
    const info = {
      assignedTo: id,
      taskId,
    };
    setTaskId(taskId)
    AssignedTask(dispatch)(info);
  };
   const pending = project?.allProject?.map((item:any) => item.task.filter((item:any) => item.assignedTo === null))
  console.log(pending)
  return (
    <ModalContainer>
      <ToastContainer />
      <HeaderContainer>
        <FilterContainer>
          <Search />
          <Input placeholder="Search" />
        </FilterContainer>
        <ButtonContainer>
          <Button> Add </Button>
        </ButtonContainer>
      </HeaderContainer>
      <Text> Available projects </Text>
      {project.loading ? (
        <LoaderContainer>

        <ClipLoader
          color="green"
          loading={project.loading}
          size={20}
          aria-label="Loading Spinner"
          data-testid="loader"
          />
          </LoaderContainer>
      ) : project.allProject.length === 0 ? (
        <Empty>No project created </Empty>
      ) : (
        project.allProject.map((project) => (
          <>
            <ProjectContainer
              key={project.id}
              onClick={() => handleModal(project.id)}
            >
              <ProjectText>{project.projectTitle}</ProjectText>
              <TaskContainer>
                <TaskText>{project.task.filter(item => item.assignedTo === null).length}</TaskText>
                <TaskText>Tasks</TaskText>
              </TaskContainer>
            </ProjectContainer>
            {open && projectId.includes(project.id) && (
              <ShowTask>
                <Text>Available Tasks</Text>
                {project.task.length === 0 ? (
                  <Empty>No Task created yet for this project</Empty>
                ) : (
                  project.task.map((task) => {
                    return (
                      <Container key={task.id}>
                        <TaskText>{task.title}</TaskText>
                        <TaskButton disabled={task.assignedTo !== null} $assign={task.assignedTo}  onClick={() => handleAssign(task.id)}>
                          <ClipLoader
                            color="#fff"
                            loading={tasks.loading && task.id === taskId}
                            size={8}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                         
                            />
                        {task.assignedTo === null ? "Assign":"Assigned"} 
                        </TaskButton>
                      </Container>
                    );
                  })
                )}
              </ShowTask>
            )}
          </>
        ))
      )}
    </ModalContainer>
  );
};
const LoaderContainer=styled.div`
    display:flex;
    align-items:center;
    justify-content: center;
`;
const Text = styled.p`
  color: #cbd0d9;
  font-size: 14px;
  margin-left: 1rem;
  font-family: Work Sans;
`;

const Empty = styled.p`
  text-align: center;
  font-family: Work Sans;
`;
const ShowTask = styled.div``;
const ProjectContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  &:hover {
    background: #d1fadf;
  }
`;
const TaskButton = styled.button<{$assign:string | null}>`
  background:${({$assign}) => $assign === null? "#27ae60":"#eaecf0"};
  padding: 8px;
  color: ${({$assign}) => $assign === null? "#fff":"#98a2b3"}; ;
  border-radius: 10px;
  border: none;
  margin-right: 1rem;
  font-family: Work Sans;
  &:hover{
    cursor:${({$assign}) => $assign === null? "pointer":"not-allowed"}
  
  }
`;
//
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ProjectText = styled.p`
  color: #000;
  margin-left: 1.5rem;
  flex-grow: 1;
  margin-top: 2px;
  margin-bottom: 2px;
  font-family: Work Sans;
`;
const TaskText = styled.p`
  color: #404040;
  font-size: 14px;
  padding-left: 6px;
  font-weight: 100;
  font-family: Work Sans;
`;
const TaskContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 0 1rem;
`;

const ModalContainer = styled.div`
  width: 18rem;
  border-radius: 10px;
  background-color: white;
  border: 1px solid #dcdfe5;
  margin-top: 3px;
  /* box-shadow: 0 0 5px rgba(0, 0, 0, 0.3); */
  /* box-shadow: 0 0 3px rgba(0, 0, 0, 0.2); */
  position: absolute;
  margin-left: -1.5rem;
  z-index: 100000;
  top: 0;
`;
const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
  justify-content: space-between;
  width: 100%;
  /* margin-bottom:1rem; */
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: "space-between";
  margin-left: 15px;
  flex-grow: 1;
  background: #f7fcf8;
  border: 1px solid #ebeef5;
  padding: 10px;
  border-radius: 15px;
`;
const Search = styled(FaSearch)`
  color: grey;
`;
const ButtonContainer = styled.div`
  width: 3rem;
  margin-right: 1.5rem;
  padding-left: 15px;
`;
const Button = styled.button`
  padding: 10px 18px;
  background: #27ae60;
  border-radius: 10px;
  border: none;
  color: #fff;
`;
const Input = styled.input`
  border: none;
  background: #f7fcf8;

  flex-grow: 1;
  &:focus {
    outline: none;
    border-color: transparent;
  }
`;

export default AssignTask;
