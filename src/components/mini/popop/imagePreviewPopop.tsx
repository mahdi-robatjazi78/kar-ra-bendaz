import React, { useState, useEffect } from "react";
import { Box, Popover } from "@mui/material";
import useWindowSize from "@/hooks/useWindowSize";

const ImagePreviewPopop = (props) => {
  const { open, anchorEl, handleClose, id, alt, previewImage } = props;
  const [w, h] = useWindowSize().size;

  return (
    <Popover
      id={id}
      open={open}
      // pass these props to the popover component
      disableAutoFocus={true}
      disableEnforceFocus={true}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{ vertical: "center", horizontal: "center" }}
    >
      <Box 
      className="signup-image-popover"

			>
        <img width={60} height={40} alt={alt} src={previewImage} />
      </Box>
    </Popover>
  );
};

export default ImagePreviewPopop;
