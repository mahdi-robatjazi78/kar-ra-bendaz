import { createSlice } from "@reduxjs/toolkit";

interface IBlur {
  head: Boolean;
  body: Boolean;
}

interface ISettings {
  blur: IBlur;
}

const initialState: ISettings = {
  blur: {
    head: false,
    body: false,
  },
};

export const appSettings = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setBlurPage: (state) => {
      state.blur = {
        head: true,
        body: true,
      };
    },

    deactiveBlur: (state) => {
      state.blur = {
        head: false,
        body: false,
      };
    },
    customBlur: (state, action) => {
      state.blur = {
        head: action.payload.head,
        body: action.payload.body,
      };
    },
  },
});

export const { setBlurPage, deactiveBlur, customBlur } = appSettings.actions;
export default appSettings.reducer;
