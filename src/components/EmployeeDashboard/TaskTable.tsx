// import React, { ChangeEvent, useState } from "react";
// import styled from "styled-components";
// import {
//   Border,
//   Text,
//   Header,
//   PayRiseContainer,
//   LoadingContainer,
// } from "../HRDashboard/PayIncrease";
// import {
//   StyledTr,
//   StyledTd,
//   StyledTdImg,
//   StyledTh,
//   Image,
//   Texts,
//   Table,
//   TableContainer,
// } from "../HRDashboard/LeaveApproval";
// //import { Imgs } from "../employee/Employee";
// import FilterComponent from "../common/FilterComponent";
// import { ClipLoader } from "react-spinners";
// import Eko from "../../assets/images/Eko.svg";
// import Icon from "../../assets/images/Icon.svg";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../Service/store";
// import { getTask } from "../../api/task";

// export enum STATUS {
//   HIGH = "HIGH",
//   LOW = "LOW",
//   MEDIUM = "MEDIUM",
// }

// export enum PROGRESS {
//   TWENTY = "20%",
//   FORTY = "40%",
//   SIXTY = "60%",
//   EIGHTY = "80%",
//   HUNDRED = "100%",
// }

// export interface TaskData {
//   image: string;
//   projectTitle: string;
//   title: string;
//   startDate: string;
//   endDate: string;
//   members: string[];
//   Note: React.ComponentType<{ size?: string; color?: string }>;
//   status: string;
//   progress: PROGRESS;
// }
// export interface TASK {
//   title: string;
//   description: string;
//   startDate: string;
//   endDate: string;
//   Note: React.ComponentType<{ size?: string; color?: string }>;
//   status: string;
//   progress: PROGRESS;
//   assignedTo: string;
//   timeline: Date;
//   projectId: string;
// }
// const TaskTable = () => {
//   const [step, setStep] = useState(0);
//   const [table, setTable] = useState<TASK[]>([]);
//   const [filter, setFilter] = useState<string>("");
//   const [spinner, setSpinner] = useState(true);

//   const dispatch = useDispatch();

//   const task = useSelector((state: RootState) => state.task);

//   // const filteredTable = table.filter(
//   //   (item) =>
//   //     item.title.toLowerCase().includes(filter.toLowerCase()) ||
//   //     item.description.toLowerCase().includes(filter.toLowerCase())
//   // );

//   const handleTask = async () => {
//     const task = await getTask(dispatch);
//     setTable(task);
//   };

//   // useEffect(() => {
//   //   handleTask();

//   //   if (filter !== "") {
//   //     setTable(
//   //       table.filter(
//   //         (item) =>
//   //           item.title.toLowerCase().includes(filter.toLowerCase()) ||
//   //           item.description.toLowerCase().includes(filter.toLowerCase())
//   //       )
//   //     );
//   //   } else {
//   //     setTable(table);
//   //   }
//   // }, [filter, task.update]);
//   // useEffect(() => {
//   //   setTimeout(() => setSpinner(false), 1000);
//   // }, []);

//   const handleKey = (key: ChangeEvent<HTMLInputElement>) => {
//     console.log(key);
//     const value = key.target.value;
//     setFilter(value);
//   };

