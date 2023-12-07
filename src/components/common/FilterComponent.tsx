import { ChangeEvent } from "react";
import styled from "styled-components";
import { RxDashboard } from "react-icons/rx";
import { FaListUl } from "react-icons/fa";
import { BsFunnel } from "react-icons/bs";
import { SlEqualizer } from "react-icons/sl";

interface Props {
  step: number;
  setStep: (step: number) => void;
  handleKey: (key: ChangeEvent<HTMLInputElement>) => void;
  show?: boolean;
}
const FilterComponent = ({ step, setStep, handleKey, show }: Props) => {
  return (
    <InputContainer>
      {!show && (
        <>
          <RxDashboard
            size={25}
            style={{ paddingRight: "10px" }}
            color={step === 0 ? "#34A853" : "#D0D5DD"}
            onClick={() => setStep(0)}
          />
          <FaListUl
            size={25}
            style={{ paddingRight: "10px" }}
            color={step === 1 ? "#34A853" : "#D0D5DD"}
            onClick={() => setStep(1)}
          />{" "}
        </>
      )}
      <FilterContainer>
        <BsFunnel size={15} color="#98A2B3" style={{ paddingRight: "10px" }} />
        <Input
          type="text"
          placeholder="filter names dates..."
          onChange={handleKey}
        />
        <SlEqualizer size={20} color="#34A853" />
      </FilterContainer>
    </InputContainer>
  );
};
const InputContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media screen and (max-width:840px){
    justify-content:flex-start;
  }
`;
 const FilterContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #f2f4f7;
  padding: 10px;
  border-radius: 15px;
`;
const Input = styled.input`
  border: none;
  background: #f2f4f7;
  &:focus {
    outline: none;
    border-color: transparent;
  }
`;

export default FilterComponent;
