/* eslint-disable @typescript-eslint/no-explicit-any */

import Project from "./Project";
import AllProject from "./AllProject"
import ProjectDetail from "./ProjectDetail";
import { useSelector } from "react-redux";
import Task from "./Task";

const ProjectContainer = () => {
 
  const projectStep = useSelector((state:any) => state.project.projectStep)


  return (
    <>
      {projectStep === 0 && <AllProject />}
      {projectStep ===1 && <ProjectDetail />}
      {projectStep === 2 && <Project   />}
      {projectStep === 3 && <Task />}
    </>
  );
};

export default ProjectContainer;
