/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import logo from "../assets/images/bg.png";
import decagon from "../assets/images/dec.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ForgetPassword } from "../api/user";

const schema = z.object({
  email: z.string().email(),
});

type FormData = z.infer<typeof schema>;
const Forgot = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state: any) => state.user.loading);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const Submit = (data: { email: string }) => {
    ForgetPassword(dispatch)(data)(navigate);
    localStorage.setItem("forget", data.email);
  };

  return (
    <Container>
      <ToastContainer />
      <Image>
        <img src={logo} alt="" style={{ width: "100%" }} />
      </Image>

      <FormSection>
        <form onSubmit={handleSubmit(Submit)}>
          <Logo>
            <img src={decagon} alt="" />
          </Logo>
          <H1Text>Reset your password</H1Text>
          <Paragraph>
            Enter your email below and we’ll send you instructions on how to
            reset your password.
          </Paragraph>
          <div className="sm:col-span-4 my-4">
            <Label htmlFor="email">Email address</Label>

            <div>
              <Input
                {...register("email")}
                id="email"
                placeholder="Enter your email"
                name="email"
                type="email"
              />
              {errors.email && <Error>{errors.email.message}</Error>}
            </div>
          </div>

          <div className="sm:col-span-4">
            <Button>
              {" "}
              <ClipLoader
                color="#fff"
                loading={loading}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />{" "}
              Send reset instructions
            </Button>
          </div>

          <div className="sm:col-span-4 my-3">
            <Paragraph>
              Go back to
              <a href="./sigin" style={{ color: "#28B446" }}>
                <span className="text-green-600 underline"> sign in</span>
              </a>
            </Paragraph>
          </div>
        </form>
      </FormSection>
    </Container>
  );
};

export const Container = styled.div`
  padding: 0px;
  display: flex;
  font-family: "Inter", sans-serif;
  font-family: "League Spartan", sans-serif;
  // display: none;
`;

export const Image = styled.div`
  width: 60%;
  height: 1024px;

  @media screen and (max-width: 600px) {
    width: 100%;
    height: 100vh;
    flex: 1;
    display: none;
  }

  @media screen and (max-width: 992px) {
    width: 100%;
    height: auto;
    display: none;
  }
`;

export const FormSection = styled.div`
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
    top: 20%;
  }

  @media screen and (max-width: 992px) {
    width: 80%;
    height: fit-content;
    position: fixed;
    background: white;
    top: 50px;
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
  margin-left: 14px;
  font-family: Work Sans;

  @media screen and (max-width: 600px) {
    font-size: 14px;
  }

  @media screen and (max-width: 992px) {
    font-size: 16px;
  }
`;

export const Input = styled.input`
  width: 90%;
  height: 30px;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid #d0d5dd;
  gap: 8px;
  font-size: 16px;

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

export const Button = styled.button`
  width: 100%;
  height: 44px;
  padding: 12px 16px;
  border-radius: 8px;
  border:none;
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
  font-family: Work Sans;
  // margin-left: 14px;

  @media screen and (max-width: 600px) {
    width: 100%;
    font-size: 12px;
    padding: 3px 5px;
  }

  @media screen and (max-width: 992px) {
    width: 100%;
    font-size: 14px;
  }
`;

export const Error = styled.p`
  color: red;
  font-family: Work Sans;
`;

export default Forgot;
