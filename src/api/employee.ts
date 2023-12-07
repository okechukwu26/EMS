import { EmployeeActions} from "../Service/employee";
import { AxiosError } from "axios";
import axiosInstance from "../Request/axiosInstance";


import { Dispatch } from "redux";

import { toast } from "react-toastify";


export const getEmployee = async (dispatch: Dispatch) => {
  try {
    console.log("getEmployee");
    dispatch(EmployeeActions.employeeLoading());
    const res = await axiosInstance.get("/api/employees");
    dispatch(EmployeeActions.getEmployeesSuccess(res.data.employees));
    return res.data.employee;
  } catch (error) {
    console.log(error);
    const customErr = error as AxiosError;
    const err = customErr.response?.data as { error: string };
    // toast.error(err.error ? err.error : "Something went wrong");
    dispatch(
      EmployeeActions.getEmployeesFailure(

        err.error ? err.error : "Something went wrong"
     )
    )}
      };
    

// Your code here

export const createEmployee = (dispatch: Dispatch) => async (userForm: any) => {

  try {
    console.log(userForm);
    dispatch(EmployeeActions.startLoading(true));
    const res = await axiosInstance.post("/api/register/user", userForm);
    console.log(res.data);
    dispatch(EmployeeActions.createEmployeeSuccess(res.data.users));

    toast.success(res.data.msg, { autoClose: 3000 });
    //   setTimeout(() => {}, 4000);
  } catch (error) {
    const customErr = error as AxiosError;
    console.log(customErr);
    const err = customErr.response?.data as { error: string };
    toast.error(err.error ? err.error : "Something went wrong");
    dispatch(
      EmployeeActions.createEmployeeFailure(
        err.error ? err.error : "Something went wrong"
      )
    );
  }
};

export const OneEmployee = async (dispatch: Dispatch, employeeId: string) => {
  try {
    dispatch(EmployeeActions.employeeLoading());
    const res = await axiosInstance.get(`/api/employees/${employeeId}`);
    dispatch(EmployeeActions.getEmployeesSuccess([res.data.OneEmployee]));
    return res.data.employee;
  } catch (error) {
    console.log(error);
    const customErr = error as AxiosError;
    const err = customErr.response?.data as { error: string };
    dispatch(
      EmployeeActions.getEmployeesFailure(
        err.error ? err.error : "Something went wrong"
        )
      );
    }
  };



export const createImage = (dispatch: Dispatch) => async (images: any) => {
  try {
    dispatch(EmployeeActions.loadingImage(true));
    const config = {
      headers: {
        "Content-Type": "multipart/form-data", // Set the content type for the image
      },
    };

    const res = await axiosInstance.post("/api/image", images, config);
    dispatch(EmployeeActions.getImageSuccess(res.data.imageUrl));
    return res.data.imageUrl;
  } catch (error) {
    const customErr = error as AxiosError;
    const err = customErr.response?.data as { error: string };
    toast.error(err.error ? err.error : "Something went wrong");
    dispatch(
      EmployeeActions.getImageFailure(
        err.error ? err.error : "Something went wrong"
      )
    );
  }
};

export const getMembers = async (dispatch:Dispatch) =>{
  try {
    dispatch(EmployeeActions.LoadingMember())
    const res = await axiosInstance.get("/api/members")
  
    dispatch(EmployeeActions.getMembers(res.data.members))
    
  } catch (error) {
    const customErr = error as AxiosError;
    const err = customErr.response?.data as { error: string };
    toast.error(err.error ? err.error : "Something went wrong");
    dispatch(
      EmployeeActions.getMembersFailure(
        err.error ? err.error : "Something went wrong"
      )
    );
    
  }
}



