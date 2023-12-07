import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import PayRiseReducer from "./payRise";
import LeaveReducer from "./leave";
import employeeReducer from "./employee"
import projectReducer from "./project"
import TaskReducer from "./Task"

const store = configureStore({
  reducer: {
    user: userReducer,
    payRise: PayRiseReducer,
    leave: LeaveReducer,
    employee:employeeReducer,
    project:projectReducer,
    task:TaskReducer,
  
  },
});


export default store;

