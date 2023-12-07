/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Content,
  SubmitButton1,
  FormContainer,
  Form,
  SubmitButton,
  Text,
  Logo,
  Txt,
  Error,
  Label,
} from "./registerPage";

// import userReducer, { initialState } from "../Service/reducer/userReducer";
// import { login as LoginUser } from "../Service/action/userAction";

// import userReducer, { initialState } from "../Service/reducer/userReducer";
// import { login as LoginUser } from "../Service/action/userAction";

import LoginInput from "../components/common/LoginInput";
import logo from "../assets/images/bg.png";
import decagon from "../assets/images/dec.svg";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { Login } from "../api/user";


import { Login } from "../api/user";


// Define a type for your form data
export interface Form1 {
  email: string;
  password: string;
}

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password is too short" }),
});

type FormData = z.infer<typeof schema>;

const LoginPage  = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
const user =useSelector((state:any) => state.user)
 

  // const Submit = async (data: FormData) => {
  //   LoginUser(data)(navigate)(dispatch);
  // const user = useSelector((state: any) => state.user);
  //   console.log(user)
  // };
  const Submit = async (data: FormData) => {
    Login(dispatch)(data)(navigate);
  };

  return (
    <Container>
      <ToastContainer />
      <Content>
        <img src={logo} alt="Login" />
      </Content>
      <FormContainer>
        <Logo>
          <img src={decagon} alt="Logo" />
        </Logo>
        <Txt>Sign in to your account</Txt>

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
          Sign in with Google
        </SubmitButton1>

        <Text> OR </Text>

        <Form onSubmit={handleSubmit(Submit)}>
          <Label htmlFor="email">Email</Label>
          <LoginInput
            register={register}
            type="text"
            name="email"
            id="email"
            placeholder="Enter your email"
            style={{
              width: "95%",
              fontSize: 14,
              fontFamily: "Poppins",
              lineHeight: 1,
              wordWrap: "break-word",
            }}
          />
          {errors.email && <Error>{errors.email.message}</Error>}

          <Label htmlFor="password">Password</Label>
          <div style={{ position: "relative" }}>
            <LoginInput
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
              }}>
              {passwordVisible ? <IoIosEyeOff /> : <IoIosEye />}
            </button>
          </div>
          {errors.password && <Error>{errors.password.message}</Error>}

          <SubmitButton type="submit">
            {" "}
            <ClipLoader
              color="#fff"
              loading={user.loading}
              // loading={user.loading}
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />{" "}
            Login
          </SubmitButton>
        </Form>
        <div style={{ color: "#28B446", marginTop: "10px" }}>
          <Link to="/forgot-password" style={{ color: "#28B446" }}>
            Forgot Password{" "}
          </Link>
        </div>
        <Text>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#28B446" }}>
            Sign up here
          </Link>
        </Text>
      </FormContainer>
    </Container>
  );
};

export default LoginPage;
