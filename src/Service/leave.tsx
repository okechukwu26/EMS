import { createSlice } from "@reduxjs/toolkit";
import { LEAVE } from "../components/HRDashboard/LeaveApproval";


const initialState = {
  leave: [] as LEAVE[],
  error: "",
  loadingLeave: false,
  loadingId: "",
  approvalLoading: false,
  loadingReject: false,
  leaveError: "",
  update: {},
};

const leaveSlice = createSlice({
  name: "leave",
  initialState,
  reducers: {
    createLeave: (state) => {
      state.loadingLeave = false;
    },
    getLeave: (state, action) => {
      state.leave = action.payload;
      state.loadingLeave = false;
    },
    getLeaveError: (state, action) => {
      state.leaveError = action.payload;
      state.loadingLeave = false;
    },
    startLoading: (state, action) => {
      state.loadingLeave = action.payload;
    },
    leaveLoading: (start, action) => {
      start.approvalLoading = action.payload.loading;
      start.loadingId = action.payload.id;
    },
    startLoadingFail: (state, action) => {
      state.loadingReject = action.payload.loading;
      state.approvalLoading = false
      state.loadingId = action.payload.id;
    },
    approveLeave: (state, action) => {
      console.log(action.payload);
      state.leave = [...state.leave, action.payload];
      state.update = action.payload;
      state.loadingLeave = false;
      state.loadingId = action.payload.id;
    },
    approveLeaveFail: (state, action) => {
      state.leave = [...state.leave, action.payload];
      state.loadingReject = false;
      state.loadingId = action.payload.id;
      state.update = action.payload;
    },
    updateFail: (state, action) => {
      state.leaveError = action.payload;
      state.loadingLeave = false;
      state.loadingReject = false;
    },
  },
});

export const LeaveAction = leaveSlice.actions;

export default leaveSlice.reducer;
