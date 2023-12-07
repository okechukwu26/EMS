export interface UserState {
  loading: boolean;
  data: object; // Replace 'any' with the appropriate type for your 'data' property
  errors: string;
  isLoggedIn: boolean;
  loading_otp: boolean; // Replace 'any' with the appropriate type for your 'error' property
}

export const authInitialState: UserState = {
  loading: false,
  data: {},
  errors: "",
  isLoggedIn: false,
  loading_otp: false,
};
