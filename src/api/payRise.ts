/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import axiosInstance from "../Request/axiosInstance";
import { PayRiseAction } from "../Service/payRise";
import { Dispatch } from "redux";
//import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { payriseFormData } from "../components/EmployeeDashboard/Payrise";

export const createPayRise =
   (dispatch: Dispatch) => async (form: payriseFormData) => {
    try {
      console.log(form);
      dispatch(PayRiseAction.startLoading(true))
      const res = await axiosInstance.post("/api/create-pay", form)
      dispatch(PayRiseAction.createPayRise())
      toast.success(res.data.msg)
      console.log(res.data)
    } catch (error) {
      const customErr = error as AxiosError;
      const err = customErr.response?.data as { Error: string };
      toast.error(err.Error ? err.Error : "Something went wrong");
      dispatch(
        PayRiseAction.getPayRiseError(
          err.Error ? err.Error : "Something went wrong"
        )
      );
    }
  };
export const getPayRise = async (dispatch: Dispatch) => {
  try {
    dispatch(PayRiseAction.startLoading(true));
    const res = await axiosInstance.get("/api/get-pay");

    dispatch(PayRiseAction.getPayRise(res.data.payRise));
  } catch (error) {
    const customErr = error as AxiosError;
    const err = customErr.response?.data as { error: string };
    toast.error(err.error ? err.error : "Something went wrong");
    dispatch(
      PayRiseAction.getPayRiseError(
        err.error ? err.error : "Something went wrong"
      )
    );
  }
};
export const ApprovePayRise = (dispatch: Dispatch) => async (data: any) => {
  try {
    dispatch(PayRiseAction.ApprovedLoading({ loading: true, id: data.id }));
    const res = await axiosInstance.patch(`/api/update/pay/${data.id}`, {
      status: data.status,
    });
    dispatch(PayRiseAction.ApprovePay(res.data.updateRecord));
  } catch (error) {
    const customErr = error as AxiosError;
    const err = customErr.response?.data as { error: string };
    toast.error(err.error ? err.error : "Something went wrong");
    dispatch(
      PayRiseAction.ApprovedFail(err.error ? err.error : "Something went wrong")
    );
  }
};
export const DeclinePayRise = (dispatch: Dispatch) => async (data: any) => {
  try {
    dispatch(PayRiseAction.DeclineLoading({ loading: true, id: data.id }));
    const res = await axiosInstance.patch(`/api/update/pay/${data.id}`, {
      status: data.status,
    });
    console.log(res.data.updateRecord);
    dispatch(PayRiseAction.DeclinePay(res.data.updateRecord));
  } catch (error) {
    const customErr = error as AxiosError;
    const err = customErr.response?.data as { error: string };
    toast.error(err.error ? err.error : "Something went wrong");
    dispatch(
      PayRiseAction.ApprovedFail(err.error ? err.error : "Something went wrong")
    );
  }
};
export const Search = (dispatch: Dispatch) => (data: any) => {
  dispatch(PayRiseAction.Search(data));
};

export const myPayRise =  async (dispatch:Dispatch) =>{
  try {
    dispatch(PayRiseAction.startLoading(true));
    const res = await  axiosInstance.get("/api/mypayrise")
    dispatch(PayRiseAction.myPayRise(res.data.payRise))
    
  } catch (error) {
    const customErr = error as AxiosError;
    const err = customErr.response?.data as { error: string };
    toast.error(err.error ? err.error : "Something went wrong");
    dispatch(
      PayRiseAction.getPayRiseError(
        err.error ? err.error : "Something went wrong"
      )
    );
    
  }
}
