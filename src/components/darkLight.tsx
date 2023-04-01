import React, { useEffect, useContext } from "react";
import ThemeContext from "../context/themeContext";
import { Box } from "@mui/material";
import { BsFillSunFill, BsFillMoonStarsFill } from "react-icons/bs";
 

const DarkLight = () => {

  const {isDarkMode,toggleDark,setDark,setLight} = useContext(ThemeContext)
 

  return (
    <Box style={{cursor:"pointer"}}>
      <Box
        onClick={() => {
          localStorage.setItem("darkmode", JSON.stringify(!isDarkMode));
          toggleDark();
        }}
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
              color: "white",
            }}
          />
        ) : (
          <BsFillMoonStarsFill
            fontSize={"2rem"}
          />
        )}
      </Box>
    </Box>
  );
};

export default DarkLight;
