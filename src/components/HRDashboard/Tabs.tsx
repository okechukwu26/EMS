import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/avatar.jpeg';
import { IoMdEye } from 'react-icons/io';
import axios from 'axios';

interface StyledTabProps {
  active: boolean;
  onClick: () => void;
  'data-tab-value': string;
  children:React.ReactNode
}

const StyledTab= ({ active, onClick, 'data-tab-value': dataTabValue, children }:StyledTabProps) => {
  return (
    <StyledTabWrapper active={active} onClick={onClick} data-tab-value={dataTabValue}>
      {children}
    </StyledTabWrapper>
  );
};

interface StyledTabWrapperProps {
  active: boolean;
}

const StyledTabWrapper = styled.span<StyledTabWrapperProps>`
  position: relative;
  cursor: pointer;
  font-size: 12px;
  padding: 10px;
  color: ${(props) => (props.active ? '#27AE60' : '#0000008A')};
  background-color: ${(props) => (props.active ? 'white' : 'transparent')};
  border-radius: ${(props) => (props.active ? '5px 5px 0 0' : 'none')};
  box-shadow: ${(props) =>
    props.active
      ? '0px 7px 8px 0px #00000029, 0px -5px 22px 0px #00000017, 0px 12px 17px 0px #0000001C'
      : 'none'};
  position: relative;
  overflow: hidden;



  &::before {
    content: '';
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
    background-color: ${(props) => (props.active ? 'white' : '#f5f5f5')};
  }
`;



const Tabs: React.FC = () => {
  const [data, setData] = useState({})


// const fetchData = async () = {
// try{
//   const response = await axios.get("/api/profile/:id");
//   setData(response.data)
// }

// }

// const uploadAvatar = () => {
//   const formData = new FormData();
//   formData.append("file", data);
//   formData.append("upload_preset", "employee");
//   formData.append("cloud_name", "dhy7yh4aa");
//   fetch("https://api.cloudinary.com/v1_1/dhy7yh4aa/image/upload", {
//     method: "post",
//     body: formData,
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

// const updateData = async () => {

//     try{

//       const updatedData = { ...data, 
//       employeeId: 'Employee Id', 
//       firstName : 'First Name', 
//       lastName: 'Last Name', 
//       DateOfBirth: 'Date of Birth',
//       preferredName: 'Preferred Name',
//       email: 'Email',
//       address: 'Address',
//       city_State: 'City/State',
//       zip_Code: 'Zip Code',
//     };
    
//       const response = await axios.put("/api//updateProfile/:id", updatedData);
    
//       setData(response.data)
//     }catch(error){
//       console.error("error updating data : ", error)
//     }



// }


  // useEffect(() => {
  //   uploadAvatar();
  // }, []);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user !== null) {
      const {
        employeeId,
        firstName,
        lastName,
        phone,
        email,
      } = JSON.parse(user);
      setUser({
        employeeId,
        firstName,
        lastName,
        phone,
        email,
      });
      setFormData({
        ...formData,
        firstName,
        lastName,
        employeeId: employeeId,
        email,
      });
    }
  }, []);
  
  const [activeTab, setActiveTab] = useState('profile');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const Fields = [
    { label: 'Employee Id' },
    { label: 'First Name' },
    { label: 'Last Name' },
    { label: 'Date of Birth' },
    { label: 'Preferred Name' },
    { label: 'Email' },
    { label: 'Address' },
    { label: 'City/State' },
    { label: 'Zip Code' },
  ];

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
          <StyledTab onClick={() => handleTabClick('profile')} active={activeTab === 'profile'} data-tab-value="#tab_1">
            Profile Update
          </StyledTab>
          <StyledTab onClick={() => handleTabClick('password')} active={activeTab === 'password'} data-tab-value="#tab_2">
            Password Settings
          </StyledTab>
          <StyledTab onClick={() => handleTabClick('notification')} active={activeTab === 'notification'} data-tab-value="#tab_3">
            Notification
          </StyledTab>
        </StyledTabs>

        <SlabContent>
          {activeTab === 'profile' && (
            <SettingsContent>
              <AvatarContainer>
                <Avatar src={logo} alt="avatar" />
                <Button>Upload Avatar</Button>
                <DeleteButton>Delete</DeleteButton>
              </AvatarContainer>
              <GridContainer>
                {Fields.map((field) => (
                  <InputWrapper key={field.label}>
                    <InputLabel>{field.label}</InputLabel>
                    {field.label === 'Date of Birth' ? <InputField type="date" /> : <InputField type="text" />}
                  </InputWrapper>
                ))}
                <Button onClick={ updateData }>Save Changes</Button>
              </GridContainer>
            </SettingsContent>
          )}
          {activeTab === 'password' && (
            <SettingsContent>
              <GridContainer>
                <InputWrapper>
                  <InputLabel>New Password</InputLabel>
                  <InputField type={showPassword ? 'text' : 'password'} />
                  <PasswordToggleIcon onClick={toggleShowPassword}>
                    {showPassword ? '🙈' : '🙊'}
                  </PasswordToggleIcon>
                </InputWrapper>
                <InputWrapper>
                  <InputLabel>Confirm New Password</InputLabel>
                  <InputField type={showConfirmPassword ? 'text' : 'password'} />
                  <PasswordToggleIcon onClick={toggleShowConfirmPassword}>
                    {showConfirmPassword ? '🙈' : '🙊'}
                  </PasswordToggleIcon>
                </InputWrapper>
                <InputWrapper>
                  <InputLabel>Old Password</InputLabel>
                  <InputField type="password" />
                </InputWrapper>
                <ResetButton>Generate Strong Password</ResetButton>
                <ResetButton>Reset Password</ResetButton>
              </GridContainer>
            </SettingsContent>
          )}
          {activeTab === 'notification' && (
            <SettingsContent>
              <h1>Notification</h1>
            </SettingsContent>
          )}
        </SlabContent>
      </Container>
    </>
  );
};
const Container = styled.div`
  align-items: center;
  background: #f9fafb;
  width: 100%;
  height: 100vh;
  padding: 6px;
`;

