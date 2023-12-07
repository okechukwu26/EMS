import React from "react";
import { SaveBtn, Container } from "./PasswordSettings";
import ToggleSwitch from "./Toggle";
import styled from "styled-components";

const Notification = () => {
  const [switchState1, setSwitchState1] = React.useState(false);
  return (
    <Container>
      <Can>
        <div>
          <p>Enable Email Notifications</p>
          <p>Enable or Disenable Email Notifications</p>
        </div>
        <div>
          <ToggleSwitch
            checked={switchState1}
            onChange={() => setSwitchState1(!switchState1)}
          />
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

// const Notification = () => {
//   const [switchState1, setSwitchState1] = React.useState(false);
//   const [switchState2, setSwitchState2] = React.useState(false);
//   const [switchState3, setSwitchState3] = React.useState(false);
//   const [switchState4, setSwitchState4] = React.useState(false);

//   return (
//     <Container>
//       <ToggleSwitch
//         checked={switchState1}
//         onChange={() => setSwitchState1(!switchState1)}
//       >
//         Enable Email Notifications
//       </ToggleSwitch>
//       <ToggleSwitch
//         checked={switchState2}
//         onChange={() => setSwitchState2(!switchState2)}
//       >
//         Enable SMS Notifications
//       </ToggleSwitch>
//       <ToggleSwitch
//         checked={switchState3}
//         onChange={() => setSwitchState3(!switchState3)}
//       >
//         Customize SMS Template
//       </ToggleSwitch>
//       <ToggleSwitch
//         checked={switchState4}
//         onChange={() => setSwitchState4(!switchState4)}
//       >
//         Configure Delivery Settings
//       </ToggleSwitch>
//       <SaveBtn>Save Changes</SaveBtn>
//     </Container>
//   );
// };

export default Notification;
const Can = styled.div`
  display: flex;
  justify-content: space-between;
`;
