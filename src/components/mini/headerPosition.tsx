import React, { useContext } from "react";
import {
  FaArrowCircleDown,
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaArrowCircleUp,
} from "react-icons/fa";
import { Box, IconButton } from "@mui/material";
import ThemeContext from "@context/themeContext";
import { AppDataContext } from "@context/appDataContext";

const HeaderPosition = () => {
  const { borders } = useContext(ThemeContext);
  const {
    goHeaderTop,
    goHeaderBottom,
    goHeaderLeft,
    goHeaderRight,
  } = useContext(AppDataContext);

  return (
    <Box>
      <Box style={{ textAlign: "center" }}>
        {" "}
        <IconButton onClick={goHeaderTop}>
          <FaArrowCircleUp style={{ color: borders }} />
        </IconButton>
      </Box>
      <Box display="flex" justifyContent="center" style={{ gap: "4rem" }}>
        <Box>
          {" "}
          <IconButton onClick={goHeaderLeft}>
            <FaArrowCircleLeft style={{ color: borders }} />
          </IconButton>
        </Box>
        <Box>
          {" "}
          <IconButton onClick={goHeaderRight}>
            <FaArrowCircleRight style={{ color: borders }} />
          </IconButton>
        </Box>
      </Box>
      <Box style={{ textAlign: "center" }}>
        {" "}
        <IconButton onClick={goHeaderBottom}>
          <FaArrowCircleDown style={{ color: borders }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default HeaderPosition;
