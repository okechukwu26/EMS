import {TableContainer, Table,StyledTd, StyledTh,StyledTr} from "../HRDashboard/LeaveApproval"
import {TASK} from "./ProjectDetail"
import dayjs from "dayjs"
const formatDate = (dateString:Date) => {
    return dayjs(dateString).format('DD MMM YYYY');
  };

const TaskTable = ({tasks}:{tasks:TASK[]}) => {
  return (
    <TableContainer>
      <Table>
        <thead>
          <StyledTr>
            <StyledTh>Task Title</StyledTh>
            <StyledTh>Task Description</StyledTh>
            <StyledTh>Start Date</StyledTh>
            <StyledTh>End Date</StyledTh>
            <StyledTh>Assigned To</StyledTh>
            <StyledTh>Task Status</StyledTh>
          </StyledTr>
        </thead>
        <tbody>
            {tasks.map((task) =>   <StyledTr key={task.id}>
            <StyledTd>{task.title}</StyledTd>
            <StyledTd>{task.description}</StyledTd>
            <StyledTd>{formatDate(task.startDate)}</StyledTd>
            <StyledTd>{formatDate(task.endDate)} </StyledTd>
            <StyledTd>Assigned To</StyledTd>
            <StyledTd>{task.status}</StyledTd>
          </StyledTr> )}
        
          
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;