const TitleDiv = styled.div`
  width: 100%;
  height: 58px;
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
  font-family: Lato;
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
  width: 30%;
  border-bottom: 1px solid #ccc;
  border-right-bottom-radius : -20px;
 
`;


const SlabContent = styled.div`
  width: 100%;
`;

const SettingsContent = styled.div`
  color: white;
  padding: 20px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  background-color: #f9fafb;

    @media screen and (max-width: 430px) {
   
    
  }
`;

const InputWrapper = styled.div`
  text-align: left;
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  font-family: Lato;
  font-size: 12px;
  line-height: 22px;
  letter-spacing: 0.15px;
  color: #98a2b3;
`;

const InputField = styled.input`
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: none;
  margin-top: 5px;
`;

const AvatarContainer = styled.div`
  width: 60%;
  height: 100px;
  display: flex;
  justify-items: space-between;
  align-items: center;
  padding-left: 1.5rem;
  padding-top: 1.5rem;
`;

export const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  padding-right: 3rem;
`;

export const Button = styled.button`
  width: 123px;
  height: 36px;
  padding: 8px 16px 8px 16px;
  border-radius: 12px;
  gap: 10px;
  background: #27ae60;
  border: none;
  color: white;
  line-height: 50%;
`;

export const DeleteButton = styled.button`
  width: 123px;
  height: 36px;
  padding: 8px 16px 8px 16px;
  background: transparent;
  border: none;
  color: red;
  font-size: 16px;
`;

const PasswordToggleIcon = styled.span`
  cursor: pointer;
  user-select: none;
  margin-left: -30px;
  font-size: 12px;
  color: black;
`;

const ResetButton = styled.button`
  margin-top: 15px;
  width: 50%;
  background-color: #27ae60;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 12px;
`;

export default Tabs;
