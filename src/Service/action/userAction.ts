/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LOADING_USER,
  LOGIN_FAIL,
  LOGIN_USER,
  REGISTER_FAIL,
  REGISTER_USER,
} from "../Type";
import axiosInstance from "../../Request/axiosInstance";
// import {Dispatch} from "redux"
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Form } from "../../pages/registerPage";
import { Form1} from "../../pages/loginPage";
import { NavigateFunction } from "react-router-dom";

interface ERR {
  error: string;
}

export const register =
  (data: Form) =>
  (navigate: NavigateFunction) =>
  async (dispatch: React.Dispatch<any>) => {
    try {
      dispatch({ type: LOADING_USER });

      const res = await axiosInstance.post("/api/register", data);
      dispatch({ type: REGISTER_USER, payload: res.data.user });
      toast.success("an OTP has been sent to your email", { autoClose: 5000 });

      localStorage.setItem("user", JSON.stringify(res.data.user));

      setTimeout(() => {
        navigate("/login");
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

export const login =
  (data: Form1) =>
  (navigate: NavigateFunction) =>
  async (dispatch: React.Dispatch<any>) => {
    try {
      dispatch({ type: LOADING_USER });
      const res = await axiosInstance.post("/api/login", data);
      dispatch({ type: LOGIN_USER, payload: res.data.user });
      toast.success("Login successful");
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (error) {
      const cusErr = error as AxiosError;
      console.log(cusErr.response?.data);

      dispatch({
        // type: REGISTER_FAIL,
        type: LOGIN_FAIL,
        payload: cusErr.response
          ? cusErr.response.data
          : "Something went wrong",
      });
    }
  };
