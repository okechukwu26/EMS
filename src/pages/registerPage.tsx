/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";

import { ToastContainer } from "react-toastify";
import styled from "styled-components";

import InputForm from "../components/common/Input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import userReducer, { initialState } from "../Service/reducer/userReducer";
// import { register as RegisterUser } from "../Service/action/userAction";
// import userReducer, { initialState } from "../Service/reducer/userReducer";
// import { register as RegisterUser } from "../Service/action/userAction";

import "react-toastify/dist/ReactToastify.css";

import logo from "../assets/images/bg.png";
import decagon from "../assets/images/dec.svg";
import { registerUser } from "../api/user";
// import userReducer, { initialState } from "../Service/reducer/userReducer";
// import { register as RegisterUser } from "../Service/action/userAction";

// Define a type for your form data
export interface Form {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
}

const schema = z.object({
  fullName: z.string().min(3, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().min(11, { message: "Phone number is too short" }),
  password: z.string().min(6, { message: "Password is too short" }),
  confirm_password: z
    .string()
    .min(6, { message: "Confirm Password is too short" }),
});
type FormData = z.infer<typeof schema>;

const RegistrationPage: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  //axios.post("http://localhost:5000/api/register"

  const Submit = async (data: FormData) => {
    registerUser(dispatch)(data)(navigate);
  };
  console.log(user);
  return (
    // <>
    <Container>
      <ToastContainer />
      <Content>
        <img src={logo} alt="Registration" />
      </Content>
      <FormContainer>
        <Logo>
          <img src={decagon} alt="Logo" />
        </Logo>
        <Txt>Create a new account</Txt>

        <SubmitButton1
          type="submit"
          onClick={() =>
            (window.location.href = "http://localhost:5000/auth/google")
          }
        >
          <img
            src="../images/google-icon.svg"
            style={{ height: "25px", width: "40px" }}
          />
          Sign Up with Google
        </SubmitButton1>

        <Text1> OR </Text1>

        <Form onSubmit={handleSubmit(Submit)}>
          <Label htmlFor="fullName">Full Name</Label>

          <InputForm
            register={register}
            type="fullName"
            placeholder="Enter your full Names"
            name="fullName"
            id="fullName"
            style={{
              width: "95%",
              fontSize: 14,
              fontFamily: "Poppins",
              lineHeight: 1,
              wordWrap: "break-word",
            }}

            // required
          />
          {errors.fullName && <Error>{errors.fullName.message}</Error>}
          <Label htmlFor="email">Email</Label>
          <InputForm
            register={register}
            type="text"
            name="email"
            id="email"
            placeholder="Enter your email "
            style={{
              width: "95%",
              fontSize: 14,
              fontFamily: "Poppins",
              lineHeight: 1,
              wordWrap: "break-word",
            }}
            // required
          />
          {errors.email && <Error>{errors.email.message}</Error>}

          <Label htmlFor="phone number">Phone Number</Label>
          <InputForm
            type="tel"
            register={register}
            name="phone"
            id="phoneNumber"
            placeholder="Phone Number"
            style={{
              width: "95%",
            }}
            // required
          />
          {errors.phone && <Error>{errors.phone.message}</Error>}

          <Label htmlFor="password">Password</Label>
          <div style={{ position: "relative" }}>
            <InputForm
              register={register}
              type={passwordVisible ? "text" : "password"}
              name="password"
              id="password"
              placeholder=""
              style={{
                width: "95%",
              }}
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              style={{
                position: "absolute",
                right: "10px",
                top: "10px",
                fontSize: "24px",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {passwordVisible ? <IoIosEyeOff /> : <IoIosEye />}
            </button>
          </div>
          {errors.password && <Error>{errors.password.message}</Error>}

          <Label htmlFor="confirm_password">Confirm Password</Label>
          <div style={{ position: "relative" }}>
            <InputForm
              register={register}
              type={confirmPasswordVisible ? "text" : "password"}
              name="confirm_password"
              id="confirm_password"
              placeholder=""
              style={{
                width: "95%",
              }}
            />
            <button
              type="button"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              style={{
                position: "absolute",
                right: "10px",
                top: "10px",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "24px",
              }}
            >
              {confirmPasswordVisible ? <IoIosEyeOff /> : <IoIosEye />}
            </button>
          </div>
          {errors.confirm_password && (
            <Error>{errors.confirm_password.message}</Error>
          )}

          <SubmitButton type="submit">
            {" "}
            <ClipLoader
              color="#fff"
              loading={user.loading}
              // cssOverride={override}
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />{" "}
            Register
          </SubmitButton>
        </Form>
        <Text>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#28B446" }}>
            Sign in here
          </Link>
        </Text>
      </FormContainer>
    </Container>
    // </>
  );
};


export const Container = styled.div`
  display: flex;
  margin: 0;
  padding: 0;
  //font-family: "inter", sans-serif;
  font-family: "poppins", sans-serif;
  //font-family: "league spartan", sans-seri;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    height: fit-content;
    width: 100%;
  }

  @media screen and (max-width: 992px) {
    flex-direction: column;
    height: fit-content;
  }
`;

export const Content = styled.div`
  height: 1024px;
  width: 60%;

  @media screen and (max-width: 600px) {
    width: 100%;
    height: 100vh;
    flex:1;
    display: none;
  }

  @media screen and (max-width: 992px) {
    width: 100%;
    height: auto;
    display: none;
  }
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
`;

export const Txt = styled.h1`
  text-align: center;
  margin: 20px 0;
  font-size: 24px;
  line-height: 34px;
  font-weight: 600;

  @media screen and (max-width: 600px) {
    height: fit-content;
    width: 80%;
    margin-left: 10%;
    margin-bottom: 70px;
    element.style {
      width: 100%;
      height: 100%;
      display: flow;
      margin: 50%;
    };



  @media screen and (max-width: 992px) {
    font-size: 20px;
  }
`;

export const FormContainer = styled.div`
width: 30%;
height: fit-content;
padding: 32px;
border-radius: 16px;
gap: 32px;
box-shadow: 0px 6px 16px 0px #00000029;
margin-left: 2.5%;
margin-top: 71px;


  @media screen and (max-width: 600px) {
    width: 10%;
    height: fit-content;
    position: fixed;
    background: white;
  

  }

  @media screen and (max-width: 992px) {
    width: 80%;
    height: fit-content;
    position: fixed;
    background: white;
    top: 50px;
  }
`;

export const Form = styled.form`
  margin-top: 26px;
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  font-weight: bold;
  font-family: Work Sans;
  margin-bottom: 5px;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }

  @media screen and (max-width: 992px) {
    font-size: 16px;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;

  @media screen and (max-width: 600px) {
    width: 90%;
    margin-left: 0px;
    font-size: 14px;
  }

  @media screen and (max-width: 992px) {
    width: 95%;
    margin-left: 0px;
    font-size: 16px;
  }
`;

export const SubmitButton = styled.button`
  border: none;
  background-color: #34a853;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  width: 436px;
  height: 44px;
  padding: 12px 20px;
  border-radius: 10px;
  gap: 8px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0px;
  color: #fff;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #228b22;
  }

  @media screen and (max-width: 600px) {
    width: 100%;
    font-size: 14px;
  }

  @media screen and (max-width: 992px) {
    width: 100%;
    font-size: 16px;
  }
`;

export const Text = styled.p`
  margin-top: 10px;
  color: #98a2b3;
  padding: 15px 10%;
  text-align: center;
  font-size: 13px;
  font-family: Work Sans;
`;

export const Text1 = styled.p`
  margin-top: 40px;
  color: #98a2b3;
  padding: 0 10%;
  font-size: 13px;
  text-align: center;
  font-family: Work Sans;
`;

export const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  //gap: 10px,
  cursor: pointer;
`;

export const AlreadyRegisteredText = styled.p`
  margin-top: 10px;
  color: #34a853;
  font-family: Work Sans;
`;
export const SubmitButton1 = styled.button`
  display: flex;
  justify-content: center;
  width: 436px;
  height: 44px;
  padding: 12px 20px;
  border-radius: 10px;
  //gap: 15px;
  font-weight: 400;
  line-height: 20px;
  font-style: normal;
  letter-spacing: 0px;
  color: #98a2b3;
  margin-buttom: 200px;
  border: 1px solid #98a2b3;
  background-color: #fff;
  font-size: 14px;
  cursor: pointer;
  font-family: Work Sans;

  @media screen and (max-width: 600px) {
    width: 100%;
    font-size: 14px;
  }

  @media screen and (max-width: 992px) {
    width: 100%;
    font-size: 16px;
  }
`;

export const Error = styled.p`
  color: red;
  font-family: Work Sans;
`;
export const ServerError = styled.p`
  color: red;
  text-align: center;
  font-family: Work Sans;
`;




// Define a type for your form data
export interface Form {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
}


export default RegistrationPage;
