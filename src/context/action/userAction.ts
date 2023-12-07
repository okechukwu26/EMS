import {
  LOADING_USER,
  REGISTER_USER,
  REGISTER_FAIL,
  VERIFY_OTP,
  VERIFY_OTP_FAIL,
  RESEND_OTP,
  OTP_FAIL,
  OTP_LOADING,
  LOGIN_FAIL,
  LOADING_OTP,
  LOGIN_USER,
  LOADING_FORGET_PASSWORD,
  FORGET_PASSWORD,
  FORGET_PASSWORD_FAIL,
  LOADING_RESEND_PASSWORD,
  RESEND_PASSWORD,
  RESEND_PASSWORD_FAIL,
} from "../Type";
import axiosInstance from "../../Request/axiosInstance";
import { UserAction } from "../Provder";
import { Dispatch } from "react";
import { toast } from "react-toastify";

import { AxiosError } from "axios";
import { Form } from "../../pages/registerPage";
interface ERR {
  error: string;
}
interface RESET {
  code: string;
  email: string;
  confirm_password: string;
  password: string;
}

import { NavigateFunction } from "react-router-dom";

export const RegisterUser =
  (data: Form) =>
  (dispatch: Dispatch<UserAction>) =>
  async (onSuccess: (args: object) => void) => {
    try {
      dispatch({ type: LOADING_USER });

      const res = await axiosInstance.post("/api/register", data);
      console.log(res.data.users);
      dispatch({ type: REGISTER_USER, payload: res.data.users });
      toast.success("an OTP has been sent to your email", { autoClose: 5000 });

      localStorage.setItem("user", JSON.stringify(res.data.users));

      setTimeout(() => {
        onSuccess(res.data.users);
      }, 6000);
      //navigate("/login");
    } catch (error) {
      const customErr = error as AxiosError;
      console.log(customErr.response?.data);
      const err = customErr.response?.data as ERR;

      toast.error(err.error, { autoClose: 5000 });
      dispatch({
        type: REGISTER_FAIL,
        payload: customErr.response
          ? customErr.response.data
          : "Something went wrong",
      });
    }
  };
export const VerifyOtp =
  (data: { code: string; email: string }) =>
  (navigate: NavigateFunction) =>
  async (dispatch: Dispatch<UserAction>) => {
    console.log(data);
    try {
      dispatch({ type: LOADING_OTP });

      const res = await axiosInstance.post("/api/verify", data);
      dispatch({ type: VERIFY_OTP, payload: res.data.status });
      toast.success(res.data.message, { autoClose: 5000 });
      setTimeout(() => {
        navigate("/login");
      }, 6000);
    } catch (error) {
      const customErr = error as AxiosError;
      const err = customErr.response?.data as ERR;
      toast.error(err.error, { autoClose: 3000 });
      dispatch({
        type: VERIFY_OTP_FAIL,
        payload: customErr.response
          ? customErr.response.data
          : "Something went wrong",
      });
    }
  };

export const ResendOtp =
  (data: { email: string }) => async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: OTP_LOADING });
      const res = await axiosInstance.post("/api/resend_Otp", data);
      dispatch({ type: RESEND_OTP, payload: res.data.message });
      toast.success(res.data.message);
    } catch (error) {
      const customErr = error as AxiosError;
      console.log(customErr.response?.data);
      const err = customErr.response?.data as ERR;

      toast.error(err.error, { autoClose: 3000 });
      dispatch({
        type: OTP_FAIL,
        payload: customErr.response
          ? customErr.response.data
          : "Something went wrong",
      });
    }
  };
export const LoginUser =
  (data: { email: string; password: string }) =>
  (dispatch: Dispatch<UserAction>) =>
  async (onSuccess: (args: object) => void) => {
    try {
      console.log(data);
      dispatch({ type: LOADING_USER });
      const res = await axiosInstance.post("/api/login", data);
      dispatch({ type: LOGIN_USER, payload: res.data.user });
      toast.success(res.data.msg);
      localStorage.setItem("user", JSON.stringify(res.data.User));
      localStorage.setItem("token", res.data.token);
      onSuccess(res.data.user);
    } catch (error) {
      const customErr = error as AxiosError;
      const err = customErr.response?.data as ERR;

      toast.error(err.error, { autoClose: 3000 });
      dispatch({
        type: LOGIN_FAIL,
        payload: customErr.response
          ? customErr.response.data
          : "Something went wrong",
      });
    }
  };

export const Forgetpassword =
  (data: { email: string }) =>
  (dispatch: Dispatch<UserAction>) =>
  async (onSuccess: (args: object) => void) => {
    try {
      dispatch({ type: LOADING_FORGET_PASSWORD });
      const res = await axiosInstance.post("/api/forgotPassword", data);
      dispatch({ type: FORGET_PASSWORD });
      toast.success(res.data.message, { autoClose: 2000 });
      onSuccess(res.data);
    } catch (error) {
      const customErr = error as AxiosError;
      const err = customErr.response?.data as ERR;

      toast.error(err.error, { autoClose: 3000 });
      dispatch({
        type: FORGET_PASSWORD_FAIL,
        payload: customErr.response
          ? customErr.response.data
          : "Something went wrong",
      });
    }
  };
export const ResendPassword =
  (data: RESET) =>
  (dispatch: Dispatch<UserAction>) =>
  async (onSuccess: (args: object) => void) => {
    try {
      console.log(data);
      dispatch({ type: LOADING_RESEND_PASSWORD });
      const res = await axiosInstance.post("/api/resetPassword", data);
      console.log(res.data);
      dispatch({ type: RESEND_PASSWORD });
      toast.success(res.data.message, { autoClose: 2000 });
      onSuccess(res.data);
    } catch (error) {
      const customErr = error as AxiosError;
      const err = customErr.response?.data as ERR;
      console.log(customErr);
      toast.error(err.error, { autoClose: 3000 });
      dispatch({
        type: RESEND_PASSWORD_FAIL,
        payload: customErr.response
          ? customErr.response.data
          : "Something went wrong",
      });
    }
  };
