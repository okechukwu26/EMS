import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payRise: [],
  loadingPayRise: false,
  error: "",
  loadingApproval: false,
  loadingDecline: false,
  payRiseId: "",
  update: {},
  updateDecline: {},
  searchPayRise: [],
  search: "",
  myPayrise:{}
};

const payRiseSlice = createSlice({
  name: "payRise",
  initialState,
  reducers: {
    createPayRise: (state) => {
      state.loadingPayRise = false;
    },
    startLoading: (state, action) => {
      state.loadingPayRise = action.payload;
    },
    payRiseError: (state, action) => {
      (state.loadingPayRise = false), 
      (state.error = action.payload);
    },
    getPayRise: (state, action) => {
      state.payRise = action.payload;
      state.loadingPayRise = false;
    },
    getPayRiseError: (state, action) => {
      (state.loadingPayRise = false), 
      (state.error = action.payload);
    },
    ApprovedLoading: (state, action) => {
      state.loadingApproval = action.payload.loading;
      state.payRiseId = action.payload.id;
    },
    DeclineLoading: (state, action) => {
      state.loadingDecline = action.payload.loading;
      state.payRiseId = action.payload.id;
    },
    ApprovePay: (state, action) => {
      state.loadingApproval = false;
      state.update = action.payload;
    },
    DeclinePay: (state, action) => {
      state.loadingDecline = false;
      state.updateDecline = action.payload;
    },
    ApprovedFail: (state, action) => {
      state.loadingApproval = false;
      state.error = action.payload;
    },
    Search: (state, action) => {
      state.searchPayRise = action.payload.result;
      state.search = action.payload.search;
    },
    myPayRise:(state, action) =>{
      state.myPayrise=action.payload
      state.loadingPayRise=false
    }
  },
});

export const PayRiseAction = payRiseSlice.actions;

export default payRiseSlice.reducer;
