import React, { useState } from "react";
import styled from "styled-components";
import AvatarUpdate from "./AvatarUpdate";
import FormSlab from "./formSlab";
import Notification from "./Notification";

import PasswordSettings from "./PasswordSettings";

interface StyledTabProps {
  active: boolean;
  onClick: () => void;
  "data-tab-value": string;
  children: React.ReactNode;
}

const StyledTab = ({
  active,
  onClick,
  "data-tab-value": dataTabValue,
  children,
}: StyledTabProps) => {
  return (
    <StyledTabWrapper
      active={active}
      onClick={onClick}
      data-tab-value={dataTabValue}
    >
      {children}
    </StyledTabWrapper>
  );
};

interface StyledTabWrapperProps {
  active: boolean;
}

const SettingsTab = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <Container>
        <TitleDiv>
          <Title>
            <TitleLabel>Settings</TitleLabel>
          </Title>
        </TitleDiv>

        <StyledTabs>
          <StyledTab
            onClick={() => handleTabClick("profile")}
            active={activeTab === "profile"}
            data-tab-value="#tab_1"
          >
            Profile Update
          </StyledTab>
          <StyledTab
            onClick={() => handleTabClick("password")}
            active={activeTab === "password"}
            data-tab-value="#tab_2"
          >
            Password Settings
          </StyledTab>
          <StyledTab
            onClick={() => handleTabClick("notification")}
            active={activeTab === "notification"}
            data-tab-value="#tab_3"
          >
            Notification
          </StyledTab>
        </StyledTabs>

        <SlabContent>
          {activeTab === "profile" && (
            <div>
              <AvatarUpdate />
              <FormSlab />
            </div>
          )}
          {activeTab === "password" && <PasswordSettings />}
          {
            activeTab === "notification" && <Notification />
            // (
            //   <SettingsContent>
            //     <h1>Notification</h1>
            //   </SettingsContent>

            // )
          }
        </SlabContent>
      </Container>
    </>
  );
};

export default SettingsTab;

const StyledTabWrapper = styled.span<StyledTabWrapperProps>`
  position: relative;
  cursor: pointer;
  font-size: px;
  font-family: Work Sans;
  padding: 15px 10px;
  color: ${(props) => (props.active ? "#27AE60" : "#0000008A")};
  background-color: ${(props) => (props.active ? "white" : "transparent")};
  border-radius: ${(props) => (props.active ? "5px 5px 0 0" : "none")};
  box-shadow: ${(props) =>
    props.active
      ? "0px 7px 8px 0px #00000029, 0px -5px 22px 0px #00000017, 0px 12px 17px 0px #0000001C"
      : "none"};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 0;
    height: 15px;
    width: 100%;
    background-color: transparent;
    border-radius: 50% 50% 0 0;
    z-index: -1;
  }

  &:hover {
    background-color: ${(props) => (props.active ? "white" : "#f5f5f5")};
  }
`;

const Container = styled.div`
  align-items: center;
  background: #f9fafb;
  // background: blue;
  width: 100%;
  margin: auto;
  //   height: 100vh;
  //   padding: 20px;
`;

const TitleDiv = styled.div`
  width: 100%;
  height: 58px;
  padding: 16px 24px;
  // background: #ffffff;
  padding: 12px 24px 12px 24px;
  background: #ffffff;
`;

const Title = styled.div`
  width: 100%;
  border-left: 4px solid #27ae60;
  border-left-height: 2px;
  background-color: #f9fafb;
`;

const TitleLabel = styled.h1`
   font-family: Work Sans;
  font-size: 24px;
  font-weight: 600;
  line-height: 34px;
  letter-spacing: 0.15000000596046448px;
  text-align: left;
  padding-left: 5px;
`;

const StyledTabs = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  width: fit-content;
  gap: 10px;
  border-bottom: 1px solid #ccc;
  border-right-bottom-radius: -20px;
  padding: 0 20px;
`;

const SlabContent = styled.div`
  width; 100%;

  @media screen and (max-width : 960px){

      width: 90%;
      margin: auto;
  }
`;

// const SettingsContent = styled.div`
//   color: white;
//   padding: 20px;
// `;
