import { createSlice } from "@reduxjs/toolkit";

export interface IUserData {
  email: String;
  fname: String;
  gender: String;
  lname: String;
  userName: String;
}
export interface IUser {
  token: String;
  me: IUserData;
}

const initialState: IUser = {
  token: null,
  me: {
    email: null,
    fname: null,
    gender: null,
    lname: null,
    userName: null,
  },
};

export const userSlice = createSlice({
  name: "user-slice",
  initialState,
  reducers: {
    SetUserData: (state, action) => {
      state.me = action.payload;
    },
    SetUserToken: (state, action) => {
      state.token = action.payload.token;
    },
    LogoutAction: (state, action) => {
      state.token = null;
      state.me = {
        email: null,
        fname: null,
        gender: null,
        lname: null,
        userName: null,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { SetUserToken, SetUserData, LogoutAction } = userSlice.actions;

export default userSlice.reducer;
