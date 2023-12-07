/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode, createContext, useReducer } from "react";
// import contactInitialState, {
//   ContactState,
// } from './initialState/contactInitialState';
import { UserState, authInitialState } from "./InitialState/userInitialState";
import user from "./reducer/userReducer";

interface GlobalProviderProps {
  children: ReactNode;
}

const initialState = {
  loading: false,
  errors: "",
  data: {},
  isLoggedIn: false,
  loading_otp: false,
  // ...other properties
};
export type UserAction =
  | { type: "REGISTER_USER"; payload: any }
  | { type: "LOGIN_USER"; payload: any }
  | { type: "LOGIN_FAIL"; payload: any }
  | { type: "LOADING_USER" }
  | { type: "LOADING_OTP" }
  | { type: "VERIFY_OTP_FAIL"; payload: any }
  | { type: "REGISTER_FAIL"; payload: any }
  | { type: "VERIFY_OTP"; payload: any }
  | { type: "RESEND_OTP"; payload: any }
  | { type: "OTP_LOADING" }
  | { type: "OTP_FAIL"; payload: any }
  | { type: "FORGET_PASSWORD" }
  | { type: "FORGET_PASSWORD_FAIL"; payload: any }
  | { type: "LOADING_FORGET_PASSWORD" }
  | { type: "RESEND_PASSWORD" }
  | { type: "LOADING_RESEND_PASSWORD" }
  | { type: "RESEND_PASSWORD_FAIL"; payload: any };

// export type ContactAction =
//   | {type: 'GET_CONTACT_SUCCESS'; payload: any}
//   | {type: 'GET_CONTACT_FAIL'; payload: any}
//   | {type: 'GET_CONTACT_LOADING'}
//   | {type: 'CREATE_CONTACT_SUCCESS'; payload: any}
//   | {type: 'CREATE_CONTACT_FAIL'; payload: any}
//   | {type: 'CREATE_CONTACT_LOADING'}
//   | {type: 'CREATE_IMAGE_SUCCESS'; payload: any}
//   | {type: 'CREATE_IMAGE_LOADING'}
//   | {type: 'CREATE_IMAGE_FAIL'; payload: any}
//   | {type: 'CLEAR_CONTACT'}
//   | {type: 'DELETE_CONTACT_LOADING'}
//   | {type: 'DELETE_CONTACT_SUCCESS'; payload: any}
//   | {type: 'DELETE_CONTACT_FAIL'; payload: any}
//   | {type: 'EDIT_CONTACT_SUCCESS'; payload: any}
//   | {type: 'EDIT_CONTACT_FAIL'; payload: any}
//   | {type: 'EDIT_CONTACT_LOADING'};

export const GlobalContext = createContext<{
  userState: typeof initialState;
  userDispatch: React.Dispatch<UserAction>;
}>({
  userState: initialState,
  userDispatch: () => null,
});
const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [userState, userDispatch] = useReducer(user, authInitialState);

  return (
    <GlobalContext.Provider
      value={{
        userState,
        userDispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
