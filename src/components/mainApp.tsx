import React, { useEffect, useContext } from "react";
import Header from "./header";
import { useDispatch, useSelector } from "react-redux";
import RouteBox from "./routeBox";
import { Box } from "@mui/material";
import { RootState } from "@/redux/store";
import SettingModal from "./modal/setting";
import {
  handleSettingModalOpen,
  handleSettingModalClose,
  setBlurPage,
  deactiveBlur,
  changeHeaderPosition,
  handleOsTheme,
} from "@/redux/features/settingSlice";
import { useHotkeys } from "react-hotkeys-hook";
import ThemeContext from "@/context/themeContext";
import usePrefersColorScheme from "@hooks/useOsTheme"
import Toast from "@/util/toast";
import { useNavigate } from "react-router-dom";


const Main = () => {

  const { headerPosition, modal, theme, } = useSelector((state: RootState) => state.settings);
  const {token} = useSelector((state: RootState) => state.auth);
  const Navigate = useNavigate()
  const dispatch = useDispatch();

  const {
    toggleDark,
    setDark,
    setLight,
    isDarkMode: DarkModeContext,
  } = useContext(ThemeContext);

  const handleCloseSettingModal = () => {
    dispatch(deactiveBlur());
    dispatch(handleSettingModalClose());
  };
  const handleOpenSettingModal = () => {
    dispatch(setBlurPage());
    dispatch(handleSettingModalOpen({}));
  };

  useHotkeys("ctrl+shift+s", () => {
    if(token){
      handleOpenSettingModal();
    }
  });

  
  useHotkeys("ctrl+alt+t", () => {
    if(token){
    if (theme.listen) {
      Toast(
        "Please first disable listen to os theme option from setting modal",
        true,
        true,
        "⛔"
      );
    }else{
      
      toggleDark();

    }
  }
  });
  useHotkeys("ctrl+shift+keydown", () => {
    if(token){
    dispatch(changeHeaderPosition("bottom"));
  }});
  useHotkeys("ctrl+shift+keyup", () => {
    if(token){
      dispatch(changeHeaderPosition("top"));
    }
  });

  useHotkeys("ctrl+shift+keyleft", () => {
    if(token){
    dispatch(changeHeaderPosition("left"));
    }
  });
  useHotkeys("ctrl+shift+keyright", () => {
    if(token){
      dispatch(changeHeaderPosition("right"));
    }
  });

  // useEffect(()=>{
  //   if(!token){
  //     Navigate('/login')
  //   }
  // },[token])

  const osThemeChanged = usePrefersColorScheme()


  useEffect(() => {
    if(theme.listen){
      handleSeeOsThemeMode();
    }
  }, [theme.listen , osThemeChanged]);


  const handleSeeOsThemeMode = () => {
     const OsIsDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme:dark)").matches;


   const getDiffOsThemeAndAppTheme =  OsIsDarkMode && theme.mode === "dark" ? true : !OsIsDarkMode && theme.mode === "light"  ? true : false

    if (theme.listen && !getDiffOsThemeAndAppTheme ) {


      if (OsIsDarkMode) {
        dispatch(handleOsTheme("dark"));
        if (theme.mode !== "dark") {
          setDark();
        }
      } else {
        dispatch(handleOsTheme("light"));
        if (theme.mode !== "light") {
          setLight();
        }
      }
    }
  };

  return (
    <main id="main">
      <Box
        id="App"
        flexDirection={
          headerPosition === "top"
            ? "column"
            : headerPosition === "bottom"
            ? "column-reverse"
            : headerPosition === "left"
            ? "row"
            : headerPosition === "right"
            ? "row-reverse"
            : "row"
        }
      >
        <Header handleOpenSettingModal={handleOpenSettingModal} />
        <RouteBox />

        {modal.open ? (
          <SettingModal
            settingModalOpen={modal.open}
            handleClose={handleCloseSettingModal}
          />
        ) : null}
      </Box>
    </main>
  );
};

export default Main;
