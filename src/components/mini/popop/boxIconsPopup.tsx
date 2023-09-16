import React from "react";
import { Box, IconButton, Popover, Tooltip } from "@mui/material";

const BoxIconsPopup = (props:any) => {
  const {
    anchorEl,
    open,
    id,
    handleCloseTodoViewCountPopup,
    iconList,
    titleList,
    onClickList,
    down
  } = props;

  return (
    <Popover

      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleCloseTodoViewCountPopup}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "var(--background)",
          color: "var(--text1)",
          transform: `translateY(${down ? "45px" : "-40px"}) !important`,
          borderRadius: "1rem",
          padding: "0 .5rem",
          border: "1px solid var(--text3)",
          width:120,
          
        },
      }}
    >
      <Box className="d-flex">
      <Box className="box-icon-popover">
        {iconList.map((icon, index) => (
          <Tooltip title={titleList[index]}>
            <IconButton
              className="icon-box2"
              style={{ margin: ".6rem 0" }}
              onClick={onClickList[index]}
            >
              {icon}
            </IconButton>
          </Tooltip>
        ))}
      </Box>
      </Box>
    </Popover>
  );
};

export default BoxIconsPopup;
