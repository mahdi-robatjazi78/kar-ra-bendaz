 import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { IoSettingsOutline } from "react-icons/io5";
import HeaderPosition from "../mini/headerPosition";
import { RiArrowGoBackFill } from "react-icons/ri";




const SettingsBox = () => {
  const [showHeaderPositions, setShowHeaderPositions] = useState(false);

  return (
    <Box className="add-space-box">
      <Box className="add-space-icon-box d-flex-between">
        <IconButton>
          <IoSettingsOutline className="add-space-icon" />
        </IconButton>
        {showHeaderPositions && (
          <IconButton
            onClick={() => {
              setShowHeaderPositions(false);
            }}
          >
            <RiArrowGoBackFill className="icon-styles" />
          </IconButton>
        )}
      </Box>
      <Box className="add-space-item-box">
        {!showHeaderPositions ? (
          <Typography
            onClick={() => {
              setShowHeaderPositions(!showHeaderPositions);
            }}
            className="add-space-item"
          >
            Header Position
          </Typography>
        ) : (
          <HeaderPosition />
        )}
      </Box>
    </Box>
  );
};

export default SettingsBox;
