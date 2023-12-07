/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import axiosInstance from "../Request/axiosInstance";
import { UserActions } from "../Service/user";
import { Dispatch } from "redux";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { employeeFormData } from "../components/HRDashboard/newEmployee";
export const registerUser =
  (dispatch: Dispatch) => async (userForm: employeeFormData) => {
    // async (navigate: NavigateFunction) => {
    try {
      dispatch(UserActions.startLoading(true));
      const res = await axiosInstance.post("/api/register/user", userForm);
      console.log(res.data);
      // dispatch(UserActions.registerUser(res.data.users));
      // localStorage.setItem("user", JSON.stringify(res.data.users));
      toast.success(res.data.msg, { autoClose: 3000 });
      setTimeout(() => {}, 4000);
    } catch (error) {
      const customErr = error as AxiosError;
      const err = customErr.response?.data as { error: string };
      toast.error(err.error ? err.error : "Something went wrong");
      dispatch(
        UserActions.registerFail(err.error ? err.error : "Something went wrong")
      );
    }
  };
export const Login =
  (dispatch: Dispatch) => (data: any) => async (navigate: NavigateFunction) => {
    try {
      dispatch(UserActions.startLoading(true));
      const res = await axiosInstance.post("/api/login", data);
      dispatch(UserActions.loginUser(res.data));
      console.log(res.data);
      localStorage.setItem("user", JSON.stringify(res.data.User));
      localStorage.setItem("token", res.data.token);
      toast.success(res.data.message, { autoClose: 3000 });
      setTimeout(() => {
        navigate("/dashboard");
      }, 4000);
    } catch (error) {
      const customErr = error as AxiosError;
      const err = customErr.response?.data as { error: string };
      toast.error(err.error ? err.error : "Something went wrong");
      dispatch(
        UserActions.verifyOtpFail(
          err.error ? err.error : "Something went wrong"
        )
      );
    }
  };

export const VerifyOTP =
  (dispatch: Dispatch) => (data: any) => async (navigate: NavigateFunction) => {
    try {
      dispatch(UserActions.startLoading(true));

      const res = await axiosInstance.post("/api/verify", data);
      dispatch(UserActions.verifyOtp());
      toast.success(res.data.status, { autoClose: 3000 });
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    } catch (error) {
      const customErr = error as AxiosError;
      const err = customErr.response?.data as { error: string };
      toast.error(err.error ? err.error : "Something went wrong");
      dispatch(
        UserActions.verifyOtpFail(
          err.error ? err.error : "Something went wrong"
        )
      );
    }
  };

export const updateUser = (dispatch: Dispatch) => async (data: any) => {
  try {
    dispatch(UserActions.startLoading(true));
    const update = Object.entries(data).filter(
      (item) => item[1] !== null && item[1] !== ""
    );

    const newUpdate = Object.fromEntries(update);
    const res = await axiosInstance.put("/api/updateProfile", newUpdate);
    console.log(res.data);
    dispatch(UserActions.updateUser(res.data.user));
    toast.success(res.data.message, { autoClose: 3000 });
  } catch (error) {
    const customErr = error as AxiosError;
    console.log(error);
    const err = customErr.response?.data as { error: string };
    toast.error(err.error ? err.error : "Something went wrong");
    dispatch(
      UserActions.updateUserFail(err.error ? err.error : "Something went wrong")
    );
  }
};

export const updatePassword = (dispatch: Dispatch) => async (data: any) => {
  try {
    dispatch(UserActions.startLoading(true));
    const update = Object.entries(data).filter(
      (item) => item[1] !== null && item[1] !== ""
    );

    const newUpdate = Object.fromEntries(update);
    const res = await axiosInstance.patch("/api/changePassword", newUpdate);
    console.log(res.data);
    dispatch(UserActions.updateUser(res.data.user));
    toast.success(res.data.message, { autoClose: 3000 });
  } catch (error) {
    const customErr = error as AxiosError;
    console.log(error);
    const err = customErr.response?.data as { error: string };
    toast.error(err.error ? err.error : "Something went wrong");
    dispatch(
      UserActions.updateUserFail(err.error ? err.error : "Something went wrong")
    );
  }
};
export const ForgetPassword =
  (dispatch: Dispatch) => (data: any) => async (navigate: NavigateFunction) => {
    try {
      dispatch(UserActions.startLoading(true));

      const res = await axiosInstance.post("/api/forgotPassword", data);
      dispatch(UserActions.forgetPassword());
      toast.success(res.data.message, { autoClose: 3000 });
      setTimeout(() => {
        navigate("/reset-password");
      }, 4000);
    } catch (error) {
      const customErr = error as AxiosError;

      const err = customErr.response?.data as { error: string };
      toast.error(err.error ? err.error : "Something went wrong");
      dispatch(
        UserActions.updateUserFail(
          err.error ? err.error : "Something went wrong"
        )
      );
    }
  };
export const ResetPassword =
  (dispatch: Dispatch) => (data: any) => async (navigate: NavigateFunction) => {
    try {
      dispatch(UserActions.startLoading(true));

      const res = await axiosInstance.post("/api/resetPassword", data);
      dispatch(UserActions.ResetPassword());
      toast.success(res.data.message, { autoClose: 3000 });
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    } catch (error) {
      const customErr = error as AxiosError;

      const err = customErr.response?.data as { error: string };
      toast.error(err.error ? err.error : "Something went wrong");
      dispatch(
        UserActions.updateUserFail(
          err.error ? err.error : "Something went wrong"
        )
      );
    }
  };
