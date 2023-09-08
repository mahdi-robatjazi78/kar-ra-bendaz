import { IUser , IUserMeData } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";



const initialState: IUser = {
  token: null,
  me: {
    fname: null,
    lname: null,
    email: null,
    userName: null,
    accountType:null,
    picture:{
      avatar: null,
      banner: null
    }
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
      state.token = initialState.token;
      state.me = initialState.me
    },
  },
});

// Action creators are generated for each case reducer function
export const { SetUserToken, SetUserData, LogoutAction } = userSlice.actions;

export default userSlice.reducer;
