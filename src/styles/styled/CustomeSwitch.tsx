import React, { useContext } from "react";
import styled from "styled-components";
import Switch from "@mui/material/Switch";
import ThemeContext from "@/context/themeContext";

const StyledSwitchComponent = styled((props) => {
  return (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
  );
})(() => {
  const ContextTheme = useContext(ThemeContext);

  return {
    width: 55,
    height: 26,
    padding: 0,
    "& .MuiSwitch-switchBase": {
      padding: 0,
      margin: 2,
      transitionDuration: "300ms",
      "&.Mui-checked": {
        transform: "translateX(16px)",
        color: "#fff",
        padding: 0,
        "& + .MuiSwitch-track": {
          backgroundColor: ContextTheme.isDarkMode ? "#2ECA45" : "#65C466",
          opacity: 1,
          border: 0,
        },
        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },
      "&.Mui-focusVisible .MuiSwitch-thumb": {
        color: "#33cf4d",
        border: "6px solid #fff",
      },
      "&.Mui-disabled .MuiSwitch-thumb": {
        color: !ContextTheme.isDarkMode ? "#e1e1e1" : "#d1d1d1",
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: !ContextTheme.isDarkMode ? 0.7 : 0.3,
      },
    },
    "& .MuiSwitch-thumb": {
      boxSizing: "border-box",
      width: 22,
      height: 22,
    },
    "& .MuiSwitch-track": {
      borderRadius: 26 / 2,
      backgroundColor: !ContextTheme.isDarkMode ? "#E9E9EA" : "#39393D",
      opacity: 1,
      width: "75%",
    },
  };
});

export default StyledSwitchComponent;
