/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import{ useEffect, useState, ChangeEvent,FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import { updatePassword } from "../../../api/user";
import { ClipLoader } from "react-spinners";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 12px, 16px;
  // gap: 20px;
  // max-width: 400px;
  margin: auto;
`;

// const InputBlock = styled.div`
//   width: 100%;
// `;

const InputWrapper = styled.div`
  margin-top: 10px;
  width: 80%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const InputLabel = styled.label`
  margin-top: 20px;
  margin-bottom: 2px;
  font-style: Regular Body Bio;
  font-family: Lato;
  font-size: 16px;
  font-weight: 400;
  line-height: 22.4px;
  letter-spacing: 0.15px;
  text-align: left;
  color: #98a2b3;
`;

// const InputField = styled.input`
//   height: 46px;
//   padding: 12px, 16px;
//   background-color: #ffffff;
//   border: none;
//   border-radius: 3px;
//   font-size: 16px;
//   line-height: 22.4px;
//   font-weight: 400;
//   color: #000000;
//   margin-top: 8px;
//   margin-bottom: 5px;
// `;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 10px;

  @media (max-width: 992px) {
    width: 100%;
  }

  @media screen and (max-width: 820px) {
    width: auto;
  }
  @media screen and (max-width: 430px) {
    width: auto;
  }
`;

const PasswordToggleIcon = styled.span`
  cursor: pointer;
  position: absolute;
  top: 65%;
  right: 10px;
  transform: translateY(-50%);
  // cursor: pointer;
`;

export const SaveBtn = styled.button`
  background-color: #27ae60;
  font-family: "Lato", sans-serif;
  border-radius: 12px;
  border: none;
  color: white;
  padding: 0 16px;
  text-align: center;
  font-size: 14px;
  line-height: 19.6px;
  font-weight: 600;
  width: 150px;
  height: 36px;

  cursor: pointer;

  &:hover {
    background-color: #219653;
  }
`;

export interface passwordattributes {
  id: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface formData{
  id: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const PasswordSettings = () => {

  const dispatch = useDispatch();

  const [userPassword, setUserPassword] = useState<passwordattributes>({
      id : "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
  })

  const [formData, setFormData] = useState<formData>({
    id : "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
})

  useEffect(()=> {
    const user = localStorage.getItem("user")
    if(user !== null) {
      const {id, password} = JSON.parse(user)

      setUserPassword({
        id,
        currentPassword: password,
        newPassword: "",
        confirmPassword: "",
      })

      setFormData({
       ...formData,
       id
     })
    }
  },[])

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

    const update = useSelector((state: any) => state.user);


  // : ChangeEvent<HTMLInputElement | HTMLSelectElement>
    const handleChange = (e : ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

   const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);

    await updatePassword(dispatch)(formData);
    
  };

  return (
    <Container>
    <form onSubmit={handleSubmit}>
      <ToastContainer/>
      <InputWrapper>
        <InputLabel>Current Password</InputLabel>
        <InputField
          type={showPassword ? "text" : "password"}
          placeholder="Enter your current password"
          name = "currentPassword"
          onChange={handleChange}
        />
        <PasswordToggleIcon onClick={toggleShowPassword}>
          {showPassword ? "🙈" : "🙊"}
        </PasswordToggleIcon>
      </InputWrapper>

      <InputWrapper>
        <InputLabel>New Password</InputLabel>
        <InputField
          type={showPassword ? "text" : "password"}
          placeholder="8 Characters"
          name = "newPassword"
          onChange={handleChange}
        />
        <PasswordToggleIcon onClick={toggleShowPassword}>
          {showPassword ? "🙈" : "🙊"}
        </PasswordToggleIcon>
      </InputWrapper>

      <InputWrapper>
        <InputLabel>Confirm New Password</InputLabel>
        <InputField
          type={showPassword ? "text" : "password"}
          placeholder="Enter your new password"
           name = "confirmPassword"
          onChange={handleChange}
        />
        <PasswordToggleIcon onClick={toggleShowPassword}>
          {showPassword ? "🙈" : "🙊"}
        </PasswordToggleIcon>
      </InputWrapper>

      <SaveBtn type="submit">        
      {" "}
            <ClipLoader
              color="white"
              loading={update.loading}
              size={15}
              aria-label="Loading Spinner"
              data-testId="loader"
            />Save Changes</SaveBtn>
      </form>
    </Container>
  );
};

export default PasswordSettings;