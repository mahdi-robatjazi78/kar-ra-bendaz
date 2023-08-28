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

const Main = () => {

  const { headerPosition, modal, theme, } = useSelector((state: RootState) => state.settings);
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
    handleOpenSettingModal();
  });
  useHotkeys("alt+t", () => {
    toggleDark();
  });
  useHotkeys("ctrl+shift+keydown", () => {
    dispatch(changeHeaderPosition("bottom"));
  });
  useHotkeys("ctrl+shift+keyup", () => {
    dispatch(changeHeaderPosition("top"));
  });

  useHotkeys("ctrl+shift+keyleft", () => {
    dispatch(changeHeaderPosition("left"));
  });
  useHotkeys("ctrl+shift+keyright", () => {
    dispatch(changeHeaderPosition("right"));
  });

  const osThemeChanged = usePrefersColorScheme()


  useEffect(() => {
    if(theme.listen){
      handleSeeOsDarkMode();
    }
  }, [theme.listen , osThemeChanged]);


  const handleSeeOsDarkMode = () => {
     const OsIsDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme:dark)").matches;


    if (theme.listen && theme.mode !== osThemeChanged ) {


      if (OsIsDarkMode) {
        dispatch(handleOsTheme("dark"));
        if (DarkModeContext !== OsIsDarkMode) {
          setDark();
        }
      } else {
        dispatch(handleOsTheme("light"));
        if (DarkModeContext !== OsIsDarkMode) {
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
