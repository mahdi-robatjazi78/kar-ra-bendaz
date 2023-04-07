import React, { useState, useEffect, useContext } from "react";
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
  }, [listenFromOs, osTheme]);


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
          <svg
            width="44"
            height="55"
            viewBox="0 0 18 18"
            style={{animation: "App-logo-spin infinite 20s linear" , zIndex:9999 }}
            className="sc-a794b73f-1 cfurEx"
          >
            <mask id="moon-mask-sound-demo">
              <rect x="0" y="0" width="18" height="18" fill="#FFF"></rect>
              <circle cx="25" cy="0" r="12" fill="var(--borders)"></circle>
            </mask>
            <circle
              cx="9"
              cy="9"
              fill="var(--borders)"
              mask="url(#moon-mask-sound-demo)"
              r="5"
            ></circle>
            <g>
              <circle
                cx="17"
                cy="9"
                r="1.5"
                fill="var(--borders)"
                style={{transformOrigin: "center center", transform: "scale(1)"
                }}
              ></circle>
              <circle
                cx="13"
                cy="15.928203"
                r="1.5"
                fill="var(--borders)"
                style={{transformOrigin: "center center", transform: "scale(1)"
                }}
              ></circle>
              <circle
                cx="5"
                cy="15.928203"
                r="1.5"
                fill="var(--borders)"
                style={{transformOrigin: "center center", transform: "scale(1)"
                }}
              ></circle>
              <circle
                cx="1"
                cy="9"
                r="1.5"
                fill="var(--borders)"
                style={{transformOrigin: "center center", transform: "scale(1)"
                }}
              ></circle>
              <circle
                cx="5"
                cy="2.071797"
                r="1.5"
                fill="var(--borders)"
                style={{transformOrigin: "center center", transform: "scale(1)"
                }}
              ></circle>
              <circle
                cx="13"
                cy="2.071797"
                r="1.5"
                fill="var(--borders)"
                style={{transformOrigin: "center center", transform: "scale(1)"
                }}
              ></circle>
            </g>
          </svg>
        ) : (
          // <BsFillSunFill
          //   fontSize={"2rem"}
          //   style={{
          //     animation: "App-logo-spin infinite 20s linear",
          //     color: "var(--borders)",
          //   }}
          // />
          <BsFillMoonStarsFill
            fontSize={"2rem"}
            style={{ color: "var(--text3)" }}
          />
        )}
      </Box>
    </Box>
  );
};

export default DarkLight;
