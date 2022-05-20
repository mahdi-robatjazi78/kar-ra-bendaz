import React, { useState, useContext } from "react";
import { Box } from "@mui/material";
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";
// import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';

const DarkLight = ({ isDarkMode, setIsDarkMode }) => {
  return (
    <Box>
      <Box
        onClick={() => {
          localStorage.setItem("darkmode", JSON.stringify(!isDarkMode));
          setIsDarkMode(!isDarkMode);
        }}
        style={{
          // border: "1px solid gray   ",
          padding: "1rem",
          display: "inline-block",
          // borderRadius:"5rem"
        }}
      >
        {isDarkMode ? (
          <BsFillSunFill
            fontSize={"2rem"}
            style={{
              animation: "App-logo-spin infinite 20s linear",
              color: "white",
            }}
          />
        ) : (
          <BsFillMoonStarsFill
            fontSize={"2rem"}
            // style={{
            //   color: "#FFF829",
            //   animation: "App-logo-spin infinite 20s linear",
            // }}
          />
        )}
      </Box>
    </Box>
  );
};

export default DarkLight;
