import { createSlice } from "@reduxjs/toolkit";
import { store } from "@/redux/store";
interface IBlur {
  head: Boolean;
  body: Boolean;
  sidebar: Boolean;
  size:Number;
}

interface ISettingModal {
  open:Boolean;
  config:{setting:String};
}

interface ISettings {
  blur: IBlur;
  headerPosition: String;
  modal: ISettingModal;
}

const initialState: ISettings = {
  blur: {
    head: false,
    body: false,
    sidebar: false,
    size:5,
  },
  headerPosition: "top",
  modal: {open:false,config:{setting:""}},
};



export const appSettings = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setBlurPage: (state) => {
      state.blur = {
        head: true,
        body: true,
        sidebar: true,
        size:state.blur.size,
      };
    },

    deactiveBlur: (state) => {
      state.blur = {
        head: false,
        body: false,
        sidebar: false,
        size:state.blur.size,

      };
    },
    customBlur: (state, action) => {
      state.blur = {
        head: action?.payload?.head || false,
        body: action?.payload?.body || false,
        sidebar: action?.payload?.sidebar || false,
        size:action?.payload?.size || 5,
      };
    },
    changeHeaderPosition: (state, action) => {
      state.headerPosition = action.payload;
    },
    handleSettingModalOpen: (state , action) => {
      state.modal.open = true;
      state.modal.config.setting = action?.payload?.setting || "" ;
    },
    handleSettingModalClose: (state) => {
      // store.dispatch(deactiveBlur())
      state.modal.open = false;
      state.modal.config.setting = "";
    },
  },
});

export const {
  setBlurPage,
  deactiveBlur,
  customBlur,
  changeHeaderPosition,
  handleSettingModalOpen,
  handleSettingModalClose,
} = appSettings.actions;


export default appSettings.reducer;
