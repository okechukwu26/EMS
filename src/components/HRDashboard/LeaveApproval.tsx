/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { Header, Text, PayRiseContainer, Border } from "./PayIncrease";
import { BsCheckCircle, BsCheckLg } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { ChangeEvent, useEffect, useState } from "react";
import { LiaTimesCircle } from "react-icons/lia";
import FilterComponent from "../common/FilterComponent";
import { RejectLeave, getLeave, updateLeave } from "../../api/leave";
import { LoadingContainer } from "./PayIncrease";
import { MdNotes } from "react-icons/md";

import Success from "../common/Success";
import { ClipLoader } from "react-spinners";

export interface TableData {
  image: string;
  name: string;
  AnnualLeaveMeeting: string;
  startDate: string;
  endDate: string;
  Note: React.ComponentType<{ size?: string; color?: string }>;
  ApprovedStatus: boolean;
  Reason: string;
}
export interface LEAVE {
  id: string;
  firstName: string;
  lastName: string;
  reason: string;
  image: string;
  totalLeaveDaysRequested: string;
  startDate: Date;
  endDate: Date;
  Note: React.ComponentType<{ size?: string; color?: string }>;
  status: string;
  supervisorName: string;
  department: string;
  user:{
    image:string
  }
}

const Leave = () => {
  const [step, setStep] = useState(0);
  const [table, setTable] = useState<LEAVE[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [Status, setStatus] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const dispatch = useDispatch();
  const filteredTable = table.filter(
    (item) =>
      item.firstName.toLowerCase().includes(filter.toLowerCase()) ||
      item.lastName.toLowerCase().includes(filter.toLowerCase())
  );

  const leave = useSelector((state: any) => state.leave);
  const handleKey = (key: ChangeEvent<HTMLInputElement>) => {
    const value = key.target.value;
    setFilter(value);
  };
  const handleLeave = async () => {
    const leave = await getLeave(dispatch);
    setTable(leave);
  };
  useEffect(() => {
    handleLeave();

    if (filter !== "") {
      setTable(filteredTable);
    } else {
      setTable(table);
    }
  }, [filter, Status, leave.update]);
  const handleSuccess = async (item: string, id: string) => {
 
    const data = {
      id,
      status: item,
    };

    await updateLeave(dispatch)(data);
    setStatus(!Status);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };
  const handleFailure = async (item: string, id: string) => {
    const data = {
      id,
      status: item,
    };
    await RejectLeave(dispatch)(data);
    setStatus(!Status);
    setFailure(true);
    setTimeout(() => {
      setFailure(false);
    }, 3000);
  };

 

  return (
    <>
      <Header>
        <PayRiseContainer>
          <Border />
          <Text>Leave Request</Text>
        </PayRiseContainer>
        <FilterComponent
          handleKey={handleKey}
          step={step}
          setStep={(step) => setStep(step)}
        />
      </Header>
      <LoadingContainer>
        <ClipLoader
          color="green"
          loading={leave.loadingLeave && table.length === 0}
          size={40}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </LoadingContainer>
      {leave.leave.length === 0 && !leave.loadingLeave && (
        <LeaveText>No Leave request </LeaveText>
      )}
      {leave.leave.length > 0 && !leave.loadingLeave && (
        <TableContainer>
          <Table>
            <thead>
              <StyledTr>
                <StyledTh>Name</StyledTh>
                <StyledTh>Reason</StyledTh>
           
                <StyledTh>Dept.</StyledTh>
                <StyledTh>Annual leave remaining</StyledTh>
                <StyledTh>start date</StyledTh>
                <StyledTh>End date</StyledTh>
                <StyledTh>Approval Status</StyledTh>
                <StyledTh>Note</StyledTh>
              </StyledTr>
            </thead>
            <tbody>
              {table.map((item: LEAVE) => (
                <StyledTr key={item.id}>
                  <StyledTdImg>
                    <Image src={item.user.image && item.user.image} alt="image" />
                    <Texts>
                      {item.firstName} {item.lastName}
                    </Texts>
                  </StyledTdImg>
                  <StyledTd>{item.reason}</StyledTd>
            
                  <StyledTd>{item.department}</StyledTd>
                  <StyledTd>{item.totalLeaveDaysRequested} Days</StyledTd>
                  <StyledTd>
                    {new Date(item.startDate).toLocaleDateString()}
                  </StyledTd>
                  <StyledTd>
                    {new Date(item.endDate).toLocaleDateString()}
                  </StyledTd>

                  <StyledTd>
                    {item.status === "approved" ? (
                      <Approved>
                        <BsCheckLg
                          color="#27AE60"
                          style={{ paddingRight: "7px" }}
                        />
                        <ApprovedText>Approved</ApprovedText>
                      </Approved>
                    ) : item.status === "rejected" ? (
                      <Approved>
                        <LiaTimesCircle
                          size={20}
                          color="#EB5757"
                          style={{ paddingRight: "5px" }}
                        />
                        <ApprovedText $fail={true}>Rejected</ApprovedText>
                      </Approved>
                    ) : (
                      <Approved>
                        {leave.approvalLoading &&
                        leave.loadingId === item.id ? (
                          <ClipLoader
                            color="green"
                            loading={
                              leave.approvalLoading &&
                              leave.loadingId === item.id
                            }
                            size={25}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        ) : (
                          <BsCheckCircle
                            onClick={() => handleSuccess("approved", item.id)}
                            size={25}
                            color="green"
                            style={{ paddingRight: "7px" }}
                          />
                        )}

                        {leave.loadingReject && leave.loadingId === item.id ? (
                          <ClipLoader
                            color="#EB5757"
                            loading={
                              leave.loadingReject && leave.loadingId === item.id
                            }
                            size={25}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        ) : (
                          <LiaTimesCircle
                            onClick={() => handleFailure("rejected", item.id)}
                            size={25}
                            color="#EB5757"
                          />
                        )}
                      </Approved>
                    )}
                  </StyledTd>
                  <StyledTd>
                    <MdNotes />
                  </StyledTd>
                </StyledTr>
              ))}
            </tbody>
          </Table>
          {success && <Success text="Approved!" success={true} />}
          {failure && <Success text="Declined!" success={false} />}
        </TableContainer>
      )}
    </>
  );
};
export const Thead=styled.thead`
 font-family: Work Sans;
 background:grey
`
export const TableContainer = styled.div`
  overflow: auto;
width:100%;
  position: relative;
  //box-shadow

  @media screen and (max-width: 762px) {
    width: 20rem;
  }
`;
export const Texts = styled.p`
  padding-left: 3px;
  font-family: Work Sans;
  @media screen and (max-width: 762px) {
    /* font-size: 10px; */
  }
`;
const ApprovedText = styled.p<{ $fail?: boolean }>`
  color: ${(props) => (props.$fail ? "#eb5757" : "#27ae60")};
  font-size: 14px;
  font-family: Work Sans;
  @media screen and (max-width: 762px) {
    /* font-size: 10px; */
  }
`;
const Approved = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Table = styled.table`
  background: #fff;
  border-collapse: collapse;
  margin-top: 20px;
  border-radius: 10px;
  min-width: 100%;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  @media screen and (max-width: 762px) {
  }
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.01);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  }
`;

export const StyledTh = styled.th`
  padding: 4px;
  text-align: left;
  background-color: #fff;
  border-radius: 10px;
  width: 123px;
  @media screen and (max-width: 762px) {
    padding: 1px;
    text-align: center;
    width: 80px;
    /* font-size: 9px; */
  }
`;

export const StyledTd = styled.td`
  border-top: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  font-family: Work Sans;
  @media screen and (max-width: 762px) {
    padding: 3px;
  }
`;

export const StyledTdImg = styled.td`
  border-top: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 762px) {
    padding: 3px;
    text-align: center;
  }
`;
export const StyledTr = styled.tr`
  @media screen and (max-width: 762px) {
    font-size: 0.8rem;
    text-align: center;
    justify-content: center;
    font-family: Work Sans;
  }
  &:hover {
    background-color: #ecfdf3;
  }
`;
export const Image = styled.img`
  width: 30px;
  height: 30px;
  object-fit: contain;
  border-radius: 15px;
  @media screen and (max-width: 762px) {
    width: 20px;
    height: 20px;
  }
`;
const LeaveText = styled.p`
  text-align: center;
  font-family: Lato;
  font-size: 1.3rem;
  font-family: Work Sans;
`;

export default Leave;