import { AxiosError } from "axios";
import axiosInstance from "../Request/axiosInstance";
import { Dispatch } from "redux";
// import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { projectAction } from "../Service/project";
import { IProject } from "../components/TeamLeadDashboard/project";

export const createProject = (dispatch: Dispatch) => async (data: IProject) => {
  try {
    dispatch(projectAction.startLoading());
    const res = await axiosInstance.post("/api/project/create", data);
    dispatch(projectAction.createProject(res.data.project));
  } catch (error) {
    const customErr = error as AxiosError;
    console.log(customErr);
    const err = customErr.response?.data as { error: string };
    toast.error(err.error ? err.error : "Something went wrong");
    dispatch(
      projectAction.createProjectFailure(
        err.error ? err.error : "Something went wrong"
      )
    );
  }
};

export const getProjects = async (dispatch: Dispatch) => {
  try {
    dispatch(projectAction.startLoading());
    const res = await axiosInstance.get("/api/project/team");
    dispatch(projectAction.getProject(res.data.project));
    return res.data.project;
  } catch (error) {
    const customErr = error as AxiosError;
    console.log(customErr);
    const err = customErr.response?.data as { error: string };
    toast.error(err.error ? err.error : "Something went wrong");
    dispatch(
      projectAction.getProjectError(
        err.error ? err.error : "Something went wrong"
      )
    );
  }
};

export const getProject = (dispatch: Dispatch) => async (id: string) => {
  try {
    dispatch(projectAction.startLoading());
    const res = await axiosInstance.get(`/api/project/${id}`);

    dispatch(projectAction.getDetail(res.data.project));
  return res.data.project
  } catch (error) {
    const customErr = error as AxiosError;
    console.log(customErr);
    const err = customErr.response?.data as { error: string };
    toast.error(err.error ? err.error : "Something went wrong");
    dispatch(
      projectAction.getProjectError(
        err.error ? err.error : "Something went wrong"
      )
    );
  }
};

export const GetAllProject = async (dispatch:Dispatch) =>{
  try{
    dispatch(projectAction.startLoading())
    const res = await axiosInstance.get("/api/project/all")
    console.log(res.data)
    dispatch(projectAction.getAllProject(res.data.project))

  }catch(error){
    const customErr = error as AxiosError;
    console.log(customErr);
    const err = customErr.response?.data as { error: string };
    toast.error(err.error ? err.error : "Something went wrong");
    dispatch(
      projectAction.getProjectError(
        err.error ? err.error : "Something went wrong"
      )
    );
  }
}
