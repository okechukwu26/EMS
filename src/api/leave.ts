/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import axiosInstance from "../Request/axiosInstance";

import { Dispatch } from "redux";
//import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { LeaveAction } from "../Service/leave";
import { leaveFormData } from "../components/EmployeeDashboard/Leave";

export const createLeave =
   (dispatch: Dispatch) => async (form: leaveFormData) => {
    try {
      console.log(form);
      dispatch(LeaveAction.startLoading(true))
      const res = await axiosInstance.post("/api/create", form)
      dispatch(LeaveAction.createLeave())
      toast.success(res.data.msg)
      console.log(res.data)
    } catch (error) {
      const customErr = error as AxiosError;
      const err = customErr.response?.data as { Error: string };
      toast.error(err.Error ? err.Error : "Something went wrong");
      dispatch(
        LeaveAction.getLeaveError(
          err.Error ? err.Error : "Something went wrong"
        )
      );
    }
  };

export const getLeave = async (dispatch: Dispatch) => {
  try {
    dispatch(LeaveAction.startLoading(true));
    const res = await axiosInstance.get("/api/get/leave");
    dispatch(LeaveAction.getLeave(res.data.leave));
    return res.data.leave;
  } catch (error) {
    const customErr = error as AxiosError;
    const err = customErr.response?.data as { error: string };
    toast.error(err.error ? err.error : "Something went wrong");
    dispatch(
      LeaveAction.getLeaveError(err.error ? err.error : "Something went wrong")
    );
  }
};

export const updateLeave = (dispatch: Dispatch) => async (data: any) => {
  try {
    console.log(data);
    dispatch(LeaveAction.leaveLoading({ loading: true, id: data.id }));
    const res = await axiosInstance.patch(`/api/update/leave/${data.id}`, {
      status: data.status,
    });
    console.log(res);
    dispatch(LeaveAction.approveLeave(res.data.updateRecord));
  } catch (error) {
    const customErr = error as AxiosError;
    console.log(customErr.response);

    const err = customErr.response?.data as { error: string };
    console.log(error);
    toast.error(err.error ? err.error : "Something went wrong");
    dispatch(
      LeaveAction.updateFail(err.error ? err.error : "Something went wrong")
    );
  }
};

export const RejectLeave = (dispatch: Dispatch) => async (data: any) => {
  try {
    dispatch(LeaveAction.startLoadingFail({ loading: true, id: data.id }));
    const res = await axiosInstance.patch(`/api/update/leave/${data.id}`, {
      status: data.status,
    });
    console.log(res);
    dispatch(LeaveAction.approveLeaveFail(res.data.updateRecord));
  } catch (error) {
    const customErr = error as AxiosError;
    console.log(customErr.response);

    const err = customErr.response?.data as { error: string };
    console.log(error);
    toast.error(err.error ? err.error : "Something went wrong");
    dispatch(
      LeaveAction.updateFail(err.error ? err.error : "Something went wrong")
    );
  }
};
