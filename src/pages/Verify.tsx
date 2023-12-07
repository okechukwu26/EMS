/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import React, {useState} from "react";
// import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import logo from "../assets/images/bg.png";
import decagon from "../assets/images/dec.svg";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { VerifyOTP } from "../api/user";

const schema = z.object({
  code: z
    .number({ invalid_type_error: "OTP is required" })
    .refine(
      (value) => Number.isInteger(value) && value >= 1000 && value <= 9999,
      {
        message: "OTP must be a 4-digit number",
      }
    ),
});

type FormData = z.infer<typeof schema>;

// interface user{

// }

const Verify = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Submit = (data: { code: number }) => {
    const local = localStorage.getItem("user");
    let user: any;
    if (local !== null) {
      user = JSON.parse(local);
    }
    const info = {
      code: String(data.code),
      email: user.email,
    };
    console.log(info);

    VerifyOTP(dispatch)(info)(navigate);
  };
  const ResendOTP = () => {
    // ResendOtp(state.email)(userDispatch);
  };

  return (
    <Container>
      <ToastContainer />
      <Image>
        <img src={logo} alt="" />
      </Image>

      <FormSection>
        <Form action="" className="Auth-form" onSubmit={handleSubmit(Submit)}>
          <Logo>
            <img src={decagon} alt="" />
          </Logo>
          <H1Text>VERIFY YOUR ACCOUNT</H1Text>

          <Paragraph>Enter OTP to verify your account.</Paragraph>

          <Label htmlFor="email"></Label>

          <Input
            {...register("code", { valueAsNumber: true })}
            id="code"
            placeholder="Enter 4 digits OTP sent to you"
            name="code"
            type="number"
            className="form-control mt-1"
          />
          {errors.code && <Error>{errors.code.message}</Error>}
          {/* {error.error && (
            <Error className="text-danger text-center">{error.error}</Error>
          )} */}

          <div className="sm:col-span-4">
            <Button>
              {" "}
              <ClipLoader
                color="#fff"
                loading={user.loading}
                // cssOverride={override}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              Verify
            </Button>
          </div>

          <div className="sm:col-span-4 my-3" onClick={ResendOTP}>
            <p className="text-center">
              Didn't get OTP?
              <a href="#">
                <span className="text-green-600 underline"> Resend</span>
              </a>
            </p>
          </div>
        </Form>
      </FormSection>
    </Container>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Container = styled.div`
  margin: 0px;
  padding: 0px;
  display: flex;
  font-family: "Inter", sans-serif;
  font-family: "League Spartan", sans-serif;
  height: fit-content;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    height: fit-content;
  }

  @media screen and (max-width: 992px) {
    flex-direction: column;
    height: fit-content;
  }
`;

export const Image = styled.div`
  max-width: 833px;
  height: 1024px;

  @media screen and (max-width: 600px) {
    width: 100%;
    height: auto;
  }

  @media screen and (max-width: 992px) {
    width: 100%;
    height: auto;
  }
`;

export const FormSection = styled.div`
  width: 500px;
  height: 438.8px;
  padding: 32px;
  border-radius: 16px;
  gap: 32px;
  box-shadow: 0px 6px 16px 0px #00000029;
  margin-left: 56px;
  margin-top: 71px;

  @media screen and (max-width: 600px) {
    width: 80%;
    margin-left: 10%;
    margin-bottom: 70px;
    height: fit-content;
  }

  @media screen and (max-width: 992px) {
    width: 80%;
    margin-left: 10%;
    margin-bottom: 70px;
    height: fit-content;
  }
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
`;

export const H1Text = styled.h1`
  text-align: center;
  margin: 20px 0px;
  font-size: 24px;
  line-height: 34px;
  letter-spacing: 0px;
  font-weight: 700;
  font-family: Work Sans;

  @media screen and (max-width: 600px) {
    font-size: 18px;
  }

  @media screen and (max-width: 992px) {
    font-size: 20px;
  }
`;

export const Paragraph = styled.p`
  padding: 12px 12px;
  text-align: center;
  color: #98a2b3;
  font-family: Work Sans;
`;

export const Label = styled.label`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.8px;
  text-align: left;
  font-family: Work Sans;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }

  @media screen and (max-width: 992px) {
    font-size: 16px;
  }
`;

export const Input = styled.input`
  width: 400px;
  height: 18px;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #d0d5dd;

  @media screen and (max-width: 600px) {
    width: 100%;
    font-size: 14px;
  }

  @media screen and (max-width: 992px) {
    width: 100%;
    font-size: 16px;
  }
`;

export const Button = styled.button`
  width: 436px;
  height: 44px;
  padding: 12px 16px;
  border-radius: 8px;
  gap: 8px;
  background: #34a853;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0px;
  color: #fff;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

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
  text-align: left;
  padding-left: 10px;
  font-family: Work Sans;
`;

export default Verify;
