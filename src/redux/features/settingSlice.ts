import { createSlice } from "@reduxjs/toolkit";

interface IBlur {
  head: Boolean;
  body: Boolean;
  sidebar:Boolean
}

interface ISettings {
  blur: IBlur;
  headerPosition:String;
}

const initialState: ISettings = {
  blur: {
    head: false,
    body: false,
    sidebar:false,
  },
  headerPosition:"top"
};

export const appSettings = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setBlurPage: (state) => {
      state.blur = {
        head: true,
        body: true,
        sidebar:true,
      };
    },

    deactiveBlur: (state) => {
      state.blur = {
        head: false,
        body: false,
        sidebar:false,
      };
    },
    customBlur: (state, action) => {
      state.blur = {
        head: action?.payload?.head || false,
        body: action?.payload?.body || false,
        sidebar: action?.payload?.sidebar || false,
      };
    },
    changeHeaderPosition:(state,action)=>{
      state.headerPosition = action.payload
    }
  },
});

export const { setBlurPage, deactiveBlur, customBlur ,changeHeaderPosition } = appSettings.actions;
export default appSettings.reducer;
