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
