import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import styled from "styled-components"
import { ErrorProject, IProject } from './Project';
import {ErrorText,Text} from "./Members"
import {TASK, ErrorTask} from "./Task"

interface Form {
    setForm: React.Dispatch<React.SetStateAction<IProject>> | React.Dispatch<React.SetStateAction<TASK>>;
    error:ErrorProject |ErrorTask
}
const TimeLine = ({setForm, error}:Form) => {
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [startDate, endDate] = dateRange;
  return (<>
    {/* <DateContainer> */}
        <Text>TIMELINE :</Text>
        <Date>

        <StyledDatePicker
          selectsRange={true}
          startDate={startDate}
       
          endDate={endDate}
     
          onChange={(update) => {
            setForm(prev =>({...prev,startDate: update[0] !== null ? update[0] : prev.startDate,
                endDate: update[1] !== null ? update[1] : prev.endDate,}))
            setDateRange(update as [Date, Date]);
          }}
          withPortal
          />
          <FaRegCalendarAlt color="#98A2B3" size={20} style={{margin:"0 5px"}} />
          </Date>
      {/* </DateContainer> */}
          {error.startDate && <ErrorText>{error.startDate}</ErrorText>}
          {error.endDate && <ErrorText>{error.endDate}</ErrorText>}
  </>
  )
}
export const DateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction:column;
  margin-top:2rem;
  @media screen and (max-width:840px){
    display:block;
    justify-content:center;
    align-items:center
  }
`;
export const Date=styled.div`
display:flex;
justify-content:flex-start;
align-items:center;
background:#fff;
width:20rem;
border-radius:5px;
padding:10px;
border-radius:10px;
margin-left:5px;
box-shadow:0 0 5px rgba(0, 0, 0, .3);
@media screen and (max-width:840px){
    padding:5px;
    margin-left:0px;
    width:18rem

}

`;
export const StyledDatePicker = styled(DatePicker)`
 font-family: Work Sans;

  border: none;
  border-radius: 4px;
  color:#98A2B3;
  height:22px;
  font-size:18px;
  margin-left:8px;
  border-radius:5px;
  width:15rem;
  @media screen and (max-width:840px){
   width:15rem;
   font-size:12px
  };
  &.focus{
    outline: none;
    border-color: #FFF;
    border:none
  };
  

  /* Calendar style */
  /* .react-datepicker-wrapper {
    display: block;
  }
  .react-datepicker {
    font-family: Arial, sans-serif;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }
  .react-datepicker__header {
    background-color: #f0f0f0;
  }
  .react-datepicker__day-name, .react-datepicker__day {
    width: 2rem;
    line-height: 2rem;
    margin: 0.2rem;
  }
  .react-datepicker__day--selected {
    background-color: #007bff;
    color: white;
  }
  .react-datepicker__day--keyboard-selected {
    background-color: #007bff;
    color: white;
  } */
`

export default TimeLine
