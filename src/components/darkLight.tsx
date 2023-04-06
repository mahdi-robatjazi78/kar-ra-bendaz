import React, { useEffect, useContext } from "react";
import ThemeContext from "../context/themeContext";
import { Box } from "@mui/material";
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";

const DarkLight = (props) => {
  const { listenFromOs, osTheme } = props;
  const { isDarkMode, toggleDark, setDark, setLight } = useContext(
    ThemeContext
  );
  const handleChangeTheme = () => {
    if (!listenFromOs) {
      localStorage.setItem("darkmode", JSON.stringify(!isDarkMode));
      toggleDark();
    }
  };
  useEffect(() => {
    if (listenFromOs) {
      if (osTheme) {
        setDark();
      } else {
        setLight();
      }
    }
  }, [listenFromOs ,osTheme]);

  return (
    <Box style={{ cursor: !listenFromOs ? "pointer" : "no-drop" }}>
      <Box
        onClick={handleChangeTheme}
        style={{
          padding: "1rem",
          display: "inline-block",
        }}
      >
        {isDarkMode ? (
          <BsFillSunFill
            fontSize={"2rem"}
            style={{
              animation: "App-logo-spin infinite 20s linear",
              color: "var(--borders)",
            }}
          />
        ) : (
          <BsFillMoonStarsFill fontSize={"2rem"} style={{color:"var(--text3)"}} />
        )}
      </Box>
    </Box>
  );
};

export default DarkLight;
