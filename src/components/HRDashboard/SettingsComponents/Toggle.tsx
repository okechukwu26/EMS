import { useState, ChangeEvent } from "react";
import styled from "styled-components";
//import COLORS from "./color";

const COLORS = {
  GRAY: "#adadad",
  GREEN: "#34c759",
};

export default function ToggleSwitch() {
  const [switchState, setSwitchState] = useState(false);
  //   const [switchState1, setSwitchState1] = useState(false);
  //   const [switchState2, setSwitchState2] = useState(false);
  //   const [switchState3, setSwitchState3] = useState(false);
  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    console.log("---", e.target.checked);
    setSwitchState(!switchState);
  }
  return (
    <StyledLabel htmlFor="checkbox" checked={switchState}>
      <input
        id="checkbox"
        type="checkbox"
        checked={switchState}
        onChange={handleOnChange}
      />
    </StyledLabel>
  );
}

const StyledLabel = styled.label<{ checked: boolean }>`
  cursor: pointer;
  text-indent: -9999px;
  width: 60px;
  height: 10px;
  margin-right: 350px;
  margin-top: 30px;
  background: ${({ checked }) => (checked ? COLORS.GREEN : COLORS.GRAY)};
  display: block;
  border-radius: 50px;
  position: relative;
  font-family: Work Sans;
  &:after {
    content: "";
    position: absolute;
    left: ${({ checked }) => (checked ? "5px" : "calc(55% - 5px)")};
    top: -7px;
    width: 25px;
    height: 25px;
    background: ${({ checked }) => (checked ? COLORS.GREEN : COLORS.GRAY)};
    border-radius: 90px;
    transition: 0.3s;
  }
`;
