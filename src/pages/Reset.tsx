/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import {
  Container,
  Image,
  FormSection,
  Logo,
  H1Text,
  Label,
  Input,
  Button,
  Error,
} from "./Forgot";
import { useNavigate, useLocation } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import logo from "../assets/images/bg.png";
import decagon from "../assets/images/dec.svg";
// import { GlobalContext } from "../context/Provder";
// import { ResendPassword } from "../context/action/userAction";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useDispatch, useSelector} from "react-redux"
import {ResetPassword} from "../api/user"
export interface Forget {
  code: number;
  password: string;
  confirm_password: string;
}

const schema = z
  .object({
    code: z
      .number({ invalid_type_error: "Reset code is required" })
      .refine(
        (value) => Number.isInteger(value) && value >= 1000 && value <= 9999,
        {
          message: "Code must be a 4-digit number",
        }
      ),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password must match",
    path: ["confirm_password"],
  });

type FormData = z.infer<typeof schema>;

const Reset = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });


  const loading = useSelector((state:any) => state.user.loading)

  const Submit = (data: Forget) => {
    const email = localStorage.getItem("forget")
    const info = {
      ...data,
      code: String(data.code),
      email: email,
    };
 
    ResetPassword(dispatch)(info)(navigate)

   
  };

  return (
    <Container>
      <ToastContainer />
      <Image>
        <img src={logo} alt="" />
      </Image>

      <FormSection>
        <form onSubmit={handleSubmit(Submit)}>
          <Logo>
            <img src={decagon} alt="" />
          </Logo>

          <H1Text>Reset your password</H1Text>
          <Label htmlFor="email">Reset Code</Label>

          <div>
            <Input
              {...register("code", { valueAsNumber: true })}
              id="code"
              placeholder="Enter reset code"
              name="code"
              type="number"
            />
            {errors.code && <Error>{errors.code.message}</Error>}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>

            <div style={{ position: "relative" }}>
              <Input
                {...register("password")}
                id="password"
                placeholder="Enter a new password"
                name="password"
                type={passwordVisible ? "text" : "password"}
              />

              {errors.password && <Error>{errors.password.message}</Error>}
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                style={{
                  position: "absolute",
                  right: "20px",
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
          </div>
          <Label htmlFor="email">Confirm Password</Label>

          <div style={{ position: "relative" }}>
            <Input
              {...register("confirm_password")}
              id="confirm_password"
              placeholder="Re-enter your password"
              name="confirm_password"
              type={confirmPasswordVisible ? "text" : "password"}
            />
            {errors.confirm_password && (
              <Error> {errors.confirm_password.message}</Error>
            )}
            <button
              type="button"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
              style={{
                position: "absolute",
                right: "20px",
                top: "10px",
                fontSize: "24px",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {confirmPasswordVisible ? <IoIosEyeOff /> : <IoIosEye />}
            </button>
          </div>

          <Button type="submit">
            <ClipLoader
              color="#fff"
              loading={loading}
              size={20}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            Reset Password
          </Button>
        </form>
      </FormSection>
    </Container>
  );
};

export default Reset;
