/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import axiosInstance from "../Request/axiosInstance";
import { TaskActions } from "../Service/Task";
// import { TaskAction } from "../Service/tasks";
import { Dispatch } from "redux";

import { toast } from "react-toastify";

export const createTask = (dispatch: Dispatch) => async (task: any) => {
  try {
    dispatch(TaskActions.startLoading());
    const res = await axiosInstance.post("/api/task/create", task);
    console.log(res.data);
    dispatch(TaskActions.createTask(res.data.message));
  } catch (error) {
    const customErr = error as AxiosError;
    console.log(customErr);
    const err = customErr.response?.data as { error: string };
    toast.error(err.error ? err.error : "Something went wrong");
    dispatch(
      TaskActions.createTaskFailure(
        err.error ? err.error : "Something went wrong"
      )
    );
  }
};

export const AssignedTask = (dispatch: Dispatch) => async (data: any) => {
  try {
    dispatch(TaskActions.startLoading());
    const res = await axiosInstance.patch(`/api/task/${data.taskId}`, {
      assignedTo: data.assignedTo,
    });
    dispatch(TaskActions.assignTask(res.data.count));
    toast.success(res.data.msg);
  } catch (error) {
    const customErr = error as AxiosError;
    console.log(customErr);
    const err = customErr.response?.data as { error: string };
    toast.error(err.error ? err.error : "Something went wrong");
    dispatch(
      TaskActions.assignTaskFailure(
        err.error ? err.error : "Something went wrong"
      )
    );
  }
};

export const getTask = async (dispatch: Dispatch) => {
  try {
    dispatch(TaskActions.startLoading());
    const res = await axiosInstance.get("/api/task/get");
    dispatch(TaskActions.getTask(res.data.task));
    return res.data.task;
  } catch (error) {
    const customErr = error as AxiosError;
    const err = customErr.response?.data as { error: string };
    toast.error(err.error ? err.error : "Something went wrong");
    dispatch(
      TaskActions.getTaskError(err.error ? err.error : "Something went wrong")
    );
  }
};
export const MyTask = async (dispatch: Dispatch) => {
  try {
    dispatch(TaskActions.startLoading());
    const res = await axiosInstance.get("/api/employeeTask");
    dispatch(TaskActions.MyTask(res.data.task));
  } catch (error) {
    const customErr = error as AxiosError;
    const err = customErr.response?.data as { error: string };
    toast.error(err.error ? err.error : "Something went wrong");
    dispatch(
      TaskActions.getTaskError(err.error ? err.error : "Something went wrong")
    );
  }
};
export const updateTask = (dispatch: Dispatch) => async (data: any) => {
  try {
    dispatch(TaskActions.startLoading());
    const res = await axiosInstance.patch(
      `/api/task/update?id=${data.id}&projectId=${data.projectId}`,
      { status: data.status }
    );
    dispatch(TaskActions.updateTask(res.data.updateRecord));
    toast.success(res.data.msg);
  } catch (error) {
    const customErr = error as AxiosError;
    const err = customErr.response?.data as { error: string };
    toast.error(err.error ? err.error : "Something went wrong");
    dispatch(
      TaskActions.getTaskError(err.error ? err.error : "Something went wrong")
    );
  }
};
