import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";

const FooterButton = (props: any) => {
  const { icon, title, onClick } = props;

  return (
    <Box className="footer-icon-box">
      <Tooltip arrow title={title}>
        <Box className="icon-box" onClick={onClick}>
          <IconButton>{icon}</IconButton>
        </Box>
      </Tooltip>
    </Box>
  );
};

export default FooterButton;
