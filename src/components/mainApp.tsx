import React, { useEffect, useContext } from "react";
import Header from "./header";
import { useDispatch, useSelector } from "react-redux";
import RouteBox from "./routeBox";
import { Box } from "@mui/material";
import { RootState } from "@/redux/store";
import SettingModal from "./modal/settingModal";
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

const Main = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const theme = useSelector((state: RootState) => state.settings.theme);
  const {
    headerPosition,
    modal,
    theme: { listen: ListenOsTheme },
  } = useSelector((state: RootState) => state.settings);
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

  // useEffect(() => {
  // check and set localstorage default essentials
  // localStorageSetFirstEssentials(dispatch, setThreeColAll);
  // }, []);
  useEffect(() => {
    handleSeeOsDarkMode();
  }, [ListenOsTheme]);

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      handleSeeOsDarkMode();
    });

  // .matchMedia("(prefers-color-scheme: dark)")
  // .addEventListener("change", (event) => {
  //   const newColorScheme = event.matches ? "dark" : "light";

  //   console.log(" newColorScheme  ???", newColorScheme);

  let mm = window.matchMedia("(prefers-color-scheme: light)");
  mm.addEventListener("change", (scheme) => {
    if (scheme.matches) {
      console.log("We have browser/system light scheme 1", scheme.matches);
    } else {
      console.log("We have browser/system light scheme 2", scheme.matches);
    }
  });

  const handleSeeOsDarkMode = () => {
    const isDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme:dark)").matches;

    if (theme.osTheme) {
      if (isDarkMode) {
        dispatch(handleOsTheme("dark"));
        if (DarkModeContext !== isDarkMode) {
          setDark();
        }
      } else {
        dispatch(handleOsTheme("light"));
        if (DarkModeContext !== isDarkMode) {
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
