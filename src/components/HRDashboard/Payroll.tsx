/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState } from "react";
import { TopWrap1 } from "../EmployeeDashboard/Payrise";
import FilterComponent from "../common/FilterComponent";
import { LuArrowDownUp } from "react-icons/lu";
import { StyledTdImg, StyledTh, Texts, Image } from "../HRDashboard/LeaveApproval";
import styled from "styled-components";
import {
  Text,
} from "../HRDashboard/PayIncrease";
import { GeneralWrap,Table, WrapSelect } from "../TeamLeadDashboard/Homepage";



const Payroll = () => {
    

  const [step, setStep] = useState(0);
  const [filter, setFilter] = useState<string>("");
  const handleKey = (key: ChangeEvent<HTMLInputElement>) => {
    const value = key.target.value;
    setFilter(value);
  };
  

const StyledTr = styled.tr`
  th,
  td {
    padding: 10px;
  }
`;

  return (
    <>
      <GeneralWrap>
    
        <WrapSelect>
        <TopWrap1 style={{display: "inline"}}>

          <Text style={{display: "inline", paddingLeft:"10px"}}>Payroll</Text>
        </TopWrap1> 
        <FilterComponent
          handleKey={handleKey}
          step={step}
          setStep={(step) => setStep(step)}
        />
        </WrapSelect>
      <Table>
        <thead>
          <StyledTr>
            <StyledTh>Name</StyledTh>
            <StyledTh>Date Employed<LuArrowDownUp style={{color: "black", paddingLeft: "10px"}}/></StyledTh>
            <StyledTh>Department</StyledTh>
            <StyledTh>Role</StyledTh>
            <StyledTh>Salary</StyledTh>
            <StyledTh>Bank Name</StyledTh>
            <StyledTh>Account Number</StyledTh>

          </StyledTr>
        </thead>
        <tbody>
          <tr>
            <td>
                <StyledTdImg>
                    <Image 
                      src=""
                    //   {item.image && item.image} 
                        alt="image" />
                    <Texts>
                      {/* {item.firstName} {item.lastName} */} Adaobi Anizoba
                    </Texts>
                </StyledTdImg>
            </td>
            <td>01/01/2021</td>
            <td>Tech</td>
            <td>Intern</td>
            <td>150,000</td>
            <td>Zenith Bank</td>
            <td>6015001233</td>          
          </tr>
        </tbody>
      </Table>
      </GeneralWrap>
 
    </>
  );
};

export default Payroll;
