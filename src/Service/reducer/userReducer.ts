/* eslint-disable @typescript-eslint/no-explicit-any */
import { LOADING_USER, REGISTER_FAIL, REGISTER_USER, LOGIN_USER, LOGIN_FAIL } from "../Type";
export const initialState = {
  authenticated: false,
  loading: false,
  user: {},
  error: "",
};

export default function (state = initialState, action: any) {
  switch (action.type) {
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_USER:
      return {
        ...state,
        authenticated: true,
        loading: false,
        user: action.payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };

    case REGISTER_USER:
      return {
        ...state,
        authenticated: false,
        loading: false,
        user: action.payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    default:
      return state;
  }
}