//   return (
//     <>
//       <Header>
//         <TaskContainer>
//           <Border />
//           <Text>Ongoing Tasks</Text>
//         </TaskContainer>
//         <FilterComponent
//           handleKey={handleKey}
//           step={step}
//           setStep={(step) => setStep(step)}
//         />
//       </Header>
//       {/* <LoadingContainer>
//         <ClipLoader
//           color="green"
//           //loading={leave.loadingLeave && table.length === 0}
//           size={40}
//           aria-label="Loading Spinner"
//           data-testid="loader"
//         />
//       </LoadingContainer> */}
//       {task.task.length === 0 && !task.loadingTask && (
//         <TaskText>No Task Available</TaskText>
//       )}
//       {task.task.length > 0 && !task.loadingTask && (
//         <TableContainer>
//           <Table>
//             <thead>
//               <StyledTr>
//                 <StyledTb>Project Name</StyledTb>
//                 <StyledTb>
//                   Status <img src={Icon} />
//                 </StyledTb>
//                 <StyledTb>Start date</StyledTb>
//                 <StyledTb>Due date</StyledTb>
//                 <StyledTb>Tasks</StyledTb>
//                 <StyledTb>Members</StyledTb>
//                 <StyledTb>Progress</StyledTb>
//               </StyledTr>
//             </thead>
//             <tbody>
//               {/* {table.map((item: TASK) => ( */}
//               <StyledTr>
//                 <StyledTdImg style={{ width: "190px" }}>
//                   <Image src={Eko} alt="Project" />
//                   <ProjectName>Eko Hotels and Suits</ProjectName>
//                 </StyledTdImg>
//                 <StyledTd>
//                   <div
//                     style={{
//                       borderRadius: "10px",
//                       boxShadow: "12px",
//                       color: "red",
//                       fontSize: "14px",
//                       width: "60px",
//                       paddingTop: "5px",
//                     }}
//                   >
//                     HIGH
//                   </div>
//                 </StyledTd>
//                 <StyledTd>June 12 2020</StyledTd>
//                 <StyledTd>June 12 2020</StyledTd>
//                 <StyledTd style={{ width: "200px" }}>
//                   <div>
//                     <ProjectName>Domain and Hosting</ProjectName>
//                   </div>
//                   <div>
//                     <Desc>Choose a sutable domain name</Desc>
//                   </div>
//                 </StyledTd>
//                 <StyledTd>
//                   <div
//                     style={{
//                       display: "flex",
//                       marginLeft: "2px",
//                     }}
//                   >
//                     {/* <Imgs>
//                 <img
//                   src="https://i.pravatar.cc/150?img=3"
//                   alt="avatar"
//                   style={{
//                     borderRadius: "50%",
//                     width: "20px",
//                     height: "20px",
//                     border: "0.3px solid blue",
//                   }}
//                 />
//               </Imgs>
//               <Imgs>
//                 <img
//                   src="https://i.pravatar.cc/150?img=3"
//                   alt="avatar"
//                   style={{
//                     borderRadius: "50%",
//                     width: "20px",
//                     height: "20px",
//                     border: "0.3px solid blue",
//                   }}
//                 />
//               </Imgs>
//               <Imgs>
//                 <img
//                   src="https://i.pravatar.cc/150?img=3"
//                   alt="avatar"
//                   style={{
//                     borderRadius: "50%",
//                     width: "20px",
//                     height: "20px",
//                     border: "0.3px solid blue",
//                   }}
//                 />
//               </Imgs>
//               <Imgs>
//                 <img
//                   src="https://i.pravatar.cc/150?img=3"
//                   alt="avatar"
//                   style={{
//                     borderRadius: "50%",
//                     width: "20px",
//                     height: "20px",
//                     border: "0.3px solid blue",
//                   }}
//                 />
//               </Imgs> */}
//                   </div>
//                 </StyledTd>
//                 <StyledTd>
//                   <div
//                     style={{
//                       width: "100px",
//                       height: "5px",
//                       backgroundColor: "lightgreen",
//                       borderRadius: "4px",
//                     }}
//                   >
//                     <div
//                       style={{
//                         width: "80%",
//                         height: "100%",
//                         borderRadius: "4px",
//                         backgroundColor: "green",
//                       }}
//                     ></div>
//                   </div>
//                 </StyledTd>
//               </StyledTr>
//               {/* ))} */}
//             </tbody>
//           </Table>
//         </TableContainer>
//       )}
//     </>
//   );
// };

// export default TaskTable;

// const TaskText = styled.p`
//   text-align: center;
//   font-family: Lato;
//   font-size: 1.3rem;
// `;
// const TaskContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const StyledTb = styled.th`
//   padding: 4px;
//   text-align: left;
//   background-color: #fff;
//   width: 123px;
//   font-size: 16px;
//   font-weight: 400;
//   line-height: 20px;
//   letter-spacing: 0.15000000596046448px;
//   text-align: left;
//   font-family: Lato;
//   color: #475467;
//   @media screen and (max-width: 762px) {
//     padding: 1px;
//     text-align: center;
//     width: 80px;
//     /* font-size: 9px; */
//   }
// `;

// const ProjectName = styled.p`
//   //styleName: Body reg;
//   font-family: Lato;
//   font-size: 16px;
//   font-weight: 400;
//   line-height: 19px;
//   letter-spacing: 0em;
//   text-align: left;
//   color: #000000;
//   margin-left: 5px;
// `;
// const Desc = styled.p`
//   stylename: Body reg 14;
//   font-family: Lato;
//   font-size: 14px;
//   font-weight: 400;
//   line-height: 17px;
//   letter-spacing: 0em;
//   text-align: left;
//   color: #98a2b3;
// `;
