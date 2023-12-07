import React from "react";
import { SaveBtn, Container } from "./PasswordSettings";
import ToggleSwitch from "./Toggle";
import styled from "styled-components";

const Notification = () => {
  return (
    <Container>
      <Can>
        <div>
          <Can1>Enable Email Notifications</Can1>
          <Can1>Enable or Disenable Email Notifications</Can1>
        </div>
        <div>
          <ToggleSwitch />
        </div>
      </Can>
      <Can>
        <div>
          <p>Enable SMS Notifications</p>
          <p>Enable or Disenable SMS Notifications</p>
        </div>
        <div>
          <ToggleSwitch />
        </div>
      </Can>
      <Can>
        <div>
          <p>Customize SMS Template</p>
          <p>Customizr the content of SMS Template</p>
        </div>
        <div>
          <ToggleSwitch />
        </div>
      </Can>
      <Can>
        <div>
          <p>Configure Delivery Settings</p>
          <p>Configure Email and SMS Delivery Settings</p>
        </div>
        <div>
          <ToggleSwitch />
        </div>
      </Can>
      <SaveBtn>Save Changes</SaveBtn>
    </Container>
  );
};

export default Notification;
const Can = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 960px) {
    gap: 25%;
  }
`;
const Can1 = styled.p`
  // background-color: black;
  width: 200%;
  @media screen and (max-width: 960px) {
    // padding: 0 50px
    gap: 25%;
  }
`;
