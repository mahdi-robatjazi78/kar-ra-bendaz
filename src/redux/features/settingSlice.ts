import { createSlice } from "@reduxjs/toolkit";

interface IBlur {
  head: Boolean;
  body: Boolean;
  sidebar: Boolean;
  size: Number;
}

interface ISettingModal {
  open: Boolean;
  config: { setting: string };
}

interface ITheme {
  osTheme: string; // dark | light | "",
  listen: boolean;
  mode: string; // dark | light ,
}

interface ISettings {
  blur: IBlur;
  headerPosition: String;
  modal: ISettingModal;
  theme: ITheme;
  playSound: boolean;
}

const initialState: ISettings = {
  blur: {
    head: false,
    body: false,
    sidebar: false,
    size: 5,
  },
  headerPosition: "top",
  modal: { open: false, config: { setting: "" } },
  theme: { osTheme: "", listen: false, mode: "light" },
  playSound: false,
};

export const appSettings = createSlice({
  name: "setting-slice",
  initialState,
  reducers: {
    setBlurPage: (state) => {
      state.blur = {
        head: true,
        body: true,
        sidebar: true,
        size: state.blur.size,
      };
    },

    deactiveBlur: (state) => {
      state.blur = {
        head: false,
        body: false,
        sidebar: false,
        size: state.blur.size,
      };
    },
    customBlur: (state, action) => {
      state.blur = {
        head: action?.payload?.head || false,
        body: action?.payload?.body || false,
        sidebar: action?.payload?.sidebar || false,
        size: action?.payload?.size || 5,
      };
    },
    changeHeaderPosition: (state, action) => {
      state.headerPosition = action.payload;
    },
    handleSettingModalOpen: (state, action) => {
      state.modal.open = true;
      state.modal.config.setting = action?.payload?.setting || "";
    },
    handleSettingModalClose: (state) => {
      state.modal.open = false;
      state.modal.config.setting = "";
    },

    handleOsTheme: (state, action) => {
      state.theme.osTheme = action.payload;
    },

    handleAppThemeChange: (state, action) => {
      state.theme.mode = action.payload;
    },

    handleListenFromOs: (state, action) => {
      state.theme.listen = action.payload;
    },

    handlePlaySound: (state) => {
      state.playSound = true;
    },

    handlePauseSound: (state) => {
      state.playSound = false;
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
  handleOsTheme,
  handleListenFromOs,
  handlePlaySound,
  handlePauseSound,
  handleAppThemeChange,
} = appSettings.actions;

export default appSettings.reducer;
