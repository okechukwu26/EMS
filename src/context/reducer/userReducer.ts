/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  REGISTER_FAIL,
  REGISTER_USER,
  LOADING_USER,
  LOGIN_USER,
  LOGIN_FAIL,
  LOADING_OTP,
  VERIFY_OTP,
  VERIFY_OTP_FAIL,
  LOADING_FORGET_PASSWORD,
  FORGET_PASSWORD,
  LOADING_RESEND_PASSWORD,
  RESEND_PASSWORD,
  RESEND_PASSWORD_FAIL,
} from "../Type";
import { UserState } from "../InitialState/userInitialState";

const auth = (state: UserState, action: any) => {
  switch (action.type) {
    case LOADING_USER:
    case LOADING_FORGET_PASSWORD:
    case LOADING_RESEND_PASSWORD:
      return {
        ...state,
        loading: true,
      };
    case LOADING_OTP:
      return {
        ...state,
        loading: false,
        loading_otp: true,
      };
    case VERIFY_OTP:
    case VERIFY_OTP_FAIL:
    case FORGET_PASSWORD:
      return {
        ...state,
        loading_otp: false,
        loading: false,
      };
    case LOGIN_USER:
      return {
        ...state,
        isLoggedIn: true,
        loading: false,
        data: { ...action.payload },
      };
    case REGISTER_USER:
      return {
        ...state,
        isLoggedIn: false,
        loading: false,
        data: { ...action.payload },
      };
    case REGISTER_FAIL:
      case RESEND_PASSWORD_FAIL:
      return {
        ...state,
        error: action.payload.error ? action.payload.error : action.payload,
        loading: false,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload.error ? action.payload.error : action.payload,
      };
    case RESEND_PASSWORD:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default auth;
