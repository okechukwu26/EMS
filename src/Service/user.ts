import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  loading: false,
  error: "",
  token: "",
  settings: {}

  
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

      loginUser: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.User;
      state.loading = false;
    },
    loginFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    startLoading: (state = initialState, action) => {
      state.loading = action.payload;
    },

    registerFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    verifyOtp: (state) => {
      state.loading = false;
    },
    verifyOtpFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    updateUserFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    forgetPassword:(state) =>{
      state.loading = false;

    },
    ResetPassword:(state) =>{
      state.loading = false
    }
  },
});

export const UserActions = userSlice.actions;
export default userSlice.reducer;
