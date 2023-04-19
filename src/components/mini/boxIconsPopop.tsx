import React from "react";
import { Box, IconButton, Popover, Tooltip } from "@mui/material";

const BoxIconsPopop = (props) => {
  const {
    anchorEl,
    open,
    id,
    handleCloseTodoViewCountTooltip,
    iconList,
    titleList,
    onClickList,
  } = props;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleCloseTodoViewCountTooltip}
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
          backgroundColor: "var(--header)",
          color: "var(--text1)",
          transform: "translateY(-40px) !important",
          borderRadius: "1rem",
          padding: "0 .5rem",
          border: "1px solid var(--text3)",
        },
      }}
    >
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
    </Popover>
  );
};

export default BoxIconsPopop;
